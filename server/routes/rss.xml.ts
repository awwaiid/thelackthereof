import { toHtml } from 'hast-util-to-html';
import { Feed } from 'feed';
import { serverQueryContent } from '#content/server';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  // Obtain all docs and init RSS feed creator

  const currentYear = new Date().getFullYear();
  const feed = new Feed({
    id: 'rss',
    // title: "Mac's Journal - RSS feed",
    // description: "RSS feed for the latest Mac's Journal articles",
    // link: 'https://journal.maciejpedzi.ch',
    // copyright: `${currentYear} Maciej Pedzich`
    title: 'The Lack Thereof',
    link: 'https://thelackthereof.org/',
  });
    // feed_url: `https://thelackthereof.org/rss.xml`,
    // image_url: 'https://thelackthereof.org/brock-logo-outline-80x100.png'
  // const docs = await serverQueryContent(event).sort({ date: -1 }).find();
  let tagSearch = {};
  if (query.tags) {
    tagSearch = { tags: { $contains: query.tags } };
  }
  const docs =
    await serverQueryContent(event)
    .where({ draft: { $ne: true }, ...tagSearch})
    .sort({ createdAt: -1})
    .sort({ updatedAt: -1})
    .limit(20)
    .find();

  // 'rehype-urls', url => (url.host ? url : new URL(url.href, process.env.BASE_URL))

  for (const doc of docs) {
    // Make sure to patch all child nodes to match the HAST spec
    // Reference: https://github.com/syntax-tree/hast
    const recursivelyPatchChildren = (node) => {
      if (node.type === 'text') {
        return node;
      } else if (node.tag === 'code' && node.props.language) {
        node.props.lang = node.props.language;
        node.children = [
          {
            type: 'text',
            value: node.props.code
          }
        ];

        // Prevent inclusion of redundant props
        delete node.props.language;
        delete node.props.code;
      } else if (node.props.href && !node.props.href.match(/^http/)) {
        node.props.href = "https://thelackthereof.org" + node.props.href;
      } else if (node.props.src && !node.props.src.match(/^http/)) {
        node.props.src = "https://thelackthereof.org" + node.props.src;
      }

      node.tagName = node.tag;
      node.properties = node.props;
      node.children = node.children.map(recursivelyPatchChildren);

      return node;
    };

    doc.body.children = doc.body.children.map(recursivelyPatchChildren);
    const content = toHtml(doc.body);


    // let image = "";
    // if (doc.image) {
    //   image = `<img src="https://thelackthereof.org${doc.image}"><br/>\n`;
    // }
    // feed.item({
    //   title: cleanTitle(doc.title) ?? '-',
    //   url: `https://thelackthereof.org${doc._path}`,
    //   date: doc.createdAt,
    //   description: image + doc.description,
    // });
    // image_url: 'https://thelackthereof.org/brock-logo-outline-80x100.png'

    feed.addItem({
      id: new URL(doc._path, 'https://thelackthereof.org').href,
      title: doc.title,
      image:
        doc.image
        ? `https://thelackthereof.org/${doc.image}`
        : 'https://thelackthereof.org/brock-logo-outline-80x100.png',
      description: doc.description,
      date: new Date(doc.createdAt),
      link: new URL(doc._path, 'https://thelackthereof.org').href,
      content
    });
  }

  appendHeader(event, 'Content-Type', 'application/xml');
  return feed.rss2();
  // Optionally:
  // return feed.atom1();
});
