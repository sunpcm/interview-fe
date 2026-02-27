export function TDlongestPalindrome(s: string): string {
  if (s.length < 2) return s;

  let start = 0;
  let maxLen = 0;

  // 辅助函数：从中心向两边扩展
  function expandAroundCenter(left: number, right: number): number {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      left--;
      right++;
    }
    // 返回回文串的长度
    return right - left - 1;
  }

  for (let i = 0; i < s.length; i++) {
    // 奇数长度的回文（中心是一个字符）
    const len1 = expandAroundCenter(i, i);
    // 偶数长度的回文（中心是两个字符之间）
    const len2 = expandAroundCenter(i, i + 1);

    const len = Math.max(len1, len2);

    if (len > maxLen) {
      maxLen = len;
      // 计算起始位置
      start = i - Math.floor((len - 1) / 2);
    }
  }

  return s.substring(start, start + maxLen);
}
