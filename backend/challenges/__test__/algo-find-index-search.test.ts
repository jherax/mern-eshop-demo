/**
 * Find the Index of the First Occurrence in a String. Otherwise return -1.
 * @see https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string
 */
describe('Find the Index of the First Occurrence in a String', () => {
  it('should return the index of the first match', () => {
    expect(findIndex(' sad but sad', 'sad')).toBe(1);
    expect(findIndex('Keratos lived another eras', 'eras')).toBe(22);
  });

  it('should return -1 if there is no match', () => {
    expect(findIndex('leetcode', 'leeto')).toBe(-1);
  });
});

function findIndex(text: string, search: string): number {
  const end = search.length;
  for (let i = 0; i < text.length; i++) {
    let m = 0;
    while (m < end && text[i + m] === search[m]) {
      m++;
    }
    if (m === end) {
      return i;
    }
  }
  return -1;
}
