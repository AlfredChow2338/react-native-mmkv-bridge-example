# Project Context

## Purpose
MMKV Bridge is an Expo React Native application that provides a bridge/wrapper for MMKV (Memory-Mapped Key-Value storage), a fast and efficient key-value storage solution for React Native. The project aims to provide a seamless interface for persistent storage across iOS, Android, and Web platforms.

## Tech Stack
- **Framework**: Expo ~54.0.33
- **Runtime**: React 19.1.0, React Native 0.81.5
- **Language**: TypeScript 5.9.2 (strict mode enabled)
- **Routing**: Expo Router ~6.0.23 (file-based routing with typed routes)
- **Navigation**: React Navigation v7
- **Animation**: React Native Reanimated ~4.1.1
- **Build System**: Expo CLI
- **Linting**: ESLint 9.25.0 with Expo config

### Key Dependencies
- `expo-router`: File-based routing system
- `react-native-reanimated`: High-performance animations
- `react-native-worklets`: Worklet support for animations
- `@react-navigation/*`: Navigation primitives
- `expo-*`: Various Expo modules (haptics, image, linking, etc.)

## Project Conventions

### Code Style
- **TypeScript**: Strict mode enabled, all code must be typed
- **Path Aliases**: Use `@/*` for imports from project root (configured in `tsconfig.json`)
- **Naming**: 
  - Components: PascalCase (e.g., `ThemedText`, `HelloWave`)
  - Files: kebab-case for components (e.g., `themed-text.tsx`)
  - Functions: camelCase
- **Formatting**: ESLint with Expo config, no explicit formatter configured
- **Imports**: Use path aliases (`@/components/...`) instead of relative paths where possible

### Architecture Patterns
- **File-based Routing**: Uses Expo Router with file-based routing in the `app/` directory
  - Routes defined by file structure
  - Typed routes enabled (`typedRoutes: true` in experiments)
  - Layouts via `_layout.tsx` files
- **Component Organization**:
  - Reusable components in `components/` directory
  - UI components in `components/ui/` subdirectory
  - Themed components pattern (`ThemedText`, `ThemedView`) for dark/light mode support
- **Hooks**: Custom hooks in `hooks/` directory
- **Constants**: Theme and configuration in `constants/` directory
- **React Compiler**: Enabled via `reactCompiler: true` experiment
- **New Architecture**: React Native New Architecture enabled (`newArchEnabled: true`)

### Testing Strategy
- No testing framework currently configured
- Testing approach to be determined

### Git Workflow
- Git workflow conventions to be established

## Domain Context
- **MMKV**: Fast key-value storage library for React Native, providing synchronous APIs and better performance than AsyncStorage
- **Cross-platform**: Must work on iOS, Android, and Web
- **Expo Router**: Uses file-based routing where file structure determines routes
- **Theme Support**: Automatic dark/light mode with `userInterfaceStyle: "automatic"`

## Important Constraints
- **Platform Support**: Must support iOS, Android, and Web
- **Expo SDK**: Locked to Expo SDK 54
- **React Version**: Using React 19.1.0 (latest)
- **TypeScript**: Strict mode required
- **New Architecture**: React Native New Architecture is enabled
- **Portrait Orientation**: App configured for portrait mode only
- **Android Edge-to-Edge**: Enabled for modern Android UI

## External Dependencies
- **Expo**: Development platform and build system
- **React Navigation**: Navigation library
- **Expo Router**: File-based routing system
- **React Native Reanimated**: Animation library
- **Expo Modules**: Various native modules (haptics, image, linking, etc.)
- **MMKV**: (To be integrated) Fast key-value storage library
