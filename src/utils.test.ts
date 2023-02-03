import { choice, getItem } from './utils';

describe('utils', () => {

	it('getItem', () => {
		const data = ['a', 'b', 'c'];
		expect(getItem(false, data, 0)).toBe('a');
		expect(getItem(true, data, 0)).toBe('c');
		expect(getItem(false, data, 2)).toBe('c');
		expect(getItem(true, data, 2)).toBe('a');
	});

	it('choice', () => {
		const data = [1,2,3,4];
		const result = Array.from({ length: 1000000 }, () => choice(data));
		expect(result).not.toContain(undefined);
		expect(result.filter(n => n === 4).length).toBeGreaterThan(249000);
		expect(result.filter(n => n === 4).length).toBeLessThan(251000);
	});
});