import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  CheckCircle, Circle, Calendar, Dumbbell, Briefcase, Apple, 
  MapPin, Clock, Target, TrendingUp, Award, Flame, ChevronLeft, 
  ChevronRight, Star, Heart, Sparkles, BarChart3, Quote,
  Settings, Plus, Trash2, X, BookOpen, Users, Edit2
} from 'lucide-react';

const SelfCareToolkit = () => {
  // Initialize state with localStorage
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [dailyData, setDailyData] = useState(() => {
    const saved = localStorage.getItem('selfCareDailyData');
    return saved ? JSON.parse(saved) : {};
  });
  const [activeTab, setActiveTab] = useState('exercise');
  const [viewMode, setViewMode] = useState('daily');
  const [showCalendar, setShowCalendar] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showJournal, setShowJournal] = useState(false);
  const [journalEntries, setJournalEntries] = useState(() => {
    const saved = localStorage.getItem('selfCareJournalEntries');
    return saved ? JSON.parse(saved) : {};
  });

  // Motivational quotes
  const quotes = [
    { text: "The journey of a thousand miles begins with a single step.", author: "Lao Tzu" },
    { text: "You don't have to be great to start, but you have to start to be great.", author: "Zig Ziglar" },
    { text: "Progress, not perfection.", author: "Unknown" },
    { text: "A year from now, you'll wish you had started today.", author: "Karen Lamb" },
    { text: "The only bad workout is the one that didn't happen.", author: "Unknown" },
    { text: "Take care of your body. It's the only place you have to live.", author: "Jim Rohn" },
    { text: "Success is the sum of small efforts repeated day in and day out.", author: "Robert Collier" },
    { text: "Your future is created by what you do today, not tomorrow.", author: "Robert Kiyosaki" },
    { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
    { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
    { text: "It's not about perfect. It's about effort.", author: "Jillian Michaels" },
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { text: "The difference between ordinary and extraordinary is that little extra.", author: "Jimmy Johnson" },
    { text: "Every moment is a fresh beginning.", author: "T.S. Eliot" },
    { text: "You are never too old to set another goal or to dream a new dream.", author: "C.S. Lewis" },
    { text: "The body achieves what the mind believes.", author: "Napoleon Hill" },
    { text: "Your health is an investment, not an expense.", author: "Unknown" },
    { text: "A healthy outside starts from the inside.", author: "Robert Urich" },
    { text: "The groundwork for all happiness is good health.", author: "Leigh Hunt" },
    { text: "Energy and persistence conquer all things.", author: "Benjamin Franklin" },
    { text: "The only limit to our realization of tomorrow is our doubts of today.", author: "Franklin D. Roosevelt" },
    { text: "Do something today that your future self will thank you for.", author: "Sean Patrick Flanery" },
    { text: "Small steps daily lead to big changes yearly.", author: "Unknown" },
    { text: "Your body hears everything your mind says.", author: "Naomi Judd" },
    { text: "The best project you'll ever work on is you.", author: "Unknown" },
    { text: "Motivation is what gets you started. Habit is what keeps you going.", author: "Jim Ryun" },
    { text: "Don't put off tomorrow what you can do today.", author: "Benjamin Franklin" },
    { text: "The pain you feel today will be the strength you feel tomorrow.", author: "Unknown" },
    { text: "A goal without a plan is just a wish.", author: "Antoine de Saint-Exupéry" }
  ];

  const [dailyQuote] = useState(() => {
    const today = new Date().toDateString();
    const savedQuote = localStorage.getItem('dailyQuote');
    const savedQuoteData = savedQuote ? JSON.parse(savedQuote) : null;
    
    if (savedQuoteData && savedQuoteData.date === today) {
      return savedQuoteData.quote;
    } else {
      const newQuote = quotes[Math.floor(Math.random() * quotes.length)];
      localStorage.setItem('dailyQuote', JSON.stringify({ date: today, quote: newQuote }));
      return newQuote;
    }
  });

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('selfCareDailyData', JSON.stringify(dailyData));
  }, [dailyData]);

  useEffect(() => {
    localStorage.setItem('selfCareJournalEntries', JSON.stringify(journalEntries));
  }, [journalEntries]);

  // Icon mapping for categories
  const iconMap = {
    Dumbbell: Dumbbell,
    Briefcase: Briefcase,
    Apple: Apple,
    Heart: Heart,
    Target: Target,
    MapPin: MapPin,
    Settings: Settings,
    Plus: Plus,
    Trash2: Trash2,
    X: X,
    BookOpen: BookOpen,
    Users: Users,
    Edit2: Edit2,
    Star: Star,
    Clock: Clock
  };

  // Category definitions with detailed items
  const defaultCategories = {
    exercise: { 
      name: 'Exercise',
      iconName: 'Dumbbell',
      color: 'emerald',
      items: [
        { id: 'ex1', label: '20-minute bodyweight circuit', tip: 'No equipment needed' },
        { id: 'ex2', label: 'Morning walk/jog', tip: 'Great for exploring new areas' },
        { id: 'ex3', label: 'Yoga or stretching', tip: 'Perfect for small spaces' },
        { id: 'ex4', label: 'Bike ride', tip: 'Exercise + exploration' },
        { id: 'ex5', label: 'Gym session', tip: 'Maintain your routine' },
        { id: 'ex6', label: 'Swimming', tip: 'Full-body workout' },
        { id: 'ex7', label: 'Local fitness class', tip: 'Try something new' },
        { id: 'ex8', label: 'Hiking/outdoor activity', tip: 'Connect with nature' }
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
        { id: 'w4', label: 'End-of-day shutdown ritual', tip: 'Clear boundaries' },
        { id: 'w5', label: 'Plan tomorrow\'s priorities', tip: 'Hit the ground running' },
        { id: 'w6', label: 'Use Pomodoro technique', tip: '25min work, 5min break' },
        { id: 'w7', label: 'Batch similar tasks', tip: 'Maximize efficiency' },
        { id: 'w8', label: 'Track work hours', tip: 'Know your patterns' }
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
        { id: 'n4', label: 'Whole grains over refined', tip: 'Brown rice, quinoa, oats' },
        { id: 'n5', label: 'Meal prep or plan', tip: 'Stay on track' },
        { id: 'n6', label: 'Mindful eating', tip: 'No distractions' },
        { id: 'n7', label: 'Stay hydrated', tip: '8+ glasses of water' },
        { id: 'n8', label: 'Limit processed foods', tip: 'Choose whole foods' }
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
        { id: 'm4', label: 'Body scan meditation', tip: 'Release physical tension' },
        { id: 'm5', label: 'Walking meditation', tip: 'Mindful movement' },
        { id: 'm6', label: 'Evening reflection', tip: 'Review and release the day' },
        { id: 'm7', label: 'Guided meditation app', tip: 'Use Headspace, Calm, etc.' },
        { id: 'm8', label: 'Mindfulness moments', tip: 'Brief pauses throughout the day' }
      ]
    },
    reading: {
      name: 'Reading',
      iconName: 'Target',
      color: 'indigo',
      items: [
        { id: 'r1', label: 'Read for 30 minutes', tip: 'Fiction or non-fiction' },
        { id: 'r2', label: 'Morning news/articles', tip: 'Stay informed' },
        { id: 'r3', label: 'Professional development', tip: 'Industry blogs or books' },
        { id: 'r4', label: 'Learn something new', tip: 'Online courses or tutorials' },
        { id: 'r5', label: 'Read before bed', tip: 'Better than screens' },
        { id: 'r6', label: 'Join online book club', tip: 'Connect with readers' },
        { id: 'r7', label: 'Take reading notes', tip: 'Improve retention' },
        { id: 'r8', label: 'Share key learnings', tip: 'Teach what you learn' }
      ]
    },
    social: {
      name: 'Social Connections',
      iconName: 'MapPin',
      color: 'pink',
      items: [
        { id: 's1', label: 'Video call family/friends', tip: 'Stay connected remotely' },
        { id: 's2', label: 'Join local meetup/event', tip: 'Meet people in new places' },
        { id: 's3', label: 'Work from co-working space', tip: 'Combat isolation' },
        { id: 's4', label: 'Have a meaningful conversation', tip: 'Quality over quantity' },
        { id: 's5', label: 'Send thoughtful message', tip: 'Check in on someone' },
        { id: 's6', label: 'Schedule social time', tip: 'Make it a priority' },
        { id: 's7', label: 'Join online community', tip: 'Find your tribe' },
        { id: 's8', label: 'Practice active listening', tip: 'Be present in conversations' }
      ]
    }
  };

  // Load categories from localStorage or use defaults
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('selfCareCategories');
    return saved ? JSON.parse(saved) : defaultCategories;
  });

  useEffect(() => {
    localStorage.setItem('selfCareCategories', JSON.stringify(categories));
  }, [categories]);

  // Get data for selected date
  const getDateData = (date) => {
    return dailyData[date] || {};
  };

  // Toggle item completion
  const toggleItem = (itemId) => {
    setDailyData(prev => ({
      ...prev,
      [selectedDate]: {
        ...prev[selectedDate],
        [itemId]: !prev[selectedDate]?.[itemId]
      }
    }));
  };

  // Calculate completion percentage for a category on a specific date
  const getCategoryCompletion = (categoryKey, date) => {
    const dateData = getDateData(date);
    const categoryItems = categories[categoryKey].items;
    const completedCount = categoryItems.filter(item => dateData[item.id]).length;
    return Math.round((completedCount / categoryItems.length) * 100);
  };

  // Calculate overall daily completion
  const getDailyCompletion = (date) => {
    const total = Object.values(categories).reduce((acc, cat) => acc + cat.items.length, 0);
    const dateData = getDateData(date);
    const completed = Object.values(dateData).filter(Boolean).length;
    return Math.round((completed / total) * 100);
  };

  // Calculate streak for a category
  const calculateStreak = (categoryKey) => {
    let streak = 0;
    let currentDate = new Date();
    
    while (true) {
      const dateStr = currentDate.toISOString().split('T')[0];
      const completion = getCategoryCompletion(categoryKey, dateStr);
      
      if (completion >= 50) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }
    
    return streak;
  };

  // Navigate dates
  const navigateDate = (direction) => {
    const current = new Date(selectedDate);
    current.setDate(current.getDate() + direction);
    setSelectedDate(current.toISOString().split('T')[0]);
  };

  // Format date for display
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (dateStr === today) return 'Today';
    if (dateStr === yesterday.toISOString().split('T')[0]) return 'Yesterday';
    
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Get week data for weekly view
  const getWeekData = () => {
    const weekStart = new Date(selectedDate);
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    const weekData = [];
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(weekStart);
      date.setDate(weekStart.getDate() + i);
      const dateStr = date.toISOString().split('T')[0];
      
      weekData.push({
        date: dateStr,
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        dayNum: date.getDate(),
        completion: getDailyCompletion(dateStr),
        categories: Object.keys(categories).reduce((acc, key) => ({
          ...acc,
          [key]: getCategoryCompletion(key, dateStr)
        }), {})
      });
    }
    
    return weekData;
  };

  // Get month data
  const getMonthData = () => {
    const stats = {};
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    Object.keys(categories).forEach(categoryKey => {
      let totalDays = 0;
      let completedDays = 0;
      let totalCompletion = 0;
      
      for (let i = 0; i < 30; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        const completion = getCategoryCompletion(categoryKey, dateStr);
        
        totalDays++;
        totalCompletion += completion;
        if (completion >= 50) completedDays++;
      }
      
      stats[categoryKey] = {
        avgCompletion: Math.round(totalCompletion / totalDays),
        daysCompleted: completedDays,
        totalDays
      };
    });
    
    return stats;
  };

  // Journal Component
  // Settings/Category Management Component
  const SettingsModal = () => {
    const [activeSettingsTab, setActiveSettingsTab] = useState('categories');
    const [newCategoryName, setNewCategoryName] = useState('');
    const [selectedIcon, setSelectedIcon] = useState('Target');
    const [selectedColor, setSelectedColor] = useState('emerald');
    const [editingCategory, setEditingCategory] = useState(null);
    const [selectedCategoryForTasks, setSelectedCategoryForTasks] = useState(Object.keys(categories)[0]);
    const [editingTask, setEditingTask] = useState(null);
    const [newTaskLabel, setNewTaskLabel] = useState('');
    const [newTaskTip, setNewTaskTip] = useState('');

    const iconOptions = {
      Target: Target,
      Heart: Heart,
      Star: Star,
      BookOpen: BookOpen,
      Users: Users,
      Dumbbell: Dumbbell,
      Briefcase: Briefcase,
      Apple: Apple,
      MapPin: MapPin,
      Clock: Clock
    };

    const colorOptions = ['emerald', 'blue', 'orange', 'purple', 'indigo', 'pink'];

    const addCategory = () => {
      if (!newCategoryName.trim()) return;
      
      const categoryKey = newCategoryName.toLowerCase().replace(/\s+/g, '');
      
      setCategories(prev => ({
        ...prev,
        [categoryKey]: {
          name: newCategoryName,
          iconName: selectedIcon,
          color: selectedColor,
          items: Array.from({ length: 8 }, (_, i) => ({
            id: `${categoryKey}${i + 1}`,
            label: `${newCategoryName} task ${i + 1}`,
            tip: 'Custom task'
          }))
        }
      }));
      
      setNewCategoryName('');
    };

    const deleteCategory = (categoryKey) => {
      if (Object.keys(categories).length <= 1) {
        alert('You must keep at least 1 category');
        return;
      }
      
      setCategories(prev => {
        const newCategories = { ...prev };
        delete newCategories[categoryKey];
        return newCategories;
      });
      
      // If deleted category was selected for tasks, select another
      if (selectedCategoryForTasks === categoryKey) {
        const remainingKeys = Object.keys(categories).filter(k => k !== categoryKey);
        setSelectedCategoryForTasks(remainingKeys[0] || '');
      }
    };

    const editCategory = (categoryKey) => {
      const category = categories[categoryKey];
      setEditingCategory(categoryKey);
      setNewCategoryName(category.name);
      setSelectedIcon(category.iconName);
      setSelectedColor(category.color);
    };

    const updateCategory = () => {
      if (!editingCategory || !newCategoryName.trim()) return;
      
      setCategories(prev => ({
        ...prev,
        [editingCategory]: {
          ...prev[editingCategory],
          name: newCategoryName,
          iconName: selectedIcon,
          color: selectedColor
        }
      }));
      
      setEditingCategory(null);
      setNewCategoryName('');
    };

    const addTask = () => {
      if (!newTaskLabel.trim() || !selectedCategoryForTasks) return;
      
      setCategories(prev => {
        const category = prev[selectedCategoryForTasks];
        const newTaskId = `${selectedCategoryForTasks}${Date.now()}`;
        
        return {
          ...prev,
          [selectedCategoryForTasks]: {
            ...category,
            items: [...category.items, {
              id: newTaskId,
              label: newTaskLabel,
              tip: newTaskTip || 'Custom task'
            }]
          }
        };
      });
      
      setNewTaskLabel('');
      setNewTaskTip('');
    };

    const updateTask = (categoryKey, taskId, updates) => {
      setCategories(prev => ({
        ...prev,
        [categoryKey]: {
          ...prev[categoryKey],
          items: prev[categoryKey].items.map(item =>
            item.id === taskId ? { ...item, ...updates } : item
          )
        }
      }));
    };

    const deleteTask = (categoryKey, taskId) => {
      setCategories(prev => ({
        ...prev,
        [categoryKey]: {
          ...prev[categoryKey],
          items: prev[categoryKey].items.filter(item => item.id !== taskId)
        }
      }));
    };

    const resetToDefaults = () => {
      if (confirm('Reset all categories to defaults? This will remove custom categories and tasks.')) {
        setCategories(defaultCategories);
        setSelectedCategoryForTasks(Object.keys(defaultCategories)[0]);
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[80vh] overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center space-x-3">
              <Settings size={24} className="text-gray-600" />
              <h2 className="text-2xl font-bold text-gray-800">Manage Categories</h2>
            </div>
            <button
              onClick={() => setShowSettings(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          
          {/* Tabs */}
          <div className="flex border-b">
            <button
              onClick={() => setActiveSettingsTab('categories')}
              className={`px-6 py-3 font-medium transition-colors ${
                activeSettingsTab === 'categories'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Categories
            </button>
            <button
              onClick={() => setActiveSettingsTab('tasks')}
              className={`px-6 py-3 font-medium transition-colors ${
                activeSettingsTab === 'tasks'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Tasks
            </button>
          </div>
          
          <div className="p-6 overflow-y-auto max-h-[60vh]">
            {activeSettingsTab === 'categories' && (
              <>
                {/* Add/Edit Category */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">
                    {editingCategory ? 'Edit Category' : 'Add New Category'}
                  </h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Category name"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(iconOptions).map(([name, Icon]) => (
                        <button
                          key={name}
                          onClick={() => setSelectedIcon(name)}
                          className={`p-2 rounded-lg border-2 transition-colors ${
                            selectedIcon === name 
                              ? 'border-blue-500 bg-blue-50' 
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          <Icon size={20} />
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                    <div className="flex flex-wrap gap-2">
                      {colorOptions.map(color => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`w-12 h-12 rounded-lg border-2 transition-colors ${
                            selectedColor === color 
                              ? 'ring-2 ring-offset-2 ring-gray-400' 
                              : ''
                          }`}
                          style={{
                            background: `linear-gradient(to right, 
                              ${color === 'emerald' ? '#10b981' : 
                                color === 'blue' ? '#3b82f6' : 
                                color === 'orange' ? '#f97316' : 
                                color === 'purple' ? '#a855f7' : 
                                color === 'indigo' ? '#6366f1' : 
                                '#ec4899'}, 
                              ${color === 'emerald' ? '#16a34a' : 
                                color === 'blue' ? '#4f46e5' : 
                                color === 'orange' ? '#dc2626' : 
                                color === 'purple' ? '#d946ef' : 
                                color === 'indigo' ? '#7c3aed' : 
                                '#f43f5e'})`
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={editingCategory ? updateCategory : addCategory}
                    disabled={!newCategoryName.trim()}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      newCategoryName.trim()
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {editingCategory ? 'Update Category' : 'Add Category'}
                  </button>
                  {editingCategory && (
                    <button
                      onClick={() => {
                        setEditingCategory(null);
                        setNewCategoryName('');
                        setSelectedIcon('Target');
                        setSelectedColor('emerald');
                      }}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>
            
            {/* Existing Categories */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Current Categories</h3>
              {Object.entries(categories).map(([key, category]) => {
                const Icon = iconMap[category.iconName] || iconMap.Target;
                
                return (
                  <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Icon size={24} className={`text-${category.color}-600`} />
                      <span className="font-medium">{category.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => editCategory(key)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => deleteCategory(key)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-6 pt-6 border-t">
              <button
                onClick={resetToDefaults}
                className="text-sm text-gray-600 hover:text-gray-800 underline"
              >
                Reset to default categories
              </button>
            </div>
            </>
            )}
            
            {activeSettingsTab === 'tasks' && (
              <>
                {/* Category Selector */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Category to Manage Tasks
                  </label>
                  <select
                    value={selectedCategoryForTasks}
                    onChange={(e) => setSelectedCategoryForTasks(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {Object.entries(categories).map(([key, cat]) => (
                      <option key={key} value={key}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                
                {/* Add New Task */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Add New Task</h3>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Task name"
                      value={newTaskLabel}
                      onChange={(e) => setNewTaskLabel(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      placeholder="Task tip (optional)"
                      value={newTaskTip}
                      onChange={(e) => setNewTaskTip(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={addTask}
                      disabled={!newTaskLabel.trim()}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        newTaskLabel.trim()
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      Add Task
                    </button>
                  </div>
                </div>
                
                {/* Existing Tasks */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">
                    Tasks in {categories[selectedCategoryForTasks]?.name}
                  </h3>
                  {categories[selectedCategoryForTasks]?.items.map((task) => (
                    <div key={task.id} className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                      {editingTask === task.id ? (
                        <div className="flex-1 space-y-2">
                          <input
                            type="text"
                            value={task.label}
                            onChange={(e) => updateTask(selectedCategoryForTasks, task.id, { label: e.target.value })}
                            className="w-full px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <input
                            type="text"
                            value={task.tip}
                            onChange={(e) => updateTask(selectedCategoryForTasks, task.id, { tip: e.target.value })}
                            className="w-full px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <button
                            onClick={() => setEditingTask(null)}
                            className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                          >
                            Save
                          </button>
                        </div>
                      ) : (
                        <>
                          <div className="flex-1">
                            <div className="font-medium text-gray-800">{task.label}</div>
                            <div className="text-sm text-gray-500 mt-0.5">{task.tip}</div>
                          </div>
                          <div className="flex items-center space-x-2 ml-4">
                            <button
                              onClick={() => setEditingTask(task.id)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            >
                              <Edit2 size={18} />
                            </button>
                            <button
                              onClick={() => deleteTask(selectedCategoryForTasks, task.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  const JournalModal = () => {
    const currentEntry = journalEntries[selectedDate] || '';
    const [tempEntry, setTempEntry] = useState(currentEntry);

    const saveJournal = () => {
      setJournalEntries(prev => ({
        ...prev,
        [selectedDate]: tempEntry
      }));
      setShowJournal(false);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center space-x-3">
              <Edit2 size={24} className="text-indigo-600" />
              <h2 className="text-2xl font-bold text-gray-800">Daily Journal</h2>
            </div>
            <button
              onClick={() => setShowJournal(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="p-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                {formatDate(selectedDate)}
              </h3>
              <p className="text-sm text-gray-500">
                Reflect on your day, capture thoughts, and track your journey.
              </p>
            </div>
            
            <textarea
              value={tempEntry}
              onChange={(e) => setTempEntry(e.target.value)}
              placeholder="How was your day? What are you grateful for? What did you learn?"
              className="w-full h-64 p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowJournal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={saveJournal}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Save Entry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ChecklistItem = ({ item, checked }) => (
    <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-all duration-200 cursor-pointer"
         onClick={() => toggleItem(item.id)}>
      <button className="mt-0.5 transition-all duration-200">
        {checked ? 
          <CheckCircle size={22} className="text-emerald-600" /> : 
          <Circle size={22} className="text-gray-400 hover:text-gray-600" />
        }
      </button>
      <div className="flex-1">
        <div className={`font-medium transition-all duration-200 ${
          checked ? 'line-through text-gray-500' : 'text-gray-800'
        }`}>
          {item.label}
        </div>
        <div className="text-sm text-gray-500 mt-0.5">{item.tip}</div>
      </div>
    </div>
  );

  const CategoryCard = ({ categoryKey, category }) => {
    const dateData = getDateData(selectedDate);
    const completion = getCategoryCompletion(categoryKey, selectedDate);
    const Icon = iconMap[category.iconName] || iconMap.Target;
    
    const colorStyles = {
      emerald: 'from-emerald-500 to-green-600',
      blue: 'from-blue-500 to-indigo-600',
      orange: 'from-orange-500 to-red-600',
      purple: 'from-purple-500 to-pink-600',
      indigo: 'from-indigo-500 to-purple-600',
      pink: 'from-pink-500 to-rose-600'
    };

    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className={`bg-gradient-to-r ${colorStyles[category.color]} p-4 text-white`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Icon size={24} />
              <h3 className="text-lg font-semibold">{category.name}</h3>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{completion}%</div>
              <div className="text-sm opacity-90">Complete</div>
            </div>
          </div>
        </div>
        
        <div className="p-4 space-y-2">
          {category.items.map(item => (
            <ChecklistItem 
              key={item.id} 
              item={item} 
              checked={dateData[item.id]} 
            />
          ))}
        </div>
        
        <div className="px-4 pb-4">
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className={`h-3 rounded-full bg-gradient-to-r ${colorStyles[category.color]} transition-all duration-500`}
              style={{ width: `${completion}%` }}
            />
          </div>
        </div>
      </div>
    );
  };

  const WeeklyView = () => {
    const weekData = getWeekData();
    const colorMap = {
      emerald: 'bg-emerald-500',
      blue: 'bg-blue-500',
      orange: 'bg-orange-500',
      purple: 'bg-purple-500',
      indigo: 'bg-indigo-500',
      pink: 'bg-pink-500'
    };

    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Weekly Overview</h3>
        <div className="grid grid-cols-7 gap-4">
          {weekData.map((day, index) => (
            <div key={index} className="text-center">
              <div className="text-sm font-medium text-gray-600 mb-1">{day.day}</div>
              <div className="text-lg font-bold text-gray-800 mb-3">{day.dayNum}</div>
              <div className="space-y-2">
                {Object.entries(categories).map(([key, cat]) => (
                  <div key={key} className="relative group">
                    <div 
                      className={`w-10 h-10 mx-auto rounded-full ${
                        day.categories[key] >= 50 ? colorMap[cat.color] : 'bg-gray-200'
                      } transition-all duration-300`}
                    >
                      <div className="w-full h-full flex items-center justify-center text-white text-xs font-bold">
                        {day.categories[key]}%
                      </div>
                    </div>
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {cat.name}: {day.categories[key]}%
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3 text-sm font-semibold text-gray-700">
                {day.completion}%
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const MonthlyView = () => {
    const monthStats = getMonthData();
    
    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6">30-Day Statistics</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {Object.entries(categories).map(([key, cat]) => {
            const stats = monthStats[key];
            const Icon = iconMap[cat.iconName] || iconMap.Target;
            const colorStyles = {
              emerald: 'from-emerald-500 to-green-600 border-emerald-200 bg-emerald-50',
              blue: 'from-blue-500 to-indigo-600 border-blue-200 bg-blue-50',
              orange: 'from-orange-500 to-red-600 border-orange-200 bg-orange-50',
              purple: 'from-purple-500 to-pink-600 border-purple-200 bg-purple-50',
              indigo: 'from-indigo-500 to-purple-600 border-indigo-200 bg-indigo-50',
              pink: 'from-pink-500 to-rose-600 border-pink-200 bg-pink-50'
            };
            
            return (
              <div key={key} className={`rounded-lg border-2 p-6 ${colorStyles[cat.color].split(' ').slice(2).join(' ')}`}>
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${colorStyles[cat.color].split(' ').slice(0, 2).join(' ')} text-white`}>
                    <Icon size={24} />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800">{cat.name}</h4>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <div className="text-3xl font-bold text-gray-800">{stats.avgCompletion}%</div>
                    <div className="text-sm text-gray-600">Average Completion</div>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Days Completed</span>
                    <span className="font-semibold">{stats.daysCompleted} / {stats.totalDays}</span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full bg-gradient-to-r ${colorStyles[cat.color].split(' ').slice(0, 2).join(' ')}`}
                      style={{ width: `${(stats.daysCompleted / stats.totalDays) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center">
            <Sparkles className="mr-3 text-yellow-500" size={36} />
            Digital Nomad Self-Care Dashboard
            <Sparkles className="ml-3 text-yellow-500" size={36} />
          </h1>
          <p className="text-gray-600 text-lg">Building healthy habits for a balanced nomadic life</p>
        </div>

        {/* Daily Quote */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl shadow-lg p-6 mb-8 text-white">
          <div className="flex items-start space-x-3">
            <Quote className="mt-1 flex-shrink-0" size={24} />
            <div>
              <p className="text-xl font-medium italic mb-2">"{dailyQuote.text}"</p>
              <p className="text-right text-purple-100">— {dailyQuote.author}</p>
            </div>
          </div>
        </div>

        {/* Date Navigation and View Mode */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigateDate(-1)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              
              <button
                onClick={() => setShowCalendar(!showCalendar)}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Calendar size={20} />
                <span className="font-medium">{formatDate(selectedDate)}</span>
              </button>
              
              <button
                onClick={() => navigateDate(1)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                disabled={selectedDate >= new Date().toISOString().split('T')[0]}
              >
                <ChevronRight size={20} />
              </button>
              
              {selectedDate !== new Date().toISOString().split('T')[0] && (
                <button
                  onClick={() => setSelectedDate(new Date().toISOString().split('T')[0])}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors"
                >
                  Today
                </button>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('daily')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  viewMode === 'daily' ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                Daily
              </button>
              <button
                onClick={() => setViewMode('weekly')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  viewMode === 'weekly' ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                Weekly
              </button>
              <button
                onClick={() => setViewMode('monthly')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  viewMode === 'monthly' ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                Monthly
              </button>
              
              <div className="border-l border-gray-300 h-8 mx-2" />
              
              <button
                onClick={() => setShowJournal(true)}
                className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg font-medium hover:bg-indigo-200 transition-colors flex items-center space-x-2"
              >
                <Edit2 size={18} />
                <span>Journal</span>
              </button>
              
              <button
                onClick={() => setShowSettings(true)}
                className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                title="Manage Categories"
              >
                <Settings size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Streaks */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <Flame className="mr-2 text-orange-500" size={24} />
            Current Streaks
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {Object.entries(categories).map(([key, cat]) => {
              const streak = calculateStreak(key);
              const Icon = iconMap[cat.iconName] || iconMap.Target;
              const colorStyles = {
                emerald: 'from-emerald-100 to-green-100 border-emerald-300 text-emerald-800',
                blue: 'from-blue-100 to-indigo-100 border-blue-300 text-blue-800',
                orange: 'from-orange-100 to-red-100 border-orange-300 text-orange-800',
                purple: 'from-purple-100 to-pink-100 border-purple-300 text-purple-800',
                indigo: 'from-indigo-100 to-purple-100 border-indigo-300 text-indigo-800',
                pink: 'from-pink-100 to-rose-100 border-pink-300 text-pink-800'
              };
              
              return (
                <div key={key} className={`bg-gradient-to-r ${colorStyles[cat.color]} border-2 rounded-lg p-4 text-center`}>
                  <Icon className="mx-auto mb-2" size={24} />
                  <div className="text-3xl font-bold">{streak}</div>
                  <div className="text-sm font-medium">day{streak !== 1 ? 's' : ''}</div>
                  <div className="text-xs mt-1 opacity-75">{cat.name}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        {viewMode === 'daily' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(categories).map(([key, cat]) => (
              <CategoryCard key={key} categoryKey={key} category={cat} />
            ))}
          </div>
        )}

        {viewMode === 'weekly' && <WeeklyView />}
        {viewMode === 'monthly' && <MonthlyView />}

        {/* Progress Summary */}
        <div className="mt-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold mb-1">Daily Progress</h3>
              <p className="text-indigo-100">Keep building those healthy habits!</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold">{getDailyCompletion(selectedDate)}%</div>
              <div className="text-sm text-indigo-100">Overall Completion</div>
            </div>
          </div>
          
          <div className="mt-4 flex items-center space-x-2 text-sm">
            <Star className="text-yellow-400" size={20} />
            <span>Remember: Progress over perfection. Every small step counts!</span>
          </div>
        </div>
      </div>
      
      {/* Modals */}
      {showJournal && <JournalModal />}
      {showSettings && <SettingsModal />}
    </div>
  );
};

// Mount the React app
const root = createRoot(document.getElementById('root'));
root.render(<SelfCareToolkit />);