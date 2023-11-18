/**
 * Given an array `nums`, you are initially positioned at the array's first index,
 * and each element `nums[i]` represents your maximum jump length at that position.
 * Return the minimum jumps required to reach the end.
 * It is granted that always you can reach the end.
 *
 * @see https://leetcode.com/problems/jump-game-ii
 */
describe('Jump Game II', () => {
  it('should determine if a combination of jumps can reach the end of array', () => {
    expect(howManyJumps([0])).toBe(0); // you are arleady in the end
    expect(howManyJumps([1, 2])).toBe(1); // just one jump required
    expect(howManyJumps([2, 3, 1, 1, 0])).toBe(2); // 1 jump to i1, and 3 jumps to the end
    expect(howManyJumps([2, 3, 0, 1, 4])).toBe(2); // 1 jump to i1, and 3 jumps to the end
    expect(howManyJumps([4, 0, 0, 0, 7])).toBe(1); // jump from i0 to the end
    expect(howManyJumps([4, 1, 1, 3, 1, 1, 1])).toBe(2); // jump to i3, and 3 jumps to the end
    expect(howManyJumps([4, 1, 5, 3, 1, 1, 3, 0])).toBe(2); // jump to i2, and 5 jumps to the end
    expect(howManyJumps([10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 1, 0])).toBe(2);
    expect(
      howManyJumps([
        9, 8, 2, 2, 0, 2, 2, 0, 4, 1, 5, 7, 9, 6, 6, 0, 6, 5, 0, 5,
        // jump to i8 (4), then to i12 (9), then 7 jumps to the end
      ]),
    ).toBe(3);
  });
});

function howManyJumps(nums: number[]): number {
  const end = nums.length - 1;
  // if array contains two or less elements
  if (end < 2) {
    return end;
  }
  let hits = 1;
  let jump = 1;
  let target = 0;
  let oldTarget = nums[0];
  for (let i = 0; i <= end && i <= target; ++i) {
    // starts the next jump
    if (i > oldTarget) {
      oldTarget = target;
      hits++;
    }
    jump = i + nums[i];
    // current jump reaches the end
    if (jump >= end) {
      // if more than 1 jump was required
      return target > 0 ? ++hits : hits;
    }
    if (jump > target) {
      target = jump;
    }
  }
  return hits;
}
