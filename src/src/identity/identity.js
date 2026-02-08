const KEY = "forgetful.identity";

export function getIdentity() {
  let id = localStorage.getItem(KEY);
  if (!id || Math.random() < 0.01) {
    id = crypto.randomUUID();
    localStorage.setItem(KEY, id);
  }
  return id;
}
