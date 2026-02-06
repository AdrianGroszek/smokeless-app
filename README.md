# Built as a personal project to practice React Native

# 🚭 PuffFree - Smoking Tracker

A mobile app that helps users quit smoking by gradually reducing their daily cigarette limit.

## 📱 About The Project

PuffFree is a React Native mobile application designed to help users quit smoking in a controlled manner. The app automatically decreases the daily cigarette limit, enabling gradual withdrawal from nicotine addiction without sudden cessation.

## ✨ Features

- 📊 Real-time tracking of smoked cigarettes
- 📉 Automatic daily limit reduction
- 📈 Progress visualization (charts, statistics)
- 🎯 Personalized quitting plan
- 💾 Local data persistence
- 📅 Smoking history

## 🛠️ Tech Stack

- **React Native (Expo)**
- **TypeScript**
- **Zustand**
- **AsyncStorage**

## 📸 Screenshots

![Home screen](https://github.com/user-attachments/assets/1d6f5956-2280-4963-b3bc-70375dcebe53)
![Home screen (dark mode)](https://github.com/user-attachments/assets/30dd8be0-b7ff-4566-89b5-bb95c4dfc35c)
![Progress screen #1](https://github.com/user-attachments/assets/9b757e2e-8fc1-4f13-963f-4c00eab1b815)
![Progress screen #2](https://github.com/user-attachments/assets/c0067704-6308-4441-beab-a145187c7e73)
![Settings screen](https://github.com/user-attachments/assets/31e7b5d7-5d38-42da-bd7b-f48b960b08bc)

### Getting Started

1. Clone the repository
```bash
git clone https://github.com/AdrianGroszek/smokeless-app.git
cd smokeless-app
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Run the app
```bash
npx expo start
```

## 📂 Project Structure
```
src/
├── app/            # Screens, Expo router
├── components/     # Reusable components
├── constants/      # App constants
├── stores/         # State management (Zustand)
├── utils/          # Helper functions
├── hooks/          # Custom React hooks
├── UI/             # UI components
└── assets/         # Images, icons
```
