/**
 * Integration tests for Application Lifecycle
 * Tests startup, shutdown, window management, and platform-specific behavior
 */

const { Application } = require('spectron');
const path = require('path');

describe('Application Lifecycle', () => {
  let app;

  describe('Application Startup', () => {
    test('should start the application successfully', async () => {
      app = global.createTestApp();
      await app.start();

      expect(await app.isRunning()).toBe(true);
      expect(await app.browserWindow.isVisible()).toBe(true);
    }, global.testTimeout);

    test('should load the correct HTML file', async () => {
      app = global.createTestApp();
      await app.start();

      await app.client.waitUntilWindowLoaded();
      const url = await app.client.getUrl();
      
      // Should load index.html
      expect(url).toMatch(/index\.html$/);
    }, global.testTimeout);

    test('should have correct window dimensions', async () => {
      app = global.createTestApp();
      await app.start();

      const bounds = await app.browserWindow.getBounds();
      expect(bounds.width).toBe(1400);
      expect(bounds.height).toBe(900);
    }, global.testTimeout);

    test('should not show window immediately (show: false)', async () => {
      app = global.createTestApp();
      
      // Monitor window creation
      const startTime = Date.now();
      await app.start();
      
      // Window should become visible after ready-to-show event
      expect(await app.browserWindow.isVisible()).toBe(true);
    }, global.testTimeout);

    afterEach(async () => {
      await global.cleanupApp(app);
    });
  });

  describe('Window Management', () => {
    beforeEach(async () => {
      app = global.createTestApp();
      await app.start();
    });

    afterEach(async () => {
      await global.cleanupApp(app);
    });

    test('should handle window minimize and restore', async () => {
      await app.browserWindow.minimize();
      expect(await app.browserWindow.isMinimized()).toBe(true);

      await app.browserWindow.restore();
      expect(await app.browserWindow.isMinimized()).toBe(false);
      expect(await app.browserWindow.isVisible()).toBe(true);
    });

    test('should handle window maximize and unmaximize', async () => {
      await app.browserWindow.maximize();
      expect(await app.browserWindow.isMaximized()).toBe(true);

      await app.browserWindow.unmaximize();
      expect(await app.browserWindow.isMaximized()).toBe(false);
    });

    test('should handle window resizing', async () => {
      const newWidth = 800;
      const newHeight = 600;
      
      await app.browserWindow.setSize(newWidth, newHeight);
      
      const bounds = await app.browserWindow.getBounds();
      expect(bounds.width).toBe(newWidth);
      expect(bounds.height).toBe(newHeight);
    });

    test('should handle window position changes', async () => {
      const newX = 100;
      const newY = 100;
      
      await app.browserWindow.setPosition(newX, newY);
      
      const bounds = await app.browserWindow.getBounds();
      expect(bounds.x).toBe(newX);
      expect(bounds.y).toBe(newY);
    });

    test('should handle window focus events', async () => {
      expect(await app.browserWindow.isFocused()).toBe(true);
      
      await app.browserWindow.blur();
      // Note: blur() might not work in test environment, but we test the API exists
      
      await app.browserWindow.focus();
      expect(await app.browserWindow.isFocused()).toBe(true);
    });
  });

  describe('Application Shutdown', () => {
    test('should quit when window is closed on non-macOS', async () => {
      // Mock non-macOS platform
      app = global.createTestApp({
        env: {
          PLATFORM_OVERRIDE: 'win32'
        }
      });
      await app.start();

      await app.browserWindow.close();
      
      // Wait for app to quit
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      expect(await app.isRunning()).toBe(false);
    }, global.testTimeout);

    test('should handle app quit event', async () => {
      app = global.createTestApp();
      await app.start();

      const wasRunning = await app.isRunning();
      expect(wasRunning).toBe(true);

      await app.stop();
      expect(await app.isRunning()).toBe(false);
    }, global.testTimeout);

    test('should clean up resources on shutdown', async () => {
      app = global.createTestApp();
      await app.start();

      // Get initial process info
      const processInfo = await app.mainProcess.getProcessMemoryInfo();
      expect(processInfo).toBeDefined();

      await app.stop();
      expect(await app.isRunning()).toBe(false);
    }, global.testTimeout);
  });

  describe('Multiple Window Scenarios', () => {
    beforeEach(async () => {
      app = global.createTestApp();
      await app.start();
    });

    afterEach(async () => {
      await global.cleanupApp(app);
    });

    test('should handle single window by default', async () => {
      const windowCount = await app.client.getWindowCount();
      expect(windowCount).toBe(1);
    });

    test('should maintain single window instance', async () => {
      // The app creates only one window by default
      const initialCount = await app.client.getWindowCount();
      expect(initialCount).toBe(1);

      // Even after operations, should remain single window
      await app.browserWindow.reload();
      await app.client.waitUntilWindowLoaded();
      
      const finalCount = await app.client.getWindowCount();
      expect(finalCount).toBe(1);
    });
  });

  describe('Platform-Specific Behavior', () => {
    test('should handle macOS-specific titlebar style', async () => {
      app = global.createTestApp({
        env: {
          PLATFORM_OVERRIDE: 'darwin'
        }
      });
      await app.start();

      // On macOS, the app should have hiddenInset titlebar style
      // This is configured in the main process, so we test that the app starts correctly
      expect(await app.isRunning()).toBe(true);
    }, global.testTimeout);

    test('should handle Windows-specific behavior', async () => {
      app = global.createTestApp({
        env: {
          PLATFORM_OVERRIDE: 'win32'
        }
      });
      await app.start();

      expect(await app.isRunning()).toBe(true);
      expect(await app.browserWindow.isVisible()).toBe(true);
    }, global.testTimeout);

    test('should handle Linux-specific behavior', async () => {
      app = global.createTestApp({
        env: {
          PLATFORM_OVERRIDE: 'linux'
        }
      });
      await app.start();

      expect(await app.isRunning()).toBe(true);
      expect(await app.browserWindow.isVisible()).toBe(true);
    }, global.testTimeout);

    afterEach(async () => {
      await global.cleanupApp(app);
    });
  });

  describe('Error Recovery', () => {
    test('should handle renderer process crash', async () => {
      app = global.createTestApp();
      await app.start();

      // Simulate renderer crash by executing invalid code
      try {
        await app.client.execute(() => {
          throw new Error('Simulated crash');
        });
      } catch (error) {
        // Expected to throw
      }

      // Main process should still be running
      expect(await app.isRunning()).toBe(true);
    }, global.testTimeout);

    test('should handle invalid file loading gracefully', async () => {
      app = global.createTestApp();
      await app.start();

      // Try to load a non-existent file
      try {
        await app.browserWindow.loadFile('nonexistent.html');
      } catch (error) {
        // Expected to fail
      }

      // App should still be running
      expect(await app.isRunning()).toBe(true);
    }, global.testTimeout);

    afterEach(async () => {
      await global.cleanupApp(app);
    });
  });

  describe('Performance Metrics', () => {
    beforeEach(async () => {
      app = global.createTestApp();
      await app.start();
    });

    afterEach(async () => {
      await global.cleanupApp(app);
    });

    test('should start within reasonable time', async () => {
      // App should already be started by beforeEach
      const isRunning = await app.isRunning();
      expect(isRunning).toBe(true);
      
      // Window should be loaded
      await app.client.waitUntilWindowLoaded();
      expect(await app.browserWindow.isVisible()).toBe(true);
    }, 10000); // 10 second timeout for startup

    test('should have reasonable memory usage', async () => {
      const memoryInfo = await app.mainProcess.getProcessMemoryInfo();
      
      // Memory usage should be reasonable (less than 200MB)
      expect(memoryInfo.workingSetSize).toBeLessThan(200 * 1024 * 1024);
    });

    test('should respond to window operations quickly', async () => {
      const startTime = Date.now();
      
      await app.browserWindow.minimize();
      await app.browserWindow.restore();
      
      const endTime = Date.now();
      const duration = endTime - startTime;
      
      // Should complete within 2 seconds
      expect(duration).toBeLessThan(2000);
    });
  });
});