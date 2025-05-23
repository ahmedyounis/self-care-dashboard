/**
 * End-to-End Workflow Tests
 * Tests complete user journeys and complex interactions
 */

import { test, expect, _electron as electron } from '@playwright/test';
import path from 'path';

test.describe('User Workflow Tests', () => {
  let electronApp;
  let page;

  test.beforeEach(async () => {
    electronApp = await electron.launch({
      args: [path.join(__dirname, '../../main.js')],
      env: {
        ...process.env,
        NODE_ENV: 'test'
      }
    });

    page = await electronApp.firstWindow();
    await page.waitForLoadState('domcontentloaded');
  });

  test.afterEach(async () => {
    if (electronApp) {
      await electronApp.close();
    }
  });

  test.describe('Daily Self-Care Routine Workflow', () => {
    test('should complete a full daily routine', async () => {
      // Step 1: Start with empty daily checklist
      const exerciseTasks = page.locator('[data-testid*="toggle-ex"]');
      const workTasks = page.locator('[data-testid*="toggle-w"]');
      
      // Step 2: Complete morning exercise routine
      await exerciseTasks.first().click();
      await expect(exerciseTasks.first()).toContainText('Completed');
      
      // Step 3: Set up work environment
      await workTasks.first().click();
      await expect(workTasks.first()).toContainText('Completed');
      
      // Step 4: Check completion percentages increased
      const exerciseCompletion = page.locator('[data-testid="completion-exercise"]');
      const workCompletion = page.locator('[data-testid="completion-work"]');
      
      await expect(exerciseCompletion).toContainText(/[1-9]\d*%/); // Not 0%
      await expect(workCompletion).toContainText(/[1-9]\d*%/); // Not 0%
      
      // Step 5: Complete more tasks throughout the day
      if (await exerciseTasks.nth(1).isVisible()) {
        await exerciseTasks.nth(1).click();
      }
      if (await workTasks.nth(1).isVisible()) {
        await workTasks.nth(1).click();
      }
      
      // Step 6: Verify overall progress improved
      const finalExerciseCompletion = await exerciseCompletion.textContent();
      const finalWorkCompletion = await workCompletion.textContent();
      
      expect(parseInt(finalExerciseCompletion)).toBeGreaterThanOrEqual(50);
      expect(parseInt(finalWorkCompletion)).toBeGreaterThanOrEqual(50);
    });

    test('should handle partial day completion', async () => {
      // Complete only some tasks from different categories
      await page.locator('[data-testid="toggle-ex1"]').click();
      await page.locator('[data-testid="toggle-w1"]').click();
      
      // Verify partial completion is reflected
      const exerciseCompletion = page.locator('[data-testid="completion-exercise"]');
      const workCompletion = page.locator('[data-testid="completion-work"]');
      
      const exercisePercent = parseInt(await exerciseCompletion.textContent());
      const workPercent = parseInt(await workCompletion.textContent());
      
      expect(exercisePercent).toBeGreaterThan(0);
      expect(exercisePercent).toBeLessThan(100);
      expect(workPercent).toBeGreaterThan(0);
      expect(workPercent).toBeLessThan(100);
    });
  });

  test.describe('Multi-Day Progress Tracking', () => {
    test('should track progress across multiple days', async () => {
      // Day 1: Complete some tasks
      await page.locator('[data-testid="toggle-ex1"]').click();
      await page.locator('[data-testid="toggle-w1"]').click();
      
      // Navigate to next day
      await page.locator('[data-testid="next-date"]').click();
      
      // Day 2: Complete different tasks
      await page.locator('[data-testid="toggle-ex2"]').click();
      await page.locator('[data-testid="toggle-w2"]').click();
      
      // Navigate back to day 1
      await page.locator('[data-testid="prev-date"]').click();
      
      // Verify day 1 data is preserved
      await expect(page.locator('[data-testid="toggle-ex1"]')).toContainText('Completed');
      await expect(page.locator('[data-testid="toggle-w1"]')).toContainText('Completed');
      
      // Verify day 2 tasks are not completed on day 1
      if (await page.locator('[data-testid="toggle-ex2"]').isVisible()) {
        await expect(page.locator('[data-testid="toggle-ex2"]')).toContainText('Not Completed');
      }
    });

    test('should maintain weekly view consistency', async () => {
      // Complete tasks on current day
      await page.locator('[data-testid="toggle-ex1"]').click();
      
      // Switch to weekly view
      await page.locator('[data-testid="weekly-view"]').click();
      
      // Weekly view should show completion
      // (Implementation-specific - would test actual weekly view elements)
      await expect(page.locator('[data-testid="weekly-view"]')).toHaveClass(/active/);
      
      // Switch back to daily view
      await page.locator('[data-testid="daily-view"]').click();
      
      // Daily view should still show completed tasks
      await expect(page.locator('[data-testid="toggle-ex1"]')).toContainText('Completed');
    });
  });

  test.describe('Category Management Workflow', () => {
    test('should allow viewing all categories', async () => {
      // Verify multiple categories are present
      const categories = page.locator('[data-testid*="category-"]');
      const categoryCount = await categories.count();
      
      expect(categoryCount).toBeGreaterThanOrEqual(2);
      
      // Verify each category has items
      for (let i = 0; i < categoryCount; i++) {
        const category = categories.nth(i);
        const items = category.locator('[data-testid*="toggle-"]');
        const itemCount = await items.count();
        
        expect(itemCount).toBeGreaterThan(0);
      }
    });

    test('should show completion progress for each category', async () => {
      const categories = page.locator('[data-testid*="category-"]');
      const categoryCount = await categories.count();
      
      for (let i = 0; i < categoryCount; i++) {
        const category = categories.nth(i);
        const completion = category.locator('[data-testid*="completion-"]');
        
        // Should show percentage (initially 0%)
        await expect(completion).toContainText(/%$/);
      }
    });
  });

  test.describe('Settings and Customization Workflow', () => {
    test('should access settings modal', async () => {
      const settingsButton = page.locator('[data-testid="settings"]');
      
      if (await settingsButton.isVisible()) {
        await settingsButton.click();
        
        // Settings modal should open
        await expect(page.locator('text=Manage Categories')).toBeVisible();
        
        // Close settings
        await page.locator('[data-testid="x"]').click();
        
        // Should return to main view
        await expect(page.locator('h1')).toContainText('Digital Nomad Self-Care Dashboard');
      }
    });

    test('should access journal modal', async () => {
      const journalButton = page.locator('button:has-text("Journal")');
      
      if (await journalButton.isVisible()) {
        await journalButton.click();
        
        // Journal modal should open
        await expect(page.locator('text=Daily Journal')).toBeVisible();
        
        // Close journal
        await page.locator('[data-testid="x"]').click();
        
        // Should return to main view
        await expect(page.locator('h1')).toContainText('Digital Nomad Self-Care Dashboard');
      }
    });
  });

  test.describe('Data Export and Backup Workflow', () => {
    test('should handle data persistence across app restarts', async () => {
      // Create some data
      await page.locator('[data-testid="toggle-ex1"]').click();
      await page.locator('[data-testid="toggle-w1"]').click();
      
      // Get completion percentages
      const exerciseCompletion = await page.locator('[data-testid="completion-exercise"]').textContent();
      const workCompletion = await page.locator('[data-testid="completion-work"]').textContent();
      
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
      
      // Verify data is restored
      await expect(page.locator('[data-testid="toggle-ex1"]')).toContainText('Completed');
      await expect(page.locator('[data-testid="toggle-w1"]')).toContainText('Completed');
      
      // Verify completion percentages match
      const restoredExerciseCompletion = await page.locator('[data-testid="completion-exercise"]').textContent();
      const restoredWorkCompletion = await page.locator('[data-testid="completion-work"]').textContent();
      
      expect(restoredExerciseCompletion).toBe(exerciseCompletion);
      expect(restoredWorkCompletion).toBe(workCompletion);
    });
  });

  test.describe('Edge Cases and Error Recovery', () => {
    test('should handle rapid task toggling', async () => {
      const task = page.locator('[data-testid="toggle-ex1"]');
      
      // Rapidly toggle task multiple times
      for (let i = 0; i < 5; i++) {
        await task.click();
        await page.waitForTimeout(50); // Small delay between clicks
      }
      
      // Final state should be consistent
      const finalState = await task.textContent();
      expect(finalState).toMatch(/(Completed|Not Completed)/);
    });

    test('should handle date navigation edge cases', async () => {
      // Navigate far into the past
      for (let i = 0; i < 10; i++) {
        await page.locator('[data-testid="prev-date"]').click();
      }
      
      // App should still function
      await expect(page.locator('h1')).toBeVisible();
      
      // Navigate back to today
      const todayButton = page.locator('button:has-text("Today")');
      if (await todayButton.isVisible()) {
        await todayButton.click();
      } else {
        // Navigate forward to get back to today
        for (let i = 0; i < 10; i++) {
          await page.locator('[data-testid="next-date"]').click();
        }
      }
      
      // Should be functional
      await expect(page.locator('[data-testid="current-date"]')).toBeVisible();
    });

    test('should handle window resize during usage', async () => {
      // Start with normal size
      await page.setViewportSize({ width: 1400, height: 900 });
      
      // Complete some tasks
      await page.locator('[data-testid="toggle-ex1"]').click();
      
      // Resize to small window
      await page.setViewportSize({ width: 800, height: 600 });
      
      // Should still show completed task
      await expect(page.locator('[data-testid="toggle-ex1"]')).toContainText('Completed');
      
      // Resize to large window
      await page.setViewportSize({ width: 1920, height: 1080 });
      
      // Should still function correctly
      await expect(page.locator('[data-testid="toggle-ex1"]')).toContainText('Completed');
    });
  });

  test.describe('Performance Under Load', () => {
    test('should handle many task completions efficiently', async () => {
      const startTime = Date.now();
      
      // Complete all visible tasks
      const tasks = page.locator('[data-testid*="toggle-"]');
      const taskCount = await tasks.count();
      
      for (let i = 0; i < Math.min(taskCount, 20); i++) {
        await tasks.nth(i).click();
      }
      
      const endTime = Date.now();
      const duration = endTime - startTime;
      
      // Should complete within reasonable time (5 seconds for 20 tasks)
      expect(duration).toBeLessThan(5000);
      
      // All tasks should be completed
      for (let i = 0; i < Math.min(taskCount, 20); i++) {
        await expect(tasks.nth(i)).toContainText('Completed');
      }
    });

    test('should handle rapid view switching', async () => {
      const views = ['daily-view', 'weekly-view', 'monthly-view'];
      
      // Rapidly switch between views
      for (let cycle = 0; cycle < 3; cycle++) {
        for (const view of views) {
          await page.locator(`[data-testid="${view}"]`).click();
          await expect(page.locator(`[data-testid="${view}"]`)).toHaveClass(/active/);
        }
      }
      
      // Should end in a stable state
      await expect(page.locator('[data-testid="monthly-view"]')).toHaveClass(/active/);
    });
  });
});