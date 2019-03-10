module.exports = {
  moduleFileExtensions: ['js', 'ts', 'tsx'],
  moduleDirectories: ['node_modules', 'src', 'spec'],
  setupFilesAfterEnv: ['./jest/setup.js'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.svg$': './jest/transform.svg.js',
  },
  testURL: 'http://localhost',
  testMatch: ['**/spec/**/*.spec.(ts|tsx)'],
  collectCoverage: true,
  collectCoverageFrom: ['**/src/**/*.{ts,tsx}'],
  coverageReporters: ['lcov', 'text'],
  globals: {
    'ts-jest': {
      tsConfig: './spec/tsconfig.json',
    },
  },
}
