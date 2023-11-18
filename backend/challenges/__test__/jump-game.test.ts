/**
 * Given an array `nums`, you are initially positioned at the array's first index,
 * and each element `nums[i]` represents your maximum jump length at that position.
 * Return true if you can reach the last index, or false otherwise.
 *
 * @see https://leetcode.com/problems/jump-game/
 */
describe('Jump Game', () => {
  it('should reach the end of a big array of jumps', () => {
    expect(
      canJump([
        8, 2, 4, 4, 4, 9, 5, 2, 5, 8, 8, 0, 8, 6, 9, 1, 1, 6, 3, 5, 1, 2, 6, 6,
        0, 4, 8, 6, 0, 3, 2, 8, 7, 6, 5, 1, 7, 0, 3, 4, 8, 3, 5, 9, 0, 4, 0, 1,
        0, 5, 9, 2, 0, 7, 0, 2, 1, 0, 8, 2, 5, 1, 2, 3, 9, 7, 4, 7, 0, 0, 1, 8,
        5, 6, 7, 5, 1, 9, 9, 3, 5, 0, 7, 5,
      ]),
    ).toBe(true);
  });

  it('should determine if a combination of jumps can reach the end of array', () => {
    expect(canJump([0])).toBe(true); // you are arleady in the end of the array
    expect(canJump([2, 3, 1, 1, 0])).toBe(true); // any combination of jumps will reach the end
    expect(canJump([2, 3, 0, 1, 0])).toBe(true); // 1st attempt fails, 2nd attempt jumps 1 from i0 to i1, and reach the end
    expect(canJump([3, 2, 1, 0, 4])).toBe(false); // all combinations jumps to i3, and fail with 0 jumps
    expect(canJump([4, 0, 0, 0, 7])).toBe(true); // jump from i0 to the end
    expect(canJump([0, 1, 4, 6, 9])).toBe(false); // can't jump from i0
  });
});

function canJump(nums: number[]): boolean {
  let jump: number;
  // We start from the end: `lastJumpIdx` is initiated with the last index.
  // If each `jump` can reach the `lastJumpIdx`, it will be our new goal.
  let lastJumpIdx = nums.length - 1;
  for (let i = nums.length - 2; i >= 0; i--) {
    jump = nums[i] + i;
    if (jump >= lastJumpIdx) {
      lastJumpIdx = i;
    }
  }
  return lastJumpIdx === 0;
}
