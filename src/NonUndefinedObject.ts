import invariant from './invariant';

function NonNullableValueObject<V>(obj: Record<string, V>): Record<string, NonNullable<V>> {
	const result = { ...obj };
	for (const key in result) {
		if (obj[key] === undefined || obj[key] === null) {
			delete result[key];
		}
	}
	return result as Record<string, NonNullable<V>>;
}
invariant(Object.keys(NonNullableValueObject({ test: undefined })).length === 0);
export default NonNullableValueObject;
