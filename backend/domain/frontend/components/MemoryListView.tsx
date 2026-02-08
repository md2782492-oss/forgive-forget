// frontend/components/MemoryListView.tsx
export function MemoryListView({ memories, onSelect }) {
  return (
    <ul>
      {memories.map(m => (
        <li key={m.id} onClick={() => onSelect(m.id)}>
          {m.value}
          <span className={`certainty c-${Math.round(m.confidence * 3)}`} />
        </li>
      ))}
    </ul>
  );
}
