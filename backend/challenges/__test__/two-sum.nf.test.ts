/**
 * Given an array of numbers, return pairs of two numbers such that they add up to "target".
 * @see https://leetcode.com/problems/two-sum/
 */
describe('Testing the Two Sum problem', () => {
  it('should get pairs of two numbers in an array such that they add up to "target" value', () => {
    expect(twoSum([4, 6, 9], 8)).toStrictEqual([]);
    expect(twoSum([7, 2, 4], 6)).toStrictEqual([1, 2]);
    expect(twoSumMap([2, 7, 11, 15], 9)).toStrictEqual([0, 1]);
    expect(twoSumMap([3, 5, 1, -4, 8, 11, 5, 9], 7)).toStrictEqual([3, 5]);

    expect(twoSumAll([3, 5, 2, -4, 8, 11, 5], 7)).toStrictEqual([
      [5, 2],
      [-4, 11],
      [2, 5],
    ]);
    expect(twoSumAll([4, 5, 2, 1, 8, 5], 6)).toStrictEqual([
      [4, 2],
      [5, 1],
      [1, 5],
    ]);
  });
});

/**
 * Given an array of integers, return indices of the two numbers such that they add up to `target`
 * @param nums List of numbers
 * @param target Expected sum
 * @returns Indexes of two elements whose sum is equal to target.
 */
function twoSum(nums: number[], target: number): number[] {
  const end = nums.length - 1;
  if (end < 1) { return []; }
  if (end === 1 && target === nums[0] + nums[1]) {
    return [0, 1];
  }
  // used 2 pointers to compare against left and right positions
  for (let left = 0, right = end; left < right; left++, right--) {
    if (target === nums[left] + nums[right]) { return [left, right]; }

    for (let x = left + 1; x < right; x++) {
      if (target === nums[x] + nums[left]) { return [left, x]; }
      if (target === nums[x] + nums[right]) { return [x, right]; }
    }
  }
  return [];
}

/**
 * Given an array of integers, return indices of the two numbers such that they add up to `target`
 * @param nums List of numbers
 * @param target Expected sum
 * @returns Indexes of two elements whose sum is equal to target.
 */
function twoSumMap(nums: number[], target: number): number[] {
  // Map has O(1) search / access
  // Array has O(n) search-time
  const dict = new Map<number, number>();
  let cachedIx: number, i: number, num: number;
  for ([i, num] of nums.entries()) {
    // difference between the `target` and `num`
    // represents the number that needs to be added;
    // if we already looped over this number, that means it's in our map
    cachedIx = dict.get(target - num);
    if (cachedIx != null) {
      return [cachedIx, i];
    }
    dict.set(num, i);
  }
  return [];
}

/**
 * Given an array of numbers, return pairs of two numbers such that they add up to `target`
 * @param nums List of numbers
 * @param target Expected sum
 * @returns All pair of values whose sum is equal to target.
 */
function twoSumAll(numbers: number[], target: number): number[][] {
  // Map has O(1) search / access
  // Array has O(n) search-time
  const dict = Object.create(null);
  const matches: number[][] = [];
  let cachedIx: number;

  numbers.forEach(current => {
    // difference between the `target` and `current`
    // represents the number that needs to be added;
    // if we already looped over this number, that means it's in our map
    cachedIx = dict[target - current];
    if (cachedIx != null) {
      matches.push([cachedIx, current]);
    }
    dict[current] = current;
  });
  return matches;
}
