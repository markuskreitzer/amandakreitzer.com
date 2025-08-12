# Artwork Management

This folder contains all artwork images and is organized for easy content management.

## Adding New Artwork

### Gallery Pieces

1. Add high-resolution image to `/public/artworks/gallery/`
2. **Thumbnails are generated automatically!** No need to create them manually.
3. Update `src/data/artworks.js` with metadata:

```javascript
{
  id: [unique number],
  title: "Artwork Title",
  year: 2024,
  medium: "Oil on canvas",
  dimensions: "24 x 36 inches", 
  image: "/artworks/gallery/[filename].webp",
  thumbnail: "/artworks/gallery/thumbs/[filename].webp",
  description: "Optional description",
  available: true
}
```

### Exhibition Images

1. Create folder: `/public/artworks/exhibitions/[exhibition-id]/`
2. Add images and thumbnails in respective folders
3. Update `src/data/artworks.js` exhibitions array

## Automatic Thumbnail Generation

The build process automatically creates thumbnails for any images that don't have them:

- **Thumbnails**: 400x300px, optimized JPEG format
- **Generated during**: `npm run dev`, `npm run build`, or `npm run generate-thumbnails`
- **Smart**: Only creates missing thumbnails, skips existing ones

## Image Guidelines

- **Format**: WebP, JPEG, PNG supported (WebP preferred for smaller files)
- **Gallery images**: Max 1920px on longest side recommended
- **File naming**: Use descriptive names (avoid spaces, use hyphens)
- **Quality**: High resolution originals recommended (thumbnails auto-optimized)

## File Structure

```
/public/artworks/
├── gallery/
│   ├── 1.webp
│   ├── 2.webp
│   └── thumbs/
│       ├── 1.webp
│       └── 2.webp
└── exhibitions/
    └── 2012/
        ├── 1.webp
        └── thumbs/
            └── 1.webp
```