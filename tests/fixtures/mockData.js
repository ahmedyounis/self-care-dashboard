/**
 * Mock data for testing
 * Provides realistic test data for the self-care dashboard
 */

// Sample daily data for different dates
export const mockDailyData = {
  '2024-01-01': {
    'ex1': true,
    'ex2': false,
    'w1': true,
    'w2': true,
    'n1': false,
    'm1': true
  },
  '2024-01-02': {
    'ex1': false,
    'ex2': true,
    'w1': true,
    'w2': false,
    'n1': true,
    'm1': false
  },
  '2024-01-03': {
    'ex1': true,
    'ex2': true,
    'w1': false,
    'w2': true,
    'n1': true,
    'm1': true
  }
};

// Sample journal entries
export const mockJournalEntries = {
  '2024-01-01': 'Started the new year with a great workout. Feeling motivated and ready for the challenges ahead.',
  '2024-01-02': 'Had a productive work session today. Completed the project proposal and got positive feedback.',
  '2024-01-03': 'Focused on nutrition today. Tried a new healthy recipe and really enjoyed it.'
};

// Sample categories with items
export const mockCategories = {
  exercise: {
    name: 'Exercise',
    iconName: 'Dumbbell',
    color: 'emerald',
    items: [
      { id: 'ex1', label: '20-minute bodyweight circuit', tip: 'No equipment needed' },
      { id: 'ex2', label: 'Morning walk/jog', tip: 'Great for exploring new areas' },
      { id: 'ex3', label: 'Yoga or stretching', tip: 'Perfect for small spaces' },
      { id: 'ex4', label: 'Bike ride', tip: 'Exercise + exploration' }
    ]
  },
  work: {
    name: 'Work',
    iconName: 'Briefcase',
    color: 'blue',
    items: [
      { id: 'w1', label: 'Set specific work hours', tip: 'Consistency is key' },
      { id: 'w2', label: 'Block calendar for deep work', tip: 'Protect your focus time' },
      { id: 'w3', label: 'Complete morning routine', tip: 'Start the day right' },
      { id: 'w4', label: 'End-of-day shutdown ritual', tip: 'Clear boundaries' }
    ]
  },
  nutrition: {
    name: 'Nutrition',
    iconName: 'Apple',
    color: 'orange',
    items: [
      { id: 'n1', label: 'Eat fresh fruits/vegetables', tip: 'Visit local markets' },
      { id: 'n2', label: 'Choose healthy snacks', tip: 'Nuts, seeds, fruits' },
      { id: 'n3', label: 'Lean protein with meals', tip: 'Fish, chicken, legumes' },
      { id: 'n4', label: 'Stay hydrated', tip: '8+ glasses of water' }
    ]
  },
  meditation: {
    name: 'Meditation',
    iconName: 'Heart',
    color: 'purple',
    items: [
      { id: 'm1', label: 'Morning meditation', tip: '10-20 minutes to start the day' },
      { id: 'm2', label: 'Breathing exercises', tip: '4-7-8 technique or box breathing' },
      { id: 'm3', label: 'Gratitude practice', tip: 'List 3 things you\'re grateful for' },
      { id: 'm4', label: 'Evening reflection', tip: 'Review and release the day' }
    ]
  }
};

// Sample quotes for testing
export const mockQuotes = [
  { text: "The journey of a thousand miles begins with a single step.", author: "Lao Tzu" },
  { text: "You don't have to be great to start, but you have to start to be great.", author: "Zig Ziglar" },
  { text: "Progress, not perfection.", author: "Unknown" },
  { text: "A year from now, you'll wish you had started today.", author: "Karen Lamb" },
  { text: "The only bad workout is the one that didn't happen.", author: "Unknown" }
];

// Sample user preferences
export const mockUserPreferences = {
  theme: 'light',
  notifications: true,
  defaultView: 'daily',
  startOfWeek: 'monday',
  reminderTime: '09:00',
  enableSounds: false
};

// Sample streak data
export const mockStreakData = {
  exercise: {
    current: 5,
    longest: 12,
    lastCompleted: '2024-01-03'
  },
  work: {
    current: 3,
    longest: 8,
    lastCompleted: '2024-01-02'
  },
  nutrition: {
    current: 0,
    longest: 15,
    lastCompleted: '2023-12-30'
  },
  meditation: {
    current: 7,
    longest: 21,
    lastCompleted: '2024-01-03'
  }
};

// Sample weekly data for testing weekly view
export const mockWeeklyData = [
  {
    date: '2024-01-01',
    day: 'Mon',
    dayNum: 1,
    completion: 67,
    categories: {
      exercise: 50,
      work: 100,
      nutrition: 25,
      meditation: 75
    }
  },
  {
    date: '2024-01-02',
    day: 'Tue',
    dayNum: 2,
    completion: 50,
    categories: {
      exercise: 25,
      work: 50,
      nutrition: 75,
      meditation: 50
    }
  },
  {
    date: '2024-01-03',
    day: 'Wed',
    dayNum: 3,
    completion: 83,
    categories: {
      exercise: 100,
      work: 75,
      nutrition: 75,
      meditation: 100
    }
  },
  {
    date: '2024-01-04',
    day: 'Thu',
    dayNum: 4,
    completion: 0,
    categories: {
      exercise: 0,
      work: 0,
      nutrition: 0,
      meditation: 0
    }
  },
  {
    date: '2024-01-05',
    day: 'Fri',
    dayNum: 5,
    completion: 33,
    categories: {
      exercise: 25,
      work: 50,
      nutrition: 0,
      meditation: 25
    }
  },
  {
    date: '2024-01-06',
    day: 'Sat',
    dayNum: 6,
    completion: 42,
    categories: {
      exercise: 75,
      work: 0,
      nutrition: 50,
      meditation: 25
    }
  },
  {
    date: '2024-01-07',
    day: 'Sun',
    dayNum: 7,
    completion: 25,
    categories: {
      exercise: 50,
      work: 0,
      nutrition: 25,
      meditation: 25
    }
  }
];

// Sample monthly statistics for testing monthly view
export const mockMonthlyStats = {
  exercise: {
    avgCompletion: 65,
    daysCompleted: 18,
    totalDays: 30,
    trend: 'up'
  },
  work: {
    avgCompletion: 72,
    daysCompleted: 22,
    totalDays: 30,
    trend: 'stable'
  },
  nutrition: {
    avgCompletion: 45,
    daysCompleted: 12,
    totalDays: 30,
    trend: 'down'
  },
  meditation: {
    avgCompletion: 58,
    daysCompleted: 16,
    totalDays: 30,
    trend: 'up'
  }
};

// Helper functions for generating test data
export const generateMockDailyData = (daysBack = 30) => {
  const data = {};
  const today = new Date();
  
  for (let i = 0; i < daysBack; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    
    data[dateStr] = {
      'ex1': Math.random() > 0.3, // 70% chance
      'ex2': Math.random() > 0.5, // 50% chance
      'w1': Math.random() > 0.2,  // 80% chance
      'w2': Math.random() > 0.4,  // 60% chance
      'n1': Math.random() > 0.6,  // 40% chance
      'n2': Math.random() > 0.7,  // 30% chance
      'm1': Math.random() > 0.5,  // 50% chance
      'm2': Math.random() > 0.6   // 40% chance
    };
  }
  
  return data;
};

export const generateMockJournalEntries = (daysBack = 10) => {
  const entries = {};
  const today = new Date();
  
  const sampleEntries = [
    "Great day today! Completed most of my self-care goals and feeling accomplished.",
    "Struggled a bit with motivation today, but managed to do some exercise at least.",
    "Focused on work productivity today. Need to balance better with self-care tomorrow.",
    "Had a wonderful meditation session this morning. It really set the tone for the day.",
    "Tried a new healthy recipe today. Cooking can be such a form of self-care!",
    "Feeling grateful for the progress I've made this week. Small steps add up.",
    "Challenging day, but reminded myself that consistency matters more than perfection.",
    "Connected with friends today. Social wellness is just as important as physical health.",
    "Reflected on my goals and adjusted my approach. Flexibility is key in self-care.",
    "Celebrated a small win today. It's important to acknowledge progress."
  ];
  
  for (let i = 0; i < daysBack; i++) {
    if (Math.random() > 0.3) { // 70% chance of having an entry
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      entries[dateStr] = sampleEntries[Math.floor(Math.random() * sampleEntries.length)];
    }
  }
  
  return entries;
};

// Mock localStorage implementation for testing
export const mockLocalStorage = {
  store: {},
  
  getItem(key) {
    return this.store[key] || null;
  },
  
  setItem(key, value) {
    this.store[key] = String(value);
  },
  
  removeItem(key) {
    delete this.store[key];
  },
  
  clear() {
    this.store = {};
  },
  
  get length() {
    return Object.keys(this.store).length;
  },
  
  key(index) {
    const keys = Object.keys(this.store);
    return keys[index] || null;
  }
};

// Mock date utilities for testing
export const mockDateUtils = {
  today: () => '2024-01-15', // Fixed date for consistent testing
  yesterday: () => '2024-01-14',
  tomorrow: () => '2024-01-16',
  
  formatDate: (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    });
  },
  
  addDays: (dateStr, days) => {
    const date = new Date(dateStr);
    date.setDate(date.getDate() + days);
    return date.toISOString().split('T')[0];
  },
  
  getWeekStart: (dateStr) => {
    const date = new Date(dateStr);
    const day = date.getDay();
    const diff = date.getDate() - day;
    const weekStart = new Date(date.setDate(diff));
    return weekStart.toISOString().split('T')[0];
  }
};

// Mock API responses for testing
export const mockApiResponses = {
  getUserData: {
    status: 200,
    data: {
      id: 'user-123',
      name: 'Test User',
      preferences: mockUserPreferences,
      streaks: mockStreakData
    }
  },
  
  saveUserData: {
    status: 200,
    message: 'Data saved successfully'
  },
  
  getQuoteOfTheDay: {
    status: 200,
    data: mockQuotes[0]
  },
  
  error: {
    status: 500,
    message: 'Internal server error'
  }
};