import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export default defineEventHandler(async (event) => {
  // In production, process.cwd() might be .output, so we need to find content dir
  let contentDir = path.join(process.cwd(), 'content');

  // If content doesn't exist at cwd, try parent directory (production build scenario)
  if (!fs.existsSync(contentDir)) {
    contentDir = path.join(process.cwd(), '..', 'content');
  }

  try {
    // Verify the directory exists
    if (!fs.existsSync(contentDir)) {
      throw new Error(`Content directory not found. Tried: ${path.join(process.cwd(), 'content')} and ${contentDir}`);
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
