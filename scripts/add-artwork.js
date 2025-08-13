#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const IMAGE_MAX_SIZE_MB = 5; // Maximum file size in MB
const IMAGE_MAX_SIZE_BYTES = IMAGE_MAX_SIZE_MB * 1024 * 1024;
const ALLOWED_IMAGE_FORMATS = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.bmp', '.tiff', '.tif'];
const RECOMMENDED_MAX_DIMENSION = 2400; // pixels

// Command line argument parsing
const args = process.argv.slice(2);
const flags = {};
const positionalArgs = [];

for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  if (arg.startsWith('--')) {
    const [key, value] = arg.substring(2).split('=');
    if (value !== undefined) {
      flags[key] = value;
    } else if (i + 1 < args.length && !args[i + 1].startsWith('--')) {
      flags[key] = args[++i];
    } else {
      flags[key] = true;
    }
  } else {
    positionalArgs.push(arg);
  }
}

// Helper functions
function getNextArtworkId() {
  const artworksDir = path.join(__dirname, '../public/artworks');
  let maxId = 0;
  
  if (fs.existsSync(artworksDir)) {
    const items = fs.readdirSync(artworksDir);
    for (const item of items) {
      const itemPath = path.join(artworksDir, item);
      if (fs.statSync(itemPath).isDirectory()) {
        const id = parseInt(item);
        if (!isNaN(id) && id > maxId) {
          maxId = id;
        }
      }
    }
  }
  
  return maxId + 1;
}

function createPrompt(question, defaultValue = '') {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  return new Promise((resolve) => {
    const prompt = defaultValue ? `${question} (${defaultValue}): ` : `${question}: `;
    rl.question(prompt, (answer) => {
      rl.close();
      resolve(answer.trim() || defaultValue);
    });
  });
}

function validateYear(year) {
  const yearNum = parseInt(year);
  return yearNum >= 1900 && yearNum <= new Date().getFullYear() + 1;
}

function validateId(id) {
  const idNum = parseInt(id);
  return idNum > 0 && Number.isInteger(idNum);
}

async function validateImageFile(imagePath) {
  // Check if file exists
  if (!fs.existsSync(imagePath)) {
    return { valid: false, error: 'File does not exist' };
  }
  
  // Check if it's a file (not directory)
  const stats = fs.statSync(imagePath);
  if (!stats.isFile()) {
    return { valid: false, error: 'Path is not a file' };
  }
  
  // Check file extension
  const ext = path.extname(imagePath).toLowerCase();
  if (!ALLOWED_IMAGE_FORMATS.includes(ext)) {
    return { 
      valid: false, 
      error: `Invalid image format. Allowed formats: ${ALLOWED_IMAGE_FORMATS.join(', ')}` 
    };
  }
  
  // Check file size
  if (stats.size > IMAGE_MAX_SIZE_BYTES) {
    const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
    return { 
      valid: false, 
      error: `File too large (${sizeMB}MB). Maximum size: ${IMAGE_MAX_SIZE_MB}MB` 
    };
  }
  
  // Try to get image dimensions using ImageMagick or native tools
  try {
    const dimensions = await getImageDimensions(imagePath);
    if (dimensions) {
      const maxDim = Math.max(dimensions.width, dimensions.height);
      if (maxDim > RECOMMENDED_MAX_DIMENSION * 1.5) {
        console.log(`⚠️  Warning: Image dimension (${maxDim}px) exceeds recommended maximum (${RECOMMENDED_MAX_DIMENSION}px)`);
        console.log('   Consider resizing for optimal web performance.');
      }
    }
  } catch (error) {
    // Dimensions check is optional, continue if it fails
  }
  
  return { 
    valid: true, 
    size: stats.size,
    extension: ext
  };
}

async function getImageDimensions(imagePath) {
  try {
    // Try using 'file' command which is available on most Unix systems
    const { stdout } = await execAsync(`file "${imagePath}"`);
    const match = stdout.match(/(\d+)\s*x\s*(\d+)/);
    if (match) {
      return {
        width: parseInt(match[1]),
        height: parseInt(match[2])
      };
    }
  } catch (error) {
    // If file command fails, we can't get dimensions, but that's okay
  }
  return null;
}

function generateMetadataYaml(metadata) {
  return `---
# Artwork Metadata
# This file contains metadata for artwork #${metadata.id}
# Edit this file to update artwork information without modifying code

id: ${metadata.id}
title: "${metadata.title}"
year: ${metadata.year}
medium: "${metadata.medium}"
dimensions: "${metadata.dimensions}"
description: "${metadata.description}"
available: ${metadata.available}

# Optional fields (uncomment and add as needed):
# price: "$X,XXX"
# series: "Series Name"
# tags: ["tag1", "tag2", "tag3"]
# exhibitions:
#   - "Exhibition Name, Year"
# notes: "Internal notes about the artwork"
`;
}

function showHelp() {
  console.log(`
🎨 Add Artwork Tool - Amanda Kreitzer Portfolio

USAGE:
  npm run add-art                           # Interactive mode
  npm run add-art -- [options]             # Command line mode

OPTIONS:
  --image <path>         Path to image file (REQUIRED)
  --title <string>       Artwork title (required)
  --year <number>        Year created (required)
  --medium <string>      Medium description (default: "Oil on canvas")
  --dimensions <string>  Dimensions with imperial and metric
  --description <string> Artwork description (optional)
  --available <boolean>  Available for purchase (default: false)
  --id <number>          Artwork ID (auto-generated if not provided)
  --help, -h            Show this help message

IMAGE REQUIREMENTS:
  - Formats: ${ALLOWED_IMAGE_FORMATS.join(', ')}
  - Maximum size: ${IMAGE_MAX_SIZE_MB}MB
  - Recommended resolution: ${RECOMMENDED_MAX_DIMENSION}px on longest side
  - Image will be converted to WebP format automatically

EXAMPLES:
  # Interactive mode
  npm run add-art

  # Command line mode
  npm run add-art -- --image "/path/to/artwork.jpg" --title "Sunset Dreams" --year 2024 --medium "Oil on canvas" --dimensions "24\\" × 30\\" (61cm × 76cm)" --available true

  # Minimal command line
  npm run add-art -- --image "~/Desktop/painting.jpg" --title "Morning Light" --year 2024

NOTES:
  - Image file is REQUIRED and will be validated
  - If no ID is provided, the next available ID will be used
  - After adding artwork, run: npm run build:artwork-index
  - Remember to use quotes for multi-word values
`);
}

async function collectMetadataInteractively() {
  console.log('\n🎨 Adding New Artwork - Interactive Mode\n');
  
  const metadata = {};
  
  // Image path (REQUIRED)
  let imageValidated = false;
  while (!imageValidated) {
    metadata.imagePath = await createPrompt('Path to image file (REQUIRED)');
    
    if (!metadata.imagePath) {
      console.error('❌ Image path is required.');
      continue;
    }
    
    // Expand home directory if needed
    if (metadata.imagePath.startsWith('~')) {
      metadata.imagePath = metadata.imagePath.replace('~', process.env.HOME);
    }
    
    // Make path absolute
    if (!path.isAbsolute(metadata.imagePath)) {
      metadata.imagePath = path.resolve(metadata.imagePath);
    }
    
    const validation = await validateImageFile(metadata.imagePath);
    if (!validation.valid) {
      console.error(`❌ ${validation.error}`);
      continue;
    }
    
    const sizeMB = (validation.size / (1024 * 1024)).toFixed(2);
    console.log(`✅ Valid image file (${sizeMB}MB, ${validation.extension})`);
    imageValidated = true;
  }
  
  // ID
  const suggestedId = getNextArtworkId();
  const idInput = await createPrompt(`Artwork ID`, suggestedId.toString());
  metadata.id = parseInt(idInput);
  
  if (!validateId(metadata.id)) {
    console.error('❌ Invalid ID. Must be a positive integer.');
    process.exit(1);
  }
  
  // Check if ID already exists
  const artworkDir = path.join(__dirname, '../public/artworks', metadata.id.toString());
  if (fs.existsSync(artworkDir)) {
    console.error(`❌ Artwork #${metadata.id} already exists!`);
    process.exit(1);
  }
  
  // Title
  metadata.title = await createPrompt('Title (required)');
  if (!metadata.title) {
    console.error('❌ Title is required.');
    process.exit(1);
  }
  
  // Year
  const currentYear = new Date().getFullYear();
  const yearInput = await createPrompt(`Year created`, currentYear.toString());
  metadata.year = parseInt(yearInput);
  
  if (!validateYear(metadata.year)) {
    console.error('❌ Invalid year. Must be between 1900 and current year + 1.');
    process.exit(1);
  }
  
  // Medium
  metadata.medium = await createPrompt('Medium', 'Oil on canvas');
  
  // Dimensions
  metadata.dimensions = await createPrompt('Dimensions (e.g., 24" × 30" (61cm × 76cm))');
  
  // Description
  metadata.description = await createPrompt('Description (optional)');
  
  // Available
  const availableInput = await createPrompt('Available for purchase? (y/n)', 'n');
  metadata.available = availableInput.toLowerCase().startsWith('y');
  
  return metadata;
}

async function collectMetadataHybrid() {
  console.log('\n🎨 Adding New Artwork - Hybrid Mode\n');
  console.log('📝 Using provided flags and prompting for missing information...\n');
  
  const metadata = {};
  
  // Image path - use flag if provided, otherwise prompt
  if (flags.image) {
    metadata.imagePath = flags.image;
    
    // Expand home directory if needed
    if (metadata.imagePath.startsWith('~')) {
      metadata.imagePath = metadata.imagePath.replace('~', process.env.HOME);
    }
    
    // Make path absolute
    if (!path.isAbsolute(metadata.imagePath)) {
      metadata.imagePath = path.resolve(metadata.imagePath);
    }
    
    const validation = await validateImageFile(metadata.imagePath);
    if (!validation.valid) {
      console.error(`❌ Image validation failed: ${validation.error}`);
      process.exit(1);
    }
    
    const sizeMB = (validation.size / (1024 * 1024)).toFixed(2);
    console.log(`✅ Valid image file (${sizeMB}MB, ${validation.extension})\n`);
  } else {
    // Prompt for image
    let imageValidated = false;
    while (!imageValidated) {
      metadata.imagePath = await createPrompt('Path to image file (REQUIRED)');
      
      if (!metadata.imagePath) {
        console.error('❌ Image path is required.');
        continue;
      }
      
      // Expand home directory if needed
      if (metadata.imagePath.startsWith('~')) {
        metadata.imagePath = metadata.imagePath.replace('~', process.env.HOME);
      }
      
      // Make path absolute
      if (!path.isAbsolute(metadata.imagePath)) {
        metadata.imagePath = path.resolve(metadata.imagePath);
      }
      
      const validation = await validateImageFile(metadata.imagePath);
      if (!validation.valid) {
        console.error(`❌ ${validation.error}`);
        continue;
      }
      
      const sizeMB = (validation.size / (1024 * 1024)).toFixed(2);
      console.log(`✅ Valid image file (${sizeMB}MB, ${validation.extension})`);
      imageValidated = true;
    }
  }
  
  // ID - use flag if provided, otherwise prompt with suggestion
  if (flags.id) {
    metadata.id = parseInt(flags.id);
  } else {
    const suggestedId = getNextArtworkId();
    const idInput = await createPrompt(`Artwork ID`, suggestedId.toString());
    metadata.id = parseInt(idInput);
  }
  
  if (!validateId(metadata.id)) {
    console.error('❌ Invalid ID. Must be a positive integer.');
    process.exit(1);
  }
  
  // Check if ID already exists
  const artworkDir = path.join(__dirname, '../public/artworks', metadata.id.toString());
  if (fs.existsSync(artworkDir)) {
    console.error(`❌ Artwork #${metadata.id} already exists!`);
    process.exit(1);
  }
  
  // Title - use flag if provided, otherwise prompt
  if (flags.title) {
    metadata.title = flags.title;
  } else {
    metadata.title = await createPrompt('Title (required)');
    if (!metadata.title) {
      console.error('❌ Title is required.');
      process.exit(1);
    }
  }
  
  // Year - use flag if provided, otherwise prompt
  if (flags.year) {
    metadata.year = parseInt(flags.year);
  } else {
    const currentYear = new Date().getFullYear();
    const yearInput = await createPrompt(`Year created`, currentYear.toString());
    metadata.year = parseInt(yearInput);
  }
  
  if (!validateYear(metadata.year)) {
    console.error('❌ Invalid year. Must be between 1900 and current year + 1.');
    process.exit(1);
  }
  
  // Medium - use flag if provided, otherwise prompt with default
  if (flags.medium) {
    metadata.medium = flags.medium;
  } else {
    metadata.medium = await createPrompt('Medium', 'Oil on canvas');
  }
  
  // Dimensions - use flag if provided, otherwise prompt
  if (flags.dimensions) {
    metadata.dimensions = flags.dimensions;
  } else {
    metadata.dimensions = await createPrompt('Dimensions (e.g., 24" × 30" (61cm × 76cm))');
  }
  
  // Description - use flag if provided, otherwise prompt
  if (flags.description) {
    metadata.description = flags.description;
  } else {
    metadata.description = await createPrompt('Description (optional)');
  }
  
  // Available - use flag if provided, otherwise prompt
  if (flags.available !== undefined) {
    metadata.available = flags.available === 'true' || flags.available === true;
  } else {
    const availableInput = await createPrompt('Available for purchase? (y/n)', 'n');
    metadata.available = availableInput.toLowerCase().startsWith('y');
  }
  
  return metadata;
}

async function collectMetadataFromFlags() {
  const metadata = {};
  
  // Image path (REQUIRED)
  if (!flags.image) {
    console.error('❌ --image is required');
    console.log('💡 Use --help to see usage examples');
    process.exit(1);
  }
  
  metadata.imagePath = flags.image;
  
  // Expand home directory if needed
  if (metadata.imagePath.startsWith('~')) {
    metadata.imagePath = metadata.imagePath.replace('~', process.env.HOME);
  }
  
  // Make path absolute
  if (!path.isAbsolute(metadata.imagePath)) {
    metadata.imagePath = path.resolve(metadata.imagePath);
  }
  
  const validation = await validateImageFile(metadata.imagePath);
  if (!validation.valid) {
    console.error(`❌ Image validation failed: ${validation.error}`);
    process.exit(1);
  }
  
  const sizeMB = (validation.size / (1024 * 1024)).toFixed(2);
  console.log(`✅ Valid image file (${sizeMB}MB, ${validation.extension})`);
  
  // Required fields
  if (!flags.title) {
    console.error('❌ --title is required');
    process.exit(1);
  }
  
  if (!flags.year) {
    console.error('❌ --year is required');
    process.exit(1);
  }
  
  // ID
  metadata.id = flags.id ? parseInt(flags.id) : getNextArtworkId();
  
  if (!validateId(metadata.id)) {
    console.error('❌ Invalid ID. Must be a positive integer.');
    process.exit(1);
  }
  
  // Check if ID already exists
  const artworkDir = path.join(__dirname, '../public/artworks', metadata.id.toString());
  if (fs.existsSync(artworkDir)) {
    console.error(`❌ Artwork #${metadata.id} already exists!`);
    process.exit(1);
  }
  
  // Set values
  metadata.title = flags.title;
  metadata.year = parseInt(flags.year);
  metadata.medium = flags.medium || 'Oil on canvas';
  metadata.dimensions = flags.dimensions || '';
  metadata.description = flags.description || '';
  metadata.available = flags.available === 'true' || flags.available === true;
  
  // Validate year
  if (!validateYear(metadata.year)) {
    console.error('❌ Invalid year. Must be between 1900 and current year + 1.');
    process.exit(1);
  }
  
  return metadata;
}

async function copyImageFile(sourcePath, targetDir) {
  const targetPath = path.join(targetDir, 'image.webp');
  
  try {
    // Check if we have sharp available for WebP conversion
    let sharp;
    try {
      sharp = (await import('sharp')).default;
    } catch (error) {
      sharp = null;
    }
    
    if (sharp && !sourcePath.endsWith('.webp')) {
      // Convert to WebP using sharp
      console.log('🔄 Converting image to WebP format...');
      await sharp(sourcePath)
        .webp({ quality: 90 })
        .toFile(targetPath);
      console.log(`✅ Image converted and saved as WebP`);
    } else {
      // Just copy the file
      fs.copyFileSync(sourcePath, targetPath);
      console.log(`✅ Image copied to artwork folder`);
    }
    
    // Verify the copy
    if (fs.existsSync(targetPath)) {
      const stats = fs.statSync(targetPath);
      const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
      console.log(`📸 Image size: ${sizeMB}MB at ${targetPath}`);
    }
  } catch (error) {
    console.error(`❌ Failed to process image: ${error.message}`);
    console.log('💡 You can manually add image.webp to the artwork folder');
    process.exit(1);
  }
}

async function createArtwork(metadata) {
  const artworkDir = path.join(__dirname, '../public/artworks', metadata.id.toString());
  
  try {
    // Create artwork directory
    fs.mkdirSync(artworkDir, { recursive: true });
    console.log(`📁 Created folder: ${artworkDir}`);
    
    // Copy image file (this is now required)
    await copyImageFile(metadata.imagePath, artworkDir);
    
    // Generate and write metadata file
    const yamlContent = generateMetadataYaml(metadata);
    const metadataPath = path.join(artworkDir, 'metadata.yaml');
    fs.writeFileSync(metadataPath, yamlContent, 'utf8');
    console.log(`📝 Created metadata: ${metadataPath}`);
    
    console.log(`\n✅ Successfully created artwork #${metadata.id}: "${metadata.title}"`);
    console.log('\n📋 Next steps:');
    console.log('   1. Run: npm run build:artwork-index');
    console.log('   2. Preview with: npm run dev');
    console.log('   3. Commit and push changes to deploy\n');
    
  } catch (error) {
    console.error(`❌ Failed to create artwork: ${error.message}`);
    // Try to clean up if something went wrong
    if (fs.existsSync(artworkDir)) {
      fs.rmSync(artworkDir, { recursive: true, force: true });
    }
    process.exit(1);
  }
}

// Main execution
async function main() {
  // Show help if requested
  if (flags.help || flags.h) {
    showHelp();
    return;
  }
  
  let metadata;
  
  // Determine mode based on flags
  // If all required flags are present, use command line mode
  // Otherwise, use hybrid mode (validate provided flags, prompt for missing)
  if (flags.image && flags.title && flags.year) {
    // Full command line mode - all required fields provided
    console.log('\n🎨 Adding artwork from command line...\n');
    metadata = await collectMetadataFromFlags();
  } else if (flags.image || flags.title || flags.year) {
    // Hybrid mode - some flags provided, prompt for missing
    metadata = await collectMetadataHybrid();
  } else {
    // Full interactive mode - no flags provided
    metadata = await collectMetadataInteractively();
  }
  
  // Show summary
  console.log('\n📋 Artwork Summary:');
  console.log(`   ID: ${metadata.id}`);
  console.log(`   Title: "${metadata.title}"`);
  console.log(`   Year: ${metadata.year}`);
  console.log(`   Medium: "${metadata.medium}"`);
  console.log(`   Dimensions: "${metadata.dimensions}"`);
  console.log(`   Description: "${metadata.description}"`);
  console.log(`   Available: ${metadata.available}`);
  console.log(`   Image: ${metadata.imagePath}`);
  
  // Confirm in interactive mode
  if (!flags.image && !flags.title && !flags.year) {
    const confirm = await createPrompt('\nCreate this artwork? (y/n)', 'y');
    if (!confirm.toLowerCase().startsWith('y')) {
      console.log('❌ Cancelled');
      return;
    }
  }
  
  // Create the artwork
  await createArtwork(metadata);
}

// Run the script
main().catch((error) => {
  console.error('❌ Unexpected error:', error);
  process.exit(1);
});