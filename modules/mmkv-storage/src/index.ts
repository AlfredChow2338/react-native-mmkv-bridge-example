/**
 * MMKV Storage Module
 * Provides fast, synchronous key-value storage using MMKV
 */

import { Platform } from 'react-native';

import { MmkvInstanceId, MmkvValue } from './MmkvStorage.types';

// Import platform-specific implementations
let MMKV: any;
if (Platform.OS === 'web') {
  // Web implementation will be handled separately
  MMKV = null;
} else {
  // Native implementation
  const mmkvModule = require('react-native-mmkv');
  MMKV = mmkvModule.MMKV;
}

/**
 * MMKV Storage Instance
 * Provides a type-safe interface to an MMKV storage instance
 */
export class MmkvInstance {
  private instanceId: MmkvInstanceId;
  private storage: any;

  constructor(instanceId: MmkvInstanceId, storage: any) {
    this.instanceId = instanceId;
    this.storage = storage;
  }

  /**
   * Set a string value
   */
  setString(key: string, value: string): boolean {
    if (!key || key === null || key === undefined) {
      throw new Error('Key cannot be null or undefined');
    }
    try {
      this.storage.set(key, value);
      return true;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Set a number value
   */
  setNumber(key: string, value: number): boolean {
    if (!key || key === null || key === undefined) {
      throw new Error('Key cannot be null or undefined');
    }
    try {
      this.storage.set(key, value);
      return true;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Set a boolean value
   */
  setBoolean(key: string, value: boolean): boolean {
    if (!key || key === null || key === undefined) {
      throw new Error('Key cannot be null or undefined');
    }
    try {
      this.storage.set(key, value);
      return true;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Set an object value (serialized as JSON)
   */
  setObject<T extends object>(key: string, value: T): boolean {
    if (!key || key === null || key === undefined) {
      throw new Error('Key cannot be null or undefined');
    }
    try {
      this.storage.set(key, JSON.stringify(value));
      return true;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Set a value (auto-detects type)
   */
  set(key: string, value: MmkvValue): boolean {
    if (typeof value === 'string') {
      return this.setString(key, value);
    } else if (typeof value === 'number') {
      return this.setNumber(key, value);
    } else if (typeof value === 'boolean') {
      return this.setBoolean(key, value);
    } else if (typeof value === 'object' && value !== null) {
      return this.setObject(key, value);
    } else {
      throw new Error(`Unsupported value type: ${typeof value}`);
    }
  }

  /**
   * Get a string value
   */
  getString(key: string): string | undefined {
    const value = this.storage.getString(key);
    return value ?? undefined;
  }

  /**
   * Get a number value
   */
  getNumber(key: string): number | undefined {
    const value = this.storage.getNumber(key);
    return value ?? undefined;
  }

  /**
   * Get a boolean value
   */
  getBoolean(key: string): boolean | undefined {
    const value = this.storage.getBoolean(key);
    return value ?? undefined;
  }

  /**
   * Get an object value (deserialized from JSON)
   */
  getObject<T = any>(key: string): T | undefined {
    const value = this.storage.getString(key);
    if (value === undefined) {
      return undefined;
    }
    try {
      return JSON.parse(value) as T;
    } catch (error) {
      console.warn('Failed to parse stored object', error);
      return undefined;
    }
  }

  /**
   * Get a value with type inference
   */
  get<T extends MmkvValue = string>(key: string, type?: 'string' | 'number' | 'boolean' | 'object'): T | undefined {
    if (type === 'string' || !type) {
      return this.getString(key) as T | undefined;
    } else if (type === 'number') {
      return this.getNumber(key) as T | undefined;
    } else if (type === 'boolean') {
      return this.getBoolean(key) as T | undefined;
    } else if (type === 'object') {
      return this.getObject<T>(key);
    }
    return undefined;
  }

  /**
   * Delete a key-value pair
   */
  delete(key: string): boolean {
    this.storage.delete(key);
    return true;
  }

  /**
   * Check if a key exists
   */
  contains(key: string): boolean {
    return this.storage.contains(key);
  }

  /**
   * Get all keys in the instance
   */
  getAllKeys(): string[] {
    return this.storage.getAllKeys();
  }

  /**
   * Clear all key-value pairs in the instance
   */
  clear(): boolean {
    this.storage.clearAll();
    return true;
  }
}

// Cache for instances
const instanceCache = new Map<string, MmkvInstance>();

/**
 * Get the default MMKV instance
 */
export function getDefaultInstance(): MmkvInstance {
  if (Platform.OS === 'web') {
    const MmkvStorageWeb = require('./MmkvStorage.web');
    return MmkvStorageWeb.getDefaultInstance();
  }

  const instanceId = 'default';
  if (!instanceCache.has(instanceId)) {
    const storage = new MMKV({ id: instanceId });
    instanceCache.set(instanceId, new MmkvInstance(instanceId, storage));
  }
  return instanceCache.get(instanceId)!;
}

/**
 * Get or create a named MMKV instance
 */
export function getInstance(instanceId: string): MmkvInstance {
  if (Platform.OS === 'web') {
    const MmkvStorageWeb = require('./MmkvStorage.web');
    return MmkvStorageWeb.getInstance(instanceId);
  }

  if (!instanceCache.has(instanceId)) {
    const storage = new MMKV({ id: instanceId });
    instanceCache.set(instanceId, new MmkvInstance(instanceId, storage));
  }
  return instanceCache.get(instanceId)!;
}

// Export types
export type { MmkvValue, MmkvInstanceId } from './MmkvStorage.types';
