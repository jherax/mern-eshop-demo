/**
 * @see https://www.geeksforgeeks.org/selection-sort/
 */
describe('Double-selection sort algorithm', () => {
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
 * Works by repeatedly selecting the smallest and largest element
 * from the unsorted portion of the list and moving them to the sorted portions of the list.
 * @param items List of elements to sort
 * @returns Original array sorted
 */
function biSelectionSort(items: number[]): number[] {
  // let iterations = 0;
  if (items.length < 2) {
    return items;
  }
  let left = 0,
    right = items.length - 1;
  const mid = Math.floor(right / 2);
  // smallest numbers will be sorted on the left side,
  // and biggest numbers will be sorted on the right.
  for (; left <= mid; left += 1, right -= 1) {
    let min = left;
    let max = right;
    let big = items[max];
    // iterates over the unsorted portion of the array
    for (let x = left; x <= right; x += 1) {
      // iterations++;
      if (items[x] < items[min]) {
        min = x;
      } else if (items[x] > items[max]) {
        max = x;
        big = items[max];
      }
    }
    // swaps the smallest number with the left position
    [items[left], items[min]] = [items[min], items[left]];
    // validates if the left position had the big number,
    // this happens sometimes after the previous swap.
    if (big === items[min]) {
      [items[right], items[min]] = [items[min], items[right]];
    }
    // validates if the swap already placed both elements in the right place
    if (big !== items[right]) {
      [items[right], items[max]] = [items[max], items[right]];
    }
  }
  return items;
}
