import { decayMemory } from "../decay/decayEngine.js";
import { loadMemories, saveMemories } from "../persistence/storage.js";
import { Memory } from "../domain/Memory.js";

export function fetchMemories() {
  const now = Date.now();
  let memories = loadMemories().map(m => {
    const elapsed = now - m.lastReinforced;
    return decayMemory(m, elapsed);
  });

  saveMemories(memories);
  return memories;
}

export function reinforceMemory(id) {
  const memories = loadMemories();
  const m = memories.find(x => x.id === id);
  if (!m) return;

  if (Math.random() > 0.7) return;

  m.confidence = Math.min(1, m.confidence + 0.15);
  m.lastReinforced = Date.now();

  saveMemories(memories);
}
