export const binarySearch1 = (arr: number[], target: number): number => {
  if (isNaN(target)) {
    return -1;
  }
  let startIndex = 0;
  let endIndex = arr.length - 1;
  if (endIndex < 0) return -1;

  while (startIndex <= endIndex) {
    const middleIndex = startIndex + Math.floor((endIndex - startIndex) / 2);
    if (arr[middleIndex] === target) {
      return middleIndex;
    } else if (arr[middleIndex] < target) {
      startIndex = middleIndex + 1;
    } else {
      endIndex = middleIndex - 1;
    }
  }
  return -1;
};

export const binarySearch2 = (
  arr: number[],
  target: number,
  startIndex?: number,
  endIndex?: number
): number => {
  if (isNaN(target)) {
    return -1;
  }
  if (!startIndex) startIndex = 0;
  if (!endIndex && endIndex !== 0) endIndex = arr.length - 1;
  if (startIndex > endIndex) return -1;
  const middleIndex = startIndex + Math.floor((endIndex - startIndex) / 2);

  if (arr[middleIndex] === target) {
    return middleIndex;
  } else if (arr[middleIndex] < target) {
    return binarySearch2(arr, target, middleIndex + 1, endIndex);
  } else {
    return binarySearch2(arr, target, startIndex, middleIndex - 1);
  }
};

// 当 arr[middleIndex] 的值是 NaN 时，就会触发这个漏洞。
// NaN 是一个特殊的数字，它与任何值（包括它自己）进行比较，结果永远是 false。
// NaN === target -> false
// NaN > target -> false
// NaN < target -> false
// 所以，当 middleIndex 指向的数组元素恰好是 NaN 时，你的三个 if 条件将全部失败，函数走完所有判断后结束，最终返回 undefined。
