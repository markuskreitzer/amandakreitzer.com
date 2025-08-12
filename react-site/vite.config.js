import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { thumbnailsPlugin } from './scripts/vite-plugin-thumbnails.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    thumbnailsPlugin()
  ],
})
