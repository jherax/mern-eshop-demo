/**
 * Given a roman numeral, convert it to an integer.
 * Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M.
 * Symbol   Value
 *   I  = 1,
 *   IV = 4,
 *   V  = 5,
 *   IX = 9,
 *   X  = 10,
 *   XL = 40,
 *   L  = 50,
 *   XC = 90,
 *   C  = 100,
 *   CD = 400,
 *   D  = 500,
 *   CM = 900,
 *   M  = 1000,
 * @see https://leetcode.com/problems/roman-to-integer
 */
describe('Roman to Integer', () => {
  it('should parse a roman number to a decimal number', () => {
    expect(romanToInt('IV')).toBe(4);
    expect(romanToInt('III')).toBe(3);
    expect(romanToInt('LVIII')).toBe(58);
    expect(romanToInt('LXIX')).toBe(69);
    expect(romanToInt('CIV')).toBe(104);
    expect(romanToInt('CMLII')).toBe(952);
    expect(romanToInt('MCMXCIV')).toBe(1994);
    expect(romanToInt('MMMDCCXLIX')).toBe(3749);
  });

  const ROMAN_KEYS = {
    I: 1,
    IV: 4,
    V: 5,
    IX: 9,
    X: 10,
    XL: 40,
    L: 50,
    XC: 90,
    C: 100,
    CD: 400,
    D: 500,
    CM: 900,
    M: 1000,
  };

  function romanToInt(rnumber: string): number {
    let decimal = 0;
    if (rnumber.length === 1) {
      return ROMAN_KEYS[rnumber] || decimal;
    }
    const roman = rnumber.toUpperCase().split('');
    for (let n = 0, i = roman.length - 1; i >= 0; i--) {
      n = i > 0 && ROMAN_KEYS[roman[i - 1] + roman[i]];
      if (n) {
        decimal += n;
        i--;
      } else {
        decimal += ROMAN_KEYS[roman[i]];
      }
    }
    return decimal;
  }
});
