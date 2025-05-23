# Digital Nomad Self-Care Dashboard 🌍✨

A beautiful Electron desktop app for digital nomads to track their daily self-care habits and maintain a healthy work-life balance while traveling.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Electron](https://img.shields.io/badge/electron-36.3.1-47848F?logo=electron)
![React](https://img.shields.io/badge/react-19.1.0-61DAFB?logo=react)
![Tailwind CSS](https://img.shields.io/badge/tailwindcss-3.4.17-06B6D4?logo=tailwindcss)

## Features 🚀

### 📊 Habit Tracking
- **6 Default Categories**: Exercise, Work, Nutrition, Meditation, Reading, Social Connections
- **Custom Categories**: Add unlimited categories with custom icons and colors
- **Task Management**: Add, edit, and delete tasks within each category
- **Progress Tracking**: Visual progress bars and completion percentages

### 📅 Multiple Views
- **Daily View**: Focus on today's tasks with detailed checklists
- **Weekly View**: See your 7-day progress at a glance
- **Monthly View**: 30-day statistics and trends

### 📝 Daily Journal
- Write reflections for each day
- Track thoughts, gratitude, and learnings
- All entries saved locally

### 🔥 Streak Tracking
- Automatic streak calculation for each category
- Visual streak display with fire emoji
- Motivation to maintain consistency

### 💾 Data Persistence
- All data saved locally using localStorage
- Works offline - perfect for travelers
- No account or internet required

## Installation 📦

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Setup
```bash
# Clone the repository
git clone https://github.com/ahmedyounis/self-care-dashboard.git
cd self-care-dashboard

# Install dependencies
npm install

# Build the app
npm run build

# Generate Tailwind CSS
./node_modules/.bin/tailwindcss -i ./styles.css -o ./dist/tailwind.css

# Start the app
npm start
```

## Development 🛠️

```bash
# Run in development mode
npm run build:all

# Build for distribution
npm run dist
```

## Tech Stack 💻

- **Electron** - Desktop app framework
- **React 19** - UI library
- **Tailwind CSS** - Styling
- **Lucide React** - Beautiful icons
- **Webpack** - Module bundler

## Features in Detail 🎯

### Category Management
- Edit any category (name, icon, color)
- Delete categories (minimum 1 required)
- Reset to defaults option
- Choose from 10+ icons and 6 colors

### Task Management
- Add custom tasks to any category
- Edit task names and tips
- Delete tasks
- Each category can have unlimited tasks

### Motivational Quotes
- 30+ curated quotes
- Daily rotation
- Focuses on productivity and self-care

## Contributing 🤝

Contributions are welcome! Please feel free to submit a Pull Request.

## License 📄

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments 🙏

- Built with ❤️ for digital nomads worldwide
- Inspired by the need for consistent self-care while traveling
- Special thanks to the Electron, React, and Tailwind CSS communities

---

**Made by [Ahmed Younis](https://github.com/ahmedyounis)**