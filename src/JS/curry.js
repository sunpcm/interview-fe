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
