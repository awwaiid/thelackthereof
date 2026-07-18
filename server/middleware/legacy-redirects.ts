import { getRequestURL, sendRedirect } from 'h3';

// Map legacy WordPress-style URLs like /2006/03/12/starcraft-lan-information
// to the current canonical /tlt-2006.03.12-starcraft-lan-information.
const DATED_BLOG_PATH = /^\/(\d{4})\/(\d{2})\/(\d{2})\/([^/]+)\/?$/;

// Date-only legacy posts: /2004/02/19 -> /tlt-2004.02.19
const DATED_BLOG_PATH_NO_SLUG = /^\/(\d{4})\/(\d{2})\/(\d{2})\/?$/;

// Common legacy feed URLs -> canonical /rss.xml
const FEED_ALIASES = new Set([
  '/blog.rss',
  '/feed',
  '/feed/',
  '/feed.xml',
  '/atom.xml',
  '/index.rss',
  '/rss',
  '/rss/'
]);

export default defineEventHandler(async (event) => {
  const pathname = getRequestURL(event).pathname;

  if (FEED_ALIASES.has(pathname)) {
    return sendRedirect(event, '/rss.xml', 301);
  }

  let target: string | null = null;

  const withSlug = pathname.match(DATED_BLOG_PATH);
  if (withSlug) {
    const [, yyyy, mm, dd, slug] = withSlug;
    target = `/tlt-${yyyy}.${mm}.${dd}-${slug.toLowerCase()}`;
  } else {
    const dateOnly = pathname.match(DATED_BLOG_PATH_NO_SLUG);
    if (dateOnly) {
      const [, yyyy, mm, dd] = dateOnly;
      target = `/tlt-${yyyy}.${mm}.${dd}`;
    }
  }

  if (target && target !== pathname) {
    return sendRedirect(event, target, 301);
  }
});
