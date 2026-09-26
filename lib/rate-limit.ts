/** Bounded, process-local protection. Hosting-edge limits are still required. */
export function createRateLimiter(limit: number, windowMs: number, capacity = 1000) {
  const entries = new Map<string, { count: number; expires: number }>();
  return (key: string, now = Date.now()): boolean => {
    for (const [id, item] of entries) if (item.expires <= now) entries.delete(id);
    const entry = entries.get(key);
    if (entry) {
      if (entry.count >= limit) return false;
      entry.count += 1;
      return true;
    }
    // Fail closed when full, so rotating identifiers cannot evict blocked senders.
    if (entries.size >= capacity) return false;
    entries.set(key, { count: 1, expires: now + windowMs });
    return true;
  };
}
