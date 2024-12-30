export const localStore = {
  set(key: string, value: unknown) {
    console.log('value', value)
    localStorage.setItem(key, JSON.stringify(value));
  },
  get(key: string) {
    const storedValue = localStorage.getItem(key);
    console.log(storedValue)
    return storedValue === null ? undefined : JSON.parse(storedValue);
  },
  remove(key: string) {
    localStorage.removeItem(key);
  },
};
