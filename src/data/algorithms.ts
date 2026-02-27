export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface AlgorithmItem {
  id: string;
  name: string;
  category: string;
  group: 'algorithm' | 'javascript';
  tags: string[];
  difficulty: Difficulty;
  description: string;
  sourceCode: string;
  testCode: string;
  timeComplexity?: string;
  spaceComplexity?: string;
}

// Import all source files as raw text
const algorithmFiles = import.meta.glob('../algorithm/*.{ts,js}', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const jsFiles = import.meta.glob(
  ['../handwritten/*.{ts,js}', '!../handwritten/*.test.{ts,js}'],
  {
    query: '?raw',
    import: 'default',
    eager: true,
  }
) as Record<string, string>;

function getSource(files: Record<string, string>, filename: string): string {
  const key = Object.keys(files).find(k => k.endsWith('/' + filename));
  return key ? files[key] : `// Source file "${filename}" not found`;
}

function src(filename: string): string {
  return getSource(algorithmFiles, filename);
}

function jsSrc(filename: string): string {
  return getSource(jsFiles, filename);
}

export const algorithms: AlgorithmItem[] = [
  // ===================== 排序与搜索 =====================
  {
    id: 'quick-sort',
    name: '快速排序 Quick Sort',
    category: '排序与搜索',
    group: 'algorithm',
    tags: ['排序', '分治', '递归'],
    difficulty: 'Medium',
    description:
      '选取基准值，将数组分为左右两部分，递归排序后合并。经典的分治算法。',
    sourceCode: src('quickSort.ts'),
    testCode: `const arr = [3, 6, 1, 5, 2, 4, 8, 7];
console.log('原数组:', arr);
console.log('排序后:', quickSort([...arr]));
console.log('空数组:', quickSort([]));
console.log('单元素:', quickSort([1]));`,
    timeComplexity: 'O(n log n) 平均 / O(n²) 最差',
    spaceComplexity: 'O(n)',
  },
  {
    id: 'binary-search',
    name: '二分查找 Binary Search',
    category: '排序与搜索',
    group: 'algorithm',
    tags: ['搜索', '二分'],
    difficulty: 'Easy',
    description:
      '在有序数组中查找目标值。两种实现：迭代和递归。注意 NaN 边界情况。',
    sourceCode: src('binarySearch.ts'),
    testCode: `const arr = [1, 3, 5, 7, 9, 11, 15, 20];
console.log('迭代查找 7:', binarySearch1(arr, 7));
console.log('递归查找 7:', binarySearch2(arr, 7));
console.log('查找不存在的 8:', binarySearch1(arr, 8));
console.log('查找 NaN:', binarySearch1(arr, NaN));`,
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1) 迭代 / O(log n) 递归',
  },
  {
    id: 'find-median-sorted-arrays',
    name: '两个有序数组中位数',
    category: '排序与搜索',
    group: 'algorithm',
    tags: ['二分', '数组', '归并'],
    difficulty: 'Hard',
    description:
      '给定两个有序数组，找到合并后的中位数。归并法 + 注释中的二分优化思路。',
    sourceCode: src('findMedianSortedArrays.ts'),
    testCode: `console.log('[1,3] + [2]:', findMedianSortedArrays([1, 3], [2]));
console.log('[1,2] + [3,4]:', findMedianSortedArrays([1, 2], [3, 4]));
console.log('[] + [1]:', findMedianSortedArrays([], [1]));`,
    timeComplexity: 'O(m + n) 归并 / O(log(m+n)) 二分',
    spaceComplexity: 'O(m + n)',
  },

  // ===================== 数组 =====================
  {
    id: 'two-sum',
    name: '两数之和 Two Sum',
    category: '数组',
    group: 'algorithm',
    tags: ['哈希表', '数组'],
    difficulty: 'Easy',
    description:
      '给定数组和目标值，返回两个数的索引使其和等于目标值。使用 Map 实现 O(n) 查找。',
    sourceCode: src('twoSum.js'),
    testCode: `console.log('twoSum([2,7,11,15], 9):', twoSum([2, 7, 11, 15], 9));
console.log('twoSum([3,2,4], 6):', twoSum([3, 2, 4], 6));`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
  },
  {
    id: 'find-two-num',
    name: '查找两数（多解法）',
    category: '数组',
    group: 'algorithm',
    tags: ['双指针', '哈希表', '暴力'],
    difficulty: 'Easy',
    description:
      '四种方法查找和为目标值的两个数：暴力 O(n²)、双指针、Map、Object。',
    sourceCode: src('findTwoNum.ts'),
    testCode: `const arr = [1, 2, 4, 7, 11, 15];
const target = 15;
console.log('暴力法:', findTwoNum1(arr, target));
console.log('双指针:', findTwoNum2(arr, target));
console.log('Map法:', findTwoNumWithMap(arr, target));
console.log('Object法:', findTwoNumWithObj_Correct(arr, target));`,
    timeComplexity: 'O(n²) ~ O(n)',
    spaceComplexity: 'O(1) ~ O(n)',
  },
  {
    id: 'move-zero',
    name: '移动零 Move Zeros',
    category: '数组',
    group: 'algorithm',
    tags: ['双指针', '原地操作'],
    difficulty: 'Easy',
    description:
      '将数组中所有 0 移动到末尾，保持非零元素相对顺序。两种双指针实现。',
    sourceCode: src('moveZero.ts'),
    testCode: `console.log('方法1:', moveZero1([0, 1, 0, 3, 12]));
console.log('方法2:', moveZero2([0, 1, 0, 3, 12]));
console.log('全零:', moveZero1([0, 0, 0]));
console.log('无零:', moveZero2([1, 2, 3]));`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
  },
  {
    id: 'rotate',
    name: '数组旋转 Rotate Array',
    category: '数组',
    group: 'algorithm',
    tags: ['数组', '原地操作'],
    difficulty: 'Easy',
    description:
      '将数组向右旋转 k 步。方法1：逐个 pop/unshift；方法2：slice 拼接。',
    sourceCode: src('rotate.ts'),
    testCode: `console.log('pop/unshift:', rotate([1, 2, 3, 4, 5, 6, 7], 3));
console.log('slice拼接:', rotate2([1, 2, 3, 4, 5, 6, 7], 3));`,
    timeComplexity: 'O(n*k) / O(n)',
    spaceComplexity: 'O(1) / O(n)',
  },
  {
    id: 'longest-consecutive',
    name: '最长连续序列',
    category: '数组',
    group: 'algorithm',
    tags: ['哈希表', 'Set'],
    difficulty: 'Medium',
    description:
      '在未排序数组中找到最长连续元素序列的长度。使用 Set 实现 O(n) 解法。',
    sourceCode: src('longestConsecutive.ts'),
    testCode: `console.log('[100,4,200,1,3,2]:', longestConsecutive([100, 4, 200, 1, 3, 2]));
console.log('[0,3,7,2,5,8,4,6,0,1]:', longestConsecutive([0, 3, 7, 2, 5, 8, 4, 6, 0, 1]));`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
  },
  {
    id: 'add-two-num',
    name: '两数相加（数组表示）',
    category: '数组',
    group: 'algorithm',
    tags: ['数组', '数学', '进位'],
    difficulty: 'Medium',
    description: '两个数字用数组表示（低位在前），实现逐位相加并处理进位。',
    sourceCode: src('addTwoNum.js'),
    testCode: `console.log('[2,4,3] + [5,6,4]:', addTwoNumbers([2, 4, 3], [5, 6, 4]));
console.log('[9,9,9] + [1]:', addTwoNumbers([9, 9, 9], [1]));`,
    timeComplexity: 'O(max(m, n))',
    spaceComplexity: 'O(max(m, n))',
  },

  // ===================== 字符串 =====================
  {
    id: 'longest-substring',
    name: '无重复字符最长子串',
    category: '字符串',
    group: 'algorithm',
    tags: ['滑动窗口', '哈希表'],
    difficulty: 'Medium',
    description:
      '使用滑动窗口 + Map 记录字符位置，找到不含重复字符的最长子串长度。',
    sourceCode: src('lengthOfLongestSubstring.js'),
    testCode: `console.log('"abcabcbb":', lengthOfLongestSubstring('abcabcbb'));
console.log('"bbbbb":', lengthOfLongestSubstring('bbbbb'));
console.log('"pwwkew":', lengthOfLongestSubstring('pwwkew'));`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(min(n, m)) m=字符集大小',
  },
  {
    id: 'valid-brackets',
    name: '有效括号 Valid Brackets',
    category: '字符串',
    group: 'algorithm',
    tags: ['栈', '字符串'],
    difficulty: 'Easy',
    description:
      '使用栈匹配括号对。遇到左括号入栈，遇到右括号检查栈顶是否匹配。',
    sourceCode: src('validBrackets.ts'),
    testCode: `console.log('"({[]})":', validBrackets('({[]})'));
console.log('"([)]":', validBrackets('([)]'));
console.log('"{[]}":', validBrackets('{[]}'));
console.log('"(":', validBrackets('('));`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
  },
  {
    id: 'group-anagrams',
    name: '字母异位词分组',
    category: '字符串',
    group: 'algorithm',
    tags: ['哈希表', '排序', '字符串'],
    difficulty: 'Medium',
    description: '两种方法：排序后作为 key；字符计数数组作为 key（更优）。',
    sourceCode: src('groupAnagrams.ts'),
    testCode: `const strs = ['eat', 'tea', 'tan', 'ate', 'nat', 'bat'];
console.log('排序法:', groupAnagrams(strs));
console.log('计数法:', groupAnagrams_Optimal(strs));`,
    timeComplexity: 'O(n * k log k) / O(n * k)',
    spaceComplexity: 'O(n * k)',
  },
  {
    id: 'longest-palindrome',
    name: '最长回文子串',
    category: '字符串',
    group: 'algorithm',
    tags: ['字符串', '动态规划', '中心扩展'],
    difficulty: 'Medium',
    description:
      '中心扩展法：遍历每个字符作为中心，分别处理奇数和偶数长度的回文。',
    sourceCode: src('longestPalindrome.ts'),
    testCode: `console.log('"babad":', TDlongestPalindrome('babad'));
console.log('"cbbd":', TDlongestPalindrome('cbbd'));
console.log('"a":', TDlongestPalindrome('a'));
console.log('"racecar":', TDlongestPalindrome('racecar'));`,
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
  },
  {
    id: 'most-char',
    name: '最多连续重复字符',
    category: '字符串',
    group: 'algorithm',
    tags: ['字符串', '双指针'],
    difficulty: 'Easy',
    description:
      '找到字符串中连续重复次数最多的字符。两种实现：嵌套循环和双指针。',
    sourceCode: src('mostChar.ts'),
    testCode: `console.log('"aabbcccdddd":', mostChart1('aabbcccdddd'));
console.log('"aabbcccdddd":', mostStr2('aabbcccdddd'));`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
  },
  {
    id: 'thousand-format',
    name: '千分位格式化',
    category: '字符串',
    group: 'algorithm',
    tags: ['字符串', '格式化'],
    difficulty: 'Easy',
    description: '将数字格式化为千分位表示，支持小数。从末尾每3位插入逗号。',
    sourceCode: src('thousandFormat.ts'),
    testCode: `console.log('1234567:', thousandFormt(1234567));
console.log('1234567.89:', thousandFormt(1234567.89));
console.log('123:', thousandFormt(123));
console.log('0.5:', thousandFormt(0.5));`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
  },

  // ===================== 数学 =====================
  {
    id: 'fibonacci',
    name: '斐波那契数列 Fibonacci',
    category: '数学',
    group: 'algorithm',
    tags: ['递归', '动态规划', '数学'],
    difficulty: 'Easy',
    description:
      '递归实现（简洁但慢）和迭代实现（O(n) 高效）。经典 DP 入门题。',
    sourceCode: src('fibonacci.ts'),
    testCode: `console.log('fibo1(10):', fibo1(10));
console.log('fibo2(10):', fibo2(10));
console.log('fibo2(20):', fibo2(20));
// fibo1(40) 会很慢，体会递归 vs 迭代的性能差距
console.time('递归 fibo1(30)');
fibo1(30);
console.timeEnd('递归 fibo1(30)');
console.time('迭代 fibo2(30)');
fibo2(30);
console.timeEnd('迭代 fibo2(30)');`,
    timeComplexity: 'O(2^n) 递归 / O(n) 迭代',
    spaceComplexity: 'O(n) 递归 / O(1) 迭代',
  },
  {
    id: 'revert-num',
    name: '回文数 Palindrome Number',
    category: '数学',
    group: 'algorithm',
    tags: ['数学', '字符串'],
    difficulty: 'Easy',
    description:
      '找出范围内的所有回文数。方法1：字符串反转比较；方法2：纯数学取余反转。',
    sourceCode: src('revertNum.ts'),
    testCode: `console.log('100以内回文数(字符串):', revertNum1(100));
console.log('100以内回文数(数学):', revertNum2(100));`,
    timeComplexity: 'O(n * k) k=位数',
    spaceComplexity: 'O(n)',
  },
  {
    id: 'rain-trap',
    name: '接雨水 Trapping Rain Water',
    category: '数学',
    group: 'algorithm',
    tags: ['双指针', '数组'],
    difficulty: 'Hard',
    description:
      '经典双指针题。从两端向中间逼近，维护左右最大高度，逐步累加雨水量。',
    sourceCode: src('rainTrap.js'),
    testCode: `console.log('[0,1,0,2,1,0,1,3,2,1,2,1]:', trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]));
console.log('[4,2,0,3,2,5]:', trap([4, 2, 0, 3, 2, 5]));`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
  },

  // ===================== 数据结构 =====================
  {
    id: 'link-list',
    name: '链表创建与反转',
    category: '数据结构',
    group: 'algorithm',
    tags: ['链表', '指针'],
    difficulty: 'Easy',
    description: '从数组创建链表，以及原地反转链表。理解指针操作的核心题目。',
    sourceCode: src('linkList.ts'),
    testCode: `const list = createLinkList([1, 2, 3, 4, 5]);
console.log('原链表:', JSON.stringify(list));
const reversed = revertLinkList(createLinkList([1, 2, 3, 4, 5]));
console.log('反转后:', JSON.stringify(reversed));`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1) 反转 / O(n) 创建',
  },
  {
    id: 'stack-queue',
    name: '用栈实现队列',
    category: '数据结构',
    group: 'algorithm',
    tags: ['栈', '队列', '设计'],
    difficulty: 'Easy',
    description: '使用两个栈（inStack/outStack）模拟队列的 FIFO 行为。',
    sourceCode: src('stackQueue.ts'),
    testCode: `const q = new StackQueue();
q.enqueue(1);
q.enqueue(2);
q.enqueue(3);
console.log('出队:', q.dequeue());
q.enqueue(4);
console.log('队长度:', q.length);`,
    timeComplexity: 'O(1) 均摊',
    spaceComplexity: 'O(n)',
  },
  {
    id: 'array-queue',
    name: '用数组实现队列',
    category: '数据结构',
    group: 'algorithm',
    tags: ['数组', '队列', '设计'],
    difficulty: 'Easy',
    description: '使用两个数组模拟队列，与栈实现队列思路类似。',
    sourceCode: src('arrayQueue.ts'),
    testCode: `const q = new ArrayQueue();
q.enQueue(1);
q.enQueue(2);
q.enQueue(3);
console.log('出队:', q.deQueue());
console.log('队长度:', q.length);`,
    timeComplexity: 'O(1) 均摊',
    spaceComplexity: 'O(n)',
  },
  {
    id: 'link-list-queue',
    name: '用链表实现队列',
    category: '数据结构',
    group: 'algorithm',
    tags: ['链表', '队列', '设计'],
    difficulty: 'Easy',
    description:
      '使用链表的 head/tail 指针实现队列，enqueue O(1) dequeue O(1)。',
    sourceCode: src('linkListQueue.ts'),
    testCode: `const q = new LinkListQueue();
q.enqueue(10);
q.enqueue(20);
q.enqueue(30);
console.log('出队:', q.dequeue());
console.log('出队:', q.dequeue());
console.log('队长度:', q.length);`,
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(n)',
  },

  // ===================== JS 手写题 =====================
  {
    id: 'curry',
    name: '函数柯里化 Curry',
    category: '函数技巧',
    group: 'javascript',
    tags: ['闭包', '高阶函数', '柯里化'],
    difficulty: 'Medium',
    description:
      '柯里化：将多参数函数转为链式调用。还包含 sum 函数的链式累加实现（valueOf/toString）。',
    sourceCode: jsSrc('curry.js'),
    testCode: `function add(a, b, c) { return a + b + c; }
const curriedAdd = curry(add);
console.log('curry(add)(1)(2)(3):', curriedAdd(1)(2)(3));
console.log('curry(add)(1, 2)(3):', curriedAdd(1, 2)(3));
console.log('curry(add)(1)(2, 3):', curriedAdd(1)(2, 3));`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
  },
  {
    id: 'deep-clone',
    name: '深拷贝 Deep Clone (DFS/BFS)',
    category: '对象操作',
    group: 'javascript',
    tags: ['递归', 'DFS', 'BFS', '深拷贝'],
    difficulty: 'Hard',
    description:
      'DFS 和 BFS 两种方式实现深拷贝。处理循环引用、Date、RegExp、Map、Set、Symbol 等。',
    sourceCode: jsSrc('deepClone.js'),
    testCode: `const obj = { a: 1, b: { c: 2 }, d: [3, 4], f: new Date(), g: /test/gi };
obj.b.self = obj; // 循环引用
const cloned = deepCloneDfs(obj);
console.log('克隆结果:', { a: cloned.a, b_c: cloned.b.c, d: cloned.d });
console.log('是否深拷贝:', obj.b !== cloned.b);
console.log('循环引用:', cloned.b.self === cloned);`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
  },
  {
    id: 'deep-clone-2',
    name: '深拷贝练习 Deep Clone v2',
    category: '对象操作',
    group: 'javascript',
    tags: ['递归', 'DFS', 'BFS', '深拷贝'],
    difficulty: 'Hard',
    description: '深拷贝的第二版练习，包含简化版 DFS 和完整版 BFS 实现。',
    sourceCode: jsSrc('deepClone-v2.js'),
    testCode: `const obj = { a: 1, b: { c: 2 }, d: [3, 4] };
const cloned = deepCloneDfs(obj);
console.log('克隆结果:', cloned);
console.log('是否深拷贝:', obj.b !== cloned.b);`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
  },
  {
    id: 'debounce-throttle',
    name: '防抖与节流 Debounce & Throttle',
    category: '函数技巧',
    group: 'javascript',
    tags: ['闭包', '定时器', '性能优化'],
    difficulty: 'Medium',
    description:
      '防抖：延迟执行，重复触发会重置计时器。节流：固定间隔执行，忽略中间触发。',
    sourceCode: jsSrc('debounce-throttle.js'),
    testCode: `// 防抖示例
const debouncedFn = _debounce((x) => console.log('debounced:', x), 0.5);
debouncedFn('a');
debouncedFn('b');
debouncedFn('c'); // 只有 c 会在 0.5s 后执行

// 节流示例
const throttledFn = _throttle((x) => console.log('throttled:', x), 0);
throttledFn(1);
throttledFn(2); // 被忽略
throttledFn(3); // 被忽略
console.log('(防抖结果将在 0.5s 后出现，这里只展示节流的同步结果)');`,
  },
  {
    id: 'flat-array',
    name: '数组扁平化 Flatten',
    category: '数组操作',
    group: 'javascript',
    tags: ['递归', '数组', 'reduce'],
    difficulty: 'Easy',
    description:
      '三种方式实现数组扁平化：递归、reduce 递归、迭代。将嵌套数组展开为一维。',
    sourceCode: jsSrc('flatArrayDeep.js'),
    testCode: `const nested = [1, [2, [3, [4]], 5], [6, 7]];
console.log('递归:', flatArrayDeep(nested));
console.log('reduce:', faltArrByReduce(nested));
console.log('迭代:', flatArr(nested));`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
  },
  {
    id: 'lazy-man',
    name: 'LazyMan 任务队列',
    category: '设计模式',
    group: 'javascript',
    tags: ['任务队列', '链式调用', '异步'],
    difficulty: 'Medium',
    description:
      '使用任务队列实现链式调用，支持 eat 和 sleep 方法。理解宏任务和微任务调度。',
    sourceCode: jsSrc('lazyMan.js'),
    testCode: `// LazyMan 使用 setTimeout 异步执行任务队列
// 在同步的 new Function 中无法看到完整的异步输出
// 这里展示代码结构
console.log('LazyMan 代码结构:');
const man = new LazyMan('Tom');
console.log('已创建 LazyMan("Tom")');
console.log('调用: man.eat("lunch").sleep(1).eat("dinner")');
man.eat('lunch').sleep(1).eat('dinner');
console.log('任务入队完成, 将异步执行');`,
  },
  {
    id: 'lodash-get',
    name: 'lodash.get 实现',
    category: '工具函数',
    group: 'javascript',
    tags: ['对象', '路径解析', '工具'],
    difficulty: 'Easy',
    description:
      '实现 lodash.get，安全地按路径访问嵌套对象属性。支持点号和方括号语法。',
    sourceCode: jsSrc('lodashGet.js'),
    testCode: `const obj = { a: { b: { c: 42 } }, d: [1, 2, { e: 3 }] };
console.log("get(obj, 'a.b.c'):", get(obj, 'a.b.c'));
console.log("get(obj, 'd[2].e'):", get(obj, 'd[2].e'));
console.log("get(obj, 'x.y.z'):", get(obj, 'x.y.z'));`,
    timeComplexity: 'O(n) n=路径深度',
    spaceComplexity: 'O(n)',
  },
  {
    id: 'lru-cache',
    name: 'LRU 缓存',
    category: '设计模式',
    group: 'javascript',
    tags: ['Map', '缓存', '设计'],
    difficulty: 'Medium',
    description:
      '使用 Map（有序）实现 LRU 缓存。get 时更新顺序，set 时淘汰最久未用。',
    sourceCode: jsSrc('LRU.js'),
    testCode: `const cache = new LRU(3);
cache.set('a', 1);
cache.set('b', 2);
cache.set('c', 3);
console.log('get a:', cache.get('a')); // 1, a 变为最新
cache.set('d', 4); // 淘汰 b (最久未用)
console.log('get b:', cache.get('b')); // null (已淘汰)
console.log('get c:', cache.get('c')); // 3
console.log('get d:', cache.get('d')); // 4`,
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(n)',
  },
  {
    id: 'new-operator',
    name: '手写 new 操作符',
    category: '原型与类型',
    group: 'javascript',
    tags: ['原型链', 'new', '构造函数'],
    difficulty: 'Medium',
    description:
      '手写 new：创建对象 → 绑定原型 → 执行构造函数 → 判断返回值。理解 new 的本质。',
    sourceCode: jsSrc('newOperator.js'),
    testCode: `function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.sayHi = function() { return 'Hi, ' + this.name; };

const p = myNew(Person, 'Tom', 25);
console.log('name:', p.name);
console.log('age:', p.age);
console.log('sayHi:', p.sayHi());
console.log('instanceof:', p instanceof Person);`,
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
  },
  {
    id: 'instanceof',
    name: '手写 instanceof',
    category: '原型与类型',
    group: 'javascript',
    tags: ['原型链', 'instanceof'],
    difficulty: 'Easy',
    description:
      '沿原型链查找，判断实例的原型链上是否存在构造函数的 prototype。',
    sourceCode: jsSrc('instanceof.js'),
    testCode: `class Animal {}
class Dog extends Animal {}
const dog = new Dog();
console.log('dog instanceof Dog:', newInstance(dog, Dog));
console.log('dog instanceof Animal:', newInstance(dog, Animal));
console.log('dog instanceof Object:', newInstance(dog, Object));
console.log('null instanceof Dog:', newInstance(null, Dog));
console.log('"str" instanceof String:', newInstance('str', String));`,
    timeComplexity: 'O(n) n=原型链长度',
    spaceComplexity: 'O(1)',
  },
  {
    id: 'singleton',
    name: '单例模式 Singleton',
    category: '设计模式',
    group: 'javascript',
    tags: ['设计模式', '闭包', '类'],
    difficulty: 'Easy',
    description:
      '两种实现：ES6 class 的静态私有属性；IIFE 闭包。保证全局唯一实例。',
    sourceCode: jsSrc('singleton.js'),
    testCode: `const s1 = new Singleton('first');
const s2 = new Singleton('second');
console.log('s1 === s2:', s1 === s2);
console.log('s1.get():', s1.get());

const sf1 = new SingletonFunc('first');
const sf2 = new SingletonFunc('second');
console.log('sf1 === sf2:', sf1 === sf2);
console.log('sf1.get():', sf1.get());`,
  },
  {
    id: 'type-checker',
    name: '类型检查 Type Checker',
    category: '原型与类型',
    group: 'javascript',
    tags: ['类型', 'typeof', 'toString'],
    difficulty: 'Easy',
    description:
      '使用 Object.prototype.toString.call() 精确判断类型，返回小写类型名。',
    sourceCode: jsSrc('typeChecker.js'),
    testCode: `console.log('[]:', getType([]));
console.log('null:', getType(null));
console.log('new Date():', getType(new Date()));
console.log('{}:', getType({}));
console.log('"str":', getType('str'));
console.log('123:', getType(123));
console.log('undefined:', getType(undefined));
console.log('/regex/:', getType(/regex/));
console.log('new Map():', getType(new Map()));`,
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
  },
];

// Get all unique categories
export function getCategories(): string[] {
  const cats = new Set(algorithms.map(a => a.category));
  return Array.from(cats);
}

// Get all unique tags
export function getAllTags(): string[] {
  const tags = new Set(algorithms.flatMap(a => a.tags));
  return Array.from(tags);
}
