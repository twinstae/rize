export function parseAppPath(path: string): { pathname: string; search: string } {
	const [name, query] = path.split('?');
	return {
		pathname: `/${name}`,
		search: query ? `?${query}` : '',
	};
}

export function toAppPath(pathname: string): string {
	return pathname.slice(1) || 'InitPage';
}
