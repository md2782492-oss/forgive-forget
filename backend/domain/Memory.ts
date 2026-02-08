// backend/domain/Memory.ts
export type MemoryType = "core" | "surface";

export interface MutationEvent {
  timestamp: number;
  kind: "decay" | "reinforcement" | "correction" | "drift";
  note?: string;
}

export interface Memory {
  id: string;
  type: MemoryType;
  value: string;
  confidence: number; // 0..1
  decayRate: number;  // per day
  lastReinforcedAt: number;
  mutationHistory: MutationEvent[];
}
