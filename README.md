# 🎮 VidyaKhel (विद्याखेल) — Gamified Learning Platform for Rural India

[![Vite Build Status](https://img.shields.io/badge/Vite-Build%20Passing-brightgreen?logo=vite)](https://vitejs.dev/)
[![React Version](https://img.shields.io/badge/React-18.x-blue?logo=react)](https://react.dev/)
[![Firebase Status](https://img.shields.io/badge/Firebase-Auth%20%26%20Firestore-orange?logo=firebase)](https://firebase.google.com/)


---


## 📌 Project Overview

**VidyaKhel** is a state-of-the-art gamified learning platform tailored specifically for rural Indian students. By blending subject-centric education with captivating game dynamics, dynamic bilingual localizations, score boards, and motivational badges, VidyaKhel turns standard lessons into an engaging journey. 

The platform is student-focused, serverless, and optimized to run out-of-the-box, ensuring a fast, lightweight, and engaging educational experience.


---


## 🛑 Problem Statement

Rural education in India faces multiple hurdles:

1. **Lack of Student Engagement**: Standard rote-learning and text-heavy digital mediums fail to capture the interest of young minds.

2. **Language Barriers**: Digital learning resources are predominantly in English, creating a massive comprehension gap for students who study in regional languages like Hindi.

3. **Complex Setup Barriers**: Most educational tools rely on heavy server setups, complex databases, or paid subscriptions, making them difficult for rural schools or individual households to deploy or access.

4. **Poor Internet/Hardware Limitations**: Rural environments often have access to low-tier smartphones and unstable networks, requiring a lightweight frontend solution.


---


## 💡 Proposed Solution

**VidyaKhel** addresses these issues through a serverless, interactive web application:

- **Gamified Subject Learning**: Reinforcing math and memory/spatial recognition skills using timed challenges, points (XP), and interactive logic boards.

- **Dynamic English/Hindi Bilingual Toggle**: The entire UI (navigation headers, game prompts, labels, instructions, profile details, and notifications) can be toggled instantly between English and Hindi, adapting to the user's primary language.

- **Serverless Firebase Architecture**: Uses Firebase Auth and Cloud Firestore directly from the frontend client. There is no heavy server-side dependency to run or manage—making the project extremely light, scalable, and responsive.

- **Optimized Vanilla CSS UI**: Clean, glassmorphic, and highly interactive user interfaces designed with customized modern CSS, prioritizing quick render times and responsive views for mobile devices.


---


## 🎯 Key Features

# 🌐 Dynamic Bilingual Localization (English/Hindi)
- **Real-Time Translation**: A fully responsive language selector that translates active pages in real-time.
- **Full UI Integration**: Localized dynamic forms, button text, progress labels, results analysis, and achievements.
- **Academic Context**: English subject quizzes remain in English, while Hindi subject quizzes load questions in Hindi, ensuring appropriate academic language context.



### 🧠 Interactive Mini-Games
- **Memory Match Game**: A spatial memory matching game using interactive cards. It displays localized vocabulary pairings (e.g., 🌙 चाँद / Moon, 🐱 बिल्ली / Cat) alongside move counters, active timing, and difficulty levels.
- **Math Challenge**: A rapid-fire arithmetic calculation game featuring dynamic random question generation, multi-difficulty modes, in-game XP triggers, speed-based bonus scoring, and complete performance summaries.



### 📝 Comprehensive Quiz Play
- **Category-Sorted Quizzes**: Organized quiz panels by topic (Math, Science, English, etc.) featuring clear milestone tracking.
- **Practice & Play Modes**: Dynamic interactive quiz interfaces with progress indicators, warning prompts for practice modes, and final score summaries.



### 🏆 Interactive Leaderboard
- **Tier-based Categorization**: Real-time score compilation across three student categories (Group A, Group B, Group C) as well as global rankings.
- **Retention Trackers**: Visual trackers for active user levels, high-score points, and consecutive day streaks.



### 🎁 Rewards & Badges Hub
- **Milestone Systems**: Real-time milestone tracker indicating earned levels and accumulated XP.
- **Badges Unlock**: Visual badge rewards (Bronze, Silver, Gold achievements) unlocked automatically based on scores.



### 👤 Student Dashboard & Custom Profile
- **Personalized Analytics**: Consolidated view of learning statistics (Total XP, Levels, and Streak counts).
- **Profile Customization**: Update profile settings and monitor overall achievement status.


---


## ⚙️ Technology Stack

| Layer | Technology | Usage |
| :--- | :--- | :--- |
| **Framework** | React.js (Vite) | Fast, responsive, component-based frontend |
| **Styling** | Vanilla CSS | Premium glassmomorphic styling, custom dark-mode aesthetics, responsive grids |
| **Authentication** | Firebase Auth | Secure signup, login, session retention, and password reset |
| **Database** | Cloud Firestore | Real-time persistence of user XP, streaks, achievements, and leaderboard statistics |
| **Build Tools** | Vite | Ultra-fast bundling, building, and compilation |


---


## 📁 Project Structure

Here is the exact repository directory tree showing the organization of the frontend project files:

```
gamified-learning-platform/
│
├── docs/                     # API documentation & asset references
│
└── frontend/                 # React (Vite) + Firebase client application
    │
    ├── public/               # Static public assets (images, icons)
    │
    └── src/
        ├── components/       # Reusable layout and UI elements
        │   └── common/
        │       ├── DashboardLayout.jsx  # Layout containing student navbar & sidebar links
        │       └── PublicLayout.jsx     # Navigation layout for landing/public pages
        │
        ├── context/          # Application global state managers
        │   ├── AuthContext.jsx      # Handles Firebase login state, session tracking, & stats
        │   └── LanguageContext.jsx  # Manages translation dictionary keys and current language
        │
        ├── pages/            # Application views and game interfaces
        │   ├── AboutPage.jsx        # About VidyaKhel platform and mission details
        │   ├── ContactPage.jsx      # Contact form with bilingual feedback
        │   ├── ForgotPasswordPage.jsx  # Password recovery with Firebase
        │   ├── GamesPage.jsx        # Landing dashboard for student mini-games
        │   ├── LandingPage.jsx      # Main landing marketing page
        │   ├── LeaderboardPage.jsx  # Grade group & global rankings board
        │   ├── LoginPage.jsx        # Safe authentication portal
        │   ├── MathChallengePage.jsx # Timed rapid-fire math challenge (various difficulties)
        │   ├── MemoryMatchPage.jsx  # Emojis memory matching board game
        │   ├── NotFound.jsx         # 404 Error handler
        │   ├── ProfilePage.jsx      # Student details editor & statistic tracking
        │   ├── QuizPlay.jsx         # Live quiz interface with performance updates
        │   ├── QuizResult.jsx       # Custom grading and points summary cards
        │   ├── QuizzesPage.jsx      # List of all available topic tests
        │   ├── RegisterPage.jsx     # New student onboarding form
        │   ├── RewardsPage.jsx      # Badge display and achievement level milestones
        │   ├── StudentDashboard.jsx # Personalized metrics dashboard
        │   └── SubjectsPage.jsx     # Curriculum subject grid selection
        │
        ├── styles/           # Styling files
        │   └── index.css            # Custom CSS styling tokens & layout rules
        │
        ├── App.jsx           # Application entry points and route structures
        ├── firebase.js       # Live server connection scripts (Auth / Firestore)
        └── main.jsx          # React root wrapper
```


---


## 🚀 Setup & Usage Instructions

Follow these step-by-step instructions to get VidyaKhel running locally on your computer.

### Prerequisites
Make sure you have **Node.js** installed on your system (Recommended: Node.js 18+).

### Step 1: Clone the Repository
```bash
git clone <your-repository-url>
cd gamified-learning-platform
```

### Step 2: Navigate to Frontend Directory
```bash
cd frontend
```

### Step 3: Install Dependencies
Install all the required React and Firebase dependencies:
```bash
npm install
```

### Step 4: Run Development Server
Start the local Vite development server:
```bash
npm run dev
```
Once started, open your browser and navigate to the local URL (usually **`http://localhost:5173`**).

### Step 5: Build for Production
To bundle and compile the project for production, run:
```bash
npm run build
```
The compiled static assets will be created in the `frontend/dist/` directory, ready to be deployed to any static host (like Netlify, Vercel, or Firebase Hosting).

> [!NOTE]  
> **No Configuration Needed:** The database configuration (Firebase API keys) is pre-embedded inside the codebase in the file `src/firebase.js`. The app will connect to our live sandbox database immediately upon launch.


---


## 👤 Developer Details

This project was built entirely by a single developer:

- **Name**: Yash
- **GitHub**: https://github.com/Yash21743
- **Role**: Full-Stack Frontend  Developer


---

