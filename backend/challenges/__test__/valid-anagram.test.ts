/* eslint-disable curly */

/**
 * Given two strings s and t, return true if t is an anagram of s.
 *
 * An Anagram is a word or phrase formed by rearranging the letters
 * of a different word or phrase, typically using all the original
 * letters exactly once.
 *
 * @see https://leetcode.com/problems/valid-anagram
 */
describe('Valid Anagram', () => {
  it('should tell if second string is an anagram of the first one', () => {
    expect(isAnagram('anagram', 'nagaram')).toBe(true);
    expect(isAnagram('rat', 'cat')).toBe(false);
  });
});

function isAnagram(s: string, t: string): boolean {
  if (s === t) return true;
  if (s.length !== t.length) return false;
  const sMap = new Map<string, number>();
  const tMap = new Map<string, number>();
  let sKey: string, tKey: string;

  // counts how many times each letter is present in the string
  for (let i = s.length; i; ) {
    sKey = s[--i];
    if (sMap.has(sKey)) sMap.set(sKey, sMap.get(sKey) + 1);
    else sMap.set(sKey, 1);

    tKey = t[i];
    if (tMap.has(tKey)) tMap.set(tKey, tMap.get(tKey) + 1);
    else tMap.set(tKey, 1);
  }

  // compare the numbers of each letter
  for (const k of sMap.keys()) {
    if (sMap.get(k) !== tMap.get(k)) return false;
  }

  return true;
}

// =====================================

/**
 * Given an array of strings strs, group the anagrams together.
 * You can return the answer in any order.
 *
 * An Anagram is a word or phrase formed by rearranging the letters
 * of a different word or phrase, typically using all the original
 * letters exactly once.
 *
 * @see https://leetcode.com/problems/group-anagrams
 */
describe('Group Anagrams', () => {
  it('should group all anagrams from the array', () => {
    expect(
      groupAnagrams(['eat', 'tea', 'tan', 'ate', 'nat', 'bat']),
    ).toStrictEqual([['eat', 'tea', 'ate'], ['tan', 'nat'], ['bat']]);
    expect(groupAnagrams(['', 'b'])).toStrictEqual([[''], ['b']]);
    expect(groupAnagrams(['a'])).toStrictEqual([['a']]);
    expect(groupAnagrams([''])).toStrictEqual([['']]);
  });
});

function groupAnagrams(words: string[]): string[][] {
  const end = words.length;
  if (end === 0) return [];
  if (end === 1) return [[words[0]]];

  const anagrams = new Map<string, string[]>();
  let group: string[];
  let key: string;

  for (const word of words) {
    // as anagrams have the same letters,
    // we can use the sorted letters as key.
    key = word.split('').sort().join('');
    group = anagrams.get(key);

    if (group) {
      // add the new word to the group of anagrams
      group.push(word);
      anagrams.set(key, group);
    } else {
      anagrams.set(key, [word]);
    }
  }

  return [...anagrams.values()];
}
