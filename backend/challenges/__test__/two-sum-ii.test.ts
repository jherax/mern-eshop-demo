/**
 * Given a 1-indexed array of integers that is already sorted,
 * find two numbers such that they add up to a specific target number.
 * Let these two numbers be `array[index1]` and `array[index2]`
 * where `1 <= index1 < index2 <= array.length`.
 * @see https://leetcode.com/problems/two-sum-ii-input-array-is-sorted
 */
describe('Two Sum II - Input Array Is Sorted', () => {
  it('should get the 1-based indexes of two numbers that add up to the target', () => {
    expect(twoSum2([-8, 2, 7, 11, 15], 9)).toStrictEqual([2, 3]);
    expect(twoSum2([2, 3, 4], 6)).toStrictEqual([1, 3]);
    expect(twoSum2([-1, 0], -1)).toStrictEqual([1, 2]);
  });
});

function twoSum2(nums: number[], target: number): number[] {
  let [left, right] = [0, nums.length - 1];
  let sum: number;
  while (left < right) {
    sum = nums[left] + nums[right];
    if (sum === target) {
      return [++left, ++right];
    }
    // as array is sorted, if sum is greater than target
    // we decrease the value at the right, otherwise
    // we increase the value at the left
    if (sum > target) {
      right--;
    } else {
      left++;
    }
  }
  return [];
}
