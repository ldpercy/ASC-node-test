const express = require('express')
const app = express()
const port = 3000

const Parser = require('rss-parser');
const parser = new Parser();
const rssUrl = 'https://www.nasa.gov/rss/dyn/Houston-We-Have-a-Podcast.rss';
const episodeCount = 10;



app.get('/', async (req, res) => {
  //let result = 'Hello World!';
  let result = await consumeRssFeed(rssUrl);
  res.send(result);
})



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


async function consumeRssFeed(url){

  let feed = await parser.parseURL(url);

  console.log(`feed: ${feed}`);
  return feed;
}
