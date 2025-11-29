import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { frontmatter, content } = body;

  if (!frontmatter || content === undefined) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing frontmatter or content'
    });
  }

  // In production, process.cwd() might be .output, so we need to find content dir
  let contentDir = path.join(process.cwd(), 'content');

  // If content doesn't exist at cwd, try parent directory (production build scenario)
  if (!fs.existsSync(contentDir)) {
    contentDir = path.join(process.cwd(), '..', 'content');
  }

  const previewPath = path.join(contentDir, '_admin-preview.md');

  try {
    // Create temp file with frontmatter and content
    const fileContent = matter.stringify(content, frontmatter);
    fs.writeFileSync(previewPath, fileContent, 'utf-8');

    console.log('[Preview] File written to:', previewPath);
    console.log('[Preview] File exists after write:', fs.existsSync(previewPath));

    // NOTE: Don't clear cache for preview - it needs the source storage to parse the file
    // The file isn't in the pre-built cache, so serverQueryContent will read from filesystem

    // Query the content using Nuxt Content with retry logic
    // There can be a small delay before Nuxt Content's file watcher picks up the new file
    let doc = null;
    const maxRetries = 10;
    for (let attempt = 0; attempt < maxRetries; attempt++) {
      if (attempt > 0) {
        console.log(`[Preview] Retry attempt ${attempt}/${maxRetries - 1}`);
        // Small delay to allow file watcher to pick up the file
        await new Promise(resolve => setTimeout(resolve, 50));
      }

      doc = await queryCollection(event, 'content').path('/_admin-preview').first();

      if (doc) {
        console.log('[Preview] queryCollection returned doc with title:', doc.title);
        break;
      } else {
        console.log(`[Preview] Attempt ${attempt + 1}: queryCollection returned null/undefined`);
      }
    }

    // Clean up temp file
    if (fs.existsSync(previewPath)) {
      fs.unlinkSync(previewPath);
    }

    if (!doc) {
      console.error('[Preview] ERROR: All retry attempts failed!');
      console.error('[Preview] Content dir:', contentDir);
      console.error('[Preview] File was written but queryCollection could not find it');
    }

    return {
      success: true,
      doc
    };
  } catch (error: any) {
    // Make sure to clean up temp file even on error
    if (fs.existsSync(previewPath)) {
      fs.unlinkSync(previewPath);
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to render preview',
      data: error
    });
  }
});
