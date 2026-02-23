import { getCookie } from 'h3';
import { getAdminSession } from '~/server/utils/session';

export default defineEventHandler((event) => {
  const path = event.node.req.url || '';

  // Extract pathname without query params for matching
  const pathname = path.split('?')[0];

  // Only protect /admin routes and /api/admin/* routes
  if (!pathname.startsWith('/admin') && !pathname.startsWith('/api/admin')) {
    return;
  }

  // Exempt login endpoints from auth check
  if (pathname === '/admin/login' || pathname === '/api/admin/login') {
    return;
  }

  // Get session ID from cookie
  const sessionId = getCookie(event, 'admin_session');

  // Check if session exists and is valid
  const session = sessionId ? getAdminSession(sessionId) : null;

  if (!session) {
    // For API endpoints, return 401
    if (path.startsWith('/api/admin')) {
      event.node.res.statusCode = 401;
      return { error: 'Authentication required' };
    }

    // For page routes, redirect to login with returnTo
    const returnTo = encodeURIComponent(path);
    event.node.res.statusCode = 302;
    event.node.res.setHeader('Location', `/admin/login?returnTo=${returnTo}`);
    return 'Redirecting to login';
  }

  // Authentication successful, continue
  // Optionally attach session data to event context for use in endpoints
  event.context.session = session;
});
