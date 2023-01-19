import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
	appId: 'com.lec.rize',
	appName: 'rize',
	webDir: 'src/capacitor/dist',
	bundledWebRuntime: false,
	server: {
		url: 'http://127.0.0.1:5174/',
		cleartext: true
	}
};

export default config;
