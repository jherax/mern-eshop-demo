/* eslint-disable curly */

/**
 * Traverse iteratively from left and compare adjacent elements and the higher one is placed at right side.
 * @note This algorithm is not suitable for large data sets as its average and worst-case time complexity is quite high.
 * @see https://www.geeksforgeeks.org/bubble-sort/
 */
describe('Bubble sort algorithm', () => {
  it('should perform an ascending sort over the array', () => {
    // odd length array
    let elements = [76, 4, 9, 25, 4, 2, 31, 58, 4];
    expect(bubbleSort(elements)).toEqual([2, 4, 4, 4, 9, 25, 31, 58, 76]);
    // even length array
    elements = [431, 94, 6785, 32, 89, 5];
    expect(bubbleSort(elements)).toEqual([5, 32, 89, 94, 431, 6785]);
    expect(elements).toStrictEqual([5, 32, 89, 94, 431, 6785]);
    expect(bubbleSortAsc([7, 1])).toEqual([1, 7]);
    expect(bubbleSortAsc([3])).toEqual([3]);
    expect(bubbleSortAsc([])).toEqual([]);
  });
});

/**
 * Traverse iteratively from left and compare adjacent elements and the higher one is placed at right side.
 * @note This algorithm is not suitable for large data sets as its average and worst-case time complexity is quite high.
 * @param items List of elements to sort
 * @returns Original array sorted
 */
function bubbleSort(items: number[]): number[] {
  if (items.length < 2) return items;

  const end = items.length - 1;
  let ol: number, x: number;
  for (ol = 0; ol < end; ol++) {
    // sorted elements are placed on the right side
    for (x = 0; x < end - ol; x++) {
      if (items[x] > items[x + 1]) {
        // swap elements by moving the largest to the right
        [items[x], items[x + 1]] = [items[x + 1], items[x]];
      }
    }
  }
  return items;
}

function bubbleSortAsc(items: number[]): number[] {
  if (items.length < 2) return items;
  let [start, next, end] = [0, 1, items.length - 1];

  do {
    if (items[start] > items[next]) {
      // swap elements using array destructuring to avoid a temp variable
      [items[start], items[next]] = [items[next], items[start]];
      if (next === end) {
        start = -1;
        next = 0;
        end -= 1;
      }
    }
    start += 1;
    next += 1;
  } while (next <= end);
  return items;
}
