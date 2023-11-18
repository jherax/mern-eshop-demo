/* eslint-disable curly */

describe('Get the number closest to zero from an array', () => {
  it('Testing computeClosestToZero()', () => {
    expect(computeClosestToZero([9, -3, 1, -1, -2])).toBe(1);
    expect(computeClosestToZero([33, 77, 99])).toBe(33);
    expect(computeClosestToZero([9])).toBe(9);
    expect(computeClosestToZero([])).toBe(0);
  });

  const abs = Math.abs; // (num: number) => (num < 0 ? num * -1 : num);

  // Complexity: O(n)
  function computeClosestToZero(nums: number[]): number {
    const end = nums.length - 1;
    if (end === 0) return nums[0];
    else if (end < 0) return 0;

    let [ml, mr] = [0, end];
    let l: number, r: number;

    for (l = 1, r = end - 1; l < r; l++, r--) {
      ml = abs(nums[l]) < abs(nums[ml]) ? l : ml;
      mr = abs(nums[r]) < abs(nums[mr]) ? r : mr;
    }
    // consolidates the index of minor elements
    const min = abs(nums[ml]) <= abs(nums[mr]) ? ml : mr;
    // validates the middle element
    if (l === r && abs(nums[l]) <= abs(nums[min])) {
      return nums[l];
    }
    return nums[min];
  }
});
