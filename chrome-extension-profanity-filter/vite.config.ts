import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import { resolve } from 'path';

export default defineConfig({
  plugins: [reactRefresh()],
  build: {
    outDir: 'dist', // Specify the output directory
    emptyOutDir: true, // Clean the output directory before building
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'), // Entry point for your main HTML file
        options: resolve(__dirname, 'options.html'), // Entry point for your options HTML file
        background: resolve(__dirname, 'src/util/background.ts'), // Entry point for your background script
        contentScript: resolve(__dirname, 'src/util/contentScript.ts'), // Entry point for your content script
      },
      output: {
        entryFileNames: '[name].js', // This will generate background.js and contentScript.js
        chunkFileNames: 'chunks/[name].js',
        assetFileNames: 'assets/[name][extname]',
      },
    },
  },
});