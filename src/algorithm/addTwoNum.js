var addTwoNumbers = function (l1, l2) {
  const l1Len = l1.length;
  const l2Len = l2.length;

  const len = Math.max(l1Len, l2Len);

  let tem = 0;
  let res = [];
  for (let i = 0; i < len; i++) {
    const value = (l1[i] || 0) + (l2[i] || 0) + tem;
    if (value > 9) {
      res.push(value % 10);
      tem = 1;
    } else {
      res.push(value);
      tem = 0;
    }
  }
  if (tem === 1) res.push(1);
  return res;
};
