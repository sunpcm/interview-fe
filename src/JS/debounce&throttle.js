function debounce(callback, delay = 200) {
  let timer;
  return function (...args) {
    const context = this;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      callback.apply(context, args);
    }, delay);
  };
}

function throttle(callback, delay) {
  let timer;
  return function (...args) {
    const context = this;
    if (timer) return;
    timer = setTimeout(() => {
      callback.apply(this, args);
      timer = null;
    }, delay);
  };
}

const handleSearch = () => {};
const handleScroll = () => {};

const debouncedSearch = debounce(handleSearch, 500);
const throttledScrollHandler = throttle(handleScroll, 1000);
