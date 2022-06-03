import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
    coverage: {
      exclude: [
        'node_modules/**',
        'dist/**',
        '**/fs*',
        '**/server*',
        '**/localStorage*'
      ],
      include: [
        'src/**/*.tsx',
        'src/**/*.ts',
      ],
      all: true
    }
  },
});
