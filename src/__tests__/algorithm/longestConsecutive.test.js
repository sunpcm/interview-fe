import { longestConsecutive } from '../../algorithm/longestConsecutive.ts';

describe('longestConsecutive', () => {
  // 测试你的第一个示例
  test('示例 1：[100, 4, 200, 1, 3, 2]', () => {
    expect(longestConsecutive([100, 4, 200, 1, 3, 2])).toBe(4);
  });

  // 测试你的第二个示例
  test('示例 2：[0, 3, 7, 2, 5, 8, 4, 6, 0, 1]', () => {
    expect(longestConsecutive([0, 3, 7, 2, 5, 8, 4, 6, 0, 1])).toBe(9);
  });

  // 测试你的第三个示例（包含重复项）
  test('示例 3：[1, 0, 1, 2]', () => {
    expect(longestConsecutive([1, 0, 1, 2])).toBe(3);
  });

  // 测试空数组
  test('空数组', () => {
    expect(longestConsecutive([])).toBe(0);
  });

  // 测试只有一个元素的数组
  test('只有一个元素', () => {
    expect(longestConsecutive([5])).toBe(1);
  });

  // 测试所有元素都不连续
  test('所有元素都不连续', () => {
    expect(longestConsecutive([10, 30, 50, 70])).toBe(1);
  });

  // 测试包含负数的序列
  test('包含负数的序列', () => {
    expect(longestConsecutive([0, -1, -2, 2, 1])).toBe(5); // [-2, -1, 0, 1, 2]
  });

  // 测试一个简单的长序列
  test('一个简单的长序列', () => {
    expect(longestConsecutive([1, 2, 3, 4, 5])).toBe(5);
  });

  // 测试多个序列，最长在中间
  test('多个序列，最长在中间', () => {
    expect(longestConsecutive([10, 11, 100, 101, 102, 103, 5, 6])).toBe(4); // [100, 101, 102, 103]
  });

  // 测试你的剪枝优化：maxLenCount * 2 >= arrSet.size
  // Set size = 7, [1, 2, 3, 4] 长度为 4。 4 * 2 >= 7 (True)，应提前退出
  test('测试剪枝优化：[1, 2, 3, 4, 10, 11, 12]', () => {
    expect(longestConsecutive([1, 2, 3, 4, 10, 11, 12])).toBe(4);
  });

  // 测试剪枝优化：Set size = 9, [1...6] 长度为 6。 6 * 2 >= 9 (True)，应提前退出
  test('测试剪枝优化 2：[1, 2, 3, 4, 5, 6, 100, 101, 102]', () => {
    expect(longestConsecutive([1, 2, 3, 4, 5, 6, 100, 101, 102])).toBe(6);
  });
});
