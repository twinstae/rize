import react from '@vitejs/plugin-react';
import Unocss from 'unocss/vite';
import { presetUno, transformerDirectives } from 'unocss';
import presetDaisy from './presetDaisy.js';
import { defineConfig } from 'vite';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(async () => {
	const { internalIpV4 } = await import('internal-ip');
	const host = await internalIpV4();

	return {
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
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				presets: [presetUno(), presetDaisy() as any],
			}),
		],
		publicDir: path.resolve(__dirname, './src/public'),
		// prevent vite from obscuring rust errors
		// Tauri expects a fixed port, fail if that port is not available
		// to make use of `TAURI_PLATFORM`, `TAURI_ARCH`, `TAURI_FAMILY`,
		// `TAURI_PLATFORM_VERSION`, `TAURI_PLATFORM_TYPE` and `TAURI_DEBUG`
		// env variables

		resolve: {
			alias: {
				'@App': path.resolve(__dirname, './src/tauri'),
				'@rize/alert': path.resolve(__dirname, './src/tauri/tauriAlert.ts'),
				'@rize/PlatformConfig': path.resolve(__dirname, './src/tauri/TauriConfig.tsx'),
			},
		},
		clearScreen: false,
		server: {
			host: '0.0.0.0', // listen on all addresses
			port: 5173,
			strictPort: true,
			hmr: {
				protocol: 'ws',
				host,
				port: 5183,
			},
		},
		envPrefix: ['VITE_', 'TAURI_'],
		build: {
			target: ['es2021', 'chrome100', 'safari13'],
			// don't minify for debug builds
			minify: !process.env.TAURI_DEBUG ? 'esbuild' : false,
			// produce sourcemaps for debug builds
			sourcemap: true,
			outDir: path.resolve(__dirname, './src/tauri/dist'),
		},
	};
});
