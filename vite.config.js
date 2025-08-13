import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { thumbnailsPlugin } from './scripts/vite-plugin-thumbnails.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    thumbnailsPlugin()
  ],
  server: {
    proxy: {
      '/api/forms': {
        target: 'https://forms.cygnul.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/forms/, '')
      }
    }
  }
})
