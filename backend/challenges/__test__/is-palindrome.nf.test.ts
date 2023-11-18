/* eslint-disable curly */

/**
 * A phrase is a palindrome if, after converting all uppercase letters
 * into lowercase letters and removing all non-alphanumeric characters,
 * it reads the same forward and backward.
 * Alphanumeric characters include letters and numbers.
 * @see https://leetcode.com/problems/valid-palindrome
 */
describe('Valid Palindrome', () => {
  it('should return true if it is a palindrome, or false otherwise', () => {
    let t1 = 'Lameculos eres, y ser eso luce mal';
    expect(isPalindromeRegExp(t1)).toBe(true);
    expect(isPalindrome(t1)).toBe(true);
    
    t1 = 'A man, a plan, a canal: Panama';
    expect(isPalindromeRegExp(t1)).toBe(true);
    expect(isPalindrome(t1)).toBe(true);

    t1 = 'race a car';
    expect(isPalindromeRegExp(t1)).toBe(false);
    expect(isPalindrome(t1)).toBe(false);

    expect(isPalindromeRegExp(' ')).toBe(true);
    expect(isPalindrome(' ')).toBe(true);
  });
});

function isPalindrome(s: string): boolean {
  let l = 0, r = s.length - 1;
  let c1: number, c2: number;
  while(l < r) {
    // get the ASCII code
    c1 = s[l].charCodeAt(0);
    c2 = s[r].charCodeAt(0);
    // convert A-Z to lowercase
    if (c1 >= 65 && c1 <= 90) c1 += 32;
    if (c2 >= 65 && c2 <= 90) c2 += 32;
    // discard non-alphabetic characters
    if (nonAlphanumeric(c1)) { l++; continue; }
    if (nonAlphanumeric(c2)) { r--; continue; }
    if (c1 !== c2) return false;
    l += 1;
    r -= 1;
  }

  return l >= r;
};

function nonAlphanumeric(c: number): boolean {
  return (
    (c < 48 || c > 57) && // non numeric
    (c < 65 || c > 90) && // non uppercase
    (c < 97 || c > 122) // non lowercase
  );
}


// using built-in RegExp and toLowerCase()
function isPalindromeRegExp(s: string): boolean {
  if (!s) return false;
  const text = s.replace(/[\W_]+/g, '').toLowerCase();
  let l = 0, r = text.length - 1;
  
  while(l < r && text[l] === text[r]) {
    l += 1;
    r -= 1;
  }

  return l >= r;
}
