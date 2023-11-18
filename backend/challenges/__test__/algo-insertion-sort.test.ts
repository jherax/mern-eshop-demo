/* eslint-disable curly */

/**
 * @see https://www.geeksforgeeks.org/insertion-sort/
 */
describe('Insertion sort algorithm', () => {
  it('should perform an ascending sort over the array', () => {
    // odd length array
    let elements = [76, 4, 9, 25, 4, 2, 31, 58, 4];
    expect(insertionSort(elements)).toEqual([2, 4, 4, 4, 9, 25, 31, 58, 76]);
    // even length array
    elements = [431, 94, 6785, 32, 89, 5];
    expect(insertionSort(elements)).toEqual([5, 32, 89, 94, 431, 6785]);
    expect(elements).toStrictEqual([5, 32, 89, 94, 431, 6785]);
    expect(insertionSort([7, 1])).toEqual([1, 7]);
    expect(insertionSort([3])).toEqual([3]);
    expect(insertionSort([])).toEqual([]);
  });
});

/**
 * Compares each incoming element from the right (starting at index 1),
 * with all elements sorted on the left side of the array, and insert them
 * when corresponding by moving the other elements to the right.
 * @param items List of elements to sort
 * @returns Original array sorted
 */
function insertionSort(items: number[]): number[] {
  let incoming: number, pivot: number, left: number;
  const end = items.length;
  if (end < 2) return items;

  for (incoming = 1; incoming < end; incoming++) {
    pivot = items[incoming];
    left = incoming - 1;
    /**
     * Move elements of arr[0..outer-1, key], that are greater than key,
     * to one position ahead of their current position.
     */
    while (left >= 0 && items[left] > pivot) {
      items[left + 1] = items[left];
      left -= 1;
    }
    // places the outer element at the correct index on the left side
    items[left + 1] = pivot;
  }
  return items;
}
