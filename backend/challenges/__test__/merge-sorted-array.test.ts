/**
 * Given two integer arrays `nums1` and `nums2`, sorted in ascending order, and two integers
 * `x` and `y`, representing the number of elements in `nums1` and `nums2` respectively,
 * merge in-place `nums1` and `nums2` into `nums1` sorted. `nums1` has a length of `x` + `y`.
 *
 * @see https://leetcode.com/problems/merge-sorted-array/description
 */
describe('Merge Sorted Array', () => {
  it('should merge nums1 with length = 3, and nums2 into nums1 sorted', () => {
    const nums1 = [1, 2, 3, 0, 0, 0];
    const nums2 = [2, 5, 6];
    merge(nums1, 3, nums2, 3);
    expect(nums1).toEqual([1, 2, 2, 3, 5, 6]);
  });

  it('should merge nums1 with length = 4, and nums2 into nums1 sorted', () => {
    const nums1 = [2, 3, 4, 7, 0, 9];
    const nums2 = [1, 5, 6];
    merge(nums1, 4, nums2, 3);
    expect(nums1).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it('should keep nums1 untouched as nums2 is empty', () => {
    const nums1 = [7];
    const nums2 = [];
    merge(nums1, 1, nums2, 0);
    expect(nums1).toEqual([7]);
  });

  it('should clear nums1 as m = 0, and merge nums2 into nums1', () => {
    const nums1 = [0];
    const nums2 = [8];
    merge(nums1, 0, nums2, 1);
    expect(nums1).toEqual([8]);
  });
});

function merge(nums1: number[], x: number, nums2: number[], y: number): void {
  // Two pointers for nums1 and nums2
  let [n1, n2] = [x - 1, y - 1];

  // Start filling nums1 from the back, where the merged result should be placed
  let end = x + y - 1;

  while (n1 >= 0 && n2 >= 0) {
    // Compare elements from both sorted arrays and insert the larger one into nums1
    if (nums1[n1] > nums2[n2]) {
      nums1[end] = nums1[n1--];
    } else {
      nums1[end] = nums2[n2--];
    }
    end--;
  }

  // Copy remaining elements from nums2 (if any)
  while (n2 >= 0) {
    nums1[end--] = nums2[n2--];
  }
}
