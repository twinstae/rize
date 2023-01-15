function toObject<V>(obj: { entries: () => IterableIterator<[string, V]>}): Record<string, V> {
  return Object.fromEntries(obj.entries());
}

export default toObject;