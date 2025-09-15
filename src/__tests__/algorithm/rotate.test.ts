import { rotate2, rotate } from '../../algorithm/rotate';

describe('Rotate test', () => {
  it('正常情况', () => {
    const arr = [1, 2, 3, 4, 5];
    const k = 2;
    const result = rotate(arr, k);
    expect(result).toEqual([4, 5, 1, 2, 3]);
  });

  it('数组为空', () => {
    // @ts-expect-error arr is [], just for jest test
    const arr = [];
    const k = 2;
    // @ts-expect-error arr is [], just for jest test
    const result = rotate(arr, k);
    expect(result).toEqual([]);
  });

  it('k 是负数', () => {
    const arr = [1, 2, 3, 4, 5];
    const k = -1;
    const result = rotate(arr, k);
    expect(result).toEqual([5, 1, 2, 3, 4]);
  });
});

describe('Rotate2 test', () => {
  it('正常情况', () => {
    const arr = [1, 2, 3, 4, 5];
    const k = 2;
    const result = rotate2(arr, k);
    expect(result).toEqual([4, 5, 1, 2, 3]);
  });

  it('数组为空', () => {
    // @ts-expect-error arr is [], just for jest test
    const arr = [];
    const k = 2;
    // @ts-expect-error arr is [], just for jest test
    const result = rotate2(arr, k);
    expect(result).toEqual([]);
  });

  it('k 是负数', () => {
    const arr = [1, 2, 3, 4, 5];
    const k = -1;
    const result = rotate2(arr, k);
    expect(result).toEqual([5, 1, 2, 3, 4]);
  });
});
