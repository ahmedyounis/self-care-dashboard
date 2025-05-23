const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

// Import the main process module
// Note: We need to mock electron before requiring main.js
jest.mock('electron');

describe('Main Process', () => {
  let mainWindow;

  beforeEach(() => {
    jest.clearAllMocks();
    // Reset the mocked BrowserWindow constructor
    BrowserWindow.mockClear();
  });

  describe('Application Lifecycle', () => {
    test('should call createWindow when app is ready', async () => {
      // Require main.js after mocking electron
      require('../../main.js');
      
      // Verify app.whenReady was called
      expect(app.whenReady).toHaveBeenCalled();
    });

    test('should quit app when all windows are closed on non-macOS', () => {
      // Mock process.platform
      const originalPlatform = process.platform;
      Object.defineProperty(process, 'platform', {
        value: 'win32'
      });

      require('../../main.js');

      // Find the 'window-all-closed' event handler
      const windowAllClosedHandler = app.on.mock.calls.find(
        call => call[0] === 'window-all-closed'
      )[1];

      // Execute the handler
      windowAllClosedHandler();

      expect(app.quit).toHaveBeenCalled();

      // Restore platform
      Object.defineProperty(process, 'platform', {
        value: originalPlatform
      });
    });

    test('should not quit app when all windows are closed on macOS', () => {
      const originalPlatform = process.platform;
      Object.defineProperty(process, 'platform', {
        value: 'darwin'
      });

      require('../../main.js');

      const windowAllClosedHandler = app.on.mock.calls.find(
        call => call[0] === 'window-all-closed'
      )[1];

      windowAllClosedHandler();

      expect(app.quit).not.toHaveBeenCalled();

      Object.defineProperty(process, 'platform', {
        value: originalPlatform
      });
    });

    test('should create window when activated on macOS with no windows', () => {
      require('../../main.js');

      // Mock no windows open
      BrowserWindow.getAllWindows = jest.fn().mockReturnValue([]);

      const activateHandler = app.on.mock.calls.find(
        call => call[0] === 'activate'
      )[1];

      activateHandler();

      expect(BrowserWindow).toHaveBeenCalledTimes(2); // Once for initial, once for activate
    });
  });

  describe('Window Creation', () => {
    test('should create BrowserWindow with correct configuration', () => {
      require('../../main.js');

      expect(BrowserWindow).toHaveBeenCalledWith({
        width: 1400,
        height: 900,
        webPreferences: {
          nodeIntegration: false,
          contextIsolation: true,
          preload: path.join(__dirname, '../../preload.js')
        },
        icon: path.join(__dirname, '../../icon.png'),
        titleBarStyle: 'hiddenInset',
        show: false
      });
    });

    test('should load index.html file', () => {
      require('../../main.js');

      const mockWindow = BrowserWindow.mock.results[0].value;
      expect(mockWindow.loadFile).toHaveBeenCalledWith('index.html');
    });

    test('should show window when ready', () => {
      require('../../main.js');

      const mockWindow = BrowserWindow.mock.results[0].value;
      
      // Find the 'ready-to-show' event handler
      const readyToShowHandler = mockWindow.once.mock.calls.find(
        call => call[0] === 'ready-to-show'
      )[1];

      readyToShowHandler();

      expect(mockWindow.show).toHaveBeenCalled();
    });

    test('should handle window closed event', () => {
      require('../../main.js');

      const mockWindow = BrowserWindow.mock.results[0].value;
      
      // Find the 'closed' event handler
      const closedHandler = mockWindow.on.mock.calls.find(
        call => call[0] === 'closed'
      )[1];

      // Execute the handler (simulates window closing)
      closedHandler();

      // mainWindow should be set to null (we can't directly test this without module exports)
      // But we can verify the handler was registered
      expect(mockWindow.on).toHaveBeenCalledWith('closed', expect.any(Function));
    });
  });

  describe('Menu Creation', () => {
    test('should create and set application menu', () => {
      require('../../main.js');

      expect(Menu.buildFromTemplate).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            label: 'Self-Care Dashboard',
            submenu: expect.any(Array)
          }),
          expect.objectContaining({
            label: 'Edit',
            submenu: expect.any(Array)
          }),
          expect.objectContaining({
            label: 'View',
            submenu: expect.any(Array)
          })
        ])
      );

      expect(Menu.setApplicationMenu).toHaveBeenCalled();
    });

    test('should include quit menu item that calls app.quit', () => {
      require('../../main.js');

      const menuTemplate = Menu.buildFromTemplate.mock.calls[0][0];
      const appMenu = menuTemplate.find(menu => menu.label === 'Self-Care Dashboard');
      const quitMenuItem = appMenu.submenu.find(item => item.label === 'Quit');

      expect(quitMenuItem).toBeDefined();
      expect(quitMenuItem.accelerator).toBe('Cmd+Q');

      // Test quit functionality
      quitMenuItem.click();
      expect(app.quit).toHaveBeenCalled();
    });

    test('should include reload menu item that reloads window', () => {
      require('../../main.js');

      const mockWindow = BrowserWindow.mock.results[0].value;
      const menuTemplate = Menu.buildFromTemplate.mock.calls[0][0];
      const viewMenu = menuTemplate.find(menu => menu.label === 'View');
      const reloadMenuItem = viewMenu.submenu.find(item => item.label === 'Reload');

      expect(reloadMenuItem).toBeDefined();
      expect(reloadMenuItem.accelerator).toBe('Cmd+R');

      // Test reload functionality
      reloadMenuItem.click();
      expect(mockWindow.webContents.reload).toHaveBeenCalled();
    });

    test('should include toggle DevTools menu item', () => {
      require('../../main.js');

      const mockWindow = BrowserWindow.mock.results[0].value;
      const menuTemplate = Menu.buildFromTemplate.mock.calls[0][0];
      const viewMenu = menuTemplate.find(menu => menu.label === 'View');
      const devToolsMenuItem = viewMenu.submenu.find(item => item.label === 'Toggle DevTools');

      expect(devToolsMenuItem).toBeDefined();
      expect(devToolsMenuItem.accelerator).toBe('Cmd+Option+I');

      // Test DevTools toggle functionality
      devToolsMenuItem.click();
      expect(mockWindow.webContents.toggleDevTools).toHaveBeenCalled();
    });
  });

  describe('Security Configuration', () => {
    test('should disable node integration in renderer', () => {
      require('../../main.js');

      const windowConfig = BrowserWindow.mock.calls[0][0];
      expect(windowConfig.webPreferences.nodeIntegration).toBe(false);
    });

    test('should enable context isolation', () => {
      require('../../main.js');

      const windowConfig = BrowserWindow.mock.calls[0][0];
      expect(windowConfig.webPreferences.contextIsolation).toBe(true);
    });

    test('should specify preload script', () => {
      require('../../main.js');

      const windowConfig = BrowserWindow.mock.calls[0][0];
      expect(windowConfig.webPreferences.preload).toBe(
        path.join(__dirname, '../../preload.js')
      );
    });
  });
});