# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an artist portfolio website for Amanda Kreitzer, built using Gulp, Pug templates, and Stylus for styling. The site features galleries, exhibitions, and contact functionality.

## Development Commands

```bash
# Start development server with live reload
npm start
# or
npm run develop

# Build for production
npm run build

# Run linting
npm run lint

# Run production server for testing
npm run serve
# or
npm run preflight

# Deploy (builds production)
npm run deploy
```

## Architecture

### Build System
- **Gulp 4** orchestrates all build tasks
- Tasks defined in `settings/gulp/` directory
- Environment-based configuration via `NODE_ENV` (development/production)
- Output directories: `dev/` for development, `prd/` for production

### Directory Structure
- `src/` - Source files
  - `templates/` - Pug templates
    - `views/` - Page templates (home, gallery, about, contact, exhibitions)
    - `_/` - Shared template partials and mixins
  - `styles/` - Stylus stylesheets
    - `_/` - Core style modules (colors, mixins, layout, text)
    - `views/` - Page-specific styles
  - `logic/` - JavaScript files (uses Rollup for bundling)
    - `libs/` - Utility libraries
    - `modules/` - Feature modules
    - `views/` - Page-specific logic
  - `components/` - Reusable UI components (headers, footers, galleries, forms, etc.)
  - `images/` - Image assets organized by section
  - `fonts/` - Web fonts (Dancing Script, Source Sans Pro)

### Key Technologies
- **Templates**: Pug
- **Styles**: Stylus with PostCSS (autoprefixer, cssnano)
- **JavaScript**: ES6+ with Babel, bundled with Rollup
- **Images**: WebP format, SVG sprites for icons
- **Server**: Browser-sync for development

### Component System
Components are self-contained in `src/components/` with:
- `_.pug` - Template file
- `index.styl` - Component styles
- `_.js` - Component logic (if needed)
- `images/` - Component-specific images
- `README.md` - Component documentation

### Image Processing
- `_linked/` - Images served as-is
- `_verbatim/` - Images copied without processing
- `_symbols/` - SVG icons for sprite generation
- `_inline/` - SVGs to be inlined

### Configuration
- Environment settings in `settings/index.js`
- ESLint configs in `settings/eslint/`
- Babel config in `babel.config.js`