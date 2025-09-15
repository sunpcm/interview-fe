const isMatch = (left: string, right: string): boolean => {
  if (
    (left === '(' && right === ')') ||
    (left === '{' && right === '}') ||
    (left === '[' && right === ']')
  ) {
    return true;
  }
  return false;
};

const leftBrackets = '{[(';
const rightBrackets = '}])';

export function validBrackets(brackets: string): boolean {
  const length = brackets.length;
  const stack = [];
  if (length === 0) return false;
  for (let i = 0; i <= length; i++) {
    const str = brackets[i];
    if (leftBrackets.includes(str)) {
      stack.push(str);
    } else if (rightBrackets.includes(str)) {
      const top = stack[stack.length - 1];
      if (isMatch(top, str)) {
        stack.pop();
      } else {
        return false;
      }
    }
  }
  return stack.length === 0;
}
