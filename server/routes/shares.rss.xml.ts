import fetch from 'node-fetch';
import xml2js from 'xml2js';

async function modifyFeed(feedUrl, newDescription) {
  // Fetch the feed
  const response = await fetch(feedUrl);
  const xmlString = await response.text();

  // Parse XML to JS object
  const parser = new xml2js.Parser();
  const result = await parser.parseStringPromise(xmlString);

  // Update the description and de-duplicate
  if (result.rss && result.rss.channel && result.rss.channel.length > 0) {
    result.rss.channel[0].description = [newDescription];
    result.rss.channel[0].link = ["https://thelackthereof.org/shares"];
    result.rss.channel[0]["atom:link"] = [{ "$": { href: "https://thelackthereof.org/shares.rss.xml", rel: "self", type: "application/rss+xml" } }];

    // Remove duplicates and filter out some sections
    const seen = new Set();
    result.rss.channel[0].item = result.rss.channel[0].item.filter(item => {
      const key = item.link[0];
      if (seen.has(key)) {
        return false;
      }
      if (item.title[0].includes("[Saved For Later]")) {
        return false;
      }
      seen.add(key);
      return true;
    });
  }

  // Convert back to XML
  const builder = new xml2js.Builder();
  const modifiedXmlString = builder.buildObject(result);

  return modifiedXmlString;
}

export default defineEventHandler(async (event) => {
  const feedUrl = 'https://zapier.com/engine/rss/12469074/awwaiid-shares';
  const newDescription = "Re-shares from awwaiid";
  const modifiedFeed = await modifyFeed(feedUrl, newDescription);

  appendHeader(event, 'Content-Type', 'application/xml');
  return modifiedFeed;
});
