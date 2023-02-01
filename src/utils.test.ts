import { getItem } from './utils';

describe('utils', () => {

	it('getItem', () => {
		const data = ['a', 'b', 'c'];
		expect(getItem(false, data, 0)).toBe('a');
		expect(getItem(true, data, 0)).toBe('c');
		expect(getItem(false, data, 2)).toBe('c');
		expect(getItem(true, data, 2)).toBe('a');
	});
});