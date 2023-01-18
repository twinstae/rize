function filterTruthy<T>(arr: T[]): NonNullable<T>[] {
	return arr.filter((v) => !!v && v !== '') as NonNullable<T>[];
}

export default filterTruthy;
