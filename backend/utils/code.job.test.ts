import logger from '../utils/logger';

function memoize<TKey, TResult>(func: (arg: TKey) => TResult) {
  const memo = new Map<TKey, TResult>();

  return function memoized(key: TKey): TResult {
    if (memo.has(key)) {
      return memo.get(key);
    }
    const result = func(key);
    memo.set(key, result);
    return result;
  };
}

// =====================================

function stepWalking(step: number): number {
  logger.log('current num is ' + step);
  // 1,2,3,5,8,13,21
  if (step < 4) {
    return step;
  }
  // Complexity: O(2^n) -> exponential
  return stepWalking(step - 1) + stepWalking(step - 2);
}

/**
 * @see https://coderbyte.com/video/step-walking-solution
 */
describe('Testing Memoization', () => {
  const spyLogger = jest.spyOn(logger, 'log').mockImplementation(jest.fn());
  afterEach(() => {
    spyLogger.mockClear();
  });
  it('Failing memoize()', () => {
    // not working because internal call to stepWalking()
    const stepWalkingMemo = memoize(stepWalking);
    expect(stepWalkingMemo(7)).toBe(21);
    expect(logger.log).toHaveBeenCalledTimes(15);
  });
  it('Success memoization', () => {
    // working ad-hoc memoization
    const cache = new Map<number, number>();
    const stepWalkingMemo = (step: number, memo: typeof cache): number => {
      if (cache.has(step)) {
        return cache.get(step);
      }
      logger.log('current num is ' + step);
      // 1,2,3,5,8,13,21
      if (step < 4) {
        return step;
      }
      // Complexity: O(n) -> linear
      const result =
        stepWalkingMemo(step - 1, memo) + stepWalkingMemo(step - 2, memo);
      memo.set(step, result);
      return result;
    };

    expect(stepWalkingMemo(7, cache)).toBe(21);
    expect(logger.log).toHaveBeenCalledTimes(7);
  });
});

// =====================================

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

// =====================================

it('Testing getMinorInterval()', () => {
  expect(getMinorInterval([3, 1, 9])).toBe(2);
  expect(getMinorInterval([234, 32, 4, 78, 789, 423])).toBe(28);
});

function getMinorInterval(numbers: number[]): number {
  const length: number = numbers?.length;
  if (!length || length < 2) {
    throw Error('Array must have at least 2 elements');
  }
  if (length > 100_000) {
    throw Error('Array must have at less than 100,000 elements');
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

// =====================================

it('Testing getTopStocks()', () => {
  expect(
    getTopStocks(
      ['AMZN', 'CACC', 'EQIX', 'GOOG', 'ORLY', 'ULTA'],
      [
        [12.81, 11.09, 12.11, 10.93, 9.83, 8.14],
        [10.34, 10.56, 10.14, 12.7, 13.1, 11.22],
        [11.53, 10.67, 10.42, 11.88, 11.77, 10.21],
      ],
    ),
  ).toEqual(['GOOG', 'ORLY', 'AMZN']);
});

function getTopStocks(stocks: string[], prices: number[][]): string[] {
  const avgStocks = {};

  stocks.forEach((ticker, index) => {
    const sumPrices = prices.reduce((avg, currentPriceArr) => {
      return avg + currentPriceArr[index];
    }, 0);
    avgStocks[ticker] = sumPrices / prices.length;
  });

  // desc sorting
  stocks.sort((a, b) => {
    return avgStocks[b] - avgStocks[a];
  });

  return stocks.slice(0, 3);
}

// =====================================

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

// Complexity: O(n^2)
function twoSum2(numbers: number[], sum: number): number[][] {
  const result: number[][] = [];
  const arrLength = numbers.length;
  const limit = arrLength - 1;
  let second: number;

  numbers.forEach((first, i) => {
    if (i < limit) {
      for (let x = i + 1; x < arrLength; ++x) {
        second = numbers[x];
        if (first + second === sum) {
          result.push([first, second]);
        }
      }
    }
  });

  return result;
}

function twoSum(numbers: number[], sum: number): number[][] {
  const hashtable = Object.create(null);
  const result: number[][] = [];
  let diff: number;

  numbers.forEach(current => {
    diff = sum - current;

    if (hashtable[diff] != null) {
      result.push([hashtable[diff], current]);
    }

    hashtable[current] = current;
  });

  return result;
}

// =====================================

it('Testing computeTotalPrice()', () => {
  let price: number;
  price = computeTotalPrice(1, [
    'Vanilla',
    'Banana',
    'Apple',
    'Cherry',
    'Peach',
    'Lemon',
  ]);
  expect(price).toBe(4);

  price = computeTotalPrice(4, ['Vanilla', 'Apple', 'Vanilla', 'Apple']);
  expect(price).toBe(14);

  price = computeTotalPrice(4, ['Peach', 'Peach', 'Apple', 'Vanilla']);
  expect(price).toBe(13);

  price = computeTotalPrice(1, [
    'Vanilla',
    'Banana',
    'Apple',
    'Cherry',
    'Peach',
    'Banana',
    'Apple',
    'Peach',
    'Banana',
  ]);
  expect(price).toBe(6);
});

function computeTotalPrice(unitPrice: number, macarons: string[]): number {
  const sets: Array<{count: number; [key: string]: unknown}> = [];

  // create each set with unique flavors
  macarons.forEach(flavor => {
    const current = sets.find(mset => mset.count < 5 && !mset[flavor]);
    if (current == null) {
      sets.push({count: 1, [flavor]: flavor});
    } else {
      current.count++;
      current[flavor] = flavor;
    }
  });

  let totalPrice = 0;
  let pricePerSet: number;
  let discount: number;

  // compute price for each set
  sets.forEach(mset => {
    discount = (mset.count - 1) / 10; // same: (mset.count - 1) * 10 / 100
    pricePerSet = unitPrice * mset.count;
    pricePerSet -= pricePerSet * discount;
    totalPrice += pricePerSet;
  });

  return Math.floor(totalPrice);
}

// =====================================

it('Testing reverseWords()', () => {
  expect(reverseWords('Hola, soy David')).toBe('David soy Hola,');
  expect(reverseWords('  Hola, soy  David   ')).toBe('   David  soy Hola,  ');
});

function reverseWords(text: string): string {
  return text.split(' ').reverse().join(' ');
}

// =====================================

it.only('Generate links for Markdown', () => {
  let start: number;

  function getlink(text: string) {
    start = performance.now();
    const cleanText = text
      .toLowerCase()
      .replace(/_|[^\w\s]+/g, '')
      .replace(/\s+/g, '-');
    return `(#${cleanText})`;
  }

  const result = getlink('How to measure the duration of an operation?');
  const end = performance.now();
  const durationMs = end - start;
  expect(durationMs).toBeLessThan(1000);
  expect(result).not.toMatch(/\s/);
});
