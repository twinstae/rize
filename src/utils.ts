const getItem = <T>(isReverse: boolean, result: T[], index: number) => {
	if (isReverse){
		return result[result.length - index - 1];
	}

	return result[index];
};

export { getItem };