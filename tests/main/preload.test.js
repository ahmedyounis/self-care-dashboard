const { contextBridge } = require('electron');

// Mock electron contextBridge
jest.mock('electron', () => ({
  contextBridge: {
    exposeInMainWorld: jest.fn(),
  },
}));

describe('Preload Script', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Clear the require cache to ensure fresh module loading
    delete require.cache[require.resolve('../../preload.js')];
  });

  test('should expose electronAPI to main world', () => {
    require('../../preload.js');

    expect(contextBridge.exposeInMainWorld).toHaveBeenCalledWith(
      'electronAPI',
      expect.objectContaining({
        platform: expect.any(String)
      })
    );
  });

  test('should expose platform information', () => {
    const originalPlatform = process.platform;
    
    // Test different platforms
    const platforms = ['win32', 'darwin', 'linux'];
    
    platforms.forEach(platform => {
      // Mock platform
      Object.defineProperty(process, 'platform', {
        value: platform,
        writable: true
      });

      // Re-require the module
      delete require.cache[require.resolve('../../preload.js')];
      require('../../preload.js');

      const exposedAPI = contextBridge.exposeInMainWorld.mock.calls[
        contextBridge.exposeInMainWorld.mock.calls.length - 1
      ][1];

      expect(exposedAPI.platform).toBe(platform);
    });

    // Restore original platform
    Object.defineProperty(process, 'platform', {
      value: originalPlatform,
      writable: true
    });
  });

  test('should not expose any dangerous APIs', () => {
    require('../../preload.js');

    const exposedAPI = contextBridge.exposeInMainWorld.mock.calls[0][1];
    
    // Ensure we're not exposing any dangerous Node.js APIs
    expect(exposedAPI).not.toHaveProperty('require');
    expect(exposedAPI).not.toHaveProperty('process');
    expect(exposedAPI).not.toHaveProperty('fs');
    expect(exposedAPI).not.toHaveProperty('child_process');
    expect(exposedAPI).not.toHaveProperty('path');
  });

  test('should only expose safe platform information', () => {
    require('../../preload.js');

    const exposedAPI = contextBridge.exposeInMainWorld.mock.calls[0][1];
    
    // Should only expose platform, no other process information
    const allowedKeys = ['platform'];
    const exposedKeys = Object.keys(exposedAPI);
    
    exposedKeys.forEach(key => {
      expect(allowedKeys).toContain(key);
    });
  });

  test('should call contextBridge.exposeInMainWorld exactly once', () => {
    require('../../preload.js');

    expect(contextBridge.exposeInMainWorld).toHaveBeenCalledTimes(1);
  });

  test('should use correct API name', () => {
    require('../../preload.js');

    expect(contextBridge.exposeInMainWorld).toHaveBeenCalledWith(
      'electronAPI',
      expect.any(Object)
    );
  });
});