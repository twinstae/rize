import { defineConfig } from 'vite';

import viteCommon from './vite-common';

export default defineConfig({
  ...viteCommon,
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
    coverage: {
      include: ['src/**/*.test.tsx', 'src/**/*.test.ts'],
      exclude: [
        'node_modules/**',
        'dist/**',
        'src/tauri',
        'src/capacitor',
        'src/**/*.d.ts',
        'src/**/*.test.ts',
        'src/**/*.test.tsx',
        'src/theme/theme.ts',
        'src/config/localStorageRepo.ts',
      ],
      all: true,
    },
  },
});
