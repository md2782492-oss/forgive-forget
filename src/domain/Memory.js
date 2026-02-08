export class Memory {
  constructor({
    id,
    type,
    value,
    confidence,
    decayRate,
    lastReinforced,
    mutations = []
  }) {
    this.id = id;
    this.type = type;
    this.value = value;
    this.confidence = confidence;
    this.decayRate = decayRate;
    this.lastReinforced = lastReinforced;
    this.mutations = mutations;
  }
}
