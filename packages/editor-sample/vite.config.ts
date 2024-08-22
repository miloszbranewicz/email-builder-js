import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  base: '/email-builder-js/',
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'template-generator.js',
        chunkFileNames: 'template-generator-[name].js',
        assetFileNames: 'assets/[name].[ext]'
      }
    }
  }
});
