describe('Get the number closest to zero from an array', () => {
  it('Testing computeClosestToZero()', () => {
    expect(computeClosestToZero([9, -3, 1, -1, -2])).toBe(1);
    expect(computeClosestToZero2([33, 77, 99])).toBe(33);
    expect(computeClosestToZero2([])).toBe(0);
  });

  // Complexity: O(n)
  function computeClosestToZero(ts: number[]): number {
    if (!ts?.length) {
      return 0;
    }
    let near0 = Number.MAX_SAFE_INTEGER;
    let near0Index = 0;
    let absItem: number;
    ts.forEach((item, index) => {
      absItem = Math.abs(item);
      if (absItem < near0) {
        near0Index = index;
        near0 = absItem;
      } else if (absItem === near0 && item > 0 && ts[near0Index] < 0) {
        near0Index = index;
      }
    });

    return ts[near0Index];
  }

  // Complexity: O(n^2)
  function computeClosestToZero2(ts: number[]): number {
    if (!ts?.length) {
      return 0;
    }
    ts.sort((a, b) => a - b);
    const result = ts.reduce((near0, current) => {
      if (current * current <= near0 * near0) {
        return current;
      }
      return near0;
    });

    return result;
  }
});
