import { thousandFormt } from '@/algorithm/thousandFormat';

describe('数组千分位格式化', () => {
  it('正常', () => {
    const n = 10201004050;
    const res = thousandFormt(n);
    expect(res).toBe('10,201,004,050');
  });
  it('小于 1000', () => {
    expect(thousandFormt(0)).toBe('0');
    expect(thousandFormt(10)).toBe('10');
  });
});
