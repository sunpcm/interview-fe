export const revertNum1 = (max: number): number[] => {
  const res: number[] = [];
  for (let i = 0; i < max; i++) {
    const stringI = i.toString();
    const revertString = i.toString().split('').reverse().join('');
    if (stringI === revertString) res.push(i);
  }
  return res;
};

const isRevert = (num: number) => {
  if ((num < -1 || num % 10 === 0) && num != 0) return false;

  let i = num;
  let result = 0;

  while (i > 0) {
    const j = i % 10;
    result = j + result * 10;
    i = Math.floor(i / 10);
  }
  return result === num;
};

export const revertNum2 = (max: number): number[] => {
  const result = [];
  for (let i = 0; i < max; i++) {
    if (isRevert(i)) result.push(i);
  }
  return result;
};
