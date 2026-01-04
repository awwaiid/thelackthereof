import { getCookie } from 'h3';
import { getSession } from '~/server/utils/session';

export default defineEventHandler((event) => {
  // Get session ID from cookie
  const sessionId = getCookie(event, 'admin_session');

  // Check if session exists and is valid
  const session = sessionId ? getSession(sessionId) : null;

  if (!session) {
    event.node.res.statusCode = 401;
    return { authenticated: false };
  }

  // Valid session
  return {
    authenticated: true,
    username: session.username
  };
});
