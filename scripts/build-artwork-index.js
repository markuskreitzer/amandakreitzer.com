#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to parse YAML metadata (simple parser for our specific format)
function parseYamlMetadata(yamlContent) {
  const lines = yamlContent.split('\n');
  const metadata = {};
  
  for (const line of lines) {
    if (line.trim().startsWith('#') || line.trim() === '' || line.trim() === '---') {
      continue;
    }
    
    const match = line.match(/^(\w+):\s*(.+)$/);
    if (match) {
      const [, key, value] = match;
      
      // Handle different value types
      if (value === 'true' || value === 'false') {
        metadata[key] = value === 'true';
      } else if (value.match(/^\d+$/)) {
        metadata[key] = parseInt(value);
      } else if (value.startsWith('"') && value.endsWith('"')) {
        metadata[key] = value.slice(1, -1); // Remove quotes
      } else {
        metadata[key] = value;
      }
    }
  }
  
  return metadata;
}

// Build artwork index from metadata files
function buildArtworkIndex() {
  const artworksDir = path.join(__dirname, '../public/artworks');
  const artworks = [];
  
  // Get all numeric artwork directories dynamically
  const artworkDirs = fs.readdirSync(artworksDir)
    .filter(dir => /^\d+$/.test(dir))
    .map(dir => parseInt(dir))
    .sort((a, b) => a - b);
  
  // Read all artwork directories
  for (const id of artworkDirs) {
    const artworkDir = path.join(artworksDir, id.toString());
    const metadataPath = path.join(artworkDir, 'metadata.yaml');
    const imagePath = path.join(artworkDir, 'image.webp');
    
    if (fs.existsSync(metadataPath) && fs.existsSync(imagePath)) {
      try {
        const yamlContent = fs.readFileSync(metadataPath, 'utf8');
        const metadata = parseYamlMetadata(yamlContent);
        
        // Create artwork object with paths
        const artwork = {
          ...metadata,
          image: `/artworks/${id}/image.webp`,
          thumbnail: `/artworks/${id}/image.webp`
        };
        
        artworks.push(artwork);
        console.log(`✓ Processed artwork #${id}: ${artwork.title}`);
      } catch (error) {
        console.error(`✗ Error processing artwork #${id}:`, error.message);
      }
    } else {
      console.warn(`⚠ Missing files for artwork #${id}`);
    }
  }
  
  // Sort by ID
  artworks.sort((a, b) => a.id - b.id);
  
  // Write index file
  const indexPath = path.join(__dirname, '../public/artworks/index.json');
  fs.writeFileSync(indexPath, JSON.stringify(artworks, null, 2), 'utf8');
  
  console.log(`\n🎨 Successfully built artwork index with ${artworks.length} artworks!`);
  console.log(`📄 Index saved to: public/artworks/index.json`);
  
  return artworks;
}

// Run the build
const artworks = buildArtworkIndex();

// Generate collections
const collections = {
  all: artworks,
  recent: artworks.slice(0, 6),
  featured: artworks.filter(art => art.available).slice(0, 4),
  available: artworks.filter(art => art.available)
};

// Write collections file
const collectionsPath = path.join(__dirname, '../public/artworks/collections.json');
fs.writeFileSync(collectionsPath, JSON.stringify(collections, null, 2), 'utf8');

console.log(`📚 Generated collections.json with ${collections.available.length} available artworks`);