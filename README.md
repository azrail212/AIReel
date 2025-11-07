# AIReel

AIReel is a React Native app (Expo + TypeScript) built with Expo Router and NativeWind for styling. It includes a bottom tab navigation layout, custom tab icons, and a small component structure for screens and shared components.

This README covers how to set up and run the project on Windows (PowerShell), common development commands pulled from `package.json`, and some tips specific to this repo.

---

## Tech stack

- React Native (0.81.x)
- Expo (managed workflow)
- TypeScript
- expo-router
- NativeWind (Tailwind for React Native)
- ESLint + Prettier

Dependencies are listed in `package.json`.

---

## Prerequisites

- Node.js (>= 18 recommended)
- npm (comes with Node) or Yarn
- Expo CLI (optional, you can use `npx expo`)
- Android Studio / Emulator or Xcode / Simulator (for device/emulator testing)

On Windows (PowerShell) you can install Expo CLI globally if you prefer:

```powershell
npm install --global expo-cli
# or use npx: npx expo
```

---

## Quick start (PowerShell)

```markdown
# AIReel

AIReel is a lightweight app for sharing digital AI-generated content. It’s built with Expo, React Native and TypeScript and uses Expo Router for navigation and NativeWind for styling.

## What it is

- Share, browse, and organize digital AI content (images, clips, prompts, etc.).
- Simple bottom-tab navigation with custom icons.

## Quick start (Windows / PowerShell)

1. Install dependencies

```powershell
cd "c:\Users\Azra Kadric\Desktop\react-native-course\AIReel"
npm install
```

2. Start the app

```powershell
npm run start    # open Expo dev tools
npm run android  # start and open on Android emulator/device
# npm run ios    # macOS only
```

## Scripts

- `npm run start` — start Expo (Metro) and open dev tools
- `npm run android` — start and open on Android
- `npm run web` — run in web browser
- `npm run lint` — run ESLint + Prettier checks
- `npm run format` — auto-fix lint issues and format files

## Tech stack

- Expo + React Native
- TypeScript
- expo-router
- NativeWind (Tailwind-like styling)

## 🧩 Signup Flow

Below is the Appwrite signup flow used in the React Native app:


flowchart TD
    A[User submits email, password, username] --> B[createUser() called]
    B --> C[Appwrite Account.create()]
    C --> D{Account created?}
    D -- No --> E[Throw Error]
    D -- Yes --> F[Generate avatar URL using avatars.getInitials()]
    F --> G[Sign in via account.createEmailSession()]
    G --> H[Create document in Appwrite Database]
    H --> I[Return new user object]



## Notes & tips

- If tab labels wrap or truncate, adjust the tab label/container width in `app/(tabs)/_layout.tsx` (the `TabIcon` `View`).
- For implicit `any` TypeScript warnings, add explicit prop types (e.g. `ImageSourcePropType` for icon props).
- Clear Metro cache if styles or assets act weird: `npx expo start -c`

## Contributing

Small repo — open issues or PRs for bug fixes or tiny features. Follow standard GitHub flow.



