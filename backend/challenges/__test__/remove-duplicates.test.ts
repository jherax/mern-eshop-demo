/* eslint-disable curly */

/**
 * Given an array `nums` sorted asc, remove duplicates in-place such that each unique element
 * appears only once. The relative order of the elements should be kept the same.
 * Then return the number of unique elements in `nums`.
 *
 * @see https://leetcode.com/problems/remove-duplicates-from-sorted-array/description
 */
describe('Remove Duplicates from Array', () => {
  it('should remove duplicated elements from an array', () => {
    let nums: number[];

    nums = [2, 1, 2];
    expect(removeDuplicates(nums)).toBe(2);
    expect(nums).toStrictEqual([2, 1]);

    nums = [3, 3, 0, 0, 1, 1, 1, 4, 2, 2];
    expect(removeDuplicatesNative(nums)).toBe(5);
    expect(nums).toStrictEqual([3, 0, 1, 4, 2]);

    nums = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];
    expect(removeSortedDuplicates(nums)).toBe(5);
    expect(nums).toStrictEqual([0, 1, 2, 3, 4]);
  });
});

/**
 * Remove duplicates from an unsorted array. We use a new array structure
 * to contain all unique values to compare against every element of the original array.
 * The pointer `u` will track the current position of unique elements in the original array.
 * @param nums Array to remove duplicates
 * @returns Total of unique elements
 */
function removeDuplicates(nums: number[]): number {
  const end = nums.length;
  if (end < 2) return end;

  let u = 0;
  const unique: number[] = [];
  for (let i = 0; i < end; i++) {
    let isUnique = true;
    // search for a duplicate
    for (let x = 0; x < unique.length; x++) {
      if (nums[i] === unique[x]) {
        isUnique = false;
        break;
      }
    }
    if (isUnique) {
      unique.push(nums[i]);
      // keeps only filtered values
      nums[u++] = nums[i];
    }
  }
  return (nums.length = unique.length);
}

/**
 * Remove duplicates from an unsorted array. We use the native JS type
 * `Set()` to store unique values, then reset the original array
 * and push the unique values into it.
 * @param nums Array to remove duplicates
 * @returns Total of unique elements
 */
function removeDuplicatesNative(nums: number[]): number {
  // using JS built-in types
  const unique = Array.from(new Set(nums));
  nums.length = 0;
  nums.push(...unique);
  return unique.length;
}

/**
 * Removed duplicates in a sorted array, by comparing `item[i]` with `item[i-1]`,
 * starting at index 1, because the zero element is the first unique number.
 * @param nums Array to remove duplicates
 * @returns Total of unique elements
 */
function removeSortedDuplicates(nums: number[]): number {
  const end = nums.length;
  if (end < 2) return end;
  let unq = 1;
  // zero element is the first unique
  for (let i = 1; i < end; i++) {
    if (nums[i] !== nums[i - 1]) {
      nums[unq++] = nums[i];
    }
  }
  return (nums.length = unq);
}
