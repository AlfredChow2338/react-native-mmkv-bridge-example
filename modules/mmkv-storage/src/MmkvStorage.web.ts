/**
 * Web implementation of MMKV Storage using localStorage
 * This provides a fallback for web platform development
 */

import { MmkvInstanceId, MmkvValue } from './MmkvStorage.types';

// Prefix for localStorage keys to namespace MMKV instances
const STORAGE_PREFIX = 'mmkv_';
const INSTANCE_PREFIX = 'mmkv_instance_';

// Cache for instance data
const instanceDataCache = new Map<string, Map<string, any>>();

/**
 * Get localStorage key for an instance
 */
function getInstanceKey(instanceId: string): string {
  return `${INSTANCE_PREFIX}${instanceId}`;
}

/**
 * Get localStorage key for a value
 */
function getValueKey(instanceId: string, key: string): string {
  return `${STORAGE_PREFIX}${instanceId}_${key}`;
}

/**
 * Initialize instance data cache
 */
function initInstanceCache(instanceId: string): void {
  if (!instanceDataCache.has(instanceId)) {
    const data = new Map<string, any>();
    
    // Load existing data from localStorage
    try {
      const instanceKey = getInstanceKey(instanceId);
      const stored = localStorage.getItem(instanceKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        Object.entries(parsed).forEach(([k, v]) => {
          data.set(k, v);
        });
      }
    } catch (error) {
      console.warn('Failed to load MMKV instance data from localStorage', error);
    }
    
    instanceDataCache.set(instanceId, data);
  }
}

/**
 * Save instance data to localStorage
 */
function saveInstanceData(instanceId: string): void {
  try {
    const data = instanceDataCache.get(instanceId);
    if (data) {
      const instanceKey = getInstanceKey(instanceId);
      const serialized = JSON.stringify(Object.fromEntries(data));
      localStorage.setItem(instanceKey, serialized);
    }
  } catch (error) {
    console.warn('Failed to save MMKV instance data to localStorage', error);
  }
}

/**
 * Web implementation of MMKV Storage Instance
 */
class MmkvInstanceWeb {
  private instanceId: MmkvInstanceId;
  private data: Map<string, { type: string; value: any }>;

  constructor(instanceId: MmkvInstanceId) {
    this.instanceId = instanceId;
    this.data = new Map();
    this.loadFromLocalStorage();
  }

  private loadFromLocalStorage(): void {
    try {
      const instanceKey = getInstanceKey(this.instanceId);
      const stored = localStorage.getItem(instanceKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        Object.entries(parsed).forEach(([k, v]: [string, any]) => {
          this.data.set(k, v);
        });
      }
    } catch (error) {
      console.warn('Failed to load MMKV instance data from localStorage', error);
    }
  }

  private saveToLocalStorage(): void {
    try {
      const instanceKey = getInstanceKey(this.instanceId);
      const serialized = JSON.stringify(Object.fromEntries(this.data));
      localStorage.setItem(instanceKey, serialized);
    } catch (error) {
      console.warn('Failed to save MMKV instance data to localStorage', error);
    }
  }

  setString(key: string, value: string): boolean {
    if (!key || key === null || key === undefined) {
      throw new Error('Key cannot be null or undefined');
    }
    this.data.set(key, { type: 'string', value });
    this.saveToLocalStorage();
    return true;
  }

  setNumber(key: string, value: number): boolean {
    if (!key || key === null || key === undefined) {
      throw new Error('Key cannot be null or undefined');
    }
    this.data.set(key, { type: 'number', value });
    this.saveToLocalStorage();
    return true;
  }

  setBoolean(key: string, value: boolean): boolean {
    if (!key || key === null || key === undefined) {
      throw new Error('Key cannot be null or undefined');
    }
    this.data.set(key, { type: 'boolean', value });
    this.saveToLocalStorage();
    return true;
  }

  setObject<T extends object>(key: string, value: T): boolean {
    if (!key || key === null || key === undefined) {
      throw new Error('Key cannot be null or undefined');
    }
    this.data.set(key, { type: 'object', value: JSON.stringify(value) });
    this.saveToLocalStorage();
    return true;
  }

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

  getString(key: string): string | undefined {
    const stored = this.data.get(key);
    if (stored && stored.type === 'string') {
      return stored.value;
    }
    return undefined;
  }

  getNumber(key: string): number | undefined {
    const stored = this.data.get(key);
    if (stored && stored.type === 'number') {
      return stored.value;
    }
    return undefined;
  }

  getBoolean(key: string): boolean | undefined {
    const stored = this.data.get(key);
    if (stored && stored.type === 'boolean') {
      return stored.value;
    }
    return undefined;
  }

  getObject<T = any>(key: string): T | undefined {
    const stored = this.data.get(key);
    if (stored && stored.type === 'object') {
      try {
        return JSON.parse(stored.value) as T;
      } catch (error) {
        console.warn('Failed to parse stored object', error);
        return undefined;
      }
    }
    return undefined;
  }

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

  delete(key: string): boolean {
    this.data.delete(key);
    this.saveToLocalStorage();
    return true;
  }

  contains(key: string): boolean {
    return this.data.has(key);
  }

  getAllKeys(): string[] {
    return Array.from(this.data.keys());
  }

  clear(): boolean {
    this.data.clear();
    this.saveToLocalStorage();
    return true;
  }
}

// Helper functions
function getInstanceKey(instanceId: string): string {
  return `mmkv_instance_${instanceId}`;
}

// Cache for web instances
const webInstanceCache = new Map<string, MmkvInstanceWeb>();

const MmkvStorageWeb = {
  getDefaultInstance(): any {
    return this.getInstance('default');
  },

  getInstance(instanceId: string): any {
    if (!webInstanceCache.has(instanceId)) {
      const webInstance = new MmkvInstanceWeb(instanceId);
      webInstanceCache.set(instanceId, webInstance);
    }
    return webInstanceCache.get(instanceId)!;
  },
};

export default MmkvStorageWeb;
