import * as fc from "fast-check";
import { decayMemory } from "../backend/engine/decayEngine";
import { Memory } from "../backend/domain/Memory";

const baseMemory: Memory = {
  id: "1",
  type: "surface",
  value: "likes coffee",
  confidence: 0.8,
  decayRate: 0.1,
  lastReinforcedAt: Date.now(),
  mutationHistory: [],
};

test("confidence always stays between 0 and 1", () => {
  fc.assert(
    fc.property(fc.float({ min: 0, max: 1 }), confidence => {
      const mem: Memory = { ...baseMemory, confidence };
      const updated = decayMemory({
        memory: mem,
        elapsedMs: 30 * 24 * 60 * 60 * 1000, // 30 days
        rng: Math.random
      });
      return updated.confidence >= 0 && updated.confidence <= 1;
    })
  );
});
