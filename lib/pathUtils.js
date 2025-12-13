/**
 * Convert URL slug to title for pre-filling new pages
 * Example: "/my-new-page" → "My New Page"
 */
export function slugToTitle(slug) {
  const parts = slug.split('/').filter(Boolean);
  if (parts.length === 0) return 'Home';

  return parts[parts.length - 1]
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
