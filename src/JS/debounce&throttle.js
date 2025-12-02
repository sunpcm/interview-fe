const _debounce = (callback, delay) => {
  let timer = null;

  return function (...args) {
    console.log('[args]', args, timer);

    if (timer) clearTimeout(timer);
    const context = this;

    console.log('[args]', args);

    timer = setTimeout(() => {
      callback.apply(context, args);
    }, delay * 1000);
  };
};

const search = args => {
  console.log('search', args);
};

const debFunc = _debounce(search, 5);

const _throttle = (callback, delay) => {
  let lastTime = 0;

  return function (...args) {
    const context = this;
    const now = Date.now();

    if (now - lastTime > delay * 1000) {
      callback.apply(context, args);
      lastTime = now;
    }
  };
};

const click = data => console.log(data);

const throttleFunc = _throttle(click, 1);

throttleFunc(1);

// 普通函数的 this 是在调用时（运行时）决定的； 箭头函数的 this 是在定义时（编写时）决定的。
