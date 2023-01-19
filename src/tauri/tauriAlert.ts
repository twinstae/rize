import { dialog } from '@tauri-apps/api';
import { open } from '@tauri-apps/api/shell';

export async function rizeAlert(message: string) {
	const result = await dialog.confirm(message + '\nhttps://open.kakao.com/o/gPbArZ4c AS 오픈 카톡방으로 갈까요?', {
		title: 'RIZ*E',
		type: 'error',
	});
	if (result) {
		open('https://open.kakao.com/o/gPbArZ4c');
	}
}
