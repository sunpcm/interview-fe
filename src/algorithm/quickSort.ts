export const quickSort = (arr: number[]): number[] => {
  const len = arr.length;
  if (len <= 1) return arr;
  const midIndex = Math.floor(len / 2);
  const midValue = arr.splice(midIndex, 1)[0];
  const leftArr: number[] = [];
  const rightArr: number[] = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] <= midValue) {
      leftArr.push(arr[i]);
    }
    if (arr[i] > midValue) {
      rightArr.push(arr[i]);
    }
  }
  return [...quickSort(leftArr), midValue, ...quickSort(rightArr)];
};
