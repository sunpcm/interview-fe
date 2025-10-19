import { findMedianSortedArrays } from '@/algorithm/findMedianSortedArrays.ts';

describe('findMedianSortedArrays', () => {
  it('should return the median of two sorted arrays', () => {
    expect(findMedianSortedArrays([1, 3], [2])).toBe(2);
  });

  it('should return the median of two sorted arrays of even length', () => {
    expect(findMedianSortedArrays([1, 2], [3, 4])).toBe(2.5);
  });

  it('should return the median when one array is empty', () => {
    expect(findMedianSortedArrays([], [1])).toBe(1);
    expect(findMedianSortedArrays([2, 3], [])).toBe(2.5);
  });

  it('should return the median for arrays with different lengths', () => {
    expect(findMedianSortedArrays([1, 5, 9], [2, 3, 4, 6, 7, 8])).toBe(5);
  });

  it('should handle arrays with duplicate numbers', () => {
    expect(findMedianSortedArrays([1, 1, 1], [1, 1, 1])).toBe(1);
  });

  it('should handle negative numbers', () => {
    expect(findMedianSortedArrays([-2, -1], [0])).toBe(-1);
  });
});
