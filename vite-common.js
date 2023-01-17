import react from '@vitejs/plugin-react';
import Unocss from 'unocss/vite';
import {presetUno, transformerDirectives} from 'unocss';
import { defineConfig } from 'vite';
import presetDaisy from './presetDaisy.js';
import istanbul from 'babel-plugin-istanbul';
// eslint-disable-next-line no-undef
const env = process.env;
export default defineConfig({
  root: './',
  plugins: [
    react({
      babel: {
        plugins: [[istanbul]]
      }
    }),
    Unocss({
      shortcuts: {
        'tab-active': 'border-red-300',
      },
      transformers: [transformerDirectives()],
      presets: [presetUno(), presetDaisy()],
    }),
  ],
  publicDir: './src/public',
  // prevent vite from obscuring rust errors
  clearScreen: false,
  // Tauri expects a fixed port, fail if that port is not available
  server: {
    strictPort: true,
  },
  // to make use of `TAURI_PLATFORM`, `TAURI_ARCH`, `TAURI_FAMILY`,
  // `TAURI_PLATFORM_VERSION`, `TAURI_PLATFORM_TYPE` and `TAURI_DEBUG`
  // env variables
  envPrefix: ['VITE_', 'TAURI_'],
  build: {
    // Tauri uses Chromium on Windows and WebKit on macOS and Linux
    target: env.TAURI_PLATFORM == 'windows' ? 'chrome105' : 'safari13',
    // don't minify for debug builds
    minify: !env.TAURI_DEBUG ? 'esbuild' : false,
    // 디버그 빌드에서 소스맵을 제공합니다.
    sourcemap: true,
  },
});
