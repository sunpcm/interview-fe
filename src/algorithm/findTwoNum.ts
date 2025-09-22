export function findTwoNum1(arr: number[], target: number): number[] {
  const len = arr.length;
  let res: number[] = [];
  if (len === 0) return res;
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      if (arr[i] + arr[j] === target) {
        res = [arr[i], arr[j]];
        break;
      }
    }
  }
  return res;
}

export function findTwoNum2(arr: number[], target: number): number[] {
  // const numbers = [10, 2, 8, 1];
  // numbers.sort(); // 结果是 [1, 10, 2, 8]

  const newArr = [...arr].sort((a, b) => a - b);
  const len = newArr.length;
  let res: number[] = [];
  if (len === 0) return res;
  let startIndex: number = 0;
  let endIndex: number = len - 1;
  while (startIndex < endIndex) {
    const result = newArr[startIndex] + newArr[endIndex];
    if (result === target) {
      res = [newArr[startIndex], newArr[endIndex]];
      break;
    } else if (result > target) {
      endIndex--;
    } else {
      startIndex++;
    }
  }
  return res;
}

export function findTwoNumWithMap(arr: number[], target: number): number[] {
  const numMap = new Map<number, number>(); // key: 数字, value: 任意值（或索引）

  for (let i = 0; i < arr.length; i++) {
    const currentNum = arr[i];
    const complement = target - currentNum;

    if (numMap.has(complement)) {
      // 找到了！
      return [complement, currentNum];
    }

    // 没找到，将当前数字存入 map 中
    numMap.set(currentNum, i);
  }

  // 遍历完都没找到
  return [];
}

export function findTwoNumWithObj_Correct(
  arr: number[],
  target: number
): number[] {
  const len = arr.length;
  const numObj: { [key: number]: number } = {}; // key: 数字, value: 索引

  for (let i = 0; i < len; i++) {
    const currentNum = arr[i];
    const complement = target - currentNum;

    // 检查 complement 是否作为键存在于 numObj 中
    if (numObj[complement] !== undefined) {
      return [complement, currentNum];
    }

    // 将当前数字作为键存入，以便后续的查找
    numObj[currentNum] = i;
  }

  return [];
}
