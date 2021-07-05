const baseConfig = require('../jest.config');

module.exports = {
  ...baseConfig,
  rootDir: '.',
  testRegex: '.e2e-spec.ts$',
};
