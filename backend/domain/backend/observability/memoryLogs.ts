// backend/observability/memoryLogs.ts
export function logMutation(memoryId: string, note: string) {
  console.log(`[MEMORY ${memoryId}] ${note}`);
}
