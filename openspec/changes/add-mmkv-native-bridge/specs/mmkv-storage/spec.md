# MMKV Storage Specification

## ADDED Requirements

### Requirement: MMKV Instance Management
The system SHALL provide the ability to create and access multiple MMKV storage instances. Each instance SHALL be identified by a unique string ID. A default instance SHALL be available without requiring an explicit ID.

#### Scenario: Get default instance
- **WHEN** a developer calls `getDefaultInstance()` or `getInstance()`
- **THEN** the system SHALL return the default MMKV instance
- **AND** the instance SHALL be ready for immediate use

#### Scenario: Get named instance
- **WHEN** a developer calls `getInstance('userPreferences')` with a string ID
- **THEN** the system SHALL return or create an MMKV instance with that ID
- **AND** the instance SHALL be ready for immediate use
- **AND** subsequent calls with the same ID SHALL return the same instance

#### Scenario: Multiple instances isolation
- **WHEN** data is stored in instance A with key 'test'
- **AND** data is stored in instance B with the same key 'test'
- **THEN** the values SHALL be independent and not interfere with each other

### Requirement: Set Values
The system SHALL provide a method to store values in MMKV storage. The method SHALL support string, number, boolean, and object types. Objects SHALL be serialized to JSON automatically.

#### Scenario: Set string value
- **WHEN** a developer calls `instance.set('name', 'John')` with a string value
- **THEN** the value SHALL be stored in MMKV
- **AND** the operation SHALL complete synchronously
- **AND** the value SHALL be immediately available for retrieval

#### Scenario: Set number value
- **WHEN** a developer calls `instance.set('age', 25)` with a number value
- **THEN** the value SHALL be stored in MMKV
- **AND** the operation SHALL complete synchronously
- **AND** the value SHALL be immediately available for retrieval

#### Scenario: Set boolean value
- **WHEN** a developer calls `instance.set('isActive', true)` with a boolean value
- **THEN** the value SHALL be stored in MMKV
- **AND** the operation SHALL complete synchronously
- **AND** the value SHALL be immediately available for retrieval

#### Scenario: Set object value
- **WHEN** a developer calls `instance.set('user', { id: 1, name: 'John' })` with an object
- **THEN** the object SHALL be serialized to JSON
- **AND** the JSON string SHALL be stored in MMKV
- **AND** the operation SHALL complete synchronously

#### Scenario: Set with invalid key
- **WHEN** a developer calls `instance.set(null, 'value')` or `instance.set(undefined, 'value')`
- **THEN** the system SHALL throw an error or return an error indication
- **AND** no value SHALL be stored

### Requirement: Get Values
The system SHALL provide a method to retrieve values from MMKV storage. The method SHALL support type inference and return the appropriate type based on the stored value or requested type.

#### Scenario: Get string value
- **WHEN** a string value was previously stored with key 'name'
- **AND** a developer calls `instance.getString('name')`
- **THEN** the system SHALL return the stored string value
- **AND** the operation SHALL complete synchronously

#### Scenario: Get number value
- **WHEN** a number value was previously stored with key 'age'
- **AND** a developer calls `instance.getNumber('age')`
- **THEN** the system SHALL return the stored number value
- **AND** the operation SHALL complete synchronously

#### Scenario: Get boolean value
- **WHEN** a boolean value was previously stored with key 'isActive'
- **AND** a developer calls `instance.getBoolean('isActive')`
- **THEN** the system SHALL return the stored boolean value
- **AND** the operation SHALL complete synchronously

#### Scenario: Get object value
- **WHEN** an object was previously stored with key 'user'
- **AND** a developer calls `instance.getObject('user')`
- **THEN** the system SHALL deserialize the JSON string
- **AND** return the parsed object
- **AND** the operation SHALL complete synchronously

#### Scenario: Get non-existent key
- **WHEN** a developer calls `instance.getString('nonExistent')` for a key that was never set
- **THEN** the system SHALL return `undefined` or `null`
- **AND** the operation SHALL complete synchronously

#### Scenario: Get with type mismatch
- **WHEN** a string value was stored with key 'data'
- **AND** a developer calls `instance.getNumber('data')`
- **THEN** the system SHALL return `undefined` or handle the type mismatch appropriately
- **AND** the operation SHALL not throw an error

### Requirement: Delete Values
The system SHALL provide a method to delete values from MMKV storage.

#### Scenario: Delete existing key
- **WHEN** a value exists with key 'temp'
- **AND** a developer calls `instance.delete('temp')`
- **THEN** the key-value pair SHALL be removed from MMKV
- **AND** subsequent get operations for that key SHALL return `undefined`
- **AND** the operation SHALL complete synchronously

#### Scenario: Delete non-existent key
- **WHEN** a developer calls `instance.delete('nonExistent')` for a key that doesn't exist
- **THEN** the operation SHALL complete successfully without error
- **AND** the operation SHALL complete synchronously

### Requirement: Check Key Existence
The system SHALL provide a method to check if a key exists in MMKV storage.

#### Scenario: Check existing key
- **WHEN** a value exists with key 'exists'
- **AND** a developer calls `instance.contains('exists')`
- **THEN** the system SHALL return `true`
- **AND** the operation SHALL complete synchronously

#### Scenario: Check non-existent key
- **WHEN** a developer calls `instance.contains('nonExistent')` for a key that doesn't exist
- **THEN** the system SHALL return `false`
- **AND** the operation SHALL complete synchronously

### Requirement: Get All Keys
The system SHALL provide a method to retrieve all keys stored in an MMKV instance.

#### Scenario: Get all keys from populated instance
- **WHEN** multiple key-value pairs exist in an instance
- **AND** a developer calls `instance.getAllKeys()`
- **THEN** the system SHALL return an array of all key strings
- **AND** the array SHALL contain all keys that were set
- **AND** the operation SHALL complete synchronously

#### Scenario: Get all keys from empty instance
- **WHEN** an instance has no stored values
- **AND** a developer calls `instance.getAllKeys()`
- **THEN** the system SHALL return an empty array `[]`
- **AND** the operation SHALL complete synchronously

### Requirement: Clear Instance
The system SHALL provide a method to remove all key-value pairs from an MMKV instance.

#### Scenario: Clear populated instance
- **WHEN** multiple key-value pairs exist in an instance
- **AND** a developer calls `instance.clear()`
- **THEN** all key-value pairs SHALL be removed from the instance
- **AND** `getAllKeys()` SHALL return an empty array
- **AND** the operation SHALL complete synchronously

#### Scenario: Clear empty instance
- **WHEN** an instance has no stored values
- **AND** a developer calls `instance.clear()`
- **THEN** the operation SHALL complete successfully without error
- **AND** the operation SHALL complete synchronously

### Requirement: Cross-Platform Support
The system SHALL provide MMKV storage functionality on iOS, Android, and Web platforms. The API SHALL be consistent across all platforms.

#### Scenario: iOS platform operation
- **WHEN** running on iOS platform
- **AND** a developer performs any MMKV operation
- **THEN** the operation SHALL use native MMKV implementation
- **AND** the operation SHALL complete successfully

#### Scenario: Android platform operation
- **WHEN** running on Android platform
- **AND** a developer performs any MMKV operation
- **THEN** the operation SHALL use native MMKV implementation
- **AND** the operation SHALL complete successfully

#### Scenario: Web platform operation
- **WHEN** running on Web platform
- **AND** a developer performs any MMKV operation
- **THEN** the operation SHALL use localStorage as a fallback
- **AND** the API SHALL behave consistently with native platforms
- **AND** the operation SHALL complete successfully

### Requirement: TypeScript Type Safety
The system SHALL provide TypeScript type definitions that enable type-safe usage of the MMKV API.

#### Scenario: Type inference for get methods
- **WHEN** a developer uses `instance.getString('key')`
- **THEN** TypeScript SHALL infer the return type as `string | undefined`
- **AND** the developer SHALL receive type checking and autocomplete support

#### Scenario: Generic get method
- **WHEN** a developer uses `instance.get<MyType>('key', 'object')` with a generic type
- **THEN** TypeScript SHALL enforce the return type matches the generic
- **AND** type checking SHALL prevent incorrect type usage

#### Scenario: Type-safe set methods
- **WHEN** a developer uses `instance.setString('key', value)`
- **THEN** TypeScript SHALL enforce that the value parameter is a string
- **AND** type errors SHALL be shown for incorrect types
