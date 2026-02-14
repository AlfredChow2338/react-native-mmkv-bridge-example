# Design: MMKV Native Bridge

## Context
MMKV Bridge needs to provide a JavaScript interface to MMKV (Memory-Mapped Key-Value) storage, which is a fast, efficient storage solution for React Native. The implementation must work across iOS, Android, and Web platforms, leveraging Expo's module system and supporting React Native's New Architecture.

**Constraints:**
- Must support Expo SDK 54
- React Native New Architecture is enabled
- TypeScript strict mode required
- Cross-platform support (iOS, Android, Web)

**Stakeholders:**
- JavaScript developers using the bridge
- Native module maintainers

## Goals / Non-Goals

### Goals
- Native applications can write to MMKV storace where JavaScript can read
- Support multiple MMKV instances (default + named instances)
- Support common data types: string, number, boolean, object (via JSON)
- Maintain type safety with TypeScript
- Provide web fallback for development/testing
- Follow Expo module conventions

### Non-Goals
- AsyncStorage compatibility layer (separate concern)
- Encryption/security features (out of scope for initial implementation)
- Migration tools from other storage solutions
- Complex querying or indexing (MMKV is key-value only)

## Decisions

### Decision: Use Expo Modules API
**What**: Implement as an Expo module using the Expo Modules API rather than a bare React Native module.

**Why**: 
- Project uses Expo SDK 54
- Expo modules provide better integration with Expo tooling
- Easier configuration and plugin setup
- Better TypeScript support

**Alternatives considered:**
- Bare React Native module: More complex setup, less Expo integration
- Third-party library wrapper: Less control, potential compatibility issues

**Why**:
- Common use case (separate storage for different app features)
- Matches MMKV's native capability
- Provides better data organization

**Alternatives considered:**
- Single instance only: Too limiting for real-world usage

**Why**:
- Enables development and testing on web
- Maintains API consistency across platforms
- localStorage is synchronous (matches MMKV behavior)

**Alternatives considered:**
- IndexedDB: Asynchronous, doesn't match MMKV's synchronous API
- No web support: Limits development workflow

### Decision: TypeScript-First API Design
**What**: Design the JavaScript API with strong TypeScript typing, using generics for type inference.

**Why**:
- Project uses TypeScript strict mode
- Better developer experience with autocomplete and type checking
- Catches errors at compile time

**Alternatives considered:**
- JavaScript-only: Loses type safety benefits

### Decision: Synchronous API
**What**: All operations are synchronous (matching MMKV's native behavior).

**Why**:
- MMKV is designed for synchronous access
- Better performance than async operations
- Simpler API surface

**Alternatives considered:**
- Async API: Doesn't leverage MMKV's strengths, adds complexity

## Risks / Trade-offs

### Risk: New Architecture Compatibility
**Mitigation**: Use Expo Modules API which supports New Architecture, test thoroughly on both architectures.

### Risk: Web Platform Limitations
**Trade-off**: localStorage has size limits (~5-10MB) compared to MMKV's larger capacity. Document this limitation.

**Mitigation**: Provide clear documentation about web platform constraints.

### Risk: Type Safety at Runtime
**Trade-off**: TypeScript provides compile-time safety, but runtime type checking is limited.

**Mitigation**: Add runtime validation for critical operations, document expected types clearly.

### Risk: Native Module Complexity
**Mitigation**: Start with core operations, iterate based on feedback. Keep implementation simple and well-documented.

## Migration Plan

### Phase 1: Core Implementation
1. Set up Expo module structure
2. Implement iOS native module with basic operations
3. Implement Android native module with basic operations
4. Create JavaScript interface

### Phase 2: Testing & Refinement
1. Add comprehensive tests
2. Test on all platforms
3. Refine API based on testing

### Phase 3: Documentation & Release
1. Complete documentation
2. Create examples
3. Release for use

### Rollback Plan
- If critical issues arise, revert the change proposal
- Keep implementation in feature branch until validated

## Open Questions
- Should we support encryption at the native level? (Defer to future change)
- Should we provide migration utilities from AsyncStorage? (Defer to future change)
- What is the maximum instance count? (Test and document limits)
