import { moveZero1, moveZero2, moveZero3 } from '@/algorithm/moveZero';

// 将需要测试的函数整理到一个数组中，方便批量测试
const implementations = [
  { name: 'moveZero1', fn: moveZero1 },
  { name: 'moveZero2', fn: moveZero2 },
  { name: 'moveZero3', fn: moveZero3 },
];

describe('Move Zeros to End', () => {
  // 对所有正确的实现进行统一测试
  implementations.forEach(({ name, fn }) => {
    describe(`Testing implementation: ${name}`, () => {
      test('should move all zeros to the end for a general case', () => {
        const arr = [1, 0, 3, 0, 11, 0];
        const expected = [1, 3, 11, 0, 0, 0];
        // 对于原地算法，最好复制一份输入，以免影响其他测试
        expect(fn([...arr])).toEqual(expected);
      });

      test('should work with arrays containing negative numbers', () => {
        const arr = [-1, 0, 5, -10, 0, 0];
        const expected = [-1, 5, -10, 0, 0, 0];
        expect(fn([...arr])).toEqual(expected);
      });

      test('should do nothing for an array that is already sorted', () => {
        const arr = [1, 2, 3, 0, 0, 0];
        const expected = [1, 2, 3, 0, 0, 0];
        expect(fn([...arr])).toEqual(expected);
      });

      test('should handle an array with all zeros', () => {
        const arr = [0, 0, 0, 0];
        const expected = [0, 0, 0, 0];
        expect(fn([...arr])).toEqual(expected);
      });

      test('should handle an array with no zeros', () => {
        const arr = [1, 2, 3, 4, 5];
        const expected = [1, 2, 3, 4, 5];
        expect(fn([...arr])).toEqual(expected);
      });

      test('should handle arrays with leading zeros', () => {
        const arr = [0, 0, 0, 1, 2, 3];
        const expected = [1, 2, 3, 0, 0, 0];
        expect(fn([...arr])).toEqual(expected);
      });

      test('should return an empty array if input is empty', () => {
        const arr: number[] = [];
        const expected: number[] = [];
        expect(fn([...arr])).toEqual(expected);
      });

      test('should handle single-element arrays', () => {
        expect(fn([0])).toEqual([0]);
        expect(fn([5])).toEqual([5]);
      });
    });
  });
});
