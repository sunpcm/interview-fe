/**
 * 修复后的柯里化函数
 * @param {Function} fun 需要被柯里化的函数
 */
export function curry(fun) {
  // 返回一个新的函数，它负责收集所有参数
  return function curried(...args) {
    // 1. fun.length 获取的是函数定义时的参数个数
    // 2. 如果收集到的参数数量足够
    if (args.length >= fun.length) {
      // 就直接执行原函数，并返回结果
      // 使用 apply 来确保 this 指向正确，并传入参数数组
      return fun.apply(this, args);
    } else {
      // 3. 如果参数还不够，返回一个新的函数
      // 这个新函数会等待接收剩余的参数
      return function (...nextArgs) {
        // 当这个新函数被调用时，将之前传入的参数(args)
        // 和新传入的参数(nextArgs)拼接在一起，
        // 再次调用 curried 函数进行判断
        return curried.apply(this, args.concat(nextArgs));
      };
    }
  };
}

/**
 * 实现一个 sum 函数，使其可以链式调用并累加参数
 * @param {...number} initialArgs - 初始参数
 * @returns {Function} - 一个可以继续接收参数的函数
 */
function sum(...initialArgs) {
  // 1. 使用一个闭包变量来存储所有累加的参数
  let accumulatedArgs = [...initialArgs];

  // 2. 定义并返回一个内部函数，用于继续接收参数
  function adder(...nextArgs) {
    // 将新参数合并到累加数组中
    accumulatedArgs.push(...nextArgs);
    // 返回自身，以实现无限链式调用
    return adder;
  }

  // 3. 重写内部函数的 valueOf 和 toString 方法 (实现隐式转换的关键)
  // 当 adder 函数被用在需要数字的上下文中时 (例如：加法运算)，valueOf 会被自动调用
  adder.valueOf = function () {
    console.log('valueOf is called'); // 方便观察
    return accumulatedArgs.reduce((acc, current) => acc + current, 0);
  };

  // 当 adder 函数被用在需要字符串的上下文中时 (例如：console.log)，toString 会被优先调用
  adder.toString = function () {
    console.log('toString is called'); // 方便观察
    return accumulatedArgs.reduce((acc, current) => acc + current, 0);
  };

  return adder;
}

// --- 测试 ---
const result = sum(1)(2)(3, 4)(5);

// 直接 console.log 会触发 toString()
console.log('最终结果:', result);
// 输出:
// toString is called
// 最终结果: 15

// 在算术运算中会触发 valueOf()
console.log('算术运算结果:', result + 10);
// 输出:
// valueOf is called
// 算术运算结果: 25

// 你也可以显式调用
console.log('显式调用 valueOf:', result.valueOf());
// 输出:
// valueOf is called
// 显式调用 valueOf: 15

function sum2(...args) {
  let argList = [...args];

  function add(...nextArgs) {
    argList = argList.concat(nextArgs);
    return add;
  }

  add.valueOf = () => {
    console.log('value');
    return argList.reduce((acc, cur) => acc + cur, 0);
  };
  add.toString = () => {
    console.log('string');
    return argList.reduce((acc, cur) => acc + cur, 0);
  };
  return add;
}
