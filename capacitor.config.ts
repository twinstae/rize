import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
	appId: 'com.lec.rize',
	appName: 'rize',
	webDir: 'src/capacitor/dist',
	bundledWebRuntime: false,
	plugins: {
		CapacitorHttp: {
			enabled: true
		}
	},
	server: {
		url: 'http://localhost:5174/',
		cleartext: true
	}
};

export default config;
