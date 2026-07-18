import fs from 'fs';
import path from 'path';

let cached: string | null = null;

export function getContentDir(): string {
  if (cached) return cached;
  const primary = path.join(process.cwd(), 'content');
  if (fs.existsSync(primary)) {
    cached = primary;
    return primary;
  }
  const fallback = path.join(process.cwd(), '..', 'content');
  cached = fallback;
  return fallback;
}
