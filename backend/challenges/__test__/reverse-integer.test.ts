/**
 * Given a signed 32-bit integer x, return x with its digits reversed.
 * If reversing x causes the value to go outside the signed 32-bit integer range [-2^31, 2^31 - 1], then return 0.
 *
 * @see https://leetcode.com/problems/reverse-integer/
 */
describe('Reverse an integer', () => {
  it('should reverse an integer to a valid number', () => {
    expect(reverseIntegerStr(123)).toBe(321);
    expect(reverseInteger(-123)).toBe(-321);
    expect(reverseInteger(120)).toBe(21);
  });
});

const MIN_VALUE = 2 ** 31 * -1;
const MAX_VALUE = 2 ** 31 - 1;

function reverseIntegerStr(x: number): number {
  const signal = x < 0 ? -1 : 1;
  const absX = Math.abs(x);
  const reversed = +absX.toString().split('').reverse().join('');
  if (reversed < MIN_VALUE || reversed > MAX_VALUE) {
    return 0;
  }
  return reversed * signal;
}

function reverseInteger(x: number): number {
  let reversed = 0;
  const MAX_INT = Math.pow(2, 31) - 1;
  const MIN_INT = Math.pow(-2, 31);

  // Handle negative sign
  const isNegative = x < 0;
  x = Math.abs(x);

  // Reverse digits using bit shifting
  while (x > 0) {
    const digit = x % 10;
    reversed = reversed * 10 + digit;

    // Check for overflow
    if (reversed > MAX_INT || reversed < MIN_INT) {
      return 0;
    }
    x = Math.floor(x / 10);
  }

  // Apply negative sign back if needed
  return isNegative ? -reversed : reversed;
}
