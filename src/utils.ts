const getItem = <T>(isReverse: boolean, result: T[], index: number) => {
	if (isReverse){
		return result[result.length - index - 1];
	}

	return result[index];
};

const choice = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

export { getItem, choice };