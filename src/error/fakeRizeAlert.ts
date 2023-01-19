export const _alertLogs = [] as string[];
export async function rizeAlert(message: string) {
	_alertLogs.push(message);
}
