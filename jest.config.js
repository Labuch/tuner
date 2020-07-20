module.exports = {
  collectCoverageFrom: [
    'src/**/*.js'
  ],
  testEnvironment: 'node',
  testMatch: [
    '<rootDir>/src/**/?(*.)test.js'
  ],
  setupFiles: [
    '<rootDir>/config/setupJest.js',
    '<rootDir>/config/setupEnzyme.js'
  ],
  moduleNameMapper: {
    'Components(.*)$': '<rootDir>/src/components/$1',
    'libs(.*)$': '<rootDir>/src/libs/$1'
  },
  transform: {
    '^.+\\.(js|jsx|mjs)$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.css$': '<rootDir>/config/cssTransform.js',
    '^(?!.*\\.(js|jsx|mjs|css|json)$)': '<rootDir>/config/fileTransform.js'
  }
}
