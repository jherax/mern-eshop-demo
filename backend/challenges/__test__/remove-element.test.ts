/**
 * Given an integer array `nums` and an integer `val`, remove all occurrences of `val` in nums in-place.
 * Return the number of elements in `nums` which are not equal to `val`.
 * @see https://leetcode.com/problems/remove-element/description
 */
describe('Remove all matching elements from array', () => {
  it('should remove all ocurrences of `val` in `nums`', () => {
    let nums: number[];

    nums = [0, 1, 2, 2, 3, 0, 4, 2];
    expect(removeElement(nums, 2)).toBe(5);
    expect(nums).toStrictEqual([0, 1, 3, 0, 4]);

    nums = [3, 2, 8, 3];
    expect(removeElement(nums, 3)).toBe(2);
    expect(nums).toStrictEqual([2, 8]);
  });
});

function removeElement(nums: number[], val: number): number {
  let filtered = 0;
  for (const n of nums) {
    if (n !== val) {
      // keeps only filtered values
      nums[filtered++] = n;
    }
  }
  return (nums.length = filtered);
}
