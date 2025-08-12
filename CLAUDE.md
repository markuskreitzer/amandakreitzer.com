# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Modern React portfolio website for artist Amanda Kreitzer, built with Vite, Tailwind CSS, and Framer Motion. Features an interactive gallery system with easy content management.

## Development Commands

```bash
# Start development server (auto-generates missing thumbnails)
npm run dev
# or
npm start

# Build for production (auto-generates missing thumbnails)
npm run build

# Generate thumbnails manually
npm run generate-thumbnails

# Preview production build
npm run preview
# or 
npm run serve

# Run linting
npm run lint
```

## Architecture

### Tech Stack
- **React 18** with hooks and functional components
- **Vite** for fast development and building
- **React Router** for client-side routing
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Radix UI** for accessible components

### Project Structure
- `src/components/` - Reusable React components
  - `Layout/` - Header, Footer, Layout wrapper
  - `Gallery/` - Gallery grid and modal components
- `src/pages/` - Page components (Home, Gallery, About, etc.)
- `src/data/` - Static data and content management
- `public/artworks/` - Image assets organized by type

### Content Management System
Artwork data is managed through:
- `src/data/artworks.js` - Centralized artwork metadata
- `public/artworks/` - Image file organization
- Simple JSON structure for adding new pieces

### Key Features
- **Responsive Gallery** with lightbox modal and keyboard navigation
- **Image optimization** with thumbnail support
- **Smooth animations** using Framer Motion
- **Mobile-first responsive** design
- **Accessible** components using Radix UI

### Adding New Artwork
1. Add high-resolution images to `public/artworks/gallery/`
2. Update `src/data/artworks.js` with metadata
3. Thumbnails are generated automatically during build
4. Follow existing data structure for consistency

### Thumbnail Generation
- **Automatic**: Runs during `npm run dev` and `npm run build`
- **Manual**: Use `npm run generate-thumbnails`
- **Smart**: Only creates missing thumbnails
- **Format**: 400x300px optimized JPEG

### Styling Approach
- **Tailwind CSS** utility classes
- **Custom color scheme** in `tailwind.config.js`
- **Typography**: Dancing Script for headings, Source Sans Pro for body
- **Responsive breakpoints**: Mobile-first approach

### Build Output
- Static files in `dist/` directory
- Deployable to any static hosting service
- Optimized for performance with Vite's build process