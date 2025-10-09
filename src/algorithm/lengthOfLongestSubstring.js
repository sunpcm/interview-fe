const lengthOfLongestSubstring = str => {
  const strMap = new Map();
  let left = 0;
  let maxLength = 0;

  for (let i = 0; i < str.length; i++) {
    if (strMap.has(str[i]) && strMap.get(str[i]) >= left) {
      left = strMap.get(str[i]) + 1;
    }
    strMap.set(str[i], i);
    maxLength = Math.max(i - left + 1, maxLength);
  }
  return maxLength;
};
