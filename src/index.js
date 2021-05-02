const express = require('express')
const app = express()
const port = 3000

const Parser = require('rss-parser');
const parser = new Parser();
const rssUrl = 'https://www.nasa.gov/rss/dyn/Houston-We-Have-a-Podcast.rss';
const episodeCount = 10;



app.get('/', async (req, res) => {
  //let result = 'Hello World!';
  let result = await consumeRssFeed(rssUrl, episodeCount);
  res.send(result);
})



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


async function consumeRssFeed(url, itemCount){

  let result = await parser.parseURL(url);
  // console.log(`feed: ${feed}`);
  result.items = result.items.slice(0,itemCount);

  return result;
}



