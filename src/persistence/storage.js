const KEY = "forgetful.memories";

export function loadMemories() {
  const raw = localStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : [];
}

export function saveMemories(memories) {
  localStorage.setItem(KEY, JSON.stringify(memories));
}
