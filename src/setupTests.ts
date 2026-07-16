import '@testing-library/jest-dom/vitest';
import { vi, expect, afterEach } from 'vitest';
import { useFakeNavigation } from './router/useFakeNavigation';

document.documentElement.setAttribute('data-theme', 'izone');

expect.extend({
	toBeSelected: (received) => {
		if (!(received instanceof HTMLElement)) {
			return {
				message: () => `expected ${received} is not a HTMLElement`,
				pass: false,
			};
		}
		if (received.getAttribute('aria-selected') !== 'true') {
			return {
				message: () => `expected ${received.tagName.toLowerCase()}[aria-selected="true"]\n\n ${received.outerHTML}`,
				pass: false,
			};
		}
		return {
			message: () => `expected ${received.tagName.toLowerCase()}[aria-selected="false"]\n\n ${received.outerHTML}`,
			pass: true,
		};
	},
});

afterEach(() => {
	const fakeNavigation = useFakeNavigation();
	fakeNavigation.clear();
});

const oldError = console.error;

console.error = (...args) => {
	if (typeof args[0] === 'string') {
		if (args[0].includes('Error: Uncaught')) return;
		if (args[0].includes('The above error occurred in the')) return;
		if (args[0].includes('Warning: ReactDOM.render is no longer supported')) return;
		if (args[0].includes('should be wrapped into act')) return;
	}
	oldError(...args);
};

if (typeof window.matchMedia !== 'function') {
	Object.defineProperty(window, 'matchMedia', {
		enumerable: true,
		configurable: true,
		writable: true,
		value: vi.fn().mockImplementation((query) => ({
			matches: false,
			media: query,
			onchange: null,
			addListener: vi.fn(),
			removeListener: vi.fn(),
			addEventListener: vi.fn(),
			removeEventListener: vi.fn(),
			dispatchEvent: vi.fn(),
		})),
	});
}
