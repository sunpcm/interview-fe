const deepCloneD = (target, hash = new WeakMap()) => {
  // 排除基本类型
  if (target === null || typeof target !== 'object') {
    return target;
  }

  // 处理循环引用
  if (hash.has(target)) {
    return hash.get(target);
  }

  if (target instanceof Date) {
    return new Date(target);
  }
  if (target instanceof RegExp) {
    return new RegExp(target.source, target.flags);
  }

  const Construct = target.constructor;
  const cloneObj = Construct ? new Construct() : Object.create(null);

  hash.set(target, cloneObj);

  if (target instanceof Set) {
    target.forEach(n => cloneObj.add(deepCloneD(n, hash)));
    return cloneObj;
  }

  if (target instanceof Map) {
    target.forEach((v, k) =>
      cloneObj.set(deepCloneD(k, hash), deepCloneD(v, hash))
    );
    return cloneObj;
  }

  if (target instanceof Object) {
    Reflect.ownKeys(target).forEach(n => {
      cloneObj[n] = deepCloneD(target[n], hash);
    });
  }

  return cloneObj;
};

function deepCloneBFS(root) {
  // 1. 拦截非对象类型
  if (root === null || typeof root !== 'object') {
    return root;
  }

  const hash = new WeakMap();

  // 辅助函数：专门负责实例化空的克隆体（不包含嵌套的属性）
  function createEmptyClone(target) {
    if (target instanceof Date) return new Date(target);
    if (target instanceof RegExp)
      return new RegExp(target.source, target.flags);

    const Constructor = target.constructor;
    return Constructor ? new Constructor() : Object.create(null);
  }

  // 初始化根节点
  const rootClone = createEmptyClone(root);
  hash.set(root, rootClone);

  // 维护一个队列，存放源对象和对应的克隆目标引用
  const queue = [{ source: root, target: rootClone }];

  while (queue.length > 0) {
    // 出队
    const { source, target } = queue.shift();

    // 处理 Date 和 RegExp：它们没有需要深度遍历的子属性，直接跳过
    if (source instanceof Date || source instanceof RegExp) {
      continue;
    }

    // 处理 Set
    if (source instanceof Set) {
      source.forEach(value => {
        if (value !== null && typeof value === 'object') {
          if (hash.has(value)) {
            target.add(hash.get(value));
          } else {
            const valueClone = createEmptyClone(value);
            hash.set(value, valueClone);
            target.add(valueClone);
            queue.push({ source: value, target: valueClone }); // 入队等待解析子属性
          }
        } else {
          target.add(value); // 基本类型直接添加
        }
      });
      continue;
    }

    // 处理 Map
    if (source instanceof Map) {
      source.forEach((value, key) => {
        let keyClone = key;
        let valueClone = value;

        // 深拷贝 Map 的 key
        if (key !== null && typeof key === 'object') {
          if (hash.has(key)) {
            keyClone = hash.get(key);
          } else {
            keyClone = createEmptyClone(key);
            hash.set(key, keyClone);
            queue.push({ source: key, target: keyClone });
          }
        }

        // 深拷贝 Map 的 value
        if (value !== null && typeof value === 'object') {
          if (hash.has(value)) {
            valueClone = hash.get(value);
          } else {
            valueClone = createEmptyClone(value);
            hash.set(value, valueClone);
            queue.push({ source: value, target: valueClone });
          }
        }

        target.set(keyClone, valueClone);
      });
      continue;
    }

    // 处理普通对象和数组
    Reflect.ownKeys(source).forEach(key => {
      const value = source[key];
      if (value !== null && typeof value === 'object') {
        if (hash.has(value)) {
          target[key] = hash.get(value); // 处理循环引用
        } else {
          const valueClone = createEmptyClone(value);
          hash.set(value, valueClone);
          target[key] = valueClone; // 挂载引用
          queue.push({ source: value, target: valueClone }); // 入队
        }
      } else {
        target[key] = value; // 基本类型直接赋值
      }
    });
  }

  return rootClone;
}
