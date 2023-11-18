/* eslint-disable curly */

/**
 * Find the longest common prefix string amongst an array of strings.
 * @see https://leetcode.com/problems/longest-common-prefix
 */
describe('Longest Common Prefix', () => {
  it('should get the longest common prefix present in all words', () => {
    expect(longestCommonPrefix(['flower', 'flow', 'flight'])).toBe('fl');
    expect(longestCommonPrefix(['earn', 'east', 'end', 'zion'])).toBe('');
    expect(longestCommonPrefix(['dog', 'racecar', 'car'])).toBe('');
    expect(longestCommonPrefix(['break'])).toBe('break');
    expect(longestCommonPrefix(['', 'b', ''])).toBe('');
    expect(longestCommonPrefix(['', ''])).toBe('');
    expect(longestCommonPrefix([''])).toBe('');
  });

  it('should get the string with the longest repeated prefix', () => {
    expect(longestRepeatedPrefix(['flower', 'flow', 'flight'])).toBe('fl');
    expect(longestRepeatedPrefix(['earn', 'east', 'end', 'zion'])).toBe('e');
    expect(longestRepeatedPrefix(['dog', 'racecar', 'car'])).toBe('');
    expect(longestRepeatedPrefix(['break'])).toBe('break');
    expect(longestRepeatedPrefix(['', 'b', ''])).toBe('');
    expect(longestRepeatedPrefix(['', ''])).toBe('');
    expect(longestRepeatedPrefix([''])).toBe('');
  });
});

/**
 * Get the longest common prefix present in all words
 * @param words List of words
 * @returns The longest common prefix
 */
function longestCommonPrefix(words: string[]): string {
  if (!words.length) return '';

  words.sort();
  const first = words[0];
  const last = words[words.length - 1];
  let i = 0;

  // all elements are sorted, and prefix must be in all of them
  while (i < first.length && i < last.length && first[i] === last[i]) {
    i++;
  }

  return first.substring(0, i);
}

/**
 * Get the longest most repeated prefix amongst an array of words
 * @param words List of words
 * @returns The longest most repeated prefix
 */
function longestRepeatedPrefix(words: string[]): string {
  const end = words.length - 1;
  if (end < 1) return end ? '' : words[0];

  const prefix = Object.create(null);
  let prefixLessThanWord = true;
  let p: string;
  let n = 1;

  do {
    for (let i = end; i >= 0; i--) {
      // prefix can't be greater than shortest word
      if (n >= words[i].length) {
        prefixLessThanWord = false;
      }
      p = words[i].substring(0, n);
      prefix[p] = (prefix[p] || 0) + 1;
    }
    n++;
  } while (prefixLessThanWord);

  // constraint: 0 <= words[i].length <= 200
  const MAX = 200;
  const desc = Object.keys(prefix)
    .filter(k => prefix[k] > 1)
    .sort(
      // sorts by count and by key length
      (a, b) => prefix[b] * MAX + b.length - (prefix[a] * MAX + a.length),
    );

  return desc.length ? desc[0] : '';
}
