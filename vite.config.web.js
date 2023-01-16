import { mergeConfig } from 'vite';
import path from 'path';
import viteCommon from './vite-common';

// https://vitejs.dev/config/
export default mergeConfig(viteCommon, {
  resolve: {
    alias: {
      '@App': path.resolve(__dirname, './src/web'),
    },
  },
  build: {
    outDir: path.resolve(__dirname, './src/web/dist'),
  },
});
