import { revertNum1, revertNum2 } from '@/algorithm/revertNum';

const list = [
  {
    fn: revertNum2,
    name: 'revertNum2',
  },
  {
    fn: revertNum1,
    name: 'revertNum1',
  },
];

describe('revert num', () => {
  list.forEach(({ fn, name }) => {
    describe(name, () => {
      it('正常情况', () => {
        const numbers = fn(200);
        expect(numbers.length).toBe(29);
      });
      it('max 小于等于 0', () => {
        const numbers = fn(0);
        expect(numbers).toEqual([]);
      });
    });
  });
});
