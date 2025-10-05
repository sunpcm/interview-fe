// fibonacci.test.ts

import { fibo1, fibo2 } from '@/algorithm/fibonacci'; // 从你的源文件导入

// 将两个函数放入数组，方便批量测试
const fiboImplementations = [
  { name: 'Recursive fibo1', fn: fibo1 },
  { name: 'Iterative fibo2', fn: fibo2 },
];

// 使用 describe 对测试套件进行分组
describe('Fibonacci Functions', () => {
  // 循环遍历两种实现，确保它们的行为一致
  fiboImplementations.forEach(({ name, fn }) => {
    describe(name, () => {
      // 测试基本情况
      test('should return 1 for n = 1', () => {
        expect(fn(1)).toBe(1);
      });

      test('should return 1 for n = 2', () => {
        expect(fn(2)).toBe(1);
      });

      // 测试较小的 n 值
      test('should return 2 for n = 3', () => {
        expect(fn(3)).toBe(2);
      });

      test('should return 3 for n = 4', () => {
        expect(fn(4)).toBe(3);
      });

      test('should return 5 for n = 5', () => {
        expect(fn(5)).toBe(5);
      });

      // 测试一个中等大小的 n 值
      test('should return 55 for n = 10', () => {
        expect(fn(10)).toBe(55);
      });

      // 对于递归函数，避免测试过大的 n 以防止测试超时
      if (name.includes('Iterative')) {
        test('should correctly calculate for a larger n', () => {
          expect(fn(20)).toBe(6765);
        });
      }
    });
  });
});
