var trap = function (height) {
  let left = 0;
  let right = height.length - 1;
  let maxLeft = 0;
  let maxRight = 0;

  let total = 0;

  while (left < right) {
    const leftHeight = height[left];
    const rightHeight = height[right];
    // maxLeft = Math.max(maxLeft, leftHeight)

    if (leftHeight < rightHeight) {
      if (maxLeft > leftHeight) {
        total += maxLeft - leftHeight;
      } else {
        maxLeft = leftHeight;
      }
      ++left;
    } else {
      if (maxRight > rightHeight) {
        total += maxRight - rightHeight;
      } else {
        maxRight = rightHeight;
      }
      --right;
    }
  }

  return total;
};
