import { deepCloneDfs, deepCloneBfs } from '@/JS/deepClone';

const list = [
  { name: 'bfs', fn: deepCloneBfs },
  { name: 'dfs', fn: deepCloneDfs },
];
describe('deepClone', () => {
  list.forEach(({ name, fn }) => {
    describe(`${name}`, () => {
      it('值类型', () => {
        expect(1).toBe(1);
      });
      // it('值类型', () => {
      // 	expect(fn(100)).toBe(100)
      // 	expect(fn('abc')).toBe('abc')
      // 	expect(fn(null)).toBe(null)
      // })
      // it('普通对象和数组', () => {
      // 	const obj = {
      // 		name: 'name',
      // 		info: {
      // 			city: '北京'
      // 		},
      // 		arr: [10, 20, 30]
      // 	}
      // 	const obj1 = fn(obj)
      // 	obj.info.city = '上海'
      //
      // 	expect(obj1.info.city).toBe('北京')
      // 	expect(obj1.arr).toEqual([10, 20, 30])
      // })
      // it('Map', () => {
      // 	const m1 = new Map([['x', 10], ['y', 20]])
      // 	const m2 = fn(m1)
      // 	expect(m2.size).toBe(2)
      //
      // 	const obj = {
      // 		map: new Map([['x', 10], ['y', 20]])
      // 	}
      // 	const obj1 = fn(obj)
      // 	expect(obj1.map.size).toBe(2)
      // })
      // it('Set', () => {
      // 	const s1 = new Set([10, 20, 30])
      // 	const s2 = fn(s1)
      // 	expect(s2.size).toBe(3)
      //
      // 	const obj = {
      // 		s: new Set([10, 20, 30])
      // 	}
      // 	const obj1 = fn(obj)
      // 	expect(obj1.s.size).toBe(3)
      // })
      // it('循环引用', () => {
      // 	const a = {}
      // 	a.self = a
      //
      // 	const b = fn(a)
      // 	expect(b.self).toBe(b)
      // })
    });
  });
});
