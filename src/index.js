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
  result = transformFeed(result);
  res.send(result);
})



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


async function consumeRssFeed(url, itemCount){

  let result = await parser.parseURL(url);
  // console.log(`result: ${result}`);
  result.items = result.items.slice(0,itemCount);

  return result;
}



function transformFeed(feed){

  let remappedEpisodes = feed.items.map(
    (item) => {
      newItem = {
        title: item.title,
        audioUrl: item.enclosure.url,
        publishedDate: item.isoDate
      };
      return newItem;
  });

  let result = {
    title:        feed.title,
    description:  feed.description,
    episodes:     remappedEpisodes
  };

  return result;
}
