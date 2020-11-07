module.exports = {
  preset: 'ts-jest',
  moduleDirectories: ['node_modules', 'src', 'spec'],
  setupFilesAfterEnv: ['./jest/setup.js'],
  transform: {
    '^.+\\.svg$': './jest/transform.svg.js',
  },
  testURL: 'http://localhost',
  testMatch: ['**/spec/**/*.spec.(ts|tsx)'],
  collectCoverage: true,
  collectCoverageFrom: ['**/src/**/*.{ts,tsx}'],
  coverageReporters: ['lcov', 'text'],
}
