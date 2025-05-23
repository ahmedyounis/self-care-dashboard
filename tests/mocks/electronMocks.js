/**
 * Mock implementations for Electron APIs
 * Used in unit and integration tests
 */

// Mock BrowserWindow
export const mockBrowserWindow = {
  webContents: {
    reload: jest.fn(),
    toggleDevTools: jest.fn(),
    openDevTools: jest.fn(),
    closeDevTools: jest.fn(),
    isDevToolsOpened: jest.fn().mockReturnValue(false),
    send: jest.fn(),
    on: jest.fn(),
    once: jest.fn(),
    removeListener: jest.fn()
  },
  
  loadFile: jest.fn().mockResolvedValue(),
  loadURL: jest.fn().mockResolvedValue(),
  
  show: jest.fn(),
  hide: jest.fn(),
  close: jest.fn(),
  
  minimize: jest.fn(),
  maximize: jest.fn(),
  unmaximize: jest.fn(),
  restore: jest.fn(),
  
  setSize: jest.fn(),
  getSize: jest.fn().mockReturnValue([1400, 900]),
  setPosition: jest.fn(),
  getPosition: jest.fn().mockReturnValue([100, 100]),
  getBounds: jest.fn().mockReturnValue({ x: 100, y: 100, width: 1400, height: 900 }),
  setBounds: jest.fn(),
  
  focus: jest.fn(),
  blur: jest.fn(),
  isFocused: jest.fn().mockReturnValue(true),
  
  isVisible: jest.fn().mockReturnValue(true),
  isMinimized: jest.fn().mockReturnValue(false),
  isMaximized: jest.fn().mockReturnValue(false),
  
  on: jest.fn(),
  once: jest.fn(),
  removeListener: jest.fn(),
  
  destroy: jest.fn(),
  
  // Static methods
  getAllWindows: jest.fn().mockReturnValue([]),
  getFocusedWindow: jest.fn().mockReturnValue(null)
};

// Mock app
export const mockApp = {
  whenReady: jest.fn().mockResolvedValue(),
  
  quit: jest.fn(),
  exit: jest.fn(),
  
  getName: jest.fn().mockReturnValue('Self-Care Dashboard'),
  getVersion: jest.fn().mockReturnValue('1.0.0'),
  getPath: jest.fn().mockImplementation((name) => {
    const paths = {
      home: '/home/user',
      appData: '/home/user/.config',
      userData: '/home/user/.config/Self-Care Dashboard',
      downloads: '/home/user/Downloads',
      documents: '/home/user/Documents'
    };
    return paths[name] || '/tmp';
  }),
  
  isReady: jest.fn().mockReturnValue(true),
  
  on: jest.fn(),
  once: jest.fn(),
  removeListener: jest.fn(),
  
  // Event handler helpers for testing
  getEventHandler: (eventName) => {
    const calls = mockApp.on.mock.calls;
    const eventCall = calls.find(call => call[0] === eventName);
    return eventCall ? eventCall[1] : null;
  }
};

// Mock Menu
export const mockMenu = {
  buildFromTemplate: jest.fn().mockReturnValue({}),
  setApplicationMenu: jest.fn(),
  getApplicationMenu: jest.fn().mockReturnValue(null),
  
  // Menu item helpers for testing
  getMenuItem: (template, label) => {
    const findMenuItem = (items, targetLabel) => {
      for (const item of items) {
        if (item.label === targetLabel) return item;
        if (item.submenu) {
          const found = findMenuItem(item.submenu, targetLabel);
          if (found) return found;
        }
      }
      return null;
    };
    return findMenuItem(template, label);
  }
};

// Mock ipcMain
export const mockIpcMain = {
  handle: jest.fn(),
  on: jest.fn(),
  once: jest.fn(),
  removeListener: jest.fn(),
  removeAllListeners: jest.fn(),
  
  // Helper to simulate IPC message
  simulateMessage: (channel, ...args) => {
    const calls = mockIpcMain.on.mock.calls;
    const handler = calls.find(call => call[0] === channel);
    if (handler) {
      handler[1]({}, ...args);
    }
  }
};

// Mock ipcRenderer
export const mockIpcRenderer = {
  invoke: jest.fn().mockResolvedValue({}),
  send: jest.fn(),
  on: jest.fn(),
  once: jest.fn(),
  removeListener: jest.fn(),
  removeAllListeners: jest.fn(),
  
  // Helper to simulate receiving message
  simulateMessage: (channel, ...args) => {
    const calls = mockIpcRenderer.on.mock.calls;
    const handler = calls.find(call => call[0] === channel);
    if (handler) {
      handler[1]({}, ...args);
    }
  }
};

// Mock contextBridge
export const mockContextBridge = {
  exposeInMainWorld: jest.fn(),
  
  // Helper to get exposed APIs
  getExposedAPI: (apiName) => {
    const calls = mockContextBridge.exposeInMainWorld.mock.calls;
    const apiCall = calls.find(call => call[0] === apiName);
    return apiCall ? apiCall[1] : null;
  }
};

// Mock dialog
export const mockDialog = {
  showOpenDialog: jest.fn().mockResolvedValue({ canceled: false, filePaths: ['/path/to/file'] }),
  showSaveDialog: jest.fn().mockResolvedValue({ canceled: false, filePath: '/path/to/save' }),
  showMessageBox: jest.fn().mockResolvedValue({ response: 0 }),
  showErrorBox: jest.fn()
};

// Mock shell
export const mockShell = {
  openExternal: jest.fn().mockResolvedValue(),
  openPath: jest.fn().mockResolvedValue(''),
  showItemInFolder: jest.fn(),
  moveItemToTrash: jest.fn().mockResolvedValue(true)
};

// Mock nativeTheme
export const mockNativeTheme = {
  shouldUseDarkColors: false,
  themeSource: 'system',
  on: jest.fn(),
  once: jest.fn(),
  removeListener: jest.fn()
};

// Mock screen
export const mockScreen = {
  getPrimaryDisplay: jest.fn().mockReturnValue({
    bounds: { x: 0, y: 0, width: 1920, height: 1080 },
    workAreaSize: { width: 1920, height: 1040 },
    scaleFactor: 1
  }),
  getAllDisplays: jest.fn().mockReturnValue([]),
  getDisplayNearestPoint: jest.fn(),
  getDisplayMatching: jest.fn(),
  getCursorScreenPoint: jest.fn().mockReturnValue({ x: 0, y: 0 }),
  on: jest.fn(),
  removeListener: jest.fn()
};

// Mock powerMonitor
export const mockPowerMonitor = {
  on: jest.fn(),
  removeListener: jest.fn(),
  getSystemIdleState: jest.fn().mockReturnValue('active'),
  getSystemIdleTime: jest.fn().mockReturnValue(0)
};

// Complete Electron mock
export const mockElectron = {
  app: mockApp,
  BrowserWindow: jest.fn().mockImplementation(() => mockBrowserWindow),
  Menu: mockMenu,
  ipcMain: mockIpcMain,
  ipcRenderer: mockIpcRenderer,
  contextBridge: mockContextBridge,
  dialog: mockDialog,
  shell: mockShell,
  nativeTheme: mockNativeTheme,
  screen: mockScreen,
  powerMonitor: mockPowerMonitor
};

// Helper function to reset all mocks
export const resetElectronMocks = () => {
  Object.values(mockElectron).forEach(mockModule => {
    if (mockModule && typeof mockModule === 'object') {
      Object.values(mockModule).forEach(mockMethod => {
        if (jest.isMockFunction(mockMethod)) {
          mockMethod.mockReset();
        }
      });
    }
  });
  
  // Reset BrowserWindow constructor
  if (jest.isMockFunction(mockElectron.BrowserWindow)) {
    mockElectron.BrowserWindow.mockReset();
  }
};

// Helper to create BrowserWindow with default mocks
export const createMockBrowserWindow = (options = {}) => {
  return {
    ...mockBrowserWindow,
    ...options
  };
};

// Helper to simulate app lifecycle events
export const simulateAppEvents = {
  ready: () => {
    const handler = mockApp.getEventHandler('ready');
    if (handler) handler();
  },
  
  windowAllClosed: () => {
    const handler = mockApp.getEventHandler('window-all-closed');
    if (handler) handler();
  },
  
  activate: () => {
    const handler = mockApp.getEventHandler('activate');
    if (handler) handler();
  },
  
  beforeQuit: (event = {}) => {
    const handler = mockApp.getEventHandler('before-quit');
    if (handler) handler(event);
  }
};

// Helper to simulate window events
export const simulateWindowEvents = {
  closed: () => {
    const calls = mockBrowserWindow.on.mock.calls;
    const handler = calls.find(call => call[0] === 'closed');
    if (handler) handler[1]();
  },
  
  readyToShow: () => {
    const calls = mockBrowserWindow.once.mock.calls;
    const handler = calls.find(call => call[0] === 'ready-to-show');
    if (handler) handler[1]();
  },
  
  focus: () => {
    const calls = mockBrowserWindow.on.mock.calls;
    const handler = calls.find(call => call[0] === 'focus');
    if (handler) handler[1]();
  },
  
  blur: () => {
    const calls = mockBrowserWindow.on.mock.calls;
    const handler = calls.find(call => call[0] === 'blur');
    if (handler) handler[1]();
  }
};