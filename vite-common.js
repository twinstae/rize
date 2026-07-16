import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

const env = process.env;
export default defineConfig({
	root: './',
	plugins: [react(), tailwindcss()],
	publicDir: './src/public',
	clearScreen: false,
	server: {
		strictPort: true,
	},
	envPrefix: ['VITE_', 'TAURI_'],
	build: {
		target:
			env.TAURI_PLATFORM === 'windows'
				? 'chrome105'
				: env.TAURI_PLATFORM === 'darwin' || env.TAURI_PLATFORM === 'ios'
					? 'safari13'
					: 'es2022',
		minify: !env.TAURI_DEBUG ? 'esbuild' : false,
		sourcemap: true,
	},
});
