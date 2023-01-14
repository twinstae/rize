// @ts-check

/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  testMatch: 'src/**/*.spec.ts',
  timeout: 60 * 1000,
  use: {
    trace: 'on-first-retry',
    viewport: {
      width: 351,
      height: 768,
    }
  },
  webServer: {
    command: 'npm run dev:web:cov', // command to launch
    port: 5173, // port to await for
    timeout: 30 * 1000
  }
};

export default config;