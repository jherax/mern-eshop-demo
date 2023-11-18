/**
 * Binary search algorithm for sorted elements.
 * @see https://www.geeksforgeeks.org/binary-search-in-javascript/
 */
describe('Binary search algorithm for sorted elements', () => {
  it('should return the index of the found element', () => {
    // even length array
    expect(binarySearch([1, 3, 5, 7, 8, 9], 5)).toBe(2);
    // odd length array
    expect(binarySearch([1, 3, 4, 5, 7, 8, 9], 8)).toBe(5);
    expect(binarySearch([1, 3, 4, 5, 7, 8, 9], 4)).toBe(2);
    expect(binarySearch([806], 806)).toBe(0);
  });

  it('should return -1 if there is no match', () => {
    expect(binarySearch([2, 25, 6, 7, 31, 58], 3)).toBe(-1);
    expect(binarySearch([6], 41)).toBe(-1);
    expect(binarySearch([], 395)).toBe(-1);
  });
});

/**
 * Finds an element by splitting the array in 2, and comparing the target
 * with values in the half, then perform the search on the correct side.
 *
 * @param items Array of elements
 * @param target Element to find
 * @returns The index of found element, or -1 if no match
 */
function binarySearch(items: number[], target: number): number {
  let end = items.length - 1;
  if (end < 0) {
    return -1;
  } else if (end === 0) {
    return items[0] === target ? 0 : -1;
  }
  // starts a loop over the array
  let mid: number;
  let start = 0;

  // performs the binary search
  while (start <= end) {
    mid = Math.floor((start + end) / 2);
    // return the index if element is present at [start, mid, end]
    if (items[start] === target) {return start;}
    if (items[mid] === target) {return mid;}
    if (items[end] === target) {return end;}
    // look in left or right half accordingly
    if (target > items[mid]) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }
  return -1;
}
