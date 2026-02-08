// backend/engine/decayEngine.ts
import { Memory } from "../domain/Memory";

export interface DecayInput {
  memory: Memory;
  elapsedMs: number;
  reinforcement?: boolean;
  attemptedCorrection?: string;
  rng: () => number;
}

export function decayMemory(input: DecayInput): Memory {
  const { memory, elapsedMs, reinforcement, attemptedCorrection, rng } = input;
  const elapsedDays = elapsedMs / (1000 * 60 * 60 * 24);

  let confidence = memory.confidence;

  // Exponential decay
  confidence *= Math.exp(-memory.decayRate * elapsedDays);

  // Reinforcement (imperfect)
  if (reinforcement) {
    confidence += (1 - confidence) * 0.4 * rng();
  }

  // Attempted correction
  let value = memory.value;
  if (attemptedCorrection && rng() < 0.35) {
    // partial or failed correction
    if (rng() < 0.5) {
      value = attemptedCorrection; // succeeds
    }
    // else ignored
  }

  // Semantic drift
  if (rng() < 0.05 * elapsedDays) {
    value = driftValue(value, rng);
  }

  // False certainty
  if (confidence > 0.85 && rng() < 0.1) {
    confidence = Math.min(1, confidence + 0.1);
  }

  return {
    ...memory,
    value,
    confidence: clamp(confidence),
    mutationHistory: memory.mutationHistory.concat({
      timestamp: Date.now(),
      kind: "decay",
    }),
  };
}

function driftValue(value: string, rng: () => number): string {
  return rng() < 0.5 ? value + " (approximately)" : value.replace(/not /, "");
}

function clamp(n: number) {
  return Math.max(0, Math.min(1, n));
}
