const express = require('express')
const app = express()
const port = 3000


const rssUrl = 'https://www.nasa.gov/rss/dyn/Houston-We-Have-a-Podcast.rss';
const episodeCount = 10;

const rssService = require('./service/rss-service');



app.get('/', async (req, res) => {
  let rawFeed = await rssService.retrieveRssFeed(rssUrl, episodeCount);
  response = rssService.transformRawFeed(rawFeed);
  res.send(response);
})


app.get('/sort', async (req, res) => {
  let rawFeed = await rssService.retrieveRssFeed(rssUrl, episodeCount, req.query.order);
  response = rssService.transformRawFeed(rawFeed);
  res.send(response);
})



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

