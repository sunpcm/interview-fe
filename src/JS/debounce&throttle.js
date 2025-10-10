function debounce(callback, delay = 200) {
  let timer;
  return function (...args) {
    const context = this;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      callback.apply(context, args);
    }, delay);
  };
}

function throttle(callback, delay) {
  let timer;
  return function (...args) {
    const context = this;
    if (timer) return;
    timer = setTimeout(() => {
      callback.apply(this, args);
      timer = null;
    }, delay);
  };
}

const handleSearch = () => {};
const handleScroll = () => {};

const debouncedSearch = debounce(handleSearch, 500);
const throttledScrollHandler = throttle(handleScroll, 1000);

// useDebounce.js
import { useState, useEffect } from 'react';

/**
 * 一个用于 debounce 处理的 React Hook。
 * @param {any} value 需要 debounce 的值
 * @param {number} delay 延迟的毫秒数
 * @returns {any} debounce 后的值
 */
function useDebounce(value, delay) {
  // 1. 创建一个 state，用于存储 debounce 后的值
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // 2. 当 `value` 或 `delay` 发生变化时，设置一个定时器
    const handler = setTimeout(() => {
      // 在指定的 delay 后，用最新的 value 更新 state
      setDebouncedValue(value);
    }, delay);

    // 3. 清理函数：这是关键所在
    // 在下一次 effect 执行前（即 value 或 delay 变化时），
    // 或在组件卸载时，会执行此函数来清除上一个定时器。
    // 这确保了只有当用户停止操作超过 `delay` 时间后，state 才会更新。
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // 依赖项数组：只有当 value 或 delay 改变时，effect 才会重新执行

  // 4. 返回最终 debounce 后的值
  return debouncedValue;
}

// useThrottle.js
import { useRef } from 'react';

/**
 * 一个用于 throttle 处理的 React Hook。
 * @param {any} value 需要 throttle 的值
 * @param {number} limit 节流的时间间隔（毫秒）
 * @returns {any} throttle 后的值
 */
function useThrottle(value, limit) {
  // 1. state 用于存储 throttle 后的值
  const [throttledValue, setThrottledValue] = useState(value);

  // 2. ref 用于存储上一次更新 state 的时间戳
  const lastRan = useRef(Date.now());

  useEffect(() => {
    // 3. 设置一个定时器
    const handler = setTimeout(
      () => {
        const now = Date.now();
        // 检查当前时间距离上次更新是否已超过 limit
        if (now - lastRan.current >= limit) {
          setThrottledValue(value);
          lastRan.current = now; // 更新上一次执行的时间戳
        }
      },
      limit - (Date.now() - lastRan.current)
    ); // 动态计算剩余的等待时间

    // 4. 清理函数
    return () => {
      clearTimeout(handler);
    };
  }, [value, limit]); // 依赖项

  return throttledValue;
}

export { useDebounce, useThrottle };
