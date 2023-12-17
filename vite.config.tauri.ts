import react from '@vitejs/plugin-react';
import Unocss from 'unocss/vite';
import { presetUno, transformerDirectives } from 'unocss';
import { presetDaisy } from 'unocss-preset-daisy'
import { defineConfig } from 'vite';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	root: './',
	plugins: [
		react({
			// babel: {
			// 	plugins: [['istanbul']],
			// },
		}),
		Unocss({
			shortcuts: {
				'tab-active': 'border-red-300',
			},
			transformers: [transformerDirectives()],
			presets: [presetUno(), presetDaisy()],
		}),
	],
	publicDir: path.resolve(__dirname, './src/public'),

	resolve: {
		alias: {
			'@App': path.resolve(__dirname, './src/tauri'),
			'@rize/alert': path.resolve(__dirname, './src/tauri/tauriAlert.ts'),
			'@rize/PlatformConfig': path.resolve(__dirname, './src/tauri/TauriConfig.tsx'),
		},
	},
	clearScreen: false,
	server: {
		strictPort: true,
	},
	envPrefix: ['VITE_', 'TAURI_PLATFORM', 'TAURI_ARCH', 'TAURI_FAMILY', 'TAURI_PLATFORM_VERSION', 'TAURI_PLATFORM_TYPE', 'TAURI_DEBUG'],
	build: {
		// Tauri uses Chromium on Windows and WebKit on macOS and Linux
		target: process.env.TAURI_PLATFORM == 'windows' ? 'chrome105' : 'safari13',
		// don't minify for debug builds
		minify: !process.env.TAURI_DEBUG ? 'esbuild' : false,
		// 디버그 빌드에서 소스맵을 제공합니다.
		sourcemap: !!process.env.TAURI_DEBUG,
	},
});
