export const groupAnagrams = (strs: string[]): string[][] => {
  const map: Map<string, string[]> = new Map();
  strs.forEach(str => {
    const newStr = str.split('').sort().join('');
    const arr = map.get(newStr) || [];
    arr!.push(str);
    map.set(newStr, arr!);
  });
  return Array.from(map.values());
};

export const groupAnagrams_Optimal = (strs: string[]): string[][] => {
  const map: Map<string, string[]> = new Map();
  const aCode = 'a'.charCodeAt(0);
  for (const str of strs) {
    const strArr = new Array(26).fill(0);
    for (let i = 0; i < str.length; i++) {
      const index = str[i].charCodeAt(0) - aCode;
      strArr[index] += 1;
    }
    const key = strArr.join('#');
    const group = map.get(key) || [];
    group.push(str);
    map.set(key, group);
  }
  return Array.from(map.values());
};

console.log(
  '[groupAnagrams_Optimal]',
  groupAnagrams_Optimal(['eat', 'tea', 'tan', 'ate', 'nat', 'bat'])
);
console.log('[groupAnagrams_Optimal]', groupAnagrams_Optimal(['a']));
console.log('[groupAnagrams_Optimal]', groupAnagrams_Optimal(['']));
console.log(
  '[groupAnagrams_Optimal]',
  groupAnagrams_Optimal(['bdddddddddd', 'bbbbbbbbbbc'])
);
