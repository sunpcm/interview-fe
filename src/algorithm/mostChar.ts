export const mostChart1 = (str: string): string => {
  const len = str.length;
  if (len <= 1) return str;
  let maxNum = 0;
  let maxNumStr = '';
  for (let i = 0; i < len; i++) {
    let checkedStrLen = 1;
    for (let j = i + 1; j <= len; j++) {
      if (str[j] === str[i]) {
        checkedStrLen++;
      } else {
        if (maxNum < checkedStrLen) {
          maxNum = checkedStrLen;
          maxNumStr = str[i];
        }
        i = j - 1;
        break;
      }
    }
  }
  return maxNumStr;
};

export const mostStr2 = (str: string): string => {
  const len = str.length;
  if (len <= 1) return str;
  let i = 0;
  let j = 0;
  let maxNumStr = '';
  let maxNum = 0;

  for (i; i <= len; i++) {
    console.log('[i]', i, str[i], str[j]);
    if (str[i] !== str[j]) {
      console.log('[j]', j);
      if (maxNum < i - j) {
        maxNum = i - j;
        maxNumStr = str[j];
      }
      // const newIndex = i;
      j = i;
      // j = newIndex;
    }
  }
  return maxNumStr;
};
