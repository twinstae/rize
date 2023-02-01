import { mergeConfig } from 'vite';
import path from 'path';
import viteCommon from './vite-common';

// https://vitejs.dev/config/
export default mergeConfig(viteCommon, {
	resolve: {
		alias: {
			'@App': path.resolve(__dirname, './src/capacitor'),
			'@rize/alert': path.resolve(__dirname, './src/capacitor/capacitorAlert.ts'),
			'@rize/PlatformConfig': path.resolve(__dirname, './src/capacitor/CapacitorConfig.tsx'),
		},
	},
	build: {
		outDir: path.resolve(__dirname, './src/capacitor/dist'),
	},
	server: {
		port: 5174,
	}
});
