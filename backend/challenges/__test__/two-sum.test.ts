/**
 * @see https://leetcode.com/problems/two-sum/
 */
describe('Get pairs of two numbers in an array such that they add up to "target" value', () => {
  it('Testing the Two Sum problem', () => {
    const result = twoSum([3, 5, 2, -4, 8, 11, 5], 7);
    expect(result).toStrictEqual([
      [5, 2],
      [-4, 11],
      [2, 5],
    ]);
    expect(twoSum2([4, 5, 2, 1, 8, 5], 6)).toStrictEqual([
      [4, 2],
      [5, 1],
      [1, 5],
    ]);
  });

  // Given an array of "numbers", return pairs of two numbers such that they add up to "target"
  // Complexity: O(n^2)
  function twoSum2(numbers: number[], target: number): number[][] {
    const result: number[][] = [];
    const arrLength = numbers.length;
    const limit = arrLength - 1;
    let second: number;

    numbers.forEach((first, i) => {
      if (i < limit) {
        for (let x = i + 1; x < arrLength; ++x) {
          second = numbers[x];
          if (first + second === target) {
            result.push([first, second]);
          }
        }
      }
    });

    return result;
  }

  // Given an array of "numbers", return pairs of two numbers such that they add up to "target"
  function twoSum(numbers: number[], target: number): number[][] {
    const hashtable = Object.create(null);
    const result: number[][] = [];
    let diff: number;

    numbers.forEach(current => {
      diff = target - current;

      if (hashtable[diff] != null) {
        result.push([hashtable[diff], current]);
      }

      hashtable[current] = current;
    });

    return result;
  }
});
