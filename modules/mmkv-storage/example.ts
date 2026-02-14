/**
 * Example usage of MMKV Storage module
 */

import { getDefaultInstance, getInstance } from '../../src/mmkv';

// Example 1: Using the default instance
export function exampleDefaultInstance() {
  const storage = getDefaultInstance();

  // Store different types of data
  storage.setString('username', 'john_doe');
  storage.setNumber('loginCount', 42);
  storage.setBoolean('isLoggedIn', true);
  storage.setObject('userProfile', {
    name: 'John Doe',
    email: 'john@example.com',
    preferences: {
      theme: 'dark',
      notifications: true,
    },
  });

  // Retrieve data
  const username = storage.getString('username');
  const loginCount = storage.getNumber('loginCount');
  const isLoggedIn = storage.getBoolean('isLoggedIn');
  const userProfile = storage.getObject('userProfile');

  console.log('Username:', username);
  console.log('Login count:', loginCount);
  console.log('Is logged in:', isLoggedIn);
  console.log('User profile:', userProfile);

  // Use generic set/get
  storage.set('lastLogin', new Date().toISOString());
  const lastLogin = storage.get('lastLogin', 'string');

  // Check if key exists
  if (storage.contains('username')) {
    console.log('Username exists');
  }

  // Get all keys
  const allKeys = storage.getAllKeys();
  console.log('All keys:', allKeys);

  // Delete a key
  storage.delete('lastLogin');

  // Clear all data (use with caution!)
  // storage.clear();
}

// Example 2: Using named instances
export function exampleNamedInstances() {
  // Create separate storage instances for different purposes
  const userStorage = getInstance('userPreferences');
  const appStorage = getInstance('appSettings');
  const cacheStorage = getInstance('cache');

  // Each instance is isolated
  userStorage.setString('theme', 'dark');
  appStorage.setString('theme', 'light'); // Different value, different instance

  const userTheme = userStorage.getString('theme'); // 'dark'
  const appTheme = appStorage.getString('theme'); // 'light'

  console.log('User theme:', userTheme);
  console.log('App theme:', appTheme);

  // Use cache storage for temporary data
  cacheStorage.setObject('apiResponse', {
    data: { /* ... */ },
    timestamp: Date.now(),
  });

  // Later, retrieve from cache
  const cached = cacheStorage.getObject('apiResponse');
  if (cached) {
    const age = Date.now() - cached.timestamp;
    if (age > 5 * 60 * 1000) {
      // Cache is older than 5 minutes, clear it
      cacheStorage.clear();
    }
  }
}

// Example 3: Error handling
export function exampleErrorHandling() {
  const storage = getDefaultInstance();

  try {
    // This will throw an error
    storage.setString(null as any, 'value');
  } catch (error) {
    console.error('Error setting value:', error);
  }

  // Safe get with undefined check
  const value = storage.getString('nonExistentKey');
  if (value !== undefined) {
    console.log('Value exists:', value);
  } else {
    console.log('Key does not exist');
  }
}
