import { serverQueryContent } from '#content/server';
import RSS from 'rss';

export default defineEventHandler(async (event) => {

  const feed = new RSS({
    title: 'The Lack Thereof',
    site_url: 'https://thelackthereof.org/',
    feed_url: `https://thelackthereof.org/rss.xml`,
    image_url: 'https://thelackthereof.org/brock-logo-outline-80x100.png'
  });

  const docs =
    await serverQueryContent(event)
    .sort({ createdAt: -1})
    .sort({ updatedAt: -1})
    .limit(20)
    .find();

  for (const doc of docs) {
    let image = "";
    if (doc.image) {
      image = `<img src="${doc.image}"><br/>`;
    }
    feed.item({
      title: doc.title ?? '-',
      url: `https://thelackthereof.org${doc._path}`,
      date: doc.createdAt,
      description: '<![CDATA[' + image + doc.description + ']]>'
    });
  }

  const feedString = feed.xml({ indent: true });
  event.res.setHeader('content-type', 'text/xml');
  event.res.end(feedString);
});

