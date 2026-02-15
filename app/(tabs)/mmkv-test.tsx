/**
 * MMKV Storage Test Screen
 * This screen provides a UI to test and validate MMKV storage functionality
 */

import { useState } from 'react';
import { StyleSheet, ScrollView, View, TextInput, Button, Text, Alert } from 'react-native';
import { getDefaultInstance, getInstance } from '@/src/mmkv';

export default function MmkvTestScreen() {
  const [testResults, setTestResults] = useState<string[]>([]);
  const [testKey, setTestKey] = useState('testKey');
  const [testValue, setTestValue] = useState('testValue');
  const [retrievedValue, setRetrievedValue] = useState<string>('');

  const storage = getDefaultInstance();
  const namedStorage = getInstance('test-instance');

  const addResult = (message: string) => {
    setTestResults((prev) => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const testSetString = () => {
    try {
      storage.setString(testKey, testValue);
      addResult(`✅ Set string: ${testKey} = ${testValue}`);
    } catch (error) {
      addResult(`❌ Error setting string: ${error}`);
    }
  };

  const testGetString = () => {
    try {
      const value = storage.getString(testKey);
      setRetrievedValue(value || '');
      addResult(`✅ Get string: ${testKey} = ${value ?? 'undefined'}`);
    } catch (error) {
      addResult(`❌ Error getting string: ${error}`);
    }
  };

  const testSetNumber = () => {
    try {
      const num = parseFloat(testValue) || 0;
      storage.setNumber('numberKey', num);
      addResult(`✅ Set number: numberKey = ${num}`);
    } catch (error) {
      addResult(`❌ Error setting number: ${error}`);
    }
  };

  const testGetNumber = () => {
    try {
      const value = storage.getNumber('numberKey');
      addResult(`✅ Get number: numberKey = ${value ?? 'undefined'}`);
    } catch (error) {
      addResult(`❌ Error getting number: ${error}`);
    }
  };

  const testSetBoolean = () => {
    try {
      storage.setBoolean('boolKey', testValue.toLowerCase() === 'true');
      addResult(`✅ Set boolean: boolKey = ${testValue.toLowerCase() === 'true'}`);
    } catch (error) {
      addResult(`❌ Error setting boolean: ${error}`);
    }
  };

  const testGetBoolean = () => {
    try {
      const value = storage.getBoolean('boolKey');
      addResult(`✅ Get boolean: boolKey = ${value ?? 'undefined'}`);
    } catch (error) {
      addResult(`❌ Error getting boolean: ${error}`);
    }
  };

  const testSetObject = () => {
    try {
      const obj = { name: testValue, timestamp: Date.now() };
      storage.setObject('objectKey', obj);
      addResult(`✅ Set object: objectKey = ${JSON.stringify(obj)}`);
    } catch (error) {
      addResult(`❌ Error setting object: ${error}`);
    }
  };

  const testGetObject = () => {
    try {
      const value = storage.getObject('objectKey');
      addResult(`✅ Get object: objectKey = ${JSON.stringify(value ?? null)}`);
    } catch (error) {
      addResult(`❌ Error getting object: ${error}`);
    }
  };

  const testContains = () => {
    try {
      const exists = storage.contains(testKey);
      addResult(`✅ Contains check: ${testKey} = ${exists}`);
    } catch (error) {
      addResult(`❌ Error checking contains: ${error}`);
    }
  };

  const testGetAllKeys = () => {
    try {
      const keys = storage.getAllKeys();
      addResult(`✅ GetAllKeys: [${keys.join(', ')}]`);
    } catch (error) {
      addResult(`❌ Error getting all keys: ${error}`);
    }
  };

  const testDelete = () => {
    try {
      storage.delete(testKey);
      addResult(`✅ Deleted: ${testKey}`);
    } catch (error) {
      addResult(`❌ Error deleting: ${error}`);
    }
  };

  const testClear = () => {
    try {
      storage.clear();
      addResult('✅ Cleared all data');
    } catch (error) {
      addResult(`❌ Error clearing: ${error}`);
    }
  };

  const testInstanceIsolation = () => {
    try {
      storage.setString('isolated', 'default-instance');
      namedStorage.setString('isolated', 'named-instance');

      const defaultValue = storage.getString('isolated');
      const namedValue = namedStorage.getString('isolated');

      if (defaultValue === 'default-instance' && namedValue === 'named-instance') {
        addResult('✅ Instance isolation: PASSED');
      } else {
        addResult('❌ Instance isolation: FAILED');
      }
    } catch (error) {
      addResult(`❌ Error testing isolation: ${error}`);
    }
  };

  const runAllTests = () => {
    setTestResults([]);
    addResult('🧪 Running all tests...');

    // Test set operations
    storage.setString('test1', 'value1');
    storage.setNumber('test2', 42);
    storage.setBoolean('test3', true);
    storage.setObject('test4', { data: 'test' });

    // Test get operations
    const v1 = storage.getString('test1');
    const v2 = storage.getNumber('test2');
    const v3 = storage.getBoolean('test3');
    const v4 = storage.getObject('test4');

    if (v1 === 'value1' && v2 === 42 && v3 === true && v4?.data === 'test') {
      addResult('✅ All basic operations: PASSED');
    } else {
      addResult('❌ Basic operations: FAILED');
    }

    // Test utility operations
    const hasKey = storage.contains('test1');
    const keys = storage.getAllKeys();
    if (hasKey && keys.length >= 4) {
      addResult('✅ Utility operations: PASSED');
    } else {
      addResult('❌ Utility operations: FAILED');
    }

    // Test instance isolation
    testInstanceIsolation();

    addResult('✅ All tests completed!');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>MMKV Storage Test</Text>
        <Text style={styles.subtitle}>Test and validate MMKV storage functionality</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Input</Text>
        <TextInput
          style={styles.input}
          placeholder="Key"
          value={testKey}
          onChangeText={setTestKey}
        />
        <TextInput
          style={styles.input}
          placeholder="Value"
          value={testValue}
          onChangeText={setTestValue}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>String Operations</Text>
        <View style={styles.buttonRow}>
          <Button title="Set String" onPress={testSetString} />
          <Button title="Get String" onPress={testGetString} />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Number Operations</Text>
        <View style={styles.buttonRow}>
          <Button title="Set Number" onPress={testSetNumber} />
          <Button title="Get Number" onPress={testGetNumber} />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Boolean Operations</Text>
        <View style={styles.buttonRow}>
          <Button title="Set Boolean" onPress={testSetBoolean} />
          <Button title="Get Boolean" onPress={testGetBoolean} />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Object Operations</Text>
        <View style={styles.buttonRow}>
          <Button title="Set Object" onPress={testSetObject} />
          <Button title="Get Object" onPress={testGetObject} />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Utility Operations</Text>
        <View style={styles.buttonRow}>
          <Button title="Contains" onPress={testContains} />
          <Button title="Get All Keys" onPress={testGetAllKeys} />
        </View>
        <View style={styles.buttonRow}>
          <Button title="Delete" onPress={testDelete} />
          <Button title="Clear" onPress={testClear} />
        </View>
      </View>

      <View style={styles.section}>
        <Button title="Run All Tests" onPress={runAllTests} color="#0a7ea4" />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Test Results</Text>
        <View style={styles.resultsContainer}>
          {testResults.map((result, index) => (
            <Text key={index} style={styles.resultText}>
              {result}
            </Text>
          ))}
          {testResults.length === 0 && (
            <Text style={styles.emptyText}>No tests run yet. Use the buttons above to test.</Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  section: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  resultsContainer: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    minHeight: 200,
  },
  resultText: {
    fontSize: 12,
    fontFamily: 'monospace',
    marginBottom: 4,
  },
  emptyText: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
  },
});
