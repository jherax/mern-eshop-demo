/* eslint-disable curly */

/**
 * Given an array `nums` sorted asc, remove some duplicates in-place such that
 * each unique element appears at most twice. The relative order of the elements
 * should be kept the same. Then return the number of expected elements in `nums`.
 *
 * @see https://leetcode.com/problems/remove-duplicates-from-sorted-array-ii/
 */
describe('Remove Duplicates from Sorted Array II', () => {
  it('should remove elements that are duplicated more than 2 times', () => {
    let nums: number[];

    nums = [1, 1, 1, 2, 2, 3];
    expect(removeSortedDuplicates2(nums)).toBe(5);
    expect(nums).toStrictEqual([1, 1, 2, 2, 3]);

    nums = [0, 0, 1, 1, 1, 1, 2, 3, 3, 4];
    expect(removeSortedDuplicatesII(nums)).toBe(8);
    expect(nums).toStrictEqual([0, 0, 1, 1, 2, 3, 3, 4]);
  });
});

/**
 * Removed some duplicates in a sorted array, by comparing `nums[i]` with `nums[i-1]`,
 * starting at index 1, because the zero element is the first unique number.
 * As we compare against the previous index, if previous value is the same as current
 * that means we have already 2 numbers repeated, fulfilling the condition to keep max 2 repeated.
 * @param nums Array to remove some duplicates
 * @returns Total of expected elements
 */
function removeSortedDuplicates2(nums: number[]): number {
  const end = nums.length;
  if (end < 2) return end;

  let unq = 1;
  let dup = false;
  for (let i = 1; i < end; i++) {
    if (nums[i] !== nums[i - 1]) {
      nums[unq++] = nums[i];
      dup = false;
    } else if (!dup) {
      // as we compare against the previous index,
      // that means we have already 2 numbers repeated.
      nums[unq++] = nums[i];
      dup = true;
    }
  }
  return (nums.length = unq);
}

/**
 * Removed some duplicates in a sorted array, by comparing `nums[i]` with `nums[k-2]`,
 * starting at index 2, because the zero element is the first unique number and index 1
 * could be a repeated number. If current number is greater than the second-to-last unique
 * element that means only max 2 numbers can be repeated.
 * @param nums Array to remove some duplicates
 * @returns Total of expected elements
 */
function removeSortedDuplicatesII(nums: number[]): number {
  const end = nums.length;
  if (end < 2) return end;

  let k = 2;
  for (let i = 2; i < end; i++) {
    // if current number is greater than the second-to-last unique element
    // that means only max 2 numbers can be repeated.
    if (nums[i] > nums[k - 2]) {
      nums[k++] = nums[i];
    }
  }
  return (nums.length = k);
}
