/**
 * @see https://www.geeksforgeeks.org/quick-sort/
 */
describe('Quick sort algorithm', () => {
  it('should perform an ascending sort over the array', () => {
    quickSort([9, 3, 4, 6, 1, 5]);
    // odd length array
    let elements = [76, 4, 9, 25, 4, 2, 31, 58, 4];
    expect(quickSort(elements)).toEqual([2, 4, 4, 4, 9, 25, 31, 58, 76]);
    // even length array
    elements = [431, 6785, 32, 89, 5, 94];
    expect(quickSortInPlace(elements)).toEqual([5, 32, 89, 94, 431, 6785]);
    expect(elements).toStrictEqual([5, 32, 89, 94, 431, 6785]);
    expect(quickSort([7, 1])).toEqual([1, 7]);
    expect(quickSort([3])).toEqual([3]);
    expect(quickSort([])).toEqual([]);
  });
});

/**
 * Picks an element as a pivot and partitions the given array
 * to place the pivot at its correct position in the sorted array
 * and put all smaller elements to the left of the pivot.
 * @note This is a recursive implementation.
 * @param items List of elements to sort
 * @returns New array sorted
 */
function quickSort(items: number[]): number[] {
  // Base case: If the array has one or zero elements, it's already sorted
  if (items.length < 2) {
    return [...items];
  }

  const end = items.length - 1;
  // Select a pivot (here, the last element)
  const pivot = items[end];
  // Create empty sub-arrays
  const left: number[] = [];
  const right: number[] = [];

  // Partition the array
  for (let i = 0; i < end; i++) {
    if (items[i] < pivot) {
      left.push(items[i]);
    } else {
      right.push(items[i]);
    }
  }

  // Recursively sort the sub-arrays
  return [...quickSort(left), pivot, ...quickSort(right)];
}

/**
 * Picks an element as a pivot and partitions the given array
 * to place the pivot at its correct position in the sorted array
 * and put all smaller elements to the left of the pivot.
 * @note This is an in-place iplementation
 * @param items List of elements to sort
 * @returns Original array sorted
 */
function quickSortInPlace(
  items: number[],
  low = 0,
  high = items.length - 1,
): number[] {
  // Base case: If low >= high, the sub-array is already sorted
  if (low < high) {
    // Partition the array
    const pivotIndex = partition(items, low, high);

    // Recursively sort the sub-arrays
    quickSortInPlace(items, low, pivotIndex - 1); // left group
    quickSortInPlace(items, pivotIndex + 1, high); // right group
  }
  return items;
}

// Partition function (Lomuto partition scheme)
function partition(arr: number[], low: number, high: number): number {
  const pivot = arr[high];
  // indicates the right position of pivot found so far: [...small, pi, ...large]
  let pi = low; // future pivot index

  for (let x = low; x < high; x++) {
    if (arr[x] <= pivot) {
      // swap the small element for the current one
      [arr[pi], arr[x]] = [arr[x], arr[pi]];
      // increment index of the small group
      pi++;
    }
  }

  // swap pivot to its correct position: [...small, pi, ...large]
  [arr[pi], arr[high]] = [arr[high], arr[pi]];
  // return the partition index
  return pi;
}
