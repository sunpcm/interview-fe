import {
  findTwoNum1,
  findTwoNum2,
  findTwoNumWithMap,
  findTwoNumWithObj_Correct,
} from '@/algorithm/findTwoNum';

// 将所有待测试的函数放入一个数组中，方便统一测试
const functionsToTest = [
  { name: '暴力解法 (findTwoNum1)', fn: findTwoNum1 },
  { name: '双指针法 (findTwoNum2)', fn: findTwoNum2 },
  { name: '哈希表Map法 (findTwoNumWithMap)', fn: findTwoNumWithMap },
  {
    name: '哈希表Object法 (findTwoNumWithObj_Correct)',
    fn: findTwoNumWithObj_Correct,
  },
];

describe('两数之和算法测试', () => {
  // 定义一组通用的测试用例
  const testCases = [
    {
      description: '基本情况',
      arr: [2, 7, 11, 15],
      target: 9,
      expected: [2, 7],
    },
    {
      description: '包含负数',
      arr: [-3, 4, 3, 90],
      target: 0,
      expected: [-3, 3],
    },
    {
      description: '包含重复数字',
      arr: [3, 2, 4, 3],
      target: 6,
      expected: [2, 4],
    },
    {
      description: '找到的解是重复数字',
      arr: [3, 3],
      target: 6,
      expected: [3, 3],
    },
    {
      description: '数字在数组两端',
      arr: [10, 2, 8, 1],
      target: 11,
      expected: [10, 1],
    },
    { description: '无解的情况', arr: [1, 2, 3, 4], target: 10, expected: [] },
    { description: '空数组', arr: [], target: 5, expected: [] },
    { description: '数组只有一个元素', arr: [5], target: 10, expected: [] },
    { description: '包含0', arr: [0, 4, 3, 0], target: 0, expected: [0, 0] },
    {
      description: '包含0和负数',
      arr: [-1, 0, 1],
      target: 0,
      expected: [-1, 1],
    },
  ];

  // 循环每个待测试的函数
  functionsToTest.forEach(({ name, fn }) => {
    describe(name, () => {
      // 循环每个测试用例
      testCases.forEach(({ description, arr, target, expected }) => {
        test(description, () => {
          const result = fn(arr, target);
          // 因为返回的数组顺序可能不固定，比如 [2, 7] 或 [7, 2]
          // 所以我们先对结果进行排序，再与期望值进行比较，这样更健壮
          expect(result.sort((a, b) => a - b)).toEqual(
            expected.sort((a, b) => a - b)
          );
        });
      });
    });
  });
});
