// backend/persistence/InMemoryStore.ts
import { MemoryStore } from "./MemoryStore";
import { Memory } from "../domain/Memory";

const db = new Map<string, Memory[]>();

export class InMemoryStore implements MemoryStore {
  async getAll(id: string) {
    return db.get(id) ?? [];
  }

  async save(id: string, memory: Memory) {
    const list = db.get(id) ?? [];
    db.set(
      id,
      list.map(m => (m.id === memory.id ? memory : m))
    );
  }
}
