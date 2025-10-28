export const longestConsecutive = (arr: number[]): number => {
  const arrSet: Set<number> = new Set(arr);
  let maxLenCount = 0;
  for (let n of arrSet) {
    let lenCount = 1;
    if (!arrSet.has(n - 1)) {
      while (arrSet.has(n + 1)) {
        ++n;
        ++lenCount;
      }
      maxLenCount = Math.max(maxLenCount, lenCount);
    }
    // 如果一次循环内找到的长度大于等于总长度的一半，就不会存在比这长的
    if (maxLenCount * 2 >= arrSet.size) break;
  }
  return maxLenCount;
};
