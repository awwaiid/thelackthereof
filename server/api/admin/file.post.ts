import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { getContentDir } from '~/server/utils/contentDir';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { path: filename, frontmatter, content, isNew, isBlog } = body;

  if (!frontmatter || content === undefined) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing frontmatter or content'
    });
  }

  const contentDir = getContentDir();
  let targetPath = filename;

  // If this is a new file, generate the filename
  if (isNew) {
    const title = frontmatter.title || 'Untitled';
    const fileTitle = title.replace(/\//g, '-');

    if (isBlog) {
      // Blog post format: TLT - YYYY.MM.DD - Title.md
      const date = new Date();
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const fileDate = `${year}.${month}.${day}`;
      targetPath = `TLT - ${fileDate} - ${fileTitle}.md`;

      // Ensure blog tag is set
      if (!frontmatter.tags) {
        frontmatter.tags = ['blog'];
      } else if (!frontmatter.tags.includes('blog')) {
        frontmatter.tags.push('blog');
      }
    } else {
      // Regular page format: Title.md
      targetPath = `${fileTitle}.md`;
    }
  }

  // Security: prevent directory traversal
  if (targetPath.includes('..') || targetPath.includes('/')) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid file path'
    });
  }

  const filePath = path.join(contentDir, targetPath);

  // Check if file already exists (for new files)
  if (isNew && fs.existsSync(filePath)) {
    throw createError({
      statusCode: 409,
      statusMessage: 'File already exists'
    });
  }

  try {
    // Serialize frontmatter and content
    const fileContent = matter.stringify(content, frontmatter);

    // Write file
    fs.writeFileSync(filePath, fileContent, 'utf-8');

    // NOTE: In dev mode, Nuxt Content reads directly from filesystem
    // No cache clearing needed - changes appear immediately

    return {
      success: true,
      path: targetPath
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to write file',
      data: error
    });
  }
});
