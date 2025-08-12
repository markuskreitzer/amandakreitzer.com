#!/usr/bin/env node

import { promises as fs } from 'fs';
import path from 'path';
import sharp from 'sharp';

const ARTWORK_DIR = './public/artworks';
const THUMBNAIL_WIDTH = 400;
const THUMBNAIL_HEIGHT = 300;

// Supported image formats
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.tiff', '.tif'];

async function ensureDirectory(dir) {
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
}

async function isImageFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return IMAGE_EXTENSIONS.includes(ext);
}

async function generateThumbnail(sourcePath, thumbnailPath) {
  try {
    await sharp(sourcePath)
      .resize(THUMBNAIL_WIDTH, THUMBNAIL_HEIGHT, {
        fit: 'cover',
        position: 'center'
      })
      .jpeg({ quality: 85 })
      .toFile(thumbnailPath);
    
    console.log(`✓ Generated thumbnail: ${thumbnailPath}`);
  } catch (error) {
    console.error(`✗ Failed to generate thumbnail for ${sourcePath}:`, error.message);
  }
}

async function processDirectory(dirPath) {
  try {
    const items = await fs.readdir(dirPath, { withFileTypes: true });
    
    for (const item of items) {
      const fullPath = path.join(dirPath, item.name);
      
      if (item.isDirectory()) {
        // Skip thumbs directories
        if (item.name === 'thumbs') continue;
        
        // Recursively process subdirectories
        await processDirectory(fullPath);
      } else if (await isImageFile(fullPath)) {
        // Process image files
        const dir = path.dirname(fullPath);
        const filename = path.basename(fullPath, path.extname(fullPath));
        const thumbsDir = path.join(dir, 'thumbs');
        const thumbnailPath = path.join(thumbsDir, `${filename}.jpg`);
        
        // Ensure thumbs directory exists
        await ensureDirectory(thumbsDir);
        
        // Check if thumbnail already exists
        try {
          await fs.access(thumbnailPath);
          console.log(`- Thumbnail already exists: ${thumbnailPath}`);
        } catch {
          // Thumbnail doesn't exist, generate it
          await generateThumbnail(fullPath, thumbnailPath);
        }
      }
    }
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log(`Directory not found: ${dirPath}`);
    } else {
      console.error(`Error processing directory ${dirPath}:`, error.message);
    }
  }
}

async function main() {
  console.log('🖼️  Generating missing thumbnails...\n');
  
  try {
    // Ensure artwork directory exists
    await ensureDirectory(ARTWORK_DIR);
    
    // Process all directories in artworks
    const artworkItems = await fs.readdir(ARTWORK_DIR, { withFileTypes: true });
    
    for (const item of artworkItems) {
      if (item.isDirectory()) {
        const dirPath = path.join(ARTWORK_DIR, item.name);
        console.log(`Processing: ${dirPath}`);
        await processDirectory(dirPath);
      }
    }
    
    console.log('\n✅ Thumbnail generation complete!');
  } catch (error) {
    console.error('\n❌ Error during thumbnail generation:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { main as generateThumbnails };