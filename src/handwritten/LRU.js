export class LRU {
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

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity; // 缓存最大容量
    this.cache = new Map(); // 核心：利用 Map 维护插入顺序
  }

  get(key) {
    if (!this.cache.has(key)) {
      return -1; // 未命中
    }

    // 盲区指出：这里不仅是获取值，更关键的是“刷新活跃度”
    const value = this.cache.get(key);

    // 将该键从原位置抹除，并重新 set
    // 这会使其成为 Map 中“最新插入”的元素，被推到队列的最末尾
    this.cache.delete(key);
    this.cache.set(key, value);

    return value;
  }

  put(key, value) {
    // 如果键已存在，先删除它，为后续重新插入（刷新位置）做准备
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }
    // 如果容量超限，执行 LRU 淘汰机制
    else if (this.cache.size >= this.capacity) {
      // 盲区指出：不要用 Array.from(this.cache.keys()) 去转数组再取第一个，那会造成 O(n) 的性能损耗。
      // this.cache.keys() 返回的是一个 Iterator。
      // .next().value 可以以 O(1) 的时间复杂度直接取出 Map 中的第一个元素（即最老、最少使用的元素）。
      const oldestKey = this.cache.keys().next().value;
      this.cache.delete(oldestKey);
    }

    // 将新数据放入缓存，它自然会位于 Map 的最末尾（最安全的位置）
    this.cache.set(key, value);
  }
}
