import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { getContentDir } from '~/server/utils/contentDir';

export default defineEventHandler(async (event) => {
  const contentDir = getContentDir();

  try {
    if (!fs.existsSync(contentDir)) {
      throw new Error(`Content directory not found: ${contentDir}`);
    }

    // Read all files in content directory
    const files = fs.readdirSync(contentDir)
      .filter(file => file.endsWith('.md') && !file.startsWith('_') && !file.endsWith('.tpl'));

    // Parse frontmatter for each file
    const fileData = files.map(filename => {
      const filePath = path.join(contentDir, filename);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data: frontmatter } = matter(fileContent);

      return {
        path: filename,
        title: frontmatter.title || filename.replace('.md', ''),
        createdAt: frontmatter.createdAt || null,
        updatedAt: frontmatter.updatedAt || null,
        draft: frontmatter.draft || false,
        tags: frontmatter.tags || []
      };
    });

    // Separate blog posts from regular pages
    // Blog posts follow pattern: TLT - YYYY.MM.DD - Title.md
    const blogPosts = fileData.filter(file => file.path.match(/^TLT - \d{4}\.\d{2}\.\d{2}/));
    const pages = fileData.filter(file => !file.path.match(/^TLT - \d{4}\.\d{2}\.\d{2}/));

    // Sort blog posts by date (newest first)
    blogPosts.sort((a, b) => {
      const dateA = new Date(a.createdAt || 0);
      const dateB = new Date(b.createdAt || 0);
      return dateB.getTime() - dateA.getTime();
    });

    // Sort pages alphabetically
    pages.sort((a, b) => a.title.localeCompare(b.title));

    return {
      blogPosts,
      pages
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to read content directory',
      data: error
    });
  }
});
