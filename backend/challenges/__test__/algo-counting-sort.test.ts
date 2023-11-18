/**
 * Create a map whose keys covers the entire range of values in your array to sort.
 * Each time a value occurs in the original array, you increment the counter at that key.
 * At the end, run through your counting map, printing the value of each key the number
 * of times in the original array.
 * @see https://www.hackerrank.com/challenges/one-week-preparation-kit-countingsort1/problem
 */
describe('Comparison sorting algorithm', () => {
  it('should perform an ascending sort over the array', () => {
    // odd length array
    let elements = [76, 4, 9, 25, 4, 2, 31, 58, 4];
    expect(countingSort(elements)).toEqual([2, 4, 4, 4, 9, 25, 31, 58, 76]);
    // even length array
    elements = [431, 94, 6785, 32, 89, 5];
    expect(countingSort(elements)).toEqual([5, 32, 89, 94, 431, 6785]);
    expect(elements).toStrictEqual([5, 32, 89, 94, 431, 6785]);
    expect(countingSort([7, 1])).toEqual([1, 7]);
    expect(countingSort([3])).toEqual([3]);
    expect(countingSort([])).toEqual([]);
  });
});

function countingSort(arr: number[]): number[] {
  const count = Object.create(null);
  for (let i = 0; i < arr.length; i++) {
    count[arr[i]] = (count[arr[i]] || 0) + 1;
  }
  let i = 0;
  let c: number;

  /**
   * Object.keys() orders the returned keys.
   * @note ECMAScript specification: all non-negative integer keys (those that
   * can be array indices) will be traversed first in ascending order by value,
   * then other string keys in ascending chronological order of property creation.
   * @see https://cutt.ly/mozilla-object-keys
   * @see https://cutt.ly/mozilla-loop-for-in
   */
  Object.keys(count).forEach(k => {
    for (c = 0; c < count[k]; c++) {
      arr[i++] = +k;
    }
  });
  return arr;
}
