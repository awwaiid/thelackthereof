import fs from 'fs';
import path from 'path';

export default defineEventHandler(async (event) => {
  try {
    const formData = await readMultipartFormData(event);

    if (!formData || formData.length === 0) {
      throw createError({
        statusCode: 400,
        statusMessage: 'No file uploaded'
      });
    }

    const file = formData.find(item => item.name === 'file');

    if (!file || !file.data) {
      throw createError({
        statusCode: 400,
        statusMessage: 'No file data found'
      });
    }

    // Get filename from the upload
    let filename = file.filename || 'upload';

    // Security: sanitize filename
    filename = filename.replace(/[^a-zA-Z0-9._-]/g, '_');

    // In production, process.cwd() might be .output, so we need to find content dir
    let contentDir = path.join(process.cwd(), 'content');

    // If content doesn't exist at cwd, try parent directory (production build scenario)
    if (!fs.existsSync(contentDir)) {
      contentDir = path.join(process.cwd(), '..', 'content');
    }

    const imgDir = path.join(contentDir, 'img');

    // Ensure img directory exists
    if (!fs.existsSync(imgDir)) {
      fs.mkdirSync(imgDir, { recursive: true });
    }

    // Check if file exists, append number if needed
    let targetPath = path.join(imgDir, filename);
    let counter = 1;
    const ext = path.extname(filename);
    const basename = path.basename(filename, ext);

    while (fs.existsSync(targetPath)) {
      filename = `${basename}_${counter}${ext}`;
      targetPath = path.join(imgDir, filename);
      counter++;
    }

    // Write file
    fs.writeFileSync(targetPath, file.data);

    return {
      success: true,
      filename,
      url: `/img/${filename}`
    };
  } catch (error: any) {
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to upload file',
      data: error
    });
  }
});
