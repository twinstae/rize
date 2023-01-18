import invariant from './invariant';

function withDefault<T>(fallback: T) {
	return () => fallback;
}
invariant(withDefault('test')() === 'test');
export default withDefault;
