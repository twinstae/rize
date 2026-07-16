import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { playwright } from '@vitest/browser-playwright';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
const __dirname = path.dirname(fileURLToPath(import.meta.url));
export default defineConfig({
  plugins: [react()],
  root: './',
  resolve: {
    alias: {
      '@App': path.resolve(__dirname, './src/web'),
      '@rize/alert': path.resolve(__dirname, './src/error/fakeRizeAlert.ts'),
      '@rize/PlatformConfig': path.resolve(__dirname, './src/web/WebConfig.tsx'),
      src: path.resolve(__dirname, './src')
    }
  },
  test: {
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['node_modules/**', 'dist/**', 'src/tauri/**', 'src/capacitor/**', 'src/**/*.d.ts', 'src/**/*.{test,spec}.{ts,tsx}', 'src/test'],
      reporter: ['text', 'html', 'json']
    },
    projects: [{
      extends: true,
      test: {
        globals: true,
        setupFiles: './src/setupTests.ts',
        include: ['src/**/*.test.tsx', 'src/**/*.test.ts'],
        css: true,
        testTimeout: 10000,
        browser: {
          enabled: true,
          headless: true,
          provider: playwright({
            contextOptions: {
              timezoneId: 'Asia/Seoul'
            }
          }),
          instances: [{
            browser: 'chromium'
          }]
        }
      }
    }, {
      extends: true,
      plugins: [
      // The plugin will run tests for the stories defined in your Storybook config
      // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
      storybookTest({
        configDir: path.join(dirname, '.storybook')
      })],
      test: {
        name: 'storybook',
        browser: {
          enabled: true,
          headless: true,
          provider: playwright({}),
          instances: [{
            browser: 'chromium'
          }]
        }
      }
    }]
  }
});