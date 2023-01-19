export async function rizeAlert(message: string) {
	const result = confirm(message + '\nhttps://open.kakao.com/o/gPbArZ4c AS 오픈 카톡방으로 갈까요?');
	if (result) {
		window.open('https://open.kakao.com/o/gPbArZ4c', '_blank');
	}
}
