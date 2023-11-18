import logger from '../../utils/logger';

/**
 * High-order function that memoizes a function, by creating a scope
 * to store the result of each function call, returning the cached
 * result when the same inputs is given.
 *
 * @description
 * Memoization is an optimization technique used primarily to speed up
 * functions by storing the results of expensive function calls, and returning
 * the cached result when the same inputs occur again.
 *
 * Each time a memoized function is called, its parameters are used as keys to index the cache.
 * If the index/key is present, then it can be returned, without executing the entire function.
 * If the index is not cached, then the original function is executed, and the result is
 * stored into the cache.
 *
 * LIMITATIONS
 *
 * As memoize is a higher-order function that accepts a function as its argument
 * and returns a memoized version of the function itself, it's perfect to work with
 * pure functions because of the Referential transparency, but it is not suitable
 * for a function that modifies itself like the Lazy function definition pattern,
 * or for memoizing recursive functions.
 *
 * @param func Function to memoize
 * @returns Memoized function
 */
function memoize<TKey, TResult>(func: (arg: TKey) => TResult) {
  const cache = new Map<TKey, TResult>();

  return function memoized(key: TKey): TResult {
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = func(key);
    cache.set(key, result);
    return result;
  };
}

// =====================================

function fibonacci(step: number): number {
  logger.info('current step: ' + step);
  // Base case: (1,2,3),5,8,13,21...
  if (step < 4) {
    return step;
  }
  // Complexity: O(2^n) -> exponential
  return fibonacci(step - 1) + fibonacci(step - 2);
}

/**
 * @see https://coderbyte.com/video/step-walking-solution
 */
describe('Testing Memoization with defined number of arguments', () => {
  const spyLogger = jest.spyOn(logger, 'info').mockImplementation(jest.fn());

  afterEach(() => {
    spyLogger.mockClear();
  });

  it('Failing memoization of a recursive function', () => {
    // not working because internal calls to fibonacci()
    const fibonacciMemo = memoize(fibonacci);
    expect(fibonacciMemo(7)).toBe(21);
    expect(logger.info).toHaveBeenCalledTimes(15);
  });

  it('Success memoization of a recursive function', () => {
    // we set an external cache to provide it to the recursive function
    const cache = new Map<number, number>();
    const fibonacciMemo = (step: number, memo: typeof cache): number => {
      if (cache.has(step)) {
        return cache.get(step);
      }
      logger.info('current step: ' + step);
      // Base case: (1,2,3),5,8,13,21...
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
    expect(logger.info).toHaveBeenCalledTimes(7);
  });
});
