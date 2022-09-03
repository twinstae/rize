import presetWind from '@unocss/preset-wind';
import react from '@vitejs/plugin-react';
import Unocss from 'unocss/vite';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    Unocss({
      shortcuts: {
        'tab-active': 'border-red-300',
      },
      presets: [presetWind()],
    }),
  ],
  publicDir: '../public',
  build: {
    sourcemap: true,
  },
});
