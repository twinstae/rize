import react from '@vitejs/plugin-react';
import Unocss from 'unocss/vite';
import { presetUno, transformerDirectives } from 'unocss';
import { defineConfig } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
	root: './',
	plugins: [
		react(),
		Unocss({
			shortcuts: {
				'tab-active': 'border-red-300',
			},
			transformers: [transformerDirectives()],
			presets: [presetUno()],
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
	envPrefix: [
		'VITE_',
		'TAURI_PLATFORM',
		'TAURI_ARCH',
		'TAURI_FAMILY',
		'TAURI_PLATFORM_VERSION',
		'TAURI_PLATFORM_TYPE',
		'TAURI_DEBUG',
	],
	build: {
		target: process.env.TAURI_PLATFORM == 'windows' ? 'chrome105' : 'safari13',
		minify: !process.env.TAURI_DEBUG ? 'esbuild' : false,
		sourcemap: !!process.env.TAURI_DEBUG,
	},
});
