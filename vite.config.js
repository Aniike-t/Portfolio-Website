// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: "/", // Crucial for deployment to platforms like GitHub Pages.
  server: {
    port: 3000, // Optional: Set a specific port for development
  },
  build: {
        outDir: 'dist',  // default folder
        assetsDir: 'assets',  // assets subfolder
        emptyOutDir: true,    // Clear output directory on build.
    },
});