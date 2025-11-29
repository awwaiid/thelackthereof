import { Feed } from 'feed';

// Convert minimark format to HTML
function minimarkToHtml(node: any, baseUrl = 'https://thelackthereof.org'): string {
  // Handle text nodes
  if (typeof node === 'string') {
    return node
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // Handle minimark nodes [tagName, attributes, ...children]
  if (Array.isArray(node)) {
    const [tag, attrs, ...children] = node;

    // Convert attributes to HTML
    let attrString = '';
    if (attrs && typeof attrs === 'object') {
      // Make relative URLs absolute
      const processedAttrs = { ...attrs };
      if (processedAttrs.src && !processedAttrs.src.match(/^https?:\/\//)) {
        processedAttrs.src = `${baseUrl}/_ipx/_/${processedAttrs.src}`;
      }
      if (processedAttrs.href && !processedAttrs.href.match(/^https?:\/\//)) {
        processedAttrs.href = `${baseUrl}${processedAttrs.href}`;
      }

      attrString = Object.entries(processedAttrs)
        .filter(([key, value]) => value !== undefined && value !== null)
        .map(([key, value]) => {
          // Handle special attributes
          if (key === 'className') key = 'class';
          // Skip code/language attributes that are already handled
          if (key === 'code' || key === 'language' || key === 'meta' || key === 'style') return '';
          const escapedValue = String(value).replace(/"/g, '&quot;');
          return `${key}="${escapedValue}"`;
        })
        .filter(Boolean)
        .join(' ');
    }

    if (attrString) attrString = ' ' + attrString;

    // Handle pre/code blocks specially
    if (tag === 'pre' && attrs?.code) {
      const code = attrs.code
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
      return `<pre><code>${code}</code></pre>`;
    }

    // Convert children
    const childrenHtml = children.map(child => minimarkToHtml(child, baseUrl)).join('');

    // Self-closing tags
    if (['img', 'br', 'hr'].includes(tag)) {
      return `<${tag}${attrString} />`;
    }

    return `<${tag}${attrString}>${childrenHtml}</${tag}>`;
  }

  return '';
}

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
  // Build query with Nuxt Content v3 API
  let queryBuilder = queryCollection(event, 'content')
    .where('draft', 'IS NOT', 1);

  if (query.tags) {
    queryBuilder = queryBuilder.where('tags', 'LIKE', `%${query.tags}%`);
  }

  const docs = await queryBuilder
    .order('createdAt', 'DESC')
    .order('updatedAt', 'DESC')
    .limit(20)
    .all();

  // 'rehype-urls', url => (url.host ? url : new URL(url.href, process.env.BASE_URL))

  for (const doc of docs) {
    // Convert minimark body to HTML
    let content = '';
    if (doc.body?.type === 'minimark' && Array.isArray(doc.body.value)) {
      content = doc.body.value.map((node: any) => minimarkToHtml(node)).join('\n');
    }

    feed.addItem({
      id: new URL(doc.path, 'https://thelackthereof.org').href,
      title: doc.title,
      image:
        doc.image
        ? `https://thelackthereof.org/_ipx/_/${doc.image}`
        : 'https://thelackthereof.org/brock-logo-outline-80x100.png',
      description: doc.description || '',
      date: new Date(doc.createdAt),
      link: new URL(doc.path, 'https://thelackthereof.org').href,
      content: content || doc.description || ''
    });
  }

  appendHeader(event, 'Content-Type', 'application/xml');
  return feed.rss2();
  // Optionally:
  // return feed.atom1();
});
