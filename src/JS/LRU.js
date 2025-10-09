export class LRU {
  length;
  data = new Map();
  constructor(length) {
    this.length = length;
  }

  get(key) {
    if (!this.data.has(key)) return null;
    const value = this.data.get(key);
    this.data.delete(key);
    this.data.set(key, value);
    return value;
  }
  set(key, value) {
    if (this.data.has(key)) {
      this.data.delete(key);
    }
    this.data.set(key, value);
    if (this.data.size > this.length) {
      const delKet = this.data.keys().next().value;
      this.data.delete(delKet);
    }
  }
}
