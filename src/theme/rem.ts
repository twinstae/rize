import invariant from '../invariant';

export function rem(n: number) {
	const documentElement = document.documentElement;
	invariant(documentElement);
	return n * (parseFloat(getComputedStyle(document.documentElement).fontSize) || 16);
}
