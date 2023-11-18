/* eslint-disable curly */

/**
 * Given an array of numbers, return all unique triplets that sum up zero.
 * All numbers must be different each other.
 * @see https://leetcode.com/problems/3sum
 */
describe('Testing the 3Sum problem', () => {
  it('should get an array of triplets whose numbers sum is equal to zero.', () => {
    expect(threeSumZero([1, 0, 1])).toStrictEqual([]);
    expect(threeSumZero([0, 0, 0])).toStrictEqual([[0, 0, 0]]);
    expect(threeSumZero([-1, 0, 1, 2, -1, -4])).toStrictEqual([
      [-1, -1, 2],
      [-1, 0, 1],
    ]);
    expect(threeSumZero([-1, 3, 0, 3, 2, -1, -3])).toStrictEqual([
      [-3, 0, 3],
      [-1, -1, 2],
    ]);
    expect(threeSumZero([2, 0, -2, -5, -5, -3, 2, -4])).toStrictEqual([
      [-4, 2, 2],
      [-2, 0, 2],
    ]);
  });
});

function threeSumZero(nums: number[]): number[][] {
  const end = nums.length - 1;
  if (end < 2) {return []}

  const matches: [number, number, number][] = [];
  let sum: number, left: number, right: number;

  // sorts the array to discard duplicates
  nums.sort((a, b) => a - b);

  // discard duplicates
  const discardDupsLeft = () => {
    while (left < right && nums[left] === nums[++left]);
  };

  const discardDupsRight = () => {
    while (left < right && nums[right] === nums[--right]);
  };

  for (let i = 0; i < end; i += 1) {
    if (i && nums[i - 1] === nums[i]) {
      continue; // discard duplicates
    }
    [left, right] = [i + 1, end];
    while (left < right) {
      sum = nums[i] + nums[left] + nums[right];
      if (sum === 0) {
        matches.push([nums[i], nums[left], nums[right]]);
        discardDupsRight();
        discardDupsLeft();
      }
      // move pointers
      else if (sum > 0) {right--}
      else {left++}
    }
  }

  return matches;
}
