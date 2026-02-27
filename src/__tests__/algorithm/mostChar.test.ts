import { mostChart1, mostStr2 } from '@/algorithm/mostChart';

// 将所有需要测试的函数实现放入一个数组
const implementations = [
  { name: 'mostChart1 (nested loop)', fn: mostChart1 },
  { name: 'mostStr2 (two pointers)', fn: mostStr2 },
];

// 使用 describe 对测试套件进行分组
describe('Find Most Consecutive Character', () => {
  // 循环遍历两种实现，确保它们的行为一致
  implementations.forEach(({ name, fn }) => {
    describe(`Testing implementation: ${name}`, () => {
      test('should find the most frequent character in a complex string', () => {
        const str = 'aabbcccddeeee11223';
        expect(fn(str)).toBe('e');
      });

      test('should handle the longest sequence being at the beginning', () => {
        const str = 'aaaaaaaabbb';
        expect(fn(str)).toBe('a');
      });

      test('should handle the longest sequence being at the end', () => {
        const str = 'aabbbbbbbb';
        expect(fn(str)).toBe('b');
      });

      test('should handle the longest sequence being in the middle', () => {
        const str = 'aaacccccbb';
        expect(fn(str)).toBe('c');
      });

      test('should handle an empty string', () => {
        expect(fn('')).toBe('');
      });

      test('should handle a single character string', () => {
        expect(fn('a')).toBe('a');
      });

      test('should handle a string with all unique characters', () => {
        // 在这种情况下，返回第一个字符是合理的
        expect(fn('abcdefg')).toBe('a');
      });

      test('should handle a string with all the same characters', () => {
        expect(fn('zzzzzz')).toBe('z');
      });

      test('should handle numbers and symbols', () => {
        const str = '111_$$$$$_22';
        expect(fn(str)).toBe('$');
      });
    });
  });
});
