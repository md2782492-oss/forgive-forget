export function renderMemoryList(memories, onSelect) {
  const ul = document.getElementById("memory-list");
  ul.innerHTML = "";

  memories.forEach(m => {
    const li = document.createElement("li");
    li.textContent = m.value;
    li.onclick = () => onSelect(m);
    ul.appendChild(li);
  });
}
