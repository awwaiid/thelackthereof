import { getCookie, getRequestURL, sendRedirect, setResponseStatus } from 'h3';
import { getAdminSession } from '~/server/utils/session';

export default defineEventHandler(async (event) => {
  const url = getRequestURL(event);
  const pathname = url.pathname;

  // Only protect /admin routes and /api/admin/* routes
  if (!pathname.startsWith('/admin') && !pathname.startsWith('/api/admin')) {
    return;
  }

  // Exempt login endpoints from auth check
  if (pathname === '/admin/login' || pathname === '/api/admin/login') {
    return;
  }

  const sessionId = getCookie(event, 'admin_session');
  const session = sessionId ? getAdminSession(sessionId) : null;

  if (!session) {
    if (pathname.startsWith('/api/admin')) {
      setResponseStatus(event, 401);
      return { error: 'Authentication required' };
    }

    const returnTo = encodeURIComponent(pathname + url.search);
    return sendRedirect(event, `/admin/login?returnTo=${returnTo}`, 302);
  }

  event.context.session = session;
});
