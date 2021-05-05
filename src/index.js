const express = require('express')
const app = express()
const port = 3000

const Parser = require('rss-parser');
const parser = new Parser();
const rssUrl = 'https://www.nasa.gov/rss/dyn/Houston-We-Have-a-Podcast.rss';
const episodeCount = 10;

const formatIsoDate = require('./utilities/format-iso-date-to-AEST');



app.get('/', async (req, res) => {
  let result = await consumeRssFeed(rssUrl, episodeCount);
  result = transformFeed(result);
  res.send(result);
})


app.get('/sort', async (req, res) => {
  let result = await consumeRssFeed(rssUrl, episodeCount, req.query.order);
  result = transformFeed(result);
  res.send(result);
})



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


async function consumeRssFeed(url, itemCount, sort){

  let result = await parser.parseURL(url);

  switch(sort) {
    case 'asc':
      result.items.sort((a,b) => (a.isoDate < b.isoDate) ? -1 : 1);
      break;
    case 'dsc':
      result.items.sort((a,b) => (a.isoDate > b.isoDate) ? -1 : 1);
      break;
    default:
      // leave items in natural order if sort unspecified
  }

  // move this above the switch if wanting to sort the truncated results:
  result.items = result.items.slice(0,itemCount);

  return result;
}



function transformFeed(feed){

  let remappedEpisodes = feed.items.map(
    (item) => {
      newItem = {
        title: item.title,
        audioUrl: item.enclosure.url,
        publishedDate: formatIsoDate.convertISODateToAEST(item.isoDate)
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
