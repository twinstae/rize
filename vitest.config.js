import { defineConfig } from 'vite';
import viteCommon from './vite-common';
import path from 'path';
/// <reference types="vitest" />

export default defineConfig({
	...viteCommon,
	root: './',
	resolve: {
		alias: {
			'@App': path.resolve(__dirname, './src/web'),
			'@rize/alert': path.resolve(__dirname, './src/error/fakeRizeAlert.ts'),
		},
	},
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: './src/setupTests.js',
		include: ['src/**/*.test.tsx', 'src/**/*.test.ts'],
		threads: 6,
		testTimeout: 3000,
		// coverage: {
		// 	provider: 'istanbul',
		// 	include: [
		// 		'src/**/*.{ts,tsx}'
		// 	],
		// 	exclude: [
		// 		'node_modules/**',
		// 		'dist/**',
		// 		'src/tauri',
		// 		'src/capacitor',
		// 		'src/**/*.d.ts',
		// 		'src/**/*.{test,spec}.{ts,tsx}',
		// 		'src/test/Test.tsx'
		// 	],
		// 	all: true,
		// 	reporter: ['json'],
		// 	reportsDirectory: './.nyc_output'
		// },
	},
});
