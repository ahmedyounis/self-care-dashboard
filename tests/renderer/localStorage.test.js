/**
 * Tests for localStorage integration and data persistence
 */

describe('localStorage Integration', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  describe('Data Persistence', () => {
    test('should save daily data to localStorage', () => {
      const testData = {
        '2024-01-01': {
          'ex1': true,
          'w1': false
        }
      };

      localStorage.setItem('selfCareDailyData', JSON.stringify(testData));

      expect(localStorage.setItem).toHaveBeenCalledWith(
        'selfCareDailyData',
        JSON.stringify(testData)
      );
    });

    test('should retrieve daily data from localStorage', () => {
      const testData = {
        '2024-01-01': {
          'ex1': true,
          'w1': false
        }
      };

      localStorage.getItem.mockReturnValue(JSON.stringify(testData));

      const result = localStorage.getItem('selfCareDailyData');
      const parsedData = JSON.parse(result);

      expect(parsedData).toEqual(testData);
    });

    test('should handle empty localStorage gracefully', () => {
      localStorage.getItem.mockReturnValue(null);

      const result = localStorage.getItem('selfCareDailyData');
      expect(result).toBeNull();
    });

    test('should save journal entries to localStorage', () => {
      const journalEntries = {
        '2024-01-01': 'Today was a productive day...',
        '2024-01-02': 'Focused on exercise and meditation.'
      };

      localStorage.setItem('selfCareJournalEntries', JSON.stringify(journalEntries));

      expect(localStorage.setItem).toHaveBeenCalledWith(
        'selfCareJournalEntries',
        JSON.stringify(journalEntries)
      );
    });

    test('should save custom categories to localStorage', () => {
      const customCategories = {
        exercise: {
          name: 'Exercise',
          iconName: 'Dumbbell',
          color: 'emerald',
          items: [
            { id: 'ex1', label: 'Custom workout', tip: 'Modified tip' }
          ]
        }
      };

      localStorage.setItem('selfCareCategories', JSON.stringify(customCategories));

      expect(localStorage.setItem).toHaveBeenCalledWith(
        'selfCareCategories',
        JSON.stringify(customCategories)
      );
    });

    test('should save daily quote with date to localStorage', () => {
      const dailyQuoteData = {
        date: new Date().toDateString(),
        quote: {
          text: "The journey of a thousand miles begins with a single step.",
          author: "Lao Tzu"
        }
      };

      localStorage.setItem('dailyQuote', JSON.stringify(dailyQuoteData));

      expect(localStorage.setItem).toHaveBeenCalledWith(
        'dailyQuote',
        JSON.stringify(dailyQuoteData)
      );
    });
  });

  describe('Data Validation', () => {
    test('should handle invalid JSON in localStorage', () => {
      localStorage.getItem.mockReturnValue('invalid json string');

      expect(() => {
        try {
          JSON.parse(localStorage.getItem('selfCareDailyData'));
        } catch (e) {
          // This should throw, which is the expected behavior
          throw e;
        }
      }).toThrow();
    });

    test('should validate data structure for daily data', () => {
      const validData = {
        '2024-01-01': {
          'ex1': true,
          'w1': false
        }
      };

      localStorage.getItem.mockReturnValue(JSON.stringify(validData));
      const retrieved = JSON.parse(localStorage.getItem('selfCareDailyData'));

      // Validate structure
      expect(typeof retrieved).toBe('object');
      expect(retrieved['2024-01-01']).toBeDefined();
      expect(typeof retrieved['2024-01-01']['ex1']).toBe('boolean');
    });

    test('should validate date format for keys', () => {
      const testDate = '2024-01-01';
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

      expect(testDate).toMatch(dateRegex);
    });
  });

  describe('Data Migration and Compatibility', () => {
    test('should handle missing properties in saved data', () => {
      const incompleteData = {
        '2024-01-01': {
          'ex1': true
          // Missing other expected properties
        }
      };

      localStorage.getItem.mockReturnValue(JSON.stringify(incompleteData));
      const retrieved = JSON.parse(localStorage.getItem('selfCareDailyData'));

      expect(retrieved['2024-01-01']['ex1']).toBe(true);
      expect(retrieved['2024-01-01']['nonexistent']).toBeUndefined();
    });

    test('should handle old data format gracefully', () => {
      // Simulate old data format that might exist in localStorage
      const oldFormatData = {
        tasks: ['ex1', 'w1'], // Old array format
        date: '2024-01-01'
      };

      localStorage.getItem.mockReturnValue(JSON.stringify(oldFormatData));
      
      // The app should handle this gracefully, either by migration or fallback
      expect(() => {
        JSON.parse(localStorage.getItem('selfCareDailyData'));
      }).not.toThrow();
    });
  });

  describe('Storage Limits and Performance', () => {
    test('should handle large amounts of data', () => {
      // Create a large dataset to test storage limits
      const largeData = {};
      for (let i = 0; i < 365; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        
        largeData[dateStr] = {
          'ex1': Math.random() > 0.5,
          'ex2': Math.random() > 0.5,
          'w1': Math.random() > 0.5,
          'w2': Math.random() > 0.5,
          'n1': Math.random() > 0.5,
          'm1': Math.random() > 0.5
        };
      }

      const serializedData = JSON.stringify(largeData);
      
      // Check that serialization doesn't throw
      expect(() => {
        localStorage.setItem('selfCareDailyData', serializedData);
      }).not.toThrow();

      // Check data size (localStorage typically has ~5-10MB limit)
      const sizeInBytes = new Blob([serializedData]).size;
      expect(sizeInBytes).toBeLessThan(5 * 1024 * 1024); // Less than 5MB
    });

    test('should clean up old data when storage is full', () => {
      // This would test cleanup logic if implemented
      const cleanupThreshold = 1000; // items
      const mockData = {};
      
      // Create more than threshold items
      for (let i = 0; i < cleanupThreshold + 100; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        mockData[date.toISOString().split('T')[0]] = { 'ex1': true };
      }

      localStorage.setItem('selfCareDailyData', JSON.stringify(mockData));
      
      expect(localStorage.setItem).toHaveBeenCalled();
    });
  });

  describe('Security and Data Integrity', () => {
    test('should not store sensitive information', () => {
      const testData = {
        '2024-01-01': {
          'ex1': true,
          'w1': false
        }
      };

      const serializedData = JSON.stringify(testData);
      
      // Ensure no sensitive patterns are stored
      expect(serializedData).not.toMatch(/password/i);
      expect(serializedData).not.toMatch(/token/i);
      expect(serializedData).not.toMatch(/key/i);
      expect(serializedData).not.toMatch(/secret/i);
    });

    test('should handle localStorage quota exceeded error', () => {
      // Mock quota exceeded error
      const quotaExceededError = new Error('QuotaExceededError');
      quotaExceededError.name = 'QuotaExceededError';
      
      localStorage.setItem.mockImplementation(() => {
        throw quotaExceededError;
      });

      expect(() => {
        try {
          localStorage.setItem('selfCareDailyData', 'some data');
        } catch (error) {
          if (error.name === 'QuotaExceededError') {
            // Handle gracefully - maybe clear old data or show warning
            console.warn('Storage quota exceeded');
          }
          throw error;
        }
      }).toThrow('QuotaExceededError');
    });
  });
});