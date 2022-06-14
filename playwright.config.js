export default {
  testMatch: 'src/**/*.spec.js',
  timeout: 3 * 60 * 1000,
  use: {
    trace: 'on-first-retry'
  }
};
