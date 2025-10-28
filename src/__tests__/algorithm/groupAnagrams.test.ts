import {
  groupAnagrams,
  groupAnagrams_Optimal,
} from '../../algorithm/groupAnagrams.ts';

const funcArr = [
  { name: 'groupAnagrams', func: groupAnagrams },
  { name: 'groupAnagrams_Optimal', func: groupAnagrams_Optimal },
];

funcArr.forEach(n => {
  describe('字母异位词分组', () => {
    it(n.name + '多个', () => {
      const arr = ['eat', 'tea', 'tan', 'ate', 'nat', 'bat'];
      const result = [['eat', 'tea', 'ate'], ['tan', 'nat'], ['bat']];
      expect(n.func(arr)).toEqual(result);
    });
    it(n.name + '单个', () => {
      const arr = ['a'];
      const result = [['a']];
      expect(n.func(arr)).toEqual(result);
    });
    it(n.name + '空', () => {
      const arr = [''];
      const result = [['']];
      expect(n.func(arr)).toEqual(result);
    });
    it(n.name + '长', () => {
      const arr = ['bdddddddddd', 'bbbbbbbbbbc'];
      const result = [['bdddddddddd'], ['bbbbbbbbbbc']];
      expect(n.func(arr)).toEqual(result);
    });
  });
});
