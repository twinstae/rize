import { open } from '@tauri-apps/plugin-shell';

export function openBrowser(url: string) {
	open(url);
}
