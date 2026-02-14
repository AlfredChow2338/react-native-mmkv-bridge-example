/**
 * MMKV Storage - Main export file
 * Re-exports the MMKV storage module for easy importing
 */

export { getDefaultInstance, getInstance, MmkvInstance } from '../modules/mmkv-storage/src/index';
export type { MmkvValue, MmkvInstanceId } from '../modules/mmkv-storage/src/MmkvStorage.types';
