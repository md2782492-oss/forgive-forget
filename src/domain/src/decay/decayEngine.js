export function decayMemory(memory, elapsedMs) {
  const decayFactor = Math.exp(-memory.decayRate * elapsedMs);
  let confidence = memory.confidence * decayFactor;

  let value = memory.value;
  const mutations = [...memory.mutations];

  if (Math.random() < 0.04) {
    value = value + " (misremembered)";
    confidence = Math.min(1, confidence + 0.25);
    mutations.push({ type: "semantic-drift", at: Date.now() });
  }

  return {
    ...memory,
    value,
    confidence,
    mutations
  };
}
