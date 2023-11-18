describe('Get the minor interval between 2 adyacent numbers in an array', () => {
  it('Testing getMinorInterval()', () => {
    expect(getMinorInterval([3, 1, 9])).toBe(2);
    expect(getMinorInterval([234, 32, 4, 78, 789, 423])).toBe(28);
  });

  function getMinorInterval(numbers: number[]): number {
    const length: number = numbers?.length;
    if (!length || length < 2) {
      throw Error('Array must have at least 2 elements');
    }

    numbers.sort((a, b) => a - b);
    let minor: number = null;
    let next: number, diff: number;

    numbers.forEach((current, i) => {
      if (i < length - 1) {
        next = numbers[i + 1];
        diff = next - current;
        if (minor === null) {
          minor = diff;
        }
        if (diff < minor) {
          minor = diff;
        }
      }
    });

    return minor;
  }
});
