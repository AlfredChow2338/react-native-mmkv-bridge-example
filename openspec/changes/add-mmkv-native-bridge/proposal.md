# Change: Add MMKV Native Bridge

## Why
The project needs a native bridge to access MMKV (Memory-Mapped Key-Value) storage from JavaScript. MMKV provides fast, synchronous key-value storage that is significantly faster than AsyncStorage. This bridge will enable the JavaScript layer to perform CRUD operations on MMKV storage instances, supporting multiple storage instances and various data types (string, number, boolean, object).

## What Changes
- **ADDED**: Native module implementation for iOS using Swift
- **ADDED**: Native module implementation for Android using Kotlin
- **ADDED**: JavaScript/TypeScript interface layer with type definitions
- **ADDED**: Expo module configuration and plugin setup
- **ADDED**: Support for multiple MMKV instances (default instance + named instances)
- **ADDED**: CRUD operations: set, get, delete, contains, getAllKeys, clear
- **ADDED**: Type support: string, number, boolean, object (JSON serialization)
- **ADDED**: Error handling and validation for invalid operations

## Impact
- **Affected specs**: New capability `mmkv-storage` will be created
- **Affected code**: 
  - New native modules: `ios/` and `android/` directories (when using development build)
  - New JavaScript module: `src/mmkv.ts` or similar
  - Expo plugin configuration in `app.json`
  - TypeScript type definitions
- **Breaking changes**: None (new feature)
- **Dependencies**: Will require `react-native-mmkv` or native MMKV libraries for iOS/Android
