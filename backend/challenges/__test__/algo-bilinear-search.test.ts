/**
 * @see https://www.geeksforgeeks.org/linear-search/
 */
describe('Bi-linear search algorithm for unsorted elements', () => {
  it('should return the index of matches in the original order', () => {
    // even length array
    expect(bilinearSearch([7, 4, 7, 25, 6, 7, 31, 58], 7)).toEqual([0, 2, 5]);
    // odd length array
    expect(bilinearSearch([2, 4, 9, 25, 4, 76, 31, 58, 4], 4)).toEqual([
      1, 4, 8,
    ]);
    expect(bilinearSearch([93], 93)).toEqual([0]);
  });

  it('should return an empty array if there are no matches', () => {
    expect(bilinearSearch([2, 25, 6, 7, 31, 58], 8)).toEqual([]);
    expect(bilinearSearch([6], 41)).toEqual([]);
    expect(bilinearSearch([], 395)).toEqual([]);
  });
});

/**
 * Find all matches in the array by iterating one by one, from start and from the end.
 * @param items Array of elements
 * @param target Element to find
 * @returns An array of indexes of all matches
 */
function bilinearSearch(items: number[], target: number): number[] {
  if (items.length === 0) {
    return [];
  } else if (items.length === 1) {
    return items[0] === target ? [0] : [];
  }
  // starts a loop over the array
  const foundIndexes: number[] = [];
  let foundSize: number;
  // performs a linear search in both directions: from beginning and from the end
  for (let i1 = 0, end = items.length - 1; i1 <= end; i1 += 1, end -= 1) {
    foundSize = foundIndexes.length;
    // search from the beginning
    if (target === items[i1]) {
      if (foundSize === 0) {
        // initializes the search results array
        foundIndexes.push(i1);
      } else {
        // inserts indexes in the correct order
        if (i1 > foundIndexes[foundSize - 1]) {
          foundIndexes.push(i1);
        } else {
          foundIndexes.splice(foundSize - 1, 0, i1);
        }
      }
    }
    // if the middle element in the array matches,
    // then finish the loop to prevent diplication
    if (i1 === end) {
      break;
    }
    // also searches from the end
    if (target === items[end]) {
      if (foundSize === 0) {
        // initializes the search results array
        foundIndexes.push(end);
      } else {
        // inserts indexes in the correct order
        if (end > foundIndexes[foundSize - 1]) {
          foundIndexes.push(end);
        } else {
          foundIndexes.splice(foundSize - 1, 0, end);
        }
      }
    }
  }

  return foundIndexes;
}
