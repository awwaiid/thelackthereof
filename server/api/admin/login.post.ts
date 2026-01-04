import { readBody, setCookie } from 'h3';
import { createSession } from '~/server/utils/session';

export default defineEventHandler(async (event) => {
  const { username, password } = await readBody(event);

  // Get credentials from environment
  const adminUser = process.env.ADMIN_USER || 'admin';
  const adminPassword = process.env.ADMIN_PASSWORD || 'changeme';

  // Validate credentials
  if (username !== adminUser || password !== adminPassword) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid credentials',
      data: { message: 'Invalid username or password' }
    });
  }

  // Create session
  const session = createSession(username);

  // Set cookie
  setCookie(event, 'admin_session', session.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',  // Must be / to cover both /admin and /api/admin paths
    maxAge: 7 * 24 * 60 * 60  // 7 days in seconds
  });

  return { success: true };
});
