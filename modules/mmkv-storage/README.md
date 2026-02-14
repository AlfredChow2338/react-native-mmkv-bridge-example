# MMKV Storage Module

Fast, synchronous key-value storage using MMKV for React Native and Expo.

## Installation

This module uses `react-native-mmkv` under the hood. Install it:

```bash
npm install react-native-mmkv
```

**Note**: This module requires a development build. It does not work with Expo Go.

## Usage

### Basic Usage

```typescript
import { getDefaultInstance, getInstance } from '@/src/mmkv';

// Get the default instance
const storage = getDefaultInstance();

// Set values
storage.setString('name', 'John');
storage.setNumber('age', 25);
storage.setBoolean('isActive', true);
storage.setObject('user', { id: 1, name: 'John' });

// Get values
const name = storage.getString('name'); // 'John'
const age = storage.getNumber('age'); // 25
const isActive = storage.getBoolean('isActive'); // true
const user = storage.getObject('user'); // { id: 1, name: 'John' }

// Generic set/get
storage.set('key', 'value');
const value = storage.get('key'); // 'value'
```

### Named Instances

```typescript
import { getInstance } from '@/src/mmkv';

// Create or get a named instance
const userStorage = getInstance('userPreferences');
const appStorage = getInstance('appSettings');

// Each instance is isolated
userStorage.setString('theme', 'dark');
appStorage.setString('theme', 'light'); // Different value
```

### Other Operations

```typescript
// Check if key exists
const exists = storage.contains('key'); // boolean

// Get all keys
const keys = storage.getAllKeys(); // string[]

// Delete a key
storage.delete('key');

// Clear all data
storage.clear();
```

## API

### `getDefaultInstance(): MmkvInstance`

Returns the default MMKV instance.

### `getInstance(instanceId: string): MmkvInstance`

Returns or creates a named MMKV instance.

### `MmkvInstance` Methods

- `setString(key: string, value: string): boolean`
- `setNumber(key: string, value: number): boolean`
- `setBoolean(key: string, value: boolean): boolean`
- `setObject<T>(key: string, value: T): boolean`
- `set(key: string, value: MmkvValue): boolean` - Auto-detects type
- `getString(key: string): string | undefined`
- `getNumber(key: string): number | undefined`
- `getBoolean(key: string): boolean | undefined`
- `getObject<T>(key: string): T | undefined`
- `get<T>(key: string, type?: 'string' | 'number' | 'boolean' | 'object'): T | undefined`
- `delete(key: string): boolean`
- `contains(key: string): boolean`
- `getAllKeys(): string[]`
- `clear(): boolean`

## Platform Support

- ✅ iOS (native MMKV)
- ✅ Android (native MMKV)
- ✅ Web (localStorage fallback)

## Type Safety

All methods are fully typed with TypeScript. The module exports types:

- `MmkvValue` - Union type: `string | number | boolean | object`
- `MmkvInstanceId` - String type for instance IDs
