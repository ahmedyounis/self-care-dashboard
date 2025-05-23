// Main process test setup
const { app } = require('electron');

// Mock Electron app for testing
jest.mock('electron', () => ({
  app: {
    whenReady: jest.fn().mockResolvedValue(),
    on: jest.fn(),
    quit: jest.fn(),
    getName: jest.fn().mockReturnValue('test-app'),
    getVersion: jest.fn().mockReturnValue('1.0.0'),
  },
  BrowserWindow: jest.fn().mockImplementation(() => ({
    loadFile: jest.fn().mockResolvedValue(),
    once: jest.fn(),
    on: jest.fn(),
    show: jest.fn(),
    close: jest.fn(),
    webContents: {
      reload: jest.fn(),
      toggleDevTools: jest.fn(),
    },
  })),
  Menu: {
    buildFromTemplate: jest.fn(),
    setApplicationMenu: jest.fn(),
  },
}));

// Global test setup
beforeAll(() => {
  // Set test environment
  process.env.NODE_ENV = 'test';
});

afterAll(() => {
  // Cleanup
  jest.clearAllMocks();
});