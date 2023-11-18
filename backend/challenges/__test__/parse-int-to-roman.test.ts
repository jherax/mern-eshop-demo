/**
 * Given an integer numeral, convert it to a roman number.
 * Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M.
 * Value: Symbol
 *   4: IV,
 *   5: V,
 *   9: IX,
 *   10: X,
 *   40: XL,
 *   50: L,
 *   90: XC,
 *   100: C,
 *   400: CD,
 *   500: D,
 *   900: CM,
 *   1000: M,
 * @see https://leetcode.com/problems/integer-to-roman
 */
describe('Integer to Roman', () => {
  it('should parse a roman number to a decimal number', () => {
    expect(intToRoman(4)).toBe('IV');
    expect(intToRoman(3)).toBe('III');
    expect(intToRoman(58)).toBe('LVIII');
    expect(intToRoman(69)).toBe('LXIX');
    expect(intToRoman(104)).toBe('CIV');
    expect(intToRoman(952)).toBe('CMLII');
    expect(intToRoman(1994)).toBe('MCMXCIV');
    expect(intToRoman(3749)).toBe('MMMDCCXLIX');
  });

  it('should throw error for numbers beyond 4000', () => {
    expect(() => {
      intToRoman(9572);
    }).toThrow('Numbers beyond 4000 are not supported');
  });
});

// prettier-ignore
const R = {
  ones: ['','I','II','III','IV','V','VI','VII','VIII','IX','X'],
  tens: ['','X','XX','XXX','XL','L','LX','LXX','LXXX','XC','C'],
  hundreds: ['','C','CC','CCC','CD','D','DC','DCC','DCCC','CM','M'],
  thousands: ['','M','MM','MMM'],
};

function intToRoman(num: number): string {
  if (num >= 4000) {
    throw RangeError('Numbers beyond 4000 are not supported');
  }

  const x1000 = Math.floor(num / 1000) % 10;
  const x100 = Math.floor(num / 100) % 10;
  const x10 = Math.floor(num / 10) % 10;
  const x1 = num % 10;

  return R.thousands[x1000] + R.hundreds[x100] + R.tens[x10] + R.ones[x1];
}
