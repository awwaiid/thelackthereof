export default defineEventHandler((event) => {
  // Get credentials from environment
  const adminUser = process.env.ADMIN_USER || 'admin';
  const adminPassword = process.env.ADMIN_PASSWORD || 'changeme';

  // Get Authorization header
  const authHeader = event.node.req.headers.authorization;

  // Check if auth header exists and is valid Basic Auth
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    // No auth provided - return 401 WITHOUT WWW-Authenticate header
    // This prevents the browser from showing an auth prompt
    event.node.res.statusCode = 401;
    return { authenticated: false };
  }

  // Decode and verify credentials
  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
  const [username, password] = credentials.split(':');

  if (username !== adminUser || password !== adminPassword) {
    // Invalid credentials - return 401 WITHOUT WWW-Authenticate header
    event.node.res.statusCode = 401;
    return { authenticated: false };
  }

  // Valid credentials - return success
  return { authenticated: true };
});
