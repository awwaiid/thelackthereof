import { randomUUID } from 'crypto';

// Session data structure
export interface SessionData {
  id: string;
  username: string;
  createdAt: number;
  expiresAt: number;
}

// In-memory session store
const sessions = new Map<string, SessionData>();

// Get session TTL from environment (default: 7 days)
function getSessionTTL(): number {
  const days = parseInt(process.env.SESSION_TTL_DAYS || '7', 10);
  return days * 24 * 60 * 60 * 1000; // Convert to milliseconds
}

/**
 * Create a new session for the given username
 */
export function createSession(username: string): SessionData {
  const id = randomUUID();
  const now = Date.now();
  const ttl = getSessionTTL();

  const session: SessionData = {
    id,
    username,
    createdAt: now,
    expiresAt: now + ttl
  };

  sessions.set(id, session);

  return session;
}

/**
 * Get a session by ID
 * Returns null if session doesn't exist or has expired
 */
export function getSession(sessionId: string): SessionData | null {
  const session = sessions.get(sessionId);

  if (!session) {
    return null;
  }

  // Check if session has expired
  if (Date.now() > session.expiresAt) {
    // Clean up expired session
    sessions.delete(sessionId);
    return null;
  }

  return session;
}

/**
 * Delete a session by ID
 */
export function deleteSession(sessionId: string): void {
  sessions.delete(sessionId);
}

/**
 * Clean up all expired sessions
 * This can be called periodically to free memory
 */
export function cleanupExpiredSessions(): void {
  const now = Date.now();
  const expiredIds: string[] = [];

  // Find expired sessions
  for (const [id, session] of sessions.entries()) {
    if (now > session.expiresAt) {
      expiredIds.push(id);
    }
  }

  // Delete expired sessions
  for (const id of expiredIds) {
    sessions.delete(id);
  }

  if (expiredIds.length > 0) {
    console.log(`[Session] Cleaned up ${expiredIds.length} expired session(s)`);
  }
}

// Optional: Run cleanup every hour in production
if (process.env.NODE_ENV === 'production') {
  setInterval(cleanupExpiredSessions, 60 * 60 * 1000); // Every hour
}
