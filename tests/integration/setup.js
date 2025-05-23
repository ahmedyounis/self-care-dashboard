// Integration test setup
const { Application } = require('spectron');
const path = require('path');

// Global test configuration
global.testTimeout = 30000;

// Helper to create test app instance
global.createTestApp = (options = {}) => {
  return new Application({
    path: require('electron'),
    args: [path.join(__dirname, '../../main.js')],
    env: {
      NODE_ENV: 'test',
      ...options.env
    },
    ...options
  });
};

// Cleanup helper
global.cleanupApp = async (app) => {
  if (app && app.isRunning()) {
    await app.stop();
  }
};

// Global teardown
afterAll(async () => {
  // Ensure all test apps are stopped
  jest.clearAllMocks();
});