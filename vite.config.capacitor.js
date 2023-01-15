import { defineConfig } from 'vite';
import path from 'path';
import viteCommon from './vite-common';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@App': path.resolve(__dirname, './src/capacitor'),
    },
  },
  build: {
    outDir: './src/capacitor/dist'
  },
  ...viteCommon,
});
