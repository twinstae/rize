import '@testing-library/jest-dom';
import { vi, expect, afterEach, afterAll } from 'vitest';
import { useFakeNavigation } from './router/useNavigation';
import libReport from 'istanbul-lib-report';
import reports from 'istanbul-reports';
import libCoverage from 'istanbul-lib-coverage';

// import { jestPreviewConfigure } from 'jest-preview';
// jestPreviewConfigure({ autoPreview: true });
document.documentElement.setAttribute('data-theme', 'izone');

expect.extend({
	toBeSelected: (received) => {
		if (!(received instanceof HTMLElement)){
			return {
				message: () => `expected ${received} is not a HTMLElement`,
				pass: false,
			};
		}
		if (received.getAttribute('aria-selected') !== 'true') {
			return {
				message: () => `expected ${received}[aria-selected="true"]\n ${received.outerHTML}`,
				pass: false,
			};
		}
		return {
			message: () => `expected ${received}[aria-selected="false"]\n ${received.outerHTML}`,
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
	if (args[0].includes('Error: Uncaught')) {
		return;
	}
	if (args[0].includes('The above error occurred in the')) {
		return;
	}

	if (args[0].includes('Warning: ReactDOM.render is no longer supported in React 18')) {
		return;
	}
	if (args[0].includes('should be wrapped into act')) {
		return;
	}

	oldError(args[0]);
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
			addListener: vi.fn(), // Deprecated
			removeListener: vi.fn(), // Deprecated
			addEventListener: vi.fn(),
			removeEventListener: vi.fn(),
			dispatchEvent: vi.fn(),
		})),
	});
}

afterAll(() => {
	if (!window.__coverage__) {
		return;
	}
	const context = libReport.createContext({
		dir: './.nyc_output',
		coverageMap: libCoverage.createCoverageMap(window.__coverage__),
	});

	reports
		.create('json', {
			file: `${(Math.random() * 100000000).toFixed(0).toString()}-coverage.json`,
		})
		.execute(context);
});
