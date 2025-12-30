# QuestLog - Gamified Todo List

A beautifully designed, gamified todo list application where you level up by completing quests. Built with vanilla JavaScript, powered by Supabase, and designed with Material Design 3 principles.

![Version](https://img.shields.io/badge/version-1.2.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

- **🎮 Gamification System**
  - Level up by completing tasks (quests)
  - Earn XP and coins
  - Track your progress with streaks
  - Unlock achievements

- **⚔️ Boss Battles**
  - Challenge epic bosses as you level up
  - Turn-based combat system
  - Earn legendary rewards
  - Progress saved to your profile

- **🏪 Rewards Shop**
  - Spend coins on themes and effects
  - Customize your experience
  - Unlock premium visual upgrades

- **🎨 Modern UI/UX**
  - Material Design 3 (M3) aesthetics
  - Smooth animations and transitions
  - Glassmorphism effects
  - Responsive design

- **🔒 Secure Authentication**
  - Email/password authentication via Supabase
  - Session management
  - Row-level security (RLS)

## 🚀 Quick Start

### Prerequisites

- A modern web browser (Chrome, Firefox, Edge)
- A Supabase account (for backend)
- Basic knowledge of HTML/CSS/JavaScript (for development)

### Installation

1. **Clone or download this repository**
   ```bash
   git clone <your-repo-url>
   cd "C++ 2nd project"
   ```

2. **Configure Supabase**
   - Create a new project at [supabase.com](https://supabase.com)
   - Run the SQL migrations in `frontend/boss_battles_migration.sql` and `frontend/security_policies.sql`
   - Get your project URL and anon key

3. **Update Configuration**
   - Open `frontend/config.js`
   - Replace the Supabase URL and anon key with your project credentials:
     ```javascript
     supabase: {
       url: 'YOUR_SUPABASE_URL',
       anonKey: 'YOUR_SUPABASE_ANON_KEY'
     }
     ```

4. **Run Locally**
   - Open `frontend/auth.html` in your browser directly, or
   - Use a local server (recommended):
     ```bash
     # Using Python
     cd frontend
     python -m http.server 8000
     
     # Using Node.js (http-server)
     npx http-server frontend -p 8000
     ```
   - Navigate to `http://localhost:8000/auth.html`

## 📁 Project Structure

```
C++ 2nd project/
└── frontend/
    ├── index.html              # Main dashboard
    ├── auth.html               # Authentication page
    ├── config.js               # Configuration (credentials)
    ├── app.js                  # Main application logic
    ├── auth.js                 # Authentication logic
    ├── boss_battles.js         # Boss battle system
    ├── styles.css              # Main stylesheet
    ├── boss_battles.css        # Boss battle styles
    ├── assets/                 # Images and icons
    ├── boss_battles_migration.sql    # Database schema
    └── security_policies.sql   # RLS policies
```

## 🗄️ Database Setup

1. **Run Migrations**
   - Copy the contents of `boss_battles_migration.sql`
   - Run it in your Supabase SQL editor
   - Copy and run `security_policies.sql` for security policies

2. **Tables Created**
   - `profiles` - User profiles with levels, XP, coins
   - `quests` - User quests/tasks
   - `user_achievements` - Achievement tracking
   - `boss_progress` - Boss battle progress

## 🔐 Security Best Practices

### For Production Deployment

1. **Never commit credentials to public repositories**
   - Add `config.js` to `.gitignore`
   - Use environment variables on your hosting platform

2. **Platform-Specific Setup**

   **Netlify:**
   ```
   Site Settings → Environment Variables → Add:
   SUPABASE_URL=your_url
   SUPABASE_ANON_KEY=your_key
   ```

   **Vercel:**
   ```
   Project Settings → Environment Variables → Add:
   SUPABASE_URL=your_url
   SUPABASE_ANON_KEY=your_key
   ```

   **GitHub Pages:**
   - Use GitHub Secrets
   - Configure a build action to inject variables at build time

3. **Update CSP Headers**
   - The app includes strict Content Security Policy headers
   - If deploying to a different domain, update the CSP in `index.html` and `auth.html`

## 🎮 Boss Battle System

### How It Works

1. **Level Requirements**
   - Each boss requires a minimum character level
   - Unlock progressively harder bosses as you level up

2. **Combat Mechanics**
   - Turn-based combat system
   - Attack or flee options
   - Critical hits for bonus damage
   - HP scaling based on your level

3. **Rewards**
   - XP rewards (even on defeat)
   - Coin rewards (victory only)
   - Achievement unlocks
   - Progress tracking

### Testing Boss Battles

To test the boss battle system:

1. Login or signup at auth.html
2. Complete a few quests to gain XP
3. Click the "⚔️ Boss Battles" tab
4. Select the Goblin King (Level 1 requirement)
5. Click "Challenge" to start the battle
6. Use "Attack" to fight or "Retreat" to flee

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop browsers (Chrome, Firefox, Edge, Safari)
- Tablets
- Mobile devices

## 🎨 Customization

### Adding New Themes

Edit `GAME_CONFIG.shopItems` in `app.js`:
```javascript
{
  id: 'theme_custom',
  name: 'My Theme',
  description: 'Custom theme description',
  cost: 300,
  type: 'theme',
  value: 'custom',
  icon: '🎨'
}
```

### Adding New Bosses

Edit `GAME_CONFIG.bosses` in `app.js`:
```javascript
{
  id: 'boss_custom',
  name: 'Custom Boss',
  icon: '👾',
  description: 'Boss description',
  requiredLevel: 5,
  baseHP: 300,
  baseDamage: 15,
  reward: { xp: 150, coins: 80 },
  difficulty: 'medium',
  color: 'var(--md-secondary)'
}
```

## 🐛 Troubleshooting

### Common Issues

1. **"Configuration not loaded" error**
   - Ensure `config.js` is included before other scripts in HTML files
   - Check that credentials are correctly set in `config.js`

2. **Authentication fails**
   - Verify Supabase project is active
   - Check that email confirmation is disabled in Supabase auth settings
   - Confirm RLS policies are properly set

3. **Boss battles not loading**
   - Ensure boss_battles_migration.sql has been run
   - Check browser console for errors
   - Verify boss_battles.js is loaded after app.js

## 📝 License

MIT License - feel free to use this project for learning and personal projects.

## 🙏 Credits

- Built with [Supabase](https://supabase.com)
- Design inspired by Material Design 3
- Icons and emojis from Unicode

---

**Made with ❤️ for productivity gamification**
