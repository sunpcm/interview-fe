import { newInstance } from './newInstance';

describe('自定义 instanceof', () => {
  it('null undefined', () => {
    const res1 = newInstance(null, Object);
    expect(res1).toBe(false);

    const res2 = newInstance(undefined, Object);
    expect(res2).toBe(false);
  });
  it('值类型', () => {
    const res1 = newInstance(100, Number);
    expect(res1).toBe(false);

    const res2 = newInstance('a', String);
    expect(res2).toBe(false);
  });
  it('引用类型', () => {
    const res1 = newInstance([], Array);
    expect(res1).toBe(true);

    const res2 = newInstance({}, Object);
    expect(res2).toBe(true);

    const res3 = newInstance({}, Array);
    expect(res3).toBe(false);
  });
  it('函数', () => {
    function fn() {}
    const res = newInstance(fn, Function);
    expect(res).toBe(true);
  });
  it('自定义', () => {
    class Foo {}
    const f = new Foo();
    const res1 = newInstance(f, Foo);
    expect(res1).toBe(true);

    const res2 = newInstance(f, Object);
    expect(res2).toBe(true);
  });
});
