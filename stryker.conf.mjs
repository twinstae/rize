// @ts-check
/** @type {import('@stryker-mutator/api/core').PartialStrykerOptions} */
const config = {
  concurrency: 7,
  _comment:
    'This config was generated using \'stryker init\'. Please take a look at: https://stryker-mutator.io/docs/stryker-js/configuration/ for more information',
  packageManager: 'yarn',
  reporters: ['html', 'clear-text', 'progress'],
  testRunner: 'command',
  coverageAnalysis: 'off',
  buildCommand: 'npm run test',
  timeoutMS: 20000,
  ignorePatterns: [
    'node_modules',
    '.git',
    '/reports',
    '*.tsbuildinfo',
    '/stryker.log',
    '.stryker-tmp',
    '__snapshots__',
    'android',
    'src-tauri',
    'screenshots',
    'playwright',
    'ios',
    'src/capacitor',
    'src/tauri',
    'src/pages',
  ],
  mutate: [
    'src/**/*.ts',
    'src/**/*.tsx',
    '!src/**/components/AppBar.tsx',
    '!src/**/*.test.ts',
    '!src/**/*.test.tsx',
    '!src/**/*.spec.tsx',
    '!src/icons.ts',
    '!src/config/localStorageRepo.ts',
    '!src/pages/MailListPage.tsx',
    '!src/components/MailList.tsx',
    '!src/components/RizeLogo.tsx',
    '!src/test/Test.tsx',
  ]
};
export default config;
