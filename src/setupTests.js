// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';

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
