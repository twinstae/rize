import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { playwright } from '@vitest/browser-playwright';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
	plugins: [react()],
	root: './',
	resolve: {
		alias: {
			'@App': path.resolve(__dirname, './src/web'),
			'@rize/alert': path.resolve(__dirname, './src/error/fakeRizeAlert.ts'),
			'@rize/PlatformConfig': path.resolve(__dirname, './src/web/WebConfig.tsx'),
			src: path.resolve(__dirname, './src'),
		},
	},
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
					timezoneId: 'Asia/Seoul',
				},
			}),
			instances: [{ browser: 'chromium' }],
		},
		coverage: {
			provider: 'v8',
			include: ['src/**/*.{ts,tsx}'],
			exclude: [
				'node_modules/**',
				'dist/**',
				'src/tauri/**',
				'src/capacitor/**',
				'src/**/*.d.ts',
				'src/**/*.{test,spec}.{ts,tsx}',
				'src/test/Test.tsx',
			],
			reporter: ['text', 'html', 'json'],
		},
	},
});
