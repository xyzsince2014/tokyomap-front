module.exports = {
  moduleFileExtensions: ['js', 'ts', 'tsx'],
  transform: {
    // ts-jest config now lives here (the `globals['ts-jest']` form is deprecated)
    '^.+\\.tsx?$': ['ts-jest', {tsconfig: 'tsconfig.json'}],
  },
  testMatch: ['<rootDir>/src/tests/**/*.spec.(ts|tsx)'],
  setupFilesAfterEnv: ['<rootDir>/src/tests/jest.setup.ts'],
  collectCoverage: true,
  coverageDirectory: '<rootDir>/src/tests/coverage',
  testEnvironment: 'jsdom', // cf. https://jestjs.io/docs/configuration#testenvironment-string,
};
