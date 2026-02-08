// backend/api/routes.ts
import express from "express";
import { decayMemory } from "../engine/decayEngine";
import { InMemoryStore } from "../persistence/InMemoryStore";

const store = new InMemoryStore();
const router = express.Router();

router.get("/memories", async (req, res) => {
  const id = req.header("X-Identity")!;
  const memories = await store.getAll(id);
  res.json(memories);
});

router.post("/memories/:id/reinforce", async (req, res) => {
  const id = req.header("X-Identity")!;
  const memories = await store.getAll(id);
  const memory = memories.find(m => m.id === req.params.id);

  if (!memory) return res.status(404).end();

  const updated = decayMemory({
    memory,
    elapsedMs: Date.now() - memory.lastReinforcedAt,
    reinforcement: true,
    rng: Math.random,
  });

  await store.save(id, updated);
  res.json(updated);
});
