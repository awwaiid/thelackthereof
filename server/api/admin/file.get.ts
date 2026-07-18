import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { getContentDir } from '~/server/utils/contentDir';

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

  const filePath = path.join(getContentDir(), filename);

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
