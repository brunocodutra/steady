module.exports = {
  moduleFileExtensions: ['js', 'ts', 'tsx'],
  moduleDirectories: ['node_modules', 'src', 'spec'],
  setupTestFrameworkScriptFile: './spec/jest/setup.js',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testURL: 'http://localhost',
  testMatch: ['**/spec/**/*.spec.(ts|tsx)'],
  collectCoverage: true,
  collectCoverageFrom: ['**/src/**/*.{ts,tsx}'],
  coverageReporters: ['text'],
  mapCoverage: true,
  globals: {
    'ts-jest': {
      tsConfigFile: './spec/tsconfig.json',
    },
  },
}
