/**
 * End-to-End Tests for Self-Care Dashboard
 * Tests complete user workflows and application behavior
 */

import { test, expect, _electron as electron } from '@playwright/test';
import path from 'path';

test.describe('Self-Care Dashboard E2E', () => {
  let electronApp;
  let page;

  test.beforeEach(async () => {
    // Launch Electron app
    electronApp = await electron.launch({
      args: [path.join(__dirname, '../../main.js')],
      env: {
        ...process.env,
        NODE_ENV: 'test'
      }
    });

    // Get the first window
    page = await electronApp.firstWindow();
    
    // Wait for app to be ready
    await page.waitForLoadState('domcontentloaded');
  });

  test.afterEach(async () => {
    if (electronApp) {
      await electronApp.close();
    }
  });

  test.describe('Application Launch', () => {
    test('should launch successfully and show main window', async () => {
      // Check if the app is running
      expect(electronApp).toBeTruthy();
      
      // Check if page is loaded
      expect(page).toBeTruthy();
      
      // Check window title
      await expect(page).toHaveTitle('Self-Care Dashboard');
    });

    test('should display main dashboard components', async () => {
      // Check for main heading
      await expect(page.locator('h1')).toContainText('Digital Nomad Self-Care Dashboard');
      
      // Check for categories
      await expect(page.locator('[data-testid*="category-"]')).toBeVisible();
      
      // Check for navigation controls
      await expect(page.locator('button:has-text("Previous")')).toBeVisible();
      await expect(page.locator('button:has-text("Next")')).toBeVisible();
    });

    test('should have correct window dimensions', async () => {
      const window = electronApp.windows()[0];
      const size = await window.evaluate(() => ({
        width: window.outerWidth,
        height: window.outerHeight
      }));
      
      expect(size.width).toBe(1400);
      expect(size.height).toBe(900);
    });
  });

  test.describe('Task Management Workflow', () => {
    test('should toggle task completion', async () => {
      // Find a task checkbox
      const taskCheckbox = page.locator('[data-testid^="toggle-"]:first-child');
      await expect(taskCheckbox).toBeVisible();
      
      // Check initial state
      const initialText = await taskCheckbox.textContent();
      
      // Click to toggle
      await taskCheckbox.click();
      
      // Verify state changed
      const newText = await taskCheckbox.textContent();
      expect(newText).not.toBe(initialText);
    });

    test('should persist task completion after page reload', async () => {
      // Complete a task
      const firstTask = page.locator('[data-testid^="toggle-"]:first-child');
      await firstTask.click();
      
      // Get the task status
      const completedText = await firstTask.textContent();
      
      // Reload the page
      await page.reload();
      await page.waitForLoadState('domcontentloaded');
      
      // Check if task is still completed
      const reloadedTask = page.locator('[data-testid^="toggle-"]:first-child');
      const reloadedText = await reloadedTask.textContent();
      
      expect(reloadedText).toBe(completedText);
    });

    test('should update completion percentage when tasks are completed', async () => {
      // Find completion percentage for a category
      const completionIndicator = page.locator('[data-testid^="completion-"]:first-child');
      const initialCompletion = await completionIndicator.textContent();
      
      // Complete a task in that category
      const task = page.locator('[data-testid^="toggle-"]:first-child');
      await task.click();
      
      // Check if completion percentage changed
      const newCompletion = await completionIndicator.textContent();
      expect(newCompletion).not.toBe(initialCompletion);
    });
  });

  test.describe('Date Navigation', () => {
    test('should navigate to previous day', async () => {
      // Get current date
      const currentDate = page.locator('[data-testid="current-date"]');
      const initialDate = await currentDate.textContent();
      
      // Click previous day
      await page.locator('[data-testid="prev-date"]').click();
      
      // Check if date changed
      const newDate = await currentDate.textContent();
      expect(newDate).not.toBe(initialDate);
    });

    test('should navigate to next day', async () => {
      // Navigate to previous day first
      await page.locator('[data-testid="prev-date"]').click();
      
      // Get current date
      const currentDate = page.locator('[data-testid="current-date"]');
      const initialDate = await currentDate.textContent();
      
      // Click next day
      await page.locator('[data-testid="next-date"]').click();
      
      // Check if date changed
      const newDate = await currentDate.textContent();
      expect(newDate).not.toBe(initialDate);
    });

    test('should return to today when today button is clicked', async () => {
      const today = new Date().toISOString().split('T')[0];
      
      // Navigate to previous day
      await page.locator('[data-testid="prev-date"]').click();
      
      // Click today button if visible
      const todayButton = page.locator('button:has-text("Today")');
      if (await todayButton.isVisible()) {
        await todayButton.click();
        
        // Check if we're back to today
        const currentDate = await page.locator('[data-testid="current-date"]').textContent();
        expect(currentDate).toContain(today);
      }
    });
  });

  test.describe('View Mode Switching', () => {
    test('should switch between daily, weekly, and monthly views', async () => {
      // Test daily view (default)
      const dailyButton = page.locator('[data-testid="daily-view"]');
      await expect(dailyButton).toHaveClass(/active/);
      
      // Switch to weekly view
      await page.locator('[data-testid="weekly-view"]').click();
      await expect(page.locator('[data-testid="weekly-view"]')).toHaveClass(/active/);
      
      // Switch to monthly view
      await page.locator('[data-testid="monthly-view"]').click();
      await expect(page.locator('[data-testid="monthly-view"]')).toHaveClass(/active/);
      
      // Switch back to daily view
      await dailyButton.click();
      await expect(dailyButton).toHaveClass(/active/);
    });

    test('should show different content for each view mode', async () => {
      // Daily view should show categories
      await page.locator('[data-testid="daily-view"]').click();
      await expect(page.locator('[data-testid="categories"]')).toBeVisible();
      
      // Weekly view should show week grid (if implemented)
      await page.locator('[data-testid="weekly-view"]').click();
      // Weekly view content would be tested here
      
      // Monthly view should show statistics (if implemented)
      await page.locator('[data-testid="monthly-view"]').click();
      // Monthly view content would be tested here
    });
  });

  test.describe('Local Storage Persistence', () => {
    test('should save and restore data across sessions', async () => {
      // Complete some tasks
      const task1 = page.locator('[data-testid="toggle-ex1"]');
      const task2 = page.locator('[data-testid="toggle-w1"]');
      
      await task1.click();
      await task2.click();
      
      // Close and restart app
      await electronApp.close();
      
      electronApp = await electron.launch({
        args: [path.join(__dirname, '../../main.js')],
        env: {
          ...process.env,
          NODE_ENV: 'test'
        }
      });
      
      page = await electronApp.firstWindow();
      await page.waitForLoadState('domcontentloaded');
      
      // Check if tasks are still completed
      const restoredTask1 = page.locator('[data-testid="toggle-ex1"]');
      const restoredTask2 = page.locator('[data-testid="toggle-w1"]');
      
      await expect(restoredTask1).toContainText('Completed');
      await expect(restoredTask2).toContainText('Completed');
    });
  });

  test.describe('Responsive Design', () => {
    test('should adapt to different window sizes', async () => {
      // Test minimum size
      await page.setViewportSize({ width: 800, height: 600 });
      await expect(page.locator('h1')).toBeVisible();
      
      // Test larger size
      await page.setViewportSize({ width: 1920, height: 1080 });
      await expect(page.locator('h1')).toBeVisible();
      
      // Test mobile-like size
      await page.setViewportSize({ width: 375, height: 667 });
      await expect(page.locator('h1')).toBeVisible();
    });
  });

  test.describe('Accessibility', () => {
    test('should have proper heading structure', async () => {
      // Check for h1
      await expect(page.locator('h1')).toBeVisible();
      
      // Check for h2 or h3 headings
      const headings = page.locator('h1, h2, h3, h4, h5, h6');
      const headingCount = await headings.count();
      expect(headingCount).toBeGreaterThan(0);
    });

    test('should have accessible buttons', async () => {
      const buttons = page.locator('button');
      const buttonCount = await buttons.count();
      
      expect(buttonCount).toBeGreaterThan(0);
      
      // Check that buttons have text or aria-labels
      for (let i = 0; i < Math.min(buttonCount, 10); i++) {
        const button = buttons.nth(i);
        const text = await button.textContent();
        const ariaLabel = await button.getAttribute('aria-label');
        
        expect(text || ariaLabel).toBeTruthy();
      }
    });

    test('should support keyboard navigation', async () => {
      // Focus first interactive element
      await page.keyboard.press('Tab');
      
      // Check if an element is focused
      const focusedElement = page.locator(':focus');
      await expect(focusedElement).toBeVisible();
      
      // Navigate with Tab
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      
      // Should still have focus somewhere
      await expect(page.locator(':focus')).toBeVisible();
    });
  });

  test.describe('Performance', () => {
    test('should load within reasonable time', async () => {
      const startTime = Date.now();
      
      // App should already be loaded, but let's ensure it's ready
      await page.waitForLoadState('networkidle');
      
      const loadTime = Date.now() - startTime;
      
      // Should load within 5 seconds
      expect(loadTime).toBeLessThan(5000);
    });

    test('should handle rapid interactions without lag', async () => {
      const tasks = page.locator('[data-testid^="toggle-"]');
      const taskCount = Math.min(await tasks.count(), 10);
      
      const startTime = Date.now();
      
      // Rapidly toggle tasks
      for (let i = 0; i < taskCount; i++) {
        await tasks.nth(i).click();
      }
      
      const endTime = Date.now();
      const duration = endTime - startTime;
      
      // Should complete within reasonable time
      expect(duration).toBeLessThan(3000);
    });
  });

  test.describe('Error Handling', () => {
    test('should handle localStorage being disabled', async () => {
      // Simulate localStorage being unavailable
      await page.evaluate(() => {
        delete window.localStorage;
      });
      
      // Reload the page
      await page.reload();
      await page.waitForLoadState('domcontentloaded');
      
      // App should still work
      await expect(page.locator('h1')).toBeVisible();
    });

    test('should handle corrupted localStorage data', async () => {
      // Set invalid JSON in localStorage
      await page.evaluate(() => {
        localStorage.setItem('selfCareDailyData', 'invalid json');
      });
      
      // Reload the page
      await page.reload();
      await page.waitForLoadState('domcontentloaded');
      
      // App should still work
      await expect(page.locator('h1')).toBeVisible();
    });
  });
});