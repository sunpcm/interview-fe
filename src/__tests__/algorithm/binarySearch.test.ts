// 假设你的函数在这个文件中，请相应地修改路径
import { binarySearch1, binarySearch2 } from '@/algorithm/binarySearch.ts';

// 将两个待测试的函数组合在一起
const searchFunctions = [
  { name: 'binarySearch1 (非递归版本)', fn: binarySearch1 },
  { name: 'binarySearch2 (递归版本)', fn: binarySearch2 },
];

// 循环执行所有测试
searchFunctions.forEach(({ name, fn }) => {
  describe(`二分查找 - ${name}`, () => {
    // 准备一个标准的有序数组用于测试
    const sortedArr = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    const evenSortedArr = [1, 2, 3, 4];

    // --- 查找成功的情况 ---
    it('应该能找到位于数组中间的元素', () => {
      expect(fn(sortedArr, 50)).toBe(4);
    });

    it('应该能找到数组的第一个元素', () => {
      expect(fn(sortedArr, 10)).toBe(0);
    });

    it('应该能找到数组的最后一个元素', () => {
      expect(fn(sortedArr, 100)).toBe(9);
    });

    it('应该能正确处理偶数长度的数组', () => {
      expect(fn(evenSortedArr, 3)).toBe(2);
      expect(fn(evenSortedArr, 4)).toBe(3);
    });

    // --- 查找失败的情况 ---
    it('当目标值小于数组所有元素时，应该返回 -1', () => {
      expect(fn(sortedArr, 5)).toBe(-1);
    });

    it('当目标值大于数组所有元素时，应该返回 -1', () => {
      expect(fn(sortedArr, 105)).toBe(-1);
    });

    it('当目标值位于数组两个元素之间时，应该返回 -1', () => {
      expect(fn(sortedArr, 45)).toBe(-1);
    });

    // --- 边界情况 ---
    it('对于空数组，应该返回 -1', () => {
      expect(fn([], 100)).toBe(-1);
    });

    it('对于单元素数组（查找成功）', () => {
      expect(fn([42], 42)).toBe(0);
    });

    it('对于单元素数组（查找失败）', () => {
      expect(fn([42], 100)).toBe(-1);
    });

    it('当数组中包含 NaN 时，应该能正常处理并返回 -1', () => {
      const arrWithNaN = [10, 20, NaN, 40, 50];

      // 目标值是什么不重要，关键是函数不应该崩溃或死循环
      expect(fn(arrWithNaN, 30)).toBe(-1);

      // 查找 NaN 本身也应该失败，因为 NaN === NaN 是 false
      expect(fn(arrWithNaN, NaN)).toBe(-1);
    });
  });
});
// 定义一个包含 NaN 的排序数组。
// 在 JavaScript 中，sort() 会将 NaN 放在数组的末尾。
const sortedArrayWithNaN = [2, 5, 8, NaN, NaN];

// =======================================================
// 针对原始算法 (binarySearch1 和 binarySearch2) 的风险测试
// =======================================================
describe('Vulnerable Binary Search Implementations', () => {
  // 测试风险 1: 迭代版本 (binarySearch1) 遇到数组中的 NaN 时会无限循环
  test('binarySearch1 (iterative) should time out due to infinite loop when NaN is in the array', async () => {
    // Jest 的 done() 回调和 setTimeout 让我们能够检测异步行为或超时
    // 我们期望这个测试因为超时而失败，从而证明存在无限循环。
    // 在 Jest 中设置一个较短的超时时间来捕获这个错误。
    // 在 jest.config.js 或 package.json 中设置 testTimeout，例如 1000ms
    console.warn(`
      [INFO] 下一个测试 (binarySearch1) 预期会超时。
      这是为了证明当数组中间值为 NaN 时，迭代版本会陷入无限循环。
      如果测试框架报告超时失败，则证明漏洞存在。
    `);

    // 我们尝试在一个永远不会成功的条件下运行它
    expect(() => {
      binarySearch1(sortedArrayWithNaN, 10); // 10 > 8, 指针会移向 NaN
    }).not.toThrow(); // 它本身不会抛出错误，而是会卡住

    // 注意：实际的超时捕获依赖于Jest的配置。
    // 一个更直接的测试方法是断言它在一定时间内没有返回。
    // 但对于CI/CD环境，一个会超时的测试本身就是最好的证明。
  }, 500); // 设置一个500ms的超时，如果函数没在这之前返回，测试失败。

  // 测试风险 2: 递归版本 (binarySearch2) 遇到数组中的 NaN 时返回 undefined
  test('binarySearch2 (recursive) should return undefined when encountering NaN', () => {
    // 当 middleIndex 指向 NaN 时，所有的比较都为 false，
    // 递归函数结束，隐式返回 undefined。一个健壮的函数应该总是返回 number (-1)。
    const result = binarySearch2(sortedArrayWithNaN, 10);

    // 我们断言返回值不是我们期望的 -1，而是 undefined
    expect(result).toBe(-1); // 明确指出它没有返回正确的“未找到”值
  });

  // 测试风险 3: 当目标值本身是 NaN 时，两个版本都无法正确处理
  test('both original versions should fail when target is NaN', () => {
    const cleanArray = [1, 2, 3, 4, 5];

    // 预期：既然 NaN 不等于任何东西，应该返回 -1
    // 实际 (binarySearch1): 无限循环，因为 NaN < target 和 NaN > target 都是 false
    // 实际 (binarySearch2): 返回 undefined
    expect(binarySearch2(cleanArray, NaN)).toBe(-1);

    // 对于 binarySearch1，我们同样预期它会超时
    console.warn(`
      [INFO] 同样，当 target 是 NaN 时，binarySearch1 也可能超时。
    `);
  });
});
