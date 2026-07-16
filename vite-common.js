import react from '@vitejs/plugin-react';
import unocss from 'unocss/vite';
import { presetUno, transformerDirectives } from 'unocss';
import { defineConfig } from 'vite';

const env = process.env;
export default defineConfig({
	root: './',
	plugins: [
		react(),
		unocss({
			shortcuts: {
				'tab-active': 'border-red-300',
			},
			transformers: [transformerDirectives()],
			presets: [presetUno()],
		}),
	],
	publicDir: './src/public',
	clearScreen: false,
	server: {
		strictPort: true,
	},
	envPrefix: ['VITE_', 'TAURI_'],
	build: {
		target: env.TAURI_PLATFORM == 'windows' ? 'chrome105' : 'safari13',
		minify: !env.TAURI_DEBUG ? 'esbuild' : false,
		sourcemap: true,
	},
});
