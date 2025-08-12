# Amanda Kreitzer Portfolio

A modern, responsive portfolio website for artist Amanda Kreitzer, built with React and Vite.

## Features

- **Modern Stack**: React 18, Vite, Tailwind CSS, Framer Motion
- **Responsive Design**: Works on all devices
- **Gallery System**: Interactive image gallery with modal lightbox
- **Easy Content Management**: Simple folder structure for adding artwork
- **Performance Optimized**: Fast loading with modern web practices
- **Accessibility**: Built with accessibility best practices

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view in browser.

### Build for Production

```bash
npm run build
```

Built files will be in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## Content Management

### Adding New Artwork

The site is designed for extremely easy content management. To add new artwork:

1. **Add Images**:
   - Simply drop high-resolution images in `public/artworks/gallery/`
   - **Thumbnails are generated automatically!** No manual thumbnail creation needed
   - Supported formats: WebP, JPEG, PNG, TIFF

2. **Update Data**:
   - Edit `src/data/artworks.js`
   - Add metadata for each new piece
   - Follow the existing structure

### Image Guidelines

- **Gallery Images**: Max 1920px on longest side recommended
- **Thumbnails**: Generated automatically at 400x300px
- **Format**: WebP, JPEG, PNG, TIFF supported (WebP preferred for best performance)
- **Naming**: Use descriptive names without spaces (use hyphens)

### Automatic Thumbnail Generation

- Thumbnails are created automatically during build
- Run `npm run generate-thumbnails` to create them manually
- Only missing thumbnails are generated (existing ones are preserved)
- Optimized for web with 85% JPEG quality

### Example Artwork Entry

```javascript
{
  id: 3,
  title: "Morning Light",
  year: 2024,
  medium: "Oil on canvas",
  dimensions: "24 x 36 inches",
  image: "/artworks/gallery/morning-light.webp",
  thumbnail: "/artworks/gallery/thumbs/morning-light.webp",
  description: "A study of light filtering through morning mist",
  available: true
}
```

## Deployment

### Netlify (Recommended)

1. Connect your GitHub repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Deploy!

### Other Platforms

The build creates static files that can be deployed anywhere:
- Vercel
- GitHub Pages
- AWS S3 + CloudFront
- Any static hosting service

## Customization

### Colors

Edit the color scheme in `tailwind.config.js`:

```javascript
colors: {
  'artist': {
    // Update these colors to match brand
    50: '#fdf8f6',
    // ... more shades
  }
}
```

### Fonts

The site uses:
- **Dancing Script** for headings (elegant script font)
- **Source Sans Pro** for body text (clean, readable)

Update fonts in `src/index.css` and `tailwind.config.js`.

### Layout

- Header/Navigation: `src/components/Layout/Header.jsx`
- Footer: `src/components/Layout/Footer.jsx`
- Pages: `src/pages/`

## Dependencies

### Core
- **React** - UI framework
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing

### UI & Styling
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations
- **Radix UI** - Accessible component primitives

### Key Features
- **Responsive Gallery** with lightbox modal
- **Smooth Animations** for better user experience
- **SEO Ready** with proper HTML structure
- **Mobile First** responsive design

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)  
- Safari (last 2 versions)
- Edge (last 2 versions)

## License

Private - All rights reserved