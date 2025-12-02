/**
 * 使用 DFS (深度优先遍历) 实现的健壮版深拷贝函数
 * @param {any} obj - 需要被克隆的对象
 * @param {Map<object, object>} [hash=new Map()] - 用于处理循环引用，避免无限递归
 * @returns {any} - 克隆后的新对象
 */
export function deepCloneDfs(obj, hash = new Map()) {
  // 4. 获取与原对象相同的构造函数，以保持原型链
  // 例如，如果 obj 是一个 MyClass 的实例，克隆后也应该是 MyClass 的实例
  const newObj = new obj.constructor();
  hash.set(obj, newObj); // 先放入 hash 表，再进行递归

  // 7. 处理数组和普通对象
  // 使用 Reflect.ownKeys 获取所有自有属性（包括 Symbol 和不可枚举属性）
  Reflect.ownKeys(obj).forEach(key => {
    newObj[key] = deepCloneDfs(obj[key], hash);
  });

  return newObj;
}

function deepCloneDFE2(obj, hash = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') return obj;

  if (hash.has(obj)) return hash.get(obj);

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

  const root = new obj.constructor();
  hash.set(obj, root);

  if (obj instanceof Map) {
    obj.forEach((n, key) => {
      root.set(deepCloneDFE2(key, hash), deepCloneDFE2(n, hash));
    });
    return root;
  }

  if (obj instanceof Set) {
    obj.forEach(n => {
      root.add(deepCloneDFE2(n, hash));
    });
    return root;
  }

  Reflect.ownKeys(obj).forEach(n => {
    root[n] = deepCloneDFE2(obj[key], hash);
  });

  return root;
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

      // 普通对象/数组，推入队列等待处理
      queue.push({ original: value, clone: newClone });
    }
  }

  return root;
}

function deepCloneBFS2(obj) {
  if (obj === null || typeof obj !== 'object') return obj;

  const root = new obj.constructor();
  const queue = [
    {
      original: obj,
      clone: root,
    },
  ];
  const hash = new WeakMap();

  hash.set(obj, root);

  while (queue.length > 0) {
    const { original, clone } = queue.shift();
    for (let key of Reflect.ownKeys(original)) {
      const newValue = original[key];

      if (newValue === null || typeof newValue !== 'object') {
        clone[key] = newValue;
        continue;
      }

      if (hash.has(newValue)) {
        clone[key] = hash.get(newValue);
        continue;
      }

      if (newValue instanceof RegExp) {
        clone[key] = new RegExp(newValue);
        continue;
      }
      if (newValue instanceof Date) {
        clone[key] = new Date(newValue);
        continue;
      }

      const newClone = new newValue.constructor();
      hash.set(newValue, newClone);
      clone[key] = newClone;
      queue.push({
        original: newValue,
        clone: newClone,
      });
    }
  }
  return root;
}
