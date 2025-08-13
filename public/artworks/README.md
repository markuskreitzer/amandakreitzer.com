# Artwork Management System

This directory contains Amanda Kreitzer's artwork collection organized in a file-based structure that allows for easy content management without code changes.

## Directory Structure

```
public/artworks/
├── [ID]/                    # Individual artwork folders
│   ├── image.webp          # The artwork image
│   └── metadata.yaml       # Artwork metadata
├── amanda/                 # Amanda's portrait
│   └── image.webp
├── exhibitions/            # Exhibition images
│   └── *.webp
├── index.json             # Generated artwork index (auto-generated)
├── collections.json       # Generated collections (auto-generated)
└── README.md             # This file
```

## Adding New Artwork

There are three ways to add new artwork:

### Method 1: Interactive Tool (Recommended)

```bash
npm run add-art
```

This will prompt you for all required information step by step, including:
1. Path to the image file (required, with validation)
2. Artwork ID (auto-suggested)
3. Title, year, medium, dimensions
4. Description and availability status

### Method 2: Command Line Tool

```bash
npm run add-art -- --image "/path/to/artwork.jpg" --title "Artwork Title" --year 2024 --medium "Oil on canvas" --dimensions "24\" × 30\" (61cm × 76cm)" --available true
```

**Required flags:**
- `--image` - Path to image file (will be validated and converted to WebP)
- `--title` - Artwork title
- `--year` - Year created

**Optional flags:**
- `--medium` - Medium description (default: "Oil on canvas")
- `--dimensions` - Dimensions with imperial and metric
- `--description` - Artwork description
- `--available` - Available for purchase (true/false, default: false)
- `--id` - Specific ID (auto-generated if not provided)

**Image Requirements:**
- Formats: `.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`, `.bmp`, `.tiff`, `.tif`
- Maximum file size: 5MB
- Recommended resolution: 2400px on longest side
- Will be automatically converted to WebP format for optimization

### Method 3: Manual Process

1. **Create the artwork folder:**
   ```bash
   mkdir public/artworks/[NEXT_ID]/
   ```

2. **Add the image:**
   - Place the artwork image as `image.webp` in the folder
   - Use WebP format for optimal performance
   - Recommended resolution: 1200-2400px on the longest side

3. **Create metadata file:**
   - Copy an existing `metadata.yaml` from another artwork folder
   - Update all fields with the new artwork information
   - Follow the YAML format exactly

4. **Rebuild the index:**
   ```bash
   npm run build:artwork-index
   ```

## Metadata Format

Each `metadata.yaml` file should contain:

```yaml
---
# Artwork Metadata
# This file contains metadata for artwork #[ID]
# Edit this file to update artwork information without modifying code

id: [NUMBER]
title: "[ARTWORK TITLE]"
year: [YEAR]
medium: "[MEDIUM DESCRIPTION]"
dimensions: "[DIMENSIONS IN IMPERIAL × METRIC]"
description: "[OPTIONAL DESCRIPTION]"
available: [true/false]

# Optional fields (uncomment and add as needed):
# price: "$X,XXX"
# series: "Series Name"
# tags: ["tag1", "tag2", "tag3"]
# exhibitions:
#   - "Exhibition Name, Year"
# notes: "Internal notes about the artwork"
```

## Updating Artwork Information

To update existing artwork:

1. **Edit the metadata file:**
   - Open `public/artworks/[ID]/metadata.yaml`
   - Update any fields as needed
   - Save the file

2. **Replace image (if needed):**
   - Replace `public/artworks/[ID]/image.webp` with new image
   - Keep the same filename

3. **Rebuild the index:**
   ```bash
   npm run build:artwork-index
   ```

## Scripts

- `npm run add-art` - Interactive tool to add new artwork (prompts for all metadata)
- `npm run add-art -- [flags]` - Command line tool to add artwork with flags
- `npm run build:artwork-index` - Regenerates index.json and collections.json from metadata files
- `node scripts/generate-metadata.js` - Generates metadata files for existing artworks
- `node scripts/build-artwork-index.js` - Builds the artwork index

## File Conventions

- **Images:** Always use `image.webp` as the filename
- **IDs:** Use sequential numbers starting from 1
- **Metadata:** Always use `metadata.yaml` as the filename
- **Format:** Follow YAML syntax strictly (spaces, not tabs)

## Automated Collections

The system automatically generates:
- **All:** Complete artwork collection
- **Recent:** First 6 artworks by ID
- **Featured:** Available artworks (up to 4)
- **Available:** All artworks marked as available for purchase

## Image Optimization

For best performance:
- Use WebP format for all images
- Optimize images before adding (aim for <500KB per image)
- Consider using responsive images for high-resolution displays
- Use consistent aspect ratios when possible

## Troubleshooting

If artwork isn't showing:
1. Check that `image.webp` exists in the artwork folder
2. Verify `metadata.yaml` syntax is valid
3. Run `npm run build:artwork-index` to regenerate index files
4. Check browser console for loading errors
5. Verify file permissions allow reading

## Development

During development, the site loads artwork data from the generated JSON files. For the best experience:
1. Make metadata changes
2. Run `npm run build:artwork-index`
3. The dev server will automatically reload with changes