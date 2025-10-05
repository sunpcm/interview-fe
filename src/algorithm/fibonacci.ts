export const fibo1 = (n: number): number => {
  if (n <= 2) return 1;
  return fibo1(n - 1) + fibo1(n - 2);
};

export const fibo2 = (n: number): number => {
  if (n <= 2) return 1;
  let n1 = 1,
    n2 = 1,
    res = 0;
  for (let i = 3; i <= n; i++) {
    res = n1 + n2;
    n1 = n2;
    n2 = res;
  }
  return res;
};
