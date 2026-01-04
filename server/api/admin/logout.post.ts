import { getCookie, deleteCookie } from 'h3';
import { deleteSession } from '~/server/utils/session';

export default defineEventHandler((event) => {
  // Get session ID from cookie
  const sessionId = getCookie(event, 'admin_session');

  // Delete session from store
  if (sessionId) {
    deleteSession(sessionId);
  }

  // Delete cookie (must match path used when setting)
  deleteCookie(event, 'admin_session', { path: '/' });

  return { success: true };
});
