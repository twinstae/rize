import { Browser } from '@capacitor/browser';

export async function openBrowser(url: string) {
	await Browser.open({ url });
}
