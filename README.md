# Reats Cookers

Mobile application for restaurant owners to manage their dishes, menus, and establishments.

---

## 📋 Table of Contents

- [Prerequisites](#-prerequisites)
- [Installation on macOS](#-installation-on-macos)
- [Installation on Windows](#-installation-on-windows)
- [Project Configuration](#-project-configuration)
- [Running the Project](#-running-the-project)
- [Available Scripts](#-available-scripts)
- [Project Structure](#-project-structure)
- [Build and Deployment](#-build-and-deployment)
- [Troubleshooting](#-troubleshooting)

---

## 🔧 Prerequisites

| Tool | Minimum Version |
|------|-----------------|
| Node.js | 18.x or higher |
| Yarn | 1.22.x or higher |
| Expo CLI | Latest version |
| EAS CLI | >= 16.2.1 |
| Git | 2.x or higher |

### Optional Tools (for native development)

| Tool | Platform | Usage |
|------|----------|-------|
| Xcode | macOS only | iOS Build |
| Android Studio | macOS / Windows | Android Build |
| Watchman | macOS (recommended) | File watching |

---

## 🍎 Installation on macOS

### 1. Install Homebrew (if not installed)

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### 2. Install Node.js

```bash
# Via Homebrew
brew install node

# Or via nvm (recommended for managing multiple versions)
brew install nvm
nvm install 18
nvm use 18
```

### 3. Install Yarn

```bash
# Via npm
npm install -g yarn

# Or via Homebrew
brew install yarn
```

### 4. Install Watchman (recommended)

```bash
brew install watchman
```

### 5. Install Expo CLI and EAS CLI

```bash
npm install -g expo-cli eas-cli
```

### 6. iOS Configuration (optional - for native build)

1. Install **Xcode** from the App Store
2. Open Xcode and accept the license
3. Install command line tools:

```bash
xcode-select --install
```

4. Install CocoaPods:

```bash
sudo gem install cocoapods
```

### 7. Android Configuration (optional - for native build)

1. Download and install [Android Studio](https://developer.android.com/studio)
2. Open Android Studio > Preferences > Appearance & Behavior > System Settings > Android SDK
3. Install the following components:
   - Android SDK Platform 34
   - Android SDK Build-Tools 34.0.0
   - Android Emulator
   - Android SDK Platform-Tools

4. Configure environment variables in `~/.zshrc` or `~/.bash_profile`:

```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

5. Reload the terminal:

```bash
source ~/.zshrc
```

---

## 🪟 Installation on Windows

### 1. Install Node.js

1. Download the installer from [nodejs.org](https://nodejs.org/)
2. Run the installer and follow the instructions
3. Verify the installation:

```powershell
node --version
npm --version
```

**Alternative with nvm-windows (recommended):**

1. Download [nvm-windows](https://github.com/coreybutler/nvm-windows/releases)
2. Install and restart the terminal
3. Install Node.js:

```powershell
nvm install 18
nvm use 18
```

### 2. Install Yarn

```powershell
npm install -g yarn
```

### 3. Install Expo CLI and EAS CLI

```powershell
npm install -g expo-cli eas-cli
```

### 4. Android Configuration (optional - for native build)

1. Download and install [Android Studio](https://developer.android.com/studio)
2. During installation, check:
   - Android SDK
   - Android SDK Platform
   - Android Virtual Device

3. Open Android Studio > File > Settings > Appearance & Behavior > System Settings > Android SDK
4. Install the following components:
   - Android SDK Platform 34
   - Android SDK Build-Tools 34.0.0
   - Android Emulator
   - Android SDK Platform-Tools

5. Configure environment variables:
   - Open "Advanced System Settings" > "Environment Variables"
   - Add a new system variable:
     - Name: `ANDROID_HOME`
     - Value: `C:\Users\<YourName>\AppData\Local\Android\Sdk`
   - Edit the `Path` variable and add:
     - `%ANDROID_HOME%\emulator`
     - `%ANDROID_HOME%\platform-tools`

6. Restart the terminal

---

## ⚙️ Project Configuration

### 1. Clone the repository

```bash
git clone <repository-url>
cd reats-cookers
```

### 2. Install dependencies

```bash
cd source
yarn install
```

### 3. Configure environment variables

Create a `.env` file at the project root (at the same level as `source/`):

```bash
# Environment (development | staging | production)
ENV=development

# API URLs per environment
EXPO_PUBLIC_DEVELOPMENT_API_BASE_URL=https://dev-api.reats.com
EXPO_PUBLIC_STAGING_API_BASE_URL=https://staging-api.reats.com
EXPO_PUBLIC_PRODUCTION_API_BASE_URL=https://api.reats.com

# API Keys
EXPO_PUBLIC_DEVELOPMENT_API_KEY=your_dev_api_key
EXPO_PUBLIC_STAGING_API_KEY=your_staging_api_key
EXPO_PUBLIC_PRODUCTION_API_KEY=your_prod_api_key

# Application origin header
EXPO_PUBLIC_APP_ORIGIN=cooker
```

### 4. Log in to Expo (optional - for EAS Build)

```bash
eas login
```

---

## 🚀 Running the Project

### Start the development server

```bash
cd source
yarn start
```

### Run on a specific device/emulator

```bash
# iOS (macOS only)
yarn ios

# Android
yarn android

# Web
yarn web
```

### Using Expo Go

1. Install the **Expo Go** app on your mobile device:
   - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
   - [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. Scan the QR code displayed in the terminal with:
   - iOS: Native Camera
   - Android: Expo Go app

---

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| `yarn start` | Starts the Expo development server |
| `yarn ios` | Runs the app on iOS simulator |
| `yarn android` | Runs the app on Android emulator |
| `yarn web` | Runs the app in the browser |
| `yarn lint` | Checks code with ESLint |
| `yarn lint:fix` | Automatically fixes ESLint errors |
| `yarn format` | Formats code with Prettier |
| `yarn format:check` | Checks code formatting |
| `yarn lint:all` | Runs lint:fix and format |

---

## 📁 Project Structure

```
reats-cookers/
├── .github/              # GitHub configuration (CI/CD, workflows)
├── docs/                 # Additional documentation
├── source/               # Application source code
│   ├── api/              # API services and calls
│   ├── assets/           # Static resources (images, fonts)
│   ├── components/       # Reusable React components
│   ├── constants/        # Application constants
│   ├── contexts/         # React contexts (global state)
│   ├── core/             # Core business logic
│   ├── data/             # Static data
│   ├── hooks/            # Custom React hooks
│   ├── layouts/          # Application layouts
│   ├── legacy/           # Legacy code (to be migrated)
│   ├── locales/          # Translation files (i18n)
│   ├── mocks/            # Mock data for testing
│   ├── screens/          # Application screens
│   ├── types/            # TypeScript types
│   ├── utils/            # Utility functions
│   ├── App.tsx           # Application entry point
│   ├── app.config.ts     # Expo configuration
│   ├── env.ts            # Environment variables management
│   ├── eas.json          # EAS Build configuration
│   ├── package.json      # Dependencies and scripts
│   └── tailwind.config.js # TailwindCSS/NativeWind configuration
└── README.md             # This file
```

---

## 🏗️ Build and Deployment

### Development build (preview)

```bash
cd source

# Android Build
eas build --profile preview --platform android

# iOS Build
eas build --profile preview --platform ios
```

### Production build

```bash
cd source

# Android Build
eas build --profile production --platform android

# iOS Build
eas build --profile production --platform ios
```

### Store submission

```bash
# Google Play Store
eas submit --platform android --profile production

# Apple App Store (TestFlight)
eas submit --platform ios --profile testflight

# Apple App Store (Production)
eas submit --platform ios --profile production
```

---

## 🔍 Troubleshooting

### Common Issues

#### Metro bundler won't start

```bash
# Clear the cache
cd source
yarn start --clear
```

#### "Unable to resolve module" error

```bash
# Reinstall dependencies
cd source
rm -rf node_modules
yarn install
```

#### Watchman error on Linux/WSL

```bash
# Increase inotify limits
echo fs.inotify.max_user_instances=524288 | sudo tee -a /etc/sysctl.conf
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
echo fs.inotify.max_queued_events=524288 | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

#### Expo cache issues

```bash
# Clear all caches
cd source
expo start -c
# or
npx expo start --clear
```

#### iOS build error (CocoaPods)

```bash
cd source/ios
pod install --repo-update
```

#### Android build error (Gradle)

```bash
cd source/android
./gradlew clean
```

### Full Reset

If nothing works, perform a full reset:

```bash
cd source

# Remove caches and dependencies
rm -rf node_modules
rm -rf .expo
rm -rf ios/Pods
rm -rf android/.gradle

# Reinstall
yarn install

# Restart
yarn start --clear
```

---

## 📚 Useful Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [EAS Build Documentation](https://docs.expo.dev/build/introduction/)
- [NativeWind Documentation](https://www.nativewind.dev/)
- [React Navigation Documentation](https://reactnavigation.org/docs/getting-started)

---