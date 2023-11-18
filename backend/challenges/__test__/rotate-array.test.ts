/**
 * Given an array `nums` sorted asc, remove some duplicates in-place such that
 * each unique element appears at most twice. The relative order of the elements
 * should be kept the same. Then return the number of expected elements in `nums`.
 *
 * @see https://leetcode.com/problems/remove-duplicates-from-sorted-array-ii/
 */
describe('Rotate array to the right', () => {
  it('should rotate the array to the right by x steps', () => {
    let nums: number[];

    nums = [1, 2, 3, 4, 5, 6, 7];
    rotateArrayNative(nums, 3);
    expect(nums).toStrictEqual([5, 6, 7, 1, 2, 3, 4]);

    nums = [-1, -100, 3, 99];
    rotateArray(nums, 54946);
    expect(nums).toStrictEqual([3, 99, -1, -100]);

    nums = [-1, -100, 3, 99];
    rotateArray2(nums, 54946);
    expect(nums).toStrictEqual([3, 99, -1, -100]);
  });
});

/**
 * Given an integer array `nums`, rotate in-place the array to the right by `k` steps.
 * To rotate the array, move all elements to the right, and the floating elements
 * will be placed at the beginning of the array.
 * @param nums Array to rotate
 * @param k Number of rotation steps
 */
function rotateArray(nums: number[], k: number): void {
  const end = nums.length;
  // performance:
  // if k == nums.length, the array is in its original order
  if (k >= end) {
    k = k % end;
  }
  const removed: number[] = [];
  const start = end - k;
  // get the elements to rotate
  for (let i = start; i < end; i++) {
    removed[i - start] = nums[i];
  }
  // move all elements to the right
  for (let i = end - 1; i > k - 1; i--) {
    nums[i] = nums[i - k];
  }
  // add the floating elements
  for (let i = 0; i < k; i++) {
    nums[i] = removed[i];
  }
}

/**
 * This solution uses the native JS Array method `splice()`.
 * Also we used a performance trick to reduce the steps to be executed.
 * if `k == nums.length`, then the array is in its original order,
 * so the expression `k % nums.length` will give us the real number
 * of steps to rotate the array.
 * @param nums Array to rotate
 * @param k Number of rotation steps
 */
function rotateArrayNative(nums: number[], k: number): void {
  // performance:
  // if k == nums.length, the array is in its original order
  if (k >= nums.length) {
    k = k % nums.length;
  }
  // using native JS Array methods
  const removed = nums.splice(nums.length - k, k);
  nums.splice(0, 0, ...removed);
}

function rotateArray2(nums: number[], k: number): void {
  let count = 0;
  let startIndex = 0;
  let endIndex = 0;
  let stash = nums[0];
  do {
    // if it's a non-repeating index, then swap the variable
    // with the value at the offset index.
    endIndex = (endIndex + k) % nums.length;
    if (endIndex !== startIndex) {
      [nums[endIndex], stash] = [stash, nums[endIndex]];
    }
    // otherwise, set the index to the next increment
    // (this only happens if k goes into the length evenly)
    else {
      nums[endIndex] = stash;
      endIndex = ++startIndex;
      stash = nums[endIndex];
    }
  } while (++count < nums.length);
}
