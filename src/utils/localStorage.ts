export const localStore = {
  set(key: string, value: unknown) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  get(key: string) {
    const storedValue = localStorage.getItem(key);
    return storedValue === null ? undefined : JSON.parse(storedValue);
  },
  remove(key: string) {
    localStorage.removeItem(key);
  },
};
