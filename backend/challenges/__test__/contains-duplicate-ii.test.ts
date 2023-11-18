/* eslint-disable curly */

/**
 * Given an array `nums` and an integer `k`, return true if there are
 * two distinct indices `i` and `j` in the array such that
 * `nums[i] == nums[j] and abs(i - j) <= k`.
 *
 * @see https://leetcode.com/problems/contains-duplicate-ii
 */
describe('Contains Duplicate II', () => {
  it('should determine if duplicates meets the condition', () => {
    expect(containsNearbyDuplicate([1, 2, 3, 1], 3)).toBe(true);
    expect(containsNearbyDuplicate([1, 0, 1, 1], 1)).toBe(true);
    expect(containsNearbyDuplicate([1, 2, 3, 1, 2, 3], 2)).toBe(false);
  });
});

function containsNearbyDuplicate(nums: number[], k: number): boolean {
  const end = nums.length - 1;
  if (end < 1) return false;

  const map = Object.create(null);
  for (let key: number, j = end; j >= 0; --j) {
    key = nums[j];
    if (key in map) {
      if (map[key] - j <= k) return true;
    }
    // add the new key, or updates
    // the new index of duplicates
    map[key] = j;
  }

  return false;
}
