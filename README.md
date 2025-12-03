# Reats Cookers

Application mobile destinée aux restaurateurs pour la gestion de leurs plats, menus et établissements.

---

## 📋 Table des matières

- [Prérequis](#-prérequis)
- [Installation sur macOS](#-installation-sur-macos)
- [Installation sur Windows](#-installation-sur-windows)
- [Configuration du projet](#-configuration-du-projet)
- [Lancement du projet](#-lancement-du-projet)
- [Scripts disponibles](#-scripts-disponibles)
- [Structure du projet](#-structure-du-projet)
- [Build et déploiement](#-build-et-déploiement)
- [Dépannage](#-dépannage)

---

## 🔧 Prérequis

| Outil | Version minimale |
|-------|------------------|
| Node.js | 18.x ou supérieur |
| Yarn | 1.22.x ou supérieur |
| Expo CLI | Dernière version |
| EAS CLI | >= 16.2.1 |
| Git | 2.x ou supérieur |

### Outils optionnels (pour le développement natif)

| Outil | Plateforme | Usage |
|-------|------------|-------|
| Xcode | macOS uniquement | Build iOS |
| Android Studio | macOS / Windows | Build Android |
| Watchman | macOS (recommandé) | File watching |

---

## 🍎 Installation sur macOS

### 1. Installer Homebrew (si non installé)

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### 2. Installer Node.js

```bash
# Via Homebrew
brew install node

# Ou via nvm (recommandé pour gérer plusieurs versions)
brew install nvm
nvm install 18
nvm use 18
```

### 3. Installer Yarn

```bash
# Via npm
npm install -g yarn

# Ou via Homebrew
brew install yarn
```

### 4. Installer Watchman (recommandé)

```bash
brew install watchman
```

### 5. Installer Expo CLI et EAS CLI

```bash
npm install -g expo-cli eas-cli
```

### 6. Configuration iOS (optionnel - pour build natif)

1. Installer **Xcode** depuis l'App Store
2. Ouvrir Xcode et accepter la licence
3. Installer les outils en ligne de commande :

```bash
xcode-select --install
```

4. Installer CocoaPods :

```bash
sudo gem install cocoapods
```

### 7. Configuration Android (optionnel - pour build natif)

1. Télécharger et installer [Android Studio](https://developer.android.com/studio)
2. Ouvrir Android Studio > Preferences > Appearance & Behavior > System Settings > Android SDK
3. Installer les composants suivants :
   - Android SDK Platform 34
   - Android SDK Build-Tools 34.0.0
   - Android Emulator
   - Android SDK Platform-Tools

4. Configurer les variables d'environnement dans `~/.zshrc` ou `~/.bash_profile` :

```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

5. Recharger le terminal :

```bash
source ~/.zshrc
```

---

## 🪟 Installation sur Windows

### 1. Installer Node.js

1. Télécharger l'installateur depuis [nodejs.org](https://nodejs.org/)
2. Exécuter l'installateur et suivre les instructions
3. Vérifier l'installation :

```powershell
node --version
npm --version
```

**Alternative avec nvm-windows (recommandé) :**

1. Télécharger [nvm-windows](https://github.com/coreybutler/nvm-windows/releases)
2. Installer et redémarrer le terminal
3. Installer Node.js :

```powershell
nvm install 18
nvm use 18
```

### 2. Installer Yarn

```powershell
npm install -g yarn
```

### 3. Installer Expo CLI et EAS CLI

```powershell
npm install -g expo-cli eas-cli
```

### 4. Configuration Android (optionnel - pour build natif)

1. Télécharger et installer [Android Studio](https://developer.android.com/studio)
2. Pendant l'installation, cocher :
   - Android SDK
   - Android SDK Platform
   - Android Virtual Device

3. Ouvrir Android Studio > File > Settings > Appearance & Behavior > System Settings > Android SDK
4. Installer les composants suivants :
   - Android SDK Platform 34
   - Android SDK Build-Tools 34.0.0
   - Android Emulator
   - Android SDK Platform-Tools

5. Configurer les variables d'environnement :
   - Ouvrir "Paramètres système avancés" > "Variables d'environnement"
   - Ajouter une nouvelle variable système :
     - Nom : `ANDROID_HOME`
     - Valeur : `C:\Users\<VotreNom>\AppData\Local\Android\Sdk`
   - Modifier la variable `Path` et ajouter :
     - `%ANDROID_HOME%\emulator`
     - `%ANDROID_HOME%\platform-tools`

6. Redémarrer le terminal

---

## ⚙️ Configuration du projet

### 1. Cloner le repository

```bash
git clone <url-du-repository>
cd reats-cookers
```

### 2. Installer les dépendances

```bash
cd source
yarn install
```

### 3. Configurer les variables d'environnement

Créer un fichier `.env` à la racine du projet (au même niveau que `source/`) :

```bash
# Environnement (development | staging | production)
ENV=development

# URLs de l'API selon l'environnement
EXPO_PUBLIC_DEVELOPMENT_API_BASE_URL=https://dev-api.reats.com
EXPO_PUBLIC_STAGING_API_BASE_URL=https://staging-api.reats.com
EXPO_PUBLIC_PRODUCTION_API_BASE_URL=https://api.reats.com

# Clés API
EXPO_PUBLIC_DEVELOPMENT_API_KEY=your_dev_api_key
EXPO_PUBLIC_STAGING_API_KEY=your_staging_api_key
EXPO_PUBLIC_PRODUCTION_API_KEY=your_prod_api_key

# Header d'origine de l'application
EXPO_PUBLIC_APP_ORIGIN=cooker
```

### 4. Se connecter à Expo (optionnel - pour EAS Build)

```bash
eas login
```

---

## 🚀 Lancement du projet

### Démarrer le serveur de développement

```bash
cd source
yarn start
```

### Lancer sur un appareil/émulateur spécifique

```bash
# iOS (macOS uniquement)
yarn ios

# Android
yarn android

# Web
yarn web
```

### Utiliser Expo Go

1. Installer l'application **Expo Go** sur votre appareil mobile :
   - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
   - [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. Scanner le QR code affiché dans le terminal avec :
   - iOS : Caméra native
   - Android : Application Expo Go

---

## 📜 Scripts disponibles

| Script | Description |
|--------|-------------|
| `yarn start` | Démarre le serveur de développement Expo |
| `yarn ios` | Lance l'app sur simulateur iOS |
| `yarn android` | Lance l'app sur émulateur Android |
| `yarn web` | Lance l'app dans le navigateur |
| `yarn lint` | Vérifie le code avec ESLint |
| `yarn lint:fix` | Corrige automatiquement les erreurs ESLint |
| `yarn format` | Formate le code avec Prettier |
| `yarn format:check` | Vérifie le formatage du code |
| `yarn lint:all` | Exécute lint:fix et format |

---

## 📁 Structure du projet

```
reats-cookers/
├── .github/              # Configuration GitHub (CI/CD, workflows)
├── docs/                 # Documentation additionnelle
├── source/               # Code source de l'application
│   ├── api/              # Services et appels API
│   ├── assets/           # Ressources statiques (images, fonts)
│   ├── components/       # Composants React réutilisables
│   ├── constants/        # Constantes de l'application
│   ├── contexts/         # Contextes React (state global)
│   ├── core/             # Logique métier centrale
│   ├── data/             # Données statiques
│   ├── hooks/            # Custom hooks React
│   ├── layouts/          # Layouts de l'application
│   ├── legacy/           # Code legacy (à migrer)
│   ├── locales/          # Fichiers de traduction (i18n)
│   ├── mocks/            # Données mockées pour les tests
│   ├── screens/          # Écrans de l'application
│   ├── types/            # Types TypeScript
│   ├── utils/            # Fonctions utilitaires
│   ├── App.tsx           # Point d'entrée de l'application
│   ├── app.config.ts     # Configuration Expo
│   ├── env.ts            # Gestion des variables d'environnement
│   ├── eas.json          # Configuration EAS Build
│   ├── package.json      # Dépendances et scripts
│   └── tailwind.config.js # Configuration TailwindCSS/NativeWind
└── README.md             # Ce fichier
```

---

## 🏗️ Build et déploiement

### Build de développement (preview)

```bash
cd source

# Build Android
eas build --profile preview --platform android

# Build iOS
eas build --profile preview --platform ios
```

### Build de production

```bash
cd source

# Build Android
eas build --profile production --platform android

# Build iOS
eas build --profile production --platform ios
```

### Soumission aux stores

```bash
# Google Play Store
eas submit --platform android --profile production

# Apple App Store (TestFlight)
eas submit --platform ios --profile testflight

# Apple App Store (Production)
eas submit --platform ios --profile production
```

---

## 🔍 Dépannage

### Problèmes courants

#### Metro bundler ne démarre pas

```bash
# Nettoyer le cache
cd source
yarn start --clear
```

#### Erreur "Unable to resolve module"

```bash
# Réinstaller les dépendances
cd source
rm -rf node_modules
yarn install
```

#### Erreur watchman sur Linux/WSL

```bash
# Augmenter les limites inotify
echo fs.inotify.max_user_instances=524288 | sudo tee -a /etc/sysctl.conf
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
echo fs.inotify.max_queued_events=524288 | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

#### Problèmes de cache Expo

```bash
# Nettoyer tous les caches
cd source
expo start -c
# ou
npx expo start --clear
```

#### Erreur de build iOS (CocoaPods)

```bash
cd source/ios
pod install --repo-update
```

#### Erreur de build Android (Gradle)

```bash
cd source/android
./gradlew clean
```

### Réinitialisation complète

Si rien ne fonctionne, effectuer une réinitialisation complète :

```bash
cd source

# Supprimer les caches et dépendances
rm -rf node_modules
rm -rf .expo
rm -rf ios/Pods
rm -rf android/.gradle

# Réinstaller
yarn install

# Relancer
yarn start --clear
```

---

## 📚 Ressources utiles

- [Documentation Expo](https://docs.expo.dev/)
- [Documentation React Native](https://reactnative.dev/docs/getting-started)
- [Documentation EAS Build](https://docs.expo.dev/build/introduction/)
- [Documentation NativeWind](https://www.nativewind.dev/)
- [Documentation React Navigation](https://reactnavigation.org/docs/getting-started)

---