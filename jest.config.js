module.exports = {
  preset: 'ts-jest',
  moduleDirectories: ['node_modules', 'src', 'spec'],
  setupFilesAfterEnv: ['./jest/setup.js'],
  transform: {
    '^.+\\.svg$': './jest/transform.svg.js',
  },
  testURL: 'http://localhost',
  testMatch: ['**/spec/**/*.spec.(ts|tsx)'],
  testEnvironment: "jsdom",
  collectCoverage: true,
  coverageProvider: "v8",
  collectCoverageFrom: ['**/src/**/*.{ts,tsx}'],
  coverageReporters: ['lcov', 'text'],
}
