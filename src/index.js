const express = require('express')
const app = express()
const port = 3000

const Parser = require('rss-parser');
const parser = new Parser();
const rssUrl = 'https://www.nasa.gov/rss/dyn/Houston-We-Have-a-Podcast.rss';
const episodeCount = 10;



app.get('/', (req, res) => {
  let result = 'Hello World!';
  res.send(result);
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})



