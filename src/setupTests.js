// vi-dom adds custom vi matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/vi-dom
import '@testing-library/jest-dom';

import { vi } from 'vitest';

const oldError = console.error;

console.error = (...args) => {
  if(args[0].includes('Warning: ReactDOM.render is no longer supported in React 18')){
    return;
  }
  if(args[0].includes('should be wrapped into act')){
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