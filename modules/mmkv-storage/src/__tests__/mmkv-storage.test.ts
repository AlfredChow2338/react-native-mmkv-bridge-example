/**
 * Validation tests for MMKV Storage Module
 * These tests validate the implementation against the spec requirements
 */

import { getDefaultInstance, getInstance } from '../index';

describe('MMKV Storage Module', () => {
  describe('Instance Management', () => {
    test('getDefaultInstance returns default instance', () => {
      const instance = getDefaultInstance();
      expect(instance).toBeDefined();
      expect(typeof instance.setString).toBe('function');
      expect(typeof instance.getString).toBe('function');
    });

    test('getInstance returns named instance', () => {
      const instance = getInstance('test-instance');
      expect(instance).toBeDefined();
      expect(typeof instance.setString).toBe('function');
    });

    test('getInstance returns same instance for same ID', () => {
      const instance1 = getInstance('same-instance');
      const instance2 = getInstance('same-instance');
      expect(instance1).toBe(instance2);
    });

    test('Multiple instances are isolated', () => {
      const instanceA = getInstance('instance-a');
      const instanceB = getInstance('instance-b');

      instanceA.setString('test', 'value-a');
      instanceB.setString('test', 'value-b');

      expect(instanceA.getString('test')).toBe('value-a');
      expect(instanceB.getString('test')).toBe('value-b');
    });
  });

  describe('Set Values', () => {
    let storage: ReturnType<typeof getDefaultInstance>;

    beforeEach(() => {
      storage = getDefaultInstance();
      storage.clear();
    });

    test('setString stores string value', () => {
      const result = storage.setString('name', 'John');
      expect(result).toBe(true);
      expect(storage.getString('name')).toBe('John');
    });

    test('setNumber stores number value', () => {
      const result = storage.setNumber('age', 25);
      expect(result).toBe(true);
      expect(storage.getNumber('age')).toBe(25);
    });

    test('setBoolean stores boolean value', () => {
      const result = storage.setBoolean('isActive', true);
      expect(result).toBe(true);
      expect(storage.getBoolean('isActive')).toBe(true);
    });

    test('setObject stores object value as JSON', () => {
      const user = { id: 1, name: 'John' };
      const result = storage.setObject('user', user);
      expect(result).toBe(true);
      const retrieved = storage.getObject('user');
      expect(retrieved).toEqual(user);
    });

    test('set auto-detects string type', () => {
      storage.set('key', 'value');
      expect(storage.getString('key')).toBe('value');
    });

    test('set auto-detects number type', () => {
      storage.set('key', 42);
      expect(storage.getNumber('key')).toBe(42);
    });

    test('set auto-detects boolean type', () => {
      storage.set('key', true);
      expect(storage.getBoolean('key')).toBe(true);
    });

    test('set auto-detects object type', () => {
      const obj = { test: 'value' };
      storage.set('key', obj);
      expect(storage.getObject('key')).toEqual(obj);
    });

    test('set throws error for null key', () => {
      expect(() => storage.setString(null as any, 'value')).toThrow();
    });

    test('set throws error for undefined key', () => {
      expect(() => storage.setString(undefined as any, 'value')).toThrow();
    });
  });

  describe('Get Values', () => {
    let storage: ReturnType<typeof getDefaultInstance>;

    beforeEach(() => {
      storage = getDefaultInstance();
      storage.clear();
    });

    test('getString returns stored string', () => {
      storage.setString('name', 'John');
      expect(storage.getString('name')).toBe('John');
    });

    test('getNumber returns stored number', () => {
      storage.setNumber('age', 25);
      expect(storage.getNumber('age')).toBe(25);
    });

    test('getBoolean returns stored boolean', () => {
      storage.setBoolean('isActive', true);
      expect(storage.getBoolean('isActive')).toBe(true);
    });

    test('getObject returns stored object', () => {
      const user = { id: 1, name: 'John' };
      storage.setObject('user', user);
      expect(storage.getObject('user')).toEqual(user);
    });

    test('getString returns undefined for non-existent key', () => {
      expect(storage.getString('nonExistent')).toBeUndefined();
    });

    test('getNumber returns undefined for non-existent key', () => {
      expect(storage.getNumber('nonExistent')).toBeUndefined();
    });

    test('getBoolean returns undefined for non-existent key', () => {
      expect(storage.getBoolean('nonExistent')).toBeUndefined();
    });

    test('getObject returns undefined for non-existent key', () => {
      expect(storage.getObject('nonExistent')).toBeUndefined();
    });

    test('get with type parameter works', () => {
      storage.setString('key', 'value');
      expect(storage.get('key', 'string')).toBe('value');

      storage.setNumber('key', 42);
      expect(storage.get('key', 'number')).toBe(42);
    });
  });

  describe('Delete Values', () => {
    let storage: ReturnType<typeof getDefaultInstance>;

    beforeEach(() => {
      storage = getDefaultInstance();
      storage.clear();
    });

    test('delete removes existing key', () => {
      storage.setString('temp', 'value');
      expect(storage.contains('temp')).toBe(true);

      const result = storage.delete('temp');
      expect(result).toBe(true);
      expect(storage.contains('temp')).toBe(false);
      expect(storage.getString('temp')).toBeUndefined();
    });

    test('delete succeeds for non-existent key', () => {
      const result = storage.delete('nonExistent');
      expect(result).toBe(true);
    });
  });

  describe('Check Key Existence', () => {
    let storage: ReturnType<typeof getDefaultInstance>;

    beforeEach(() => {
      storage = getDefaultInstance();
      storage.clear();
    });

    test('contains returns true for existing key', () => {
      storage.setString('exists', 'value');
      expect(storage.contains('exists')).toBe(true);
    });

    test('contains returns false for non-existent key', () => {
      expect(storage.contains('nonExistent')).toBe(false);
    });
  });

  describe('Get All Keys', () => {
    let storage: ReturnType<typeof getDefaultInstance>;

    beforeEach(() => {
      storage = getDefaultInstance();
      storage.clear();
    });

    test('getAllKeys returns all keys', () => {
      storage.setString('key1', 'value1');
      storage.setNumber('key2', 2);
      storage.setBoolean('key3', true);

      const keys = storage.getAllKeys();
      expect(keys).toContain('key1');
      expect(keys).toContain('key2');
      expect(keys).toContain('key3');
      expect(keys.length).toBe(3);
    });

    test('getAllKeys returns empty array for empty instance', () => {
      const keys = storage.getAllKeys();
      expect(keys).toEqual([]);
    });
  });

  describe('Clear Instance', () => {
    let storage: ReturnType<typeof getDefaultInstance>;

    beforeEach(() => {
      storage = getDefaultInstance();
      storage.clear();
    });

    test('clear removes all key-value pairs', () => {
      storage.setString('key1', 'value1');
      storage.setNumber('key2', 2);
      storage.setBoolean('key3', true);

      expect(storage.getAllKeys().length).toBe(3);

      const result = storage.clear();
      expect(result).toBe(true);
      expect(storage.getAllKeys()).toEqual([]);
    });

    test('clear succeeds for empty instance', () => {
      const result = storage.clear();
      expect(result).toBe(true);
    });
  });
});
