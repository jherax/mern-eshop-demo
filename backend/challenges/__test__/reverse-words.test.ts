/**
 * Given an input string s, reverse the order of the words.
 * Return a string of the words in reverse order concatenated by a single space.
 * @see https://leetcode.com/problems/reverse-words-in-a-string
 */
describe('Reverse the words from a string', () => {
  it('should reverse the order of all words present in the string', () => {
    expect(reverseWords(' blue  sky  is blue ')).toBe('blue is sky blue');
    expect(reverseWordsReduce('a good  criteria ')).toBe('criteria good a');
  });
});

function reverseWords(s: string): string {
  let word = '';
  let reversed = '';
  for (let i = s.length - 1; i >= 0; i--) {
    if (s[i] !== ' ') {
      word = s[i] + word;
    } else if (word.length) {
      reversed += `${word} `;
      word = '';
    }
  }
  // adds the remaining word, if any
  if (word.length) {
    reversed += `${word}`;
  }
  return reversed.trimEnd();
}

// This solution uses native Array methods.
function reverseWordsNative(s: string): string {
  return s.split(/\s+/).filter(Boolean).reverse().join(' ');
}

function reverseWordsReduce(s: string): string {
  return s.split(' ').reduce((reversed, current, i) => {
    if (current === '') {
      return reversed;
    }
    if (i === 0 || reversed === '') {
      return current;
    }
    return `${current} ${reversed}`;
  }, '');
}
