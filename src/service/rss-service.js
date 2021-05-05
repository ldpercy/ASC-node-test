const RssParser = require('rss-parser');
const rssParser = new RssParser();


const formatIsoDate = require('../utilities/format-iso-date-to-AEST');



async function retrieveRssFeed(url, itemCount, sort){

  let feed = await rssParser.parseURL(url);

  switch(sort) {
    case 'asc':
      feed.items.sort((a,b) => (a.isoDate < b.isoDate) ? -1 : 1);
      break;
    case 'dsc':
      feed.items.sort((a,b) => (a.isoDate > b.isoDate) ? -1 : 1);
      break;
    default:
      // leave items in natural order if sort unspecified
  }

  // move this above the switch if wanting to sort the truncated results:
  feed.items = feed.items.slice(0,itemCount);

  return feed;
}




function transformRawFeed(rawFeed){

  let remappedEpisodes = rawFeed.items.map(
    (item) => {
      episode = {
        title:          item.title,
        audioUrl:       item.enclosure.url,
        publishedDate:  formatIsoDate.convertISODateToAEST(item.isoDate)
      };
      return episode;
  });

  let result = {
    title:        rawFeed.title,
    description:  rawFeed.description,
    episodes:     remappedEpisodes
  };

  return result;
}


module.exports = {
  retrieveRssFeed,
  transformRawFeed
}
