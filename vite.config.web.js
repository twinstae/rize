import { mergeConfig } from 'vite';
import path from 'path';
import viteCommon from './vite-common';
import { rizeOutputPlugin } from './vite.rize-output';

// https://vitejs.dev/config/
export default mergeConfig(viteCommon, {
	plugins: [rizeOutputPlugin()],
	resolve: {
		alias: {
			'@App': path.resolve(__dirname, './src/web'),
			'@rize/alert': path.resolve(__dirname, './src/web/webAlert.ts'),
			'@rize/PlatformConfig': path.resolve(__dirname, './src/web/WebConfig.tsx'),
		},
	},
	build: {
		outDir: path.resolve(__dirname, './src/web/dist'),
	},
});
