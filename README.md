# Amanda Kreitzer - Artist Portfolio Website

A modern React-based portfolio website showcasing the artwork of artist Amanda Kreitzer. The site features dynamic galleries, contact functionality, and a comprehensive artwork management system.

## 🎨 Overview

This website displays Amanda Kreitzer's paintings and exhibitions with a focus on user experience and easy content management. Built with React, Vite, and Tailwind CSS, it features automated artwork indexing, responsive design, and modern web technologies.

**Live Site**: [amandakreitzer.com](https://amandakreitzer.com)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation
```bash
git clone https://github.com/your-username/amandakreitzer.com.git
cd amandakreitzer.com
npm install
```

### Development
```bash
npm run dev
```
Visit `http://localhost:5173` (or displayed port)

### Production Build
```bash
npm run build
```

## 📁 Project Structure

```
amandakreitzer.com/
├── public/
│   ├── artworks/           # Artwork data and images
│   │   ├── 1/             # Individual artwork folders
│   │   │   ├── image.webp
│   │   │   ├── metadata.yaml
│   │   │   └── thumbs/
│   │   ├── index.json     # Generated artwork index
│   │   └── collections.json
│   ├── exhibitions/       # Exhibition images
│   ├── favicon.png        # Site favicon
│   └── hero-image.jpg     # Homepage hero image
├── src/
│   ├── components/        # React components
│   ├── pages/            # Page components
│   ├── data/             # Data loading utilities
│   └── styles/           # Additional styles
├── scripts/              # Build and management scripts
├── netlify.toml          # Netlify deployment config
└── package.json          # Dependencies and scripts
```

## 🖼️ Artwork Management

### Adding New Artwork

The easiest way to add artwork is using the interactive CLI tool:

```bash
npm run add-art
```

This will prompt you for:
- Image file path
- Title and description
- Medium and dimensions
- Year created
- Availability status

#### Manual Process

1. **Create artwork directory**:
   ```bash
   mkdir public/artworks/[next-id]
   ```

2. **Add the image**:
   - Place image as `public/artworks/[id]/image.webp`
   - Recommended: WebP format, max 1920px width

3. **Create metadata file** (`public/artworks/[id]/metadata.yaml`):
   ```yaml
   ---
   id: 91
   title: "Artwork Title"
   year: 2024
   medium: "Oil on canvas"
   dimensions: "16\" × 20\" (40.6cm × 50.8cm)"
   description: "Optional description of the artwork"
   available: true
   ```

4. **Generate thumbnails and update index**:
   ```bash
   npm run build:artwork-index
   ```

### Updating Artwork Information

Edit the metadata file for any artwork:
```bash
# Edit artwork #15
nano public/artworks/15/metadata.yaml
```

After editing, rebuild the index:
```bash
npm run build:artwork-index
```

### Marking Artwork as Sold/Available

Simply update the `available` field in the metadata:
```yaml
available: false  # Sold
available: true   # Available
```

Then rebuild the index.

### Removing Artwork

1. Delete the artwork directory:
   ```bash
   rm -rf public/artworks/[id]
   ```

2. Rebuild the index:
   ```bash
   npm run build:artwork-index
   ```

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run add-art` | Interactive artwork addition tool |
| `npm run build:artwork-index` | Generate artwork index from metadata |
| `npm run lint` | Run ESLint |

## 🌐 Deployment

### Netlify (Recommended)

The site is configured for automatic deployment on Netlify:

1. **Automatic Deployment**: Push to `master` branch triggers deployment
2. **Build Command**: `npm run build`
3. **Publish Directory**: `dist`
4. **Domain**: Configured to redirect from `amandakreitzer.netlify.app` to `amandakreitzer.com`

### Manual Deployment

```bash
npm run build
# Upload contents of 'dist/' directory to your web server
```

## 📧 Contact Form

The contact form is integrated with a backend service at `forms.cygnul.com`:

### Configuration
- **Backend**: `https://forms.cygnul.com/`
- **Form ID**: `amandakreitzer_1`
- **reCAPTCHA**: Enabled with site key `6LcLifEZAAAAADKfIJsRnfEc2BTrSmJK_pIKtK50`
- **CORS**: Proxy configured for development at `/api/forms/`

### Development vs Production
- **Development**: Uses Vite proxy to avoid CORS issues
- **Production**: Connects directly to backend service

## 🛠️ Technical Details

### Built With
- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Router** - Client-side routing

### Image Processing
- **Thumbnails**: Auto-generated at 300px width
- **Format**: WebP for web optimization
- **Responsive**: Multiple sizes for different viewports

### Data Structure
- **YAML Metadata**: Human-readable artwork information
- **JSON Index**: Generated for fast client-side loading
- **Collections**: Organized by availability, year, etc.

## 🔍 Troubleshooting

### Common Issues

**Artwork not appearing in gallery:**
1. Check metadata YAML syntax
2. Ensure image file exists
3. Run `npm run build:artwork-index`
4. Restart dev server

**Contact form not working:**
1. Check browser console for errors
2. Verify reCAPTCHA is loading
3. Check network tab for CORS issues
4. Ensure backend service is operational

**Build failures:**
1. Check for missing dependencies: `npm install`
2. Verify Node.js version (18+)
3. Clear node_modules and reinstall
4. Check for syntax errors in components

### Image Issues

**Thumbnails not generating:**
1. Ensure Sharp is installed: `npm install sharp`
2. Check image file permissions
3. Verify source image format is supported

**Images not loading:**
1. Check file paths in metadata
2. Ensure images are in WebP format
3. Verify image dimensions aren't corrupted

## 📊 Content Management

### Gallery Organization

Artworks are automatically organized by:
- **All**: Complete collection
- **Available**: For sale
- **Sold**: No longer available
- **Recent**: Latest additions
- **Featured**: Highlighted pieces

### Exhibition Management

Add exhibition images to `public/exhibitions/`:
1. Place images as numbered files (1.webp, 2.webp, etc.)
2. Update exhibition page content in `src/pages/Exhibitions.jsx`

### Homepage Slideshow

Update featured artwork in `src/pages/Home.jsx`:
```javascript
const slideshowImages = [
  '/artworks/67/image.webp', // Latest work
  '/artworks/17/image.webp', // Featured piece
  // Add more artwork paths...
];
```

## 🔒 Security

### Headers
Netlify configuration includes security headers:
- X-Frame-Options
- X-XSS-Protection  
- X-Content-Type-Options
- Referrer-Policy

### Form Protection
- reCAPTCHA v3 spam protection
- Backend validation
- CORS protection

## 📱 Browser Support

- **Modern browsers**: Chrome, Firefox, Safari, Edge (last 2 versions)
- **Mobile**: iOS Safari, Chrome Mobile
- **JavaScript**: Required for full functionality
- **Images**: WebP support (with fallbacks)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Test thoroughly
5. Commit with clear messages
6. Push and create a pull request

### Code Style
- ESLint configuration included
- Prettier for formatting
- Follow React best practices
- Use Tailwind CSS for styling

## 📞 Support

For technical issues or questions:
1. Check this README first
2. Review the troubleshooting section
3. Check existing issues on GitHub
4. Create a new issue with detailed information

## 📄 License

This project is private and proprietary. All artwork and content © Amanda Kreitzer.

---

## 🔄 Version History

- **v3.0.0** - React migration with data-driven artwork management
- **v2.x.x** - Gulp-based build system (legacy)
- **v1.x.x** - Initial website versions

For detailed changelog, see git history and release tags.
