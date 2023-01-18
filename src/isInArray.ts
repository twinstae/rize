// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isInArray<T>(v: any, arr: Readonly<Array<T>>): v is T {
	return arr.includes(v);
}

export default isInArray;
