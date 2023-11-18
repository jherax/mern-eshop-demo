/**
 * @see https://www.geeksforgeeks.org/selection-sort/
 */
describe('Two pointer Selection sort algorithm', () => {
  it('should perform an ascending sort over the array', () => {
    // odd length array
    let elements = [9, 4, 2, 8, 1];
    expect(biSelectionSort(elements)).toEqual([1, 2, 4, 8, 9]);
    elements = [76, 4, 9, 25, 4, 2, 31, 58, 4];
    expect(biSelectionSort(elements)).toEqual([2, 4, 4, 4, 9, 25, 31, 58, 76]);
    // even length array
    elements = [431, 94, 6785, 32, 89, 5];
    expect(biSelectionSort(elements)).toEqual([5, 32, 89, 94, 431, 6785]);
    expect(elements).toStrictEqual([5, 32, 89, 94, 431, 6785]);
    expect(biSelectionSort([7, 1])).toEqual([1, 7]);
    expect(biSelectionSort([3])).toEqual([3]);
    expect(biSelectionSort([])).toEqual([]);
  });
});

/**
 * Uses two pointers to select repeatedly the smallest and largest element from the
 * unsorted portion of the list, and moving them to the sorted portions (left and right).
 * @param items List of elements to sort
 * @returns Original array sorted
 */
function biSelectionSort(items: number[]): number[] {
  if (items.length < 2) {
    return items;
  }
  let [left, right] = [0, items.length - 1];
  const mid = Math.floor(right / 2);
  // smallest numbers will be sorted on the left side,
  // and biggest numbers will be sorted on the right.
  for (; left <= mid; left += 1, right -= 1) {
    let minId = left;
    let maxId = right;
    let maxVal = items[maxId];
    // iterates over the unsorted portion of the array
    for (let x = left; x <= right; x += 1) {
      if (items[x] < items[minId]) {
        minId = x;
      } else if (items[x] > items[maxId]) {
        maxId = x;
        maxVal = items[maxId];
      }
    }
    // swaps the smallest number with the left position
    [items[left], items[minId]] = [items[minId], items[left]];
    // validates if the left position had the `maxVal` number,
    // this happens sometimes after the left swap.
    if (maxVal === items[minId]) {
      [items[right], items[minId]] = [items[minId], items[right]];
    }
    // validates if the swap placed both elements in the correct place
    if (maxVal !== items[right]) {
      [items[right], items[maxId]] = [items[maxId], items[right]];
    }
  }
  return items;
}
