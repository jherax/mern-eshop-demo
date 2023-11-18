/* eslint-disable curly */

/**
 * Two strings `str` and `txt` are isomorphic if the characters in `str` can be replaced to get `txt`.
 * No two characters may map to the same character, but a character may map to itself.
 * @see https://leetcode.com/problems/isomorphic-strings/
 */
describe('Isomorphic Strings', () => {
  it('should be able to replace characters in "str" to get "txt"', () => {
    expect(isIsomorphic('paper', 'title')).toBe(true);
    expect(isIsomorphic('badc', 'baba')).toBe(false);
    expect(isIsomorphic('foo', 'bar')).toBe(false);
    expect(isIsomorphic('egg', 'add')).toBe(true);
  });
});

function isIsomorphic(str: string, txt: string): boolean {
  if (str.length !== txt.length) return false;
  const smap = {}; // map keys in str
  const tmap = {}; // map keys in txt
  let skey: string, tkey: string;

  for (let i = 0; i < str.length; ++i) {
    skey = str[i];
    tkey = txt[i];
    // key from str was already mapped, but its mapped value is different
    if (smap[skey] != null && smap[skey] !== tkey) return false;
    // key from txt was already mapped, but its mapped value is different
    if (tmap[tkey] != null && tmap[tkey] !== skey) return false;
    smap[skey] = tkey;
    tmap[tkey] = skey;
  }

  return true;
}

// =====================================

/**
 * Given a pattern and a string `str`, find if `str` follows the same pattern.
 * A letter in pattern may be mapped as a word in `str`.
 * @see https://leetcode.com/problems/word-pattern
 */
describe('Validate Word Pattern', () => {
  it('should be able to map words in "str" as a pattern', () => {
    expect(wordPattern('abba', 'dog constructor constructor dog')).toBe(true);
    expect(wordPattern('abba', 'dog cat cat dog')).toBe(true);
    expect(wordPattern('abba', 'dog cat cat fish')).toBe(false);
    expect(wordPattern('abba', 'dog dog dog dog')).toBe(false);
    expect(wordPattern('aaaa', 'dog cat cat dog')).toBe(false);
  });
});

function wordPattern(pattern: string, str: string): boolean {
  const words = str.trim().split(/\s+/);
  if (words.length !== pattern.length) return false;
  const pmap = {};
  // used a Map instead plain object because
  // some words could be valid methods of object
  const wmap = new Map<string, string>();
  let pkey: string, word: string;
  for (let i = words.length; i; ) {
    word = words[--i];
    pkey = pattern[i];
    if (pmap[pkey] && pmap[pkey] !== word) return false;
    if (wmap.has(word) && wmap.get(word) !== pkey) return false;
    wmap.set(word, pkey);
    pmap[pkey] = word;
  }
  return true;
}
