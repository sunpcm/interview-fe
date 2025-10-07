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
