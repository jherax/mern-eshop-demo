import logger from '../../utils/logger';

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

function fibonacci(step: number): number {
  logger.log('current num is ' + step);
  // 1,2,3,5,8,13,21
  if (step < 4) {
    return step;
  }
  // Complexity: O(2^n) -> exponential
  return fibonacci(step - 1) + fibonacci(step - 2);
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
    const fibonacciMemo = memoize(fibonacci);
    expect(fibonacciMemo(7)).toBe(21);
    expect(logger.log).toHaveBeenCalledTimes(15);
  });

  it('Success memoization', () => {
    // working ad-hoc memoization
    const cache = new Map<number, number>();
    const fibonacciMemo = (step: number, memo: typeof cache): number => {
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
        fibonacciMemo(step - 1, memo) + fibonacciMemo(step - 2, memo);
      memo.set(step, result);
      return result;
    };

    expect(fibonacciMemo(7, cache)).toBe(21);
    expect(logger.log).toHaveBeenCalledTimes(7);
  });
});
