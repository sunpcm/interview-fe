/**
 * 使用 DFS (深度优先遍历) 实现的健壮版深拷贝函数
 * @param {any} obj - 需要被克隆的对象
 * @param {Map<object, object>} [hash=new Map()] - 用于处理循环引用，避免无限递归
 * @returns {any} - 克隆后的新对象
 */
export function deepCloneDfs(obj, hash = new Map()) {
  // 1. 原始类型、null 和函数直接返回
  // 函数没有被“克隆”，而是返回其引用，这是标准做法
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // 2. 处理循环引用：如果已经克隆过，直接返回缓存中的克隆对象
  if (hash.has(obj)) {
    return hash.get(obj);
  }

  // 3. 处理特定引用类型：Date 和 RegExp
  if (obj instanceof Date) {
    const newDate = new Date(obj);
    hash.set(obj, newDate);
    return newDate;
  }
  if (obj instanceof RegExp) {
    const newRegExp = new RegExp(obj);
    hash.set(obj, newRegExp);
    return newRegExp;
  }

  // 4. 获取与原对象相同的构造函数，以保持原型链
  // 例如，如果 obj 是一个 MyClass 的实例，克隆后也应该是 MyClass 的实例
  const newObj = new obj.constructor();
  hash.set(obj, newObj); // 先放入 hash 表，再进行递归

  // 5. 处理 Map
  if (obj instanceof Map) {
    obj.forEach((value, key) => {
      newObj.set(deepCloneDfs(key, hash), deepCloneDfs(value, hash));
    });
    return newObj;
  }

  // 6. 处理 Set
  if (obj instanceof Set) {
    obj.forEach(value => {
      newObj.add(deepCloneDfs(value, hash));
    });
    return newObj;
  }

  // 7. 处理数组和普通对象
  // 使用 Reflect.ownKeys 获取所有自有属性（包括 Symbol 和不可枚举属性）
  Reflect.ownKeys(obj).forEach(key => {
    newObj[key] = deepCloneDfs(obj[key], hash);
  });

  return newObj;
}

// --- 测试用例 ---
const obj = {
  a: 1,
  b: { c: 2 },
  d: [3, 4, { e: 5 }],
  f: new Date(),
  g: /test/gi,
  h: function () {
    console.log('hello');
  },
  i: new Set([1, 2, { j: 3 }]),
  k: new Map([
    ['key1', 'value1'],
    ['key2', { l: 4 }],
  ]),
  symbolKey: 'symbolValue',
};

// 创建循环引用
obj.b.circular = obj;

const clonedObj = deepCloneDfs(obj);

// 验证
console.log(clonedObj);
console.log(obj.b.circular === obj); // true, 原始对象存在循环引用
console.log(clonedObj.b.circular === clonedObj); // true, 克隆对象也正确处理了循环引用
console.log(obj.i === clonedObj.i); // false, Set 被深拷贝
console.log(obj.h === clonedObj.h); // true, 函数被引用拷贝

/**
 * 使用 BFS (广度优先遍历) 实现的健壮版深拷贝函数
 * @param {any} obj - 需要被克隆的对象
 * @returns {any} - 克隆后的新对象
 */
function deepCloneBfs(obj) {
  // 1. 原始类型、null 和函数直接返回
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // 2. 初始化根对象、队列和 hash 表
  const root = new obj.constructor(); // 优化点: 保持原型链
  const hash = new WeakMap();
  const queue = [{ original: obj, clone: root }];

  hash.set(obj, root);

  while (queue.length > 0) {
    const { original, clone } = queue.shift();

    // 优化点: 使用 Reflect.ownKeys 遍历所有自有属性
    for (const key of Reflect.ownKeys(original)) {
      const value = original[key];

      // a. 原始类型直接赋值
      if (value === null || typeof value !== 'object') {
        clone[key] = value;
        continue;
      }

      // b. 特定引用类型特殊处理
      if (value instanceof Date || value instanceof RegExp) {
        clone[key] = new value.constructor(value);
        continue;
      }

      // c. 如果已经处理过（循环或共享引用），直接使用 Map 中的克隆对象
      if (hash.has(value)) {
        clone[key] = hash.get(value);
        continue;
      }

      // d. 如果是新的引用类型
      const newClone = new value.constructor(); // 优化点: 保持原型链
      hash.set(value, newClone);
      clone[key] = newClone;

      // 如果是 Map 或 Set，需要特殊处理其内部元素
      if (value instanceof Map) {
        value.forEach((v, k) => {
          // 将子元素的处理也放入队列
          queue.push({
            original: { k, v },
            clone: { newKey: undefined, newValue: undefined },
          });
          // 这里稍微复杂一点，BFS处理Map/Set不如DFS直观
          // 简化的方法是在这里直接递归，但会破坏纯BFS
          // 纯BFS需要更复杂的数据结构来追踪Map/Set的键值对
          // 为了保持BFS的结构，我们这里做一个简化处理，直接递归
          newClone.set(deepCloneBfs(k, hash), deepCloneBfs(v, hash));
        });
      } else if (value instanceof Set) {
        value.forEach(v => {
          newClone.add(deepCloneBfs(v, hash));
        });
      } else {
        // 普通对象/数组，推入队列等待处理
        queue.push({ original: value, clone: newClone });
      }
    }
  }

  return root;
}
