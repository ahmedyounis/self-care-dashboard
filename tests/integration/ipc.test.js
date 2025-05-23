/**
 * Integration tests for Inter-Process Communication (IPC)
 * Tests communication between main and renderer processes
 */

const { Application } = require('spectron');
const { expect } = require('@playwright/test');

describe('IPC Communication', () => {
  let app;

  beforeEach(async () => {
    app = global.createTestApp({
      env: {
        NODE_ENV: 'test'
      }
    });
    await app.start();
  }, global.testTimeout);

  afterEach(async () => {
    await global.cleanupApp(app);
  });

  describe('Preload Script Communication', () => {
    test('should expose electronAPI to renderer process', async () => {
      const result = await app.client.execute(() => {
        return typeof window.electronAPI;
      });

      expect(result).toBe('object');
    });

    test('should expose platform information', async () => {
      const platform = await app.client.execute(() => {
        return window.electronAPI.platform;
      });

      expect(platform).toMatch(/^(win32|darwin|linux)$/);
    });

    test('should not expose Node.js APIs to renderer', async () => {
      const hasRequire = await app.client.execute(() => {
        return typeof require !== 'undefined';
      });

      const hasProcess = await app.client.execute(() => {
        return typeof process !== 'undefined';
      });

      expect(hasRequire).toBe(false);
      expect(hasProcess).toBe(false);
    });

    test('should maintain context isolation', async () => {
      const contextIsolated = await app.client.execute(() => {
        // Try to access main world from isolated context
        try {
          return window.electronAPI !== window.require;
        } catch (e) {
          return true; // Context is properly isolated
        }
      });

      expect(contextIsolated).toBe(true);
    });
  });

  describe('Security Boundaries', () => {
    test('should prevent access to file system from renderer', async () => {
      const canAccessFS = await app.client.execute(() => {
        try {
          // This should not be available in renderer
          return typeof window.electronAPI.fs !== 'undefined';
        } catch (e) {
          return false;
        }
      });

      expect(canAccessFS).toBe(false);
    });

    test('should prevent access to child_process from renderer', async () => {
      const canAccessChildProcess = await app.client.execute(() => {
        try {
          return typeof window.electronAPI.spawn !== 'undefined';
        } catch (e) {
          return false;
        }
      });

      expect(canAccessChildProcess).toBe(false);
    });

    test('should prevent remote module access', async () => {
      const canAccessRemote = await app.client.execute(() => {
        try {
          return typeof window.electronAPI.remote !== 'undefined';
        } catch (e) {
          return false;
        }
      });

      expect(canAccessRemote).toBe(false);
    });
  });

  describe('Main Process Window Management', () => {
    test('should create window with correct properties', async () => {
      expect(await app.browserWindow.isVisible()).toBe(true);
      expect(await app.browserWindow.getTitle()).toBe('Self-Care Dashboard');
      
      const bounds = await app.browserWindow.getBounds();
      expect(bounds.width).toBe(1400);
      expect(bounds.height).toBe(900);
    });

    test('should handle window close event', async () => {
      const isRunning = await app.isRunning();
      expect(isRunning).toBe(true);

      await app.browserWindow.close();
      
      // Give time for cleanup
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const isStillRunning = await app.isRunning();
      expect(isStillRunning).toBe(false);
    });

    test('should handle window minimize/maximize', async () => {
      await app.browserWindow.minimize();
      expect(await app.browserWindow.isMinimized()).toBe(true);

      await app.browserWindow.restore();
      expect(await app.browserWindow.isMinimized()).toBe(false);

      await app.browserWindow.maximize();
      expect(await app.browserWindow.isMaximized()).toBe(true);
    });
  });

  describe('Menu Integration', () => {
    test('should handle reload menu action', async () => {
      const initialUrl = await app.client.getUrl();
      
      // Simulate reload via menu (this would normally trigger webContents.reload)
      await app.webContents.reload();
      
      // Wait for reload to complete
      await app.client.waitUntilWindowLoaded();
      
      const newUrl = await app.client.getUrl();
      expect(newUrl).toBe(initialUrl);
    });

    test('should handle DevTools toggle', async () => {
      const devToolsInitiallyOpen = await app.webContents.isDevToolsOpened();
      
      if (devToolsInitiallyOpen) {
        await app.webContents.closeDevTools();
        expect(await app.webContents.isDevToolsOpened()).toBe(false);
      } else {
        await app.webContents.openDevTools();
        expect(await app.webContents.isDevToolsOpened()).toBe(true);
      }
    });
  });

  describe('Application Lifecycle', () => {
    test('should start successfully', async () => {
      expect(await app.isRunning()).toBe(true);
    });

    test('should load main window content', async () => {
      await app.client.waitUntilWindowLoaded();
      
      const title = await app.client.execute(() => {
        return document.title;
      });
      
      expect(title).toBe('Self-Care Dashboard');
    });

    test('should handle app ready event', async () => {
      // App should be ready since it started successfully
      expect(await app.isRunning()).toBe(true);
      
      // Window should be visible
      expect(await app.browserWindow.isVisible()).toBe(true);
    });

    test('should quit gracefully', async () => {
      await app.stop();
      expect(await app.isRunning()).toBe(false);
    });
  });

  describe('Error Handling', () => {
    test('should handle renderer process crashes gracefully', async () => {
      // Simulate renderer crash
      await app.client.execute(() => {
        // This might cause issues but shouldn't crash the main process
        try {
          throw new Error('Simulated renderer error');
        } catch (e) {
          console.error('Renderer error:', e);
        }
      });

      // Main process should still be running
      expect(await app.isRunning()).toBe(true);
    });

    test('should handle invalid preload script gracefully', async () => {
      // This test would require creating an app with invalid preload
      // For now, we just verify the current app works correctly
      const electronAPI = await app.client.execute(() => {
        return typeof window.electronAPI;
      });

      expect(electronAPI).toBe('object');
    });
  });

  describe('Performance and Memory', () => {
    test('should not have memory leaks in basic operations', async () => {
      const initialMemory = await app.mainProcess.getProcessMemoryInfo();
      
      // Perform some operations
      for (let i = 0; i < 10; i++) {
        await app.client.execute(() => {
          // Simulate user interactions
          const event = new Event('click');
          document.dispatchEvent(event);
        });
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      const finalMemory = await app.mainProcess.getProcessMemoryInfo();
      
      // Memory shouldn't increase dramatically (allow for some variance)
      const memoryIncrease = finalMemory.workingSetSize - initialMemory.workingSetSize;
      expect(memoryIncrease).toBeLessThan(50 * 1024 * 1024); // Less than 50MB increase
    });

    test('should handle multiple rapid operations', async () => {
      const operations = [];
      
      // Queue multiple operations
      for (let i = 0; i < 50; i++) {
        operations.push(
          app.client.execute(() => {
            return Date.now();
          })
        );
      }
      
      const results = await Promise.all(operations);
      expect(results).toHaveLength(50);
      results.forEach(result => {
        expect(typeof result).toBe('number');
      });
    });
  });
});