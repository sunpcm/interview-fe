export const flatArrayDeep = arr => {
  let res = [];
  arr.forEach(n => {
    if (Array.isArray(n)) {
      const flattedArr = flatArrayDeep(n);
      res = res.concat(flattedArr);
    } else {
      res = res.concat(n);
    }
  });
  return res;
};

export const faltArrByReduce = arr =>
  arr.reduce((pre, cur) => {
    return pre.concat(Array.isArray(cur) ? faltArrByReduce(cur) : cur);
  }, []);

// export const flatArrByString = (arr) => arr.toString().split(',')

export const flatArr = arr => {
  let result = [];
  arr.forEach(n => {
    if (Array.isArray(n)) {
      result = result.concat(flatArr(n));
    } else {
      result = result.concat(n);
    }
  });
  return result;
};
