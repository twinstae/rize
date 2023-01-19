import { Dialog } from '@capacitor/dialog';
import { Browser } from '@capacitor/browser';

export async function rizeAlert(message: string) {
	const result = await Dialog.confirm({
		title: 'RIZ*E',
		message: message + '\nhttps://open.kakao.com/o/gPbArZ4c AS 오픈 카톡방으로 갈까요?'
	});
	if (result) {
		Browser.open({ url: 'https://open.kakao.com/o/gPbArZ4c' });
	}
}
