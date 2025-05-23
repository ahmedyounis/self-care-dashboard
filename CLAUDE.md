# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Electron desktop application built with React 19 and Tailwind CSS. It's a self-care tracking dashboard for digital nomads to monitor daily habits across multiple categories.

## Build Commands

```bash
# Install dependencies
npm install

# Build React bundle
npm run build

# Generate Tailwind CSS (required after any style changes)
./node_modules/.bin/tailwindcss -i ./styles.css -o ./dist/tailwind.css

# Combined build (webpack + tailwind)
npm run build:all

# Start the Electron app
npm start

# Build for distribution
npm run dist
```

## Architecture

### Core Files
- `main.js` - Electron main process, creates BrowserWindow
- `renderer.js` - React application entry point, contains all component logic in a single file
- `preload.js` - Electron preload script for context isolation
- `index.html` - HTML entry point that loads the React bundle

### Key Data Structures

**Categories**: Stored as objects with iconName (string), color, and items array
```javascript
{
  exercise: {
    name: 'Exercise',
    iconName: 'Dumbbell',  // Must match key in iconMap
    color: 'emerald',
    items: [{ id: 'ex1', label: 'Task name', tip: 'Task description' }]
  }
}
```

**Data Persistence**: All data saved to localStorage
- `selfCareDailyData` - Task completion by date
- `selfCareJournalEntries` - Journal entries by date  
- `selfCareCategories` - User's categories (defaults + custom)

### Icon System

Icons are from lucide-react but stored as string names in data. The `iconMap` object in renderer.js maps names to components. When adding new icons:
1. Import from lucide-react
2. Add to iconMap object
3. Use the string name in category data

### State Management

The app uses React hooks with localStorage for persistence. Key states:
- `categories` - All category definitions
- `dailyData` - Task completion tracking
- `journalEntries` - Daily journal content

## Development Notes

- The app uses webpack in development mode for better debugging
- Tailwind CSS must be recompiled after style changes
- All components are in a single `renderer.js` file (no component splitting)
- Minimum 1 category enforced in the UI
- Icons cannot be serialized to localStorage, only icon names

## Git Workflow

The repository uses GitHub CLI for operations:
```bash
gh repo view ahmedyounis/self-care-dashboard
```