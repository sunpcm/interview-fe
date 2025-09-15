export function rotate(arr: number[], k: number): number[] {
  const length = arr.length;
  if (length === 0 || !k) {
    return arr;
  }
  const step = Math.abs(k % length);

  for (let i = 0; i < step; i++) {
    const n = arr.pop()!;
    arr.unshift(n);
  }
  return arr;
}

export function rotate2(arr: number[], k: number): number[] {
  const length = arr.length;
  if (length === 0 || !k) {
    return arr;
  }
  const step = Math.abs(k % length);

  const part1 = arr.slice(-step);
  const part2 = arr.slice(0, length - step);
  return part1.concat(part2);
}
