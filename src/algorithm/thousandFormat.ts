export const thousandFormt = (num: number) => {
  const numString = num.toString();
  const [v1, v2 = 0] = numString.split('.');
  let formatV1 = '';
  for (let i = v1.length - 1; i >= 0; i--) {
    const j = v1.length - i;
    formatV1 = (j != 0 && j % 3 ? v1[i] : ',' + v1[i]) + formatV1;
  }
  return formatV1 + (v2 ? '.' + v2 : '');
};
