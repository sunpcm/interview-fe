import { validBrackets } from '@/algorithm/validBrackets';

describe('ValidBrackets tes', () => {
  it('正常情况', () => {
    const str = '({[]}0)(())[]';
    const result = validBrackets(str);
    expect(result).toBe(true);
  });
  it('左边多', () => {
    const str = '({[]}0(())[]';
    const result = validBrackets(str);
    expect(result).toBe(false);
  });
  it('右边多', () => {
    const str = '({[]})0())[]';
    const result = validBrackets(str);
    expect(result).toBe(false);
  });
  it('顺序错误', () => {
    const str = '({[)(]})0(())[]';
    const result = validBrackets(str);
    expect(result).toBe(false);
  });
  it('空字符串', () => {
    const str = '';
    const result = validBrackets(str);
    expect(result).toBe(false);
  });
});
