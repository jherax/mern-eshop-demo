/**
 * Two pointer linear search algorithm for unsorted elements.
 * @see https://www.geeksforgeeks.org/linear-search/
 */
describe('Two pointer linear search algorithm for unsorted elements', () => {
  it('should return an array of matching indices in the original order', () => {
    // even length array
    expect(findIndicesOf([7, 4, 7, 25, 6, 7, 31, 58], 7)).toEqual([0, 2, 5]);
    // odd length array
    expect(findIndicesOf([2, 4, 9, 25, 4, 76, 31, 58, 4], 4)).toEqual([1, 4, 8]);
    expect(findIndicesOf([93], 93)).toEqual([0]);
  });

  it('should return an empty array if there are no matches', () => {
    expect(findIndicesOf([2, 25, 6, 7, 31, 58], 8)).toEqual([]);
    expect(findIndicesOf([6], 41)).toEqual([]);
    expect(findIndicesOf([], 395)).toEqual([]);
  });
});

/**
 * Find all matches in the array using a pointer from
 * the start and another from the end, simultaneously.
 * 
 * @param items Array of elements
 * @param target Element to find
 * @returns An array of indices with all matches
 */
function findIndicesOf(items: number[], target: number): number[] {
  const end = items.length - 1;
  const matchLeft: number[] = [];
  const matchRight: number[] = [];

  if (end === 0 && items[0] === target) {return [0];}
  else if (end < 0) {return matchLeft;}

  let l: number, r: number;
  for (l = 0, r = end; l < r; l++, r--) {
    if (items[l] === target) {matchLeft.push(l);}
    if (items[r] === target) {matchRight.push(r);}
  }

  // validate the middle element
  if (l === r && items[l] === target) {
    matchLeft.push(l);
  }

  // concatenates the matchRight array in correct order
  for (l = matchLeft.length, r = matchRight.length - 1; r >= 0; l++, r--) {
    matchLeft[l] = matchRight[r];
  }

  return matchLeft;
}
