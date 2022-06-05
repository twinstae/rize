import { defineConfig } from 'vite';

import viteCommon from './vite-common';

// https://vitejs.dev/config/
export default defineConfig({
  root: './src/tauri',
  ...viteCommon,
});
