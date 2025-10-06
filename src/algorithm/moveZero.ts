export const moveZero1 = (arr: number[]): number[] => {
  const len = arr.length;
  if (arr.length <= 1) return arr;
  let m = -1;
  for (let i = 0; i < len; i++) {
    if (arr[i] === 0 && m === -1) {
      m = i;
    }
    if (arr[i] !== 0 && m >= 0) {
      arr[m] = arr[i];
      arr[i] = 0;
      m++;
    }
  }
  return arr;
};

export const moveZero2 = (arr: number[]): number[] => {
  let writeIndex = 0;

  // 1. 只负责把非零元素往前挪
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== 0) {
      arr[writeIndex] = arr[i];
      writeIndex++;
    }
  }

  // 2. 一次性把后面所有位置变成 0
  for (let i = writeIndex; i < arr.length; i++) {
    arr[i] = 0;
  }

  return arr;
};

export const moveZero3 = (arr: number[]): number[] => {
  const len = arr.length;
  const newArr = arr.filter(n => n !== 0);
  return newArr.concat(new Array(len - newArr.length).fill(0));
};
