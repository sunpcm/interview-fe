export const findMedianSortedArrays = (
  nums1: number[],
  nums2: number[]
): number => {
  const len1 = nums1.length;
  const len2 = nums2.length;

  const k = Math.ceil((len1 + len2) / 2);
  const isEven = (len1 + len2) % 2 === 0;

  if (k === 0) return NaN;

  if (k === len1 + len2) {
    return len1 ? nums1[0] : nums2[0];
  }

  let i = 0;
  let j = 0;

  const kArr: number[] = [];

  while (i + j + 1 <= k + 1) {
    const num1 = nums1[i] ?? Infinity;
    const num2 = nums2[j] ?? Infinity;

    if (num1 <= num2 && i <= len1 - 1) {
      kArr.push(num1);
      ++i;
    }
    if (num1 > num2 && j <= len2 - 1) {
      kArr.push(num2);
      ++j;
    }
  }
  if (isEven) {
    return (kArr[kArr.length - 2] + kArr[kArr.length - 1]) / 2;
  } else {
    return kArr[kArr.length - 2];
  }
};

// TODO
// export const findMedianSortedArrays_Optimal = (
//   nums1: number[],
//   nums2: number[]
// ): number => {
//   const len1 = nums1.length;
//   const len2 = nums2.length;
//
//   // 保证 nums1 是较短的数组，这有助于简化二分查找
//   if (len1 > len2) {
//     return findMedianSortedArrays_Optimal(nums2, nums1);
//   }
//
//   const totalLen = len1 + len2;
//   // k 是“合并后数组的左半部分”应该有多少个元素
//   // (m+n+1)/2 这个公式巧妙地同时处理了奇数和偶数的情况
//   const k = Math.floor((totalLen + 1) / 2);
//
//   // 在较短的数组 nums1 上进行二分查找，寻找分割点 i
//   // i 的范围是 [0, len1]
//   let low = 0;
//   let high = len1;
//
//   while (low <= high) {
//     // i: nums1 中左半部分的元素个数
//     const i = Math.floor((low + high) / 2);
//     // j: nums2 中左半部分的元素个数
//     const j = k - i;
//
//     // 获取分割点两侧的 4 个关键值
//     // nums1[i-1] (L1), nums1[i] (R1)
//     // nums2[j-1] (L2), nums2[j] (R2)
//     // 必须处理 i=0, j=0, i=len1, j=len2 时的边界情况
//     const L1 = (i === 0) ? -Infinity : nums1[i - 1];
//     const R1 = (i === len1) ? Infinity : nums1[i];
//     const L2 = (j === 0) ? -Infinity : nums2[j - 1];
//     const R2 = (j === len2) ? Infinity : nums2[j];
//
//     if (L1 <= R2 && L2 <= R1) {
//       // 找到了完美的分割点
//       if (totalLen % 2 === 0) {
//         // 偶数情况，中位数是左半部分最大值和右半部分最小值的平均
//         return (Math.max(L1, L2) + Math.min(R1, R2)) / 2;
//       } else {
//         // 奇数情况，中位数就是左半部分的最大值
//         return Math.max(L1, L2);
//       }
//     } else if (L1 > R2) {
//       // L1 太大，i 需要向左移动
//       high = i - 1;
//     } else { // L2 > R1
//       // L2 太大 (意味着 L1 偏小)，i 需要向右移动
//       low = i + 1;
//     }
//   }
//
//   // 理论上，如果数组确实是排序的，总会找到解，不会运行到这里
//   return 0;
// };
