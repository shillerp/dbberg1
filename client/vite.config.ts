import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {}
  },
  build: {
    outDir: 'dist',
    lib: {
      entry: 'src/index.tsx',
      name: 'ChatWidget',
      fileName: 'chat-widget',
      formats: ['umd']
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {},
        inlineDynamicImports: true
      }
    }
  },
  server: {
    port: 3000,
    open: false
  }
});
