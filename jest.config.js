module.exports = {
  projects: [
    {
      // Main process tests
      displayName: 'main',
      testMatch: ['<rootDir>/tests/main/**/*.test.js'],
      testEnvironment: 'node',
      setupFilesAfterEnv: ['<rootDir>/tests/main/setup.js'],
      collectCoverageFrom: [
        'main.js',
        'preload.js'
      ],
      coverageDirectory: 'coverage/main',
      moduleFileExtensions: ['js', 'json'],
      transform: {}
    },
    {
      // Renderer process tests
      displayName: 'renderer',
      testMatch: ['<rootDir>/tests/renderer/**/*.test.js', '<rootDir>/tests/renderer/**/*.test.jsx'],
      testEnvironment: 'jsdom',
      setupFilesAfterEnv: ['<rootDir>/tests/renderer/setup.js'],
      collectCoverageFrom: [
        'renderer.js',
        'src/**/*.{js,jsx}'
      ],
      coverageDirectory: 'coverage/renderer',
      moduleFileExtensions: ['js', 'jsx', 'json'],
      transform: {
        '^.+\\.(js|jsx)$': 'babel-jest'
      },
      moduleNameMapping: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
      }
    },
    {
      // Integration tests
      displayName: 'integration',
      testMatch: ['<rootDir>/tests/integration/**/*.test.js'],
      testEnvironment: 'node',
      setupFilesAfterEnv: ['<rootDir>/tests/integration/setup.js'],
      collectCoverageFrom: [
        'main.js',
        'renderer.js',
        'preload.js'
      ],
      coverageDirectory: 'coverage/integration',
      testTimeout: 30000
    }
  ],
  collectCoverage: true,
  coverageReporters: ['text', 'lcov', 'html'],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70
    }
  }
};