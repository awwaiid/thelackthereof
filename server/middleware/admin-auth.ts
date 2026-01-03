export default defineEventHandler((event) => {
  const path = event.node.req.url || '';

  // Only protect /admin routes and /api/admin/* routes
  if (!path.startsWith('/admin') && !path.startsWith('/api/admin')) {
    return;
  }

  // Special case: /api/admin/auth-check should not trigger browser auth popup
  // It just checks if auth is present without challenging the user
  const isAuthCheck = path.startsWith('/api/admin/auth-check');

  // Get credentials from environment
  const adminUser = process.env.ADMIN_USER || 'admin';
  const adminPassword = process.env.ADMIN_PASSWORD || 'changeme';

  // Get Authorization header
  const authHeader = event.node.req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Basic ')) {
    // No auth provided
    event.node.res.statusCode = 401;
    // Only send WWW-Authenticate header if NOT the auth-check endpoint
    // This prevents browser popup on regular pages that check auth status
    if (!isAuthCheck) {
      event.node.res.setHeader('WWW-Authenticate', 'Basic realm="Admin Area"');
    }
    return 'Authentication required';
  }

  // Decode and verify credentials
  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
  const [username, password] = credentials.split(':');

  if (username !== adminUser || password !== adminPassword) {
    // Invalid credentials
    event.node.res.statusCode = 401;
    // Only send WWW-Authenticate header if NOT the auth-check endpoint
    if (!isAuthCheck) {
      event.node.res.setHeader('WWW-Authenticate', 'Basic realm="Admin Area"');
    }
    return 'Invalid credentials';
  }

  // Authentication successful, continue
});
