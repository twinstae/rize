import { defineConfig } from 'vite';

import viteCommon from './vite-common';

export default defineConfig({
  ...viteCommon,
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
    include: ['src/**/*.test.tsx', 'src/**/*.test.ts'],
    threads: 6,
    testTimeout: 500,
    coverage: {
      include: ['src/**/*.tsx', 'src/**/*.ts'],
      exclude: [
        'node_modules/**',
        'dist/**',
        'src/tauri',
        'src/capacitor',
        'src/**/*.d.ts',
        'src/**/*.test.ts',
        'src/**/*.spec.ts',
        'src/**/*.test.tsx',
        'src/**/*.spec.tsx',
        'src/theme/theme.ts',
        'src/config/localStorageRepo.ts',
        'src/pages/MailListPage.tsx',
        'src/components/MailList.tsx',
        'src/components/RizeLogo.tsx',
        'src/hooks/QueryWrapper.tsx',
        'src/test/Test.tsx',
        'src/App.tsx',
      ],
      all: true,
    },
  },
});
