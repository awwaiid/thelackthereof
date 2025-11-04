import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const filename = query.path as string;

  if (!filename) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing path parameter'
    });
  }

  // Security: prevent directory traversal
  if (filename.includes('..') || filename.includes('/')) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid file path'
    });
  }

  // In production, process.cwd() might be .output, so we need to find content dir
  let contentDir = path.join(process.cwd(), 'content');

  // If content doesn't exist at cwd, try parent directory (production build scenario)
  if (!fs.existsSync(contentDir)) {
    contentDir = path.join(process.cwd(), '..', 'content');
  }

  const filePath = path.join(contentDir, filename);

  try {
    if (!fs.existsSync(filePath)) {
      throw createError({
        statusCode: 404,
        statusMessage: 'File not found'
      });
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data: frontmatter, content } = matter(fileContent);

    return {
      path: filename,
      frontmatter,
      content
    };
  } catch (error: any) {
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to read file',
      data: error
    });
  }
});
