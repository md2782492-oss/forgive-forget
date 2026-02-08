// backend/persistence/MemoryStore.ts
import { Memory } from "../domain/Memory";

export interface MemoryStore {
  getAll(identityId: string): Promise<Memory[]>;
  save(identityId: string, memory: Memory): Promise<void>;
}
