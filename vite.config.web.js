import { mergeConfig } from 'vite';
import path from 'path';
import viteCommon from './vite-common';

// https://vitejs.dev/config/
export default mergeConfig(viteCommon, {
	resolve: {
		alias: {
			'@App': path.resolve(__dirname, './src/web'),
			'@rize/alert': path.resolve(__dirname, './src/web/webAlert.ts'),
		},
	},
	build: {
		outDir: path.resolve(__dirname, './src/web/dist'),
	},
});
