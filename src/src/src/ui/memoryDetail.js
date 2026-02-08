export function renderMemoryDetail(memory) {
  const el = document.getElementById("memory-detail");
  if (!memory) {
    el.innerHTML = "";
    return;
  }

  el.innerHTML = `
    <p>${memory.value}</p>
    <small>${memory.confidence > 0.7 ? "Certain" : "Uncertain"}</small>
  `;
}
