/* eslint-disable curly */

/**
 * @see https://www.geeksforgeeks.org/selection-sort/
 */
describe('Selection sort algorithm', () => {
  it('should perform an ascending sort over the array', () => {
    // odd length array
    let elements = [76, 4, 9, 25, 4, 2, 31, 58, 4];
    expect(selectionSort(elements)).toEqual([2, 4, 4, 4, 9, 25, 31, 58, 76]);
    // even length array
    elements = [431, 94, 6785, 32, 89, 5];
    expect(selectionSort(elements)).toEqual([5, 32, 89, 94, 431, 6785]);
    expect(elements).toStrictEqual([5, 32, 89, 94, 431, 6785]);
    expect(selectionSort([7, 1])).toEqual([1, 7]);
    expect(selectionSort([3])).toEqual([3]);
    expect(selectionSort([])).toEqual([]);
  });
});

/**
 * Works by repeatedly selecting the smallest (or largest) element
 * from the unsorted portion of the list and moving it to the sorted portion of the list.
 * @param items List of elements to sort
 * @returns Original array sorted
 */
function selectionSort(items: number[]): number[] {
  const end = items.length;
  if (end < 2) return items;

  // sorted portion will be at the left
  for (let left = 0; left < end - 1; left += 1) {
    let min = left;
    // starts at the next element of the sorted portion
    for (let x = left + 1; x < end; x += 1) {
      // gets the smallest number
      if (items[x] < items[min]) min = x;
    }
    // swaps the smallest element with the sorted position on the left
    [items[left], items[min]] = [items[min], items[left]];
  }
  return items;
}
