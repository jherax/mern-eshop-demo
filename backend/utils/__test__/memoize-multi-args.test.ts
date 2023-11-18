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
 * @warn Do not use with arguments of type `Object` or `Array`.
 * If you need memoize a function with object arguments, then
 * serialize the arguments and use it as key.
 *
 * @param func Function to memoize
 * @returns Memoized function
 */
function memoize<Args extends unknown[], R>(func: (...args: Args) => R) {
  const cache = new Map<string, R>();

  return function memoized(...args: Args): R {
    // For performance reasons, it is not recommended
    // memoizing functions with `Object` or `Array` arguments,
    // but if the body function is really cpu consuming, you can
    // serialize arguments, for example, using `JSON.stringify(args)`
    // or a better serializer. Map() uses identity comparison for keys
    // and, that's why we need to serialize the arguments.
    // const key = JSON.stringify(args);
    const key = `[${args}]`;
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = func(...args);
    cache.set(key, result);
    return result;
  };
}

describe('Testing Memoization with unknown number of arguments', () => {
  it('should memoize a function with defined arguments', () => {
    let fullExecutions = 0;

    const sum = (a: number, b: number) => {
      fullExecutions += 1;
      return a + b;
    };

    const sumMemo = memoize(sum);

    expect(sumMemo(3847, 8734)).toBe(12581);
    expect(sumMemo(3847, 8734)).toBe(12581);
    expect(sumMemo(3847, 8734)).toBe(12581);
    expect(sumMemo(3847, 8734)).toBe(12581);
    expect(fullExecutions).toBe(1);
    expect(sumMemo(208945, 394805)).toBe(603750);
    expect(sumMemo(208945, 394805)).toBe(603750);
    expect(sumMemo(208945, 394805)).toBe(603750);
    expect(fullExecutions).toBe(2);
  });

  it('should memoize an anonymous function with unknown arguments', () => {
    let fullExecutions = 0;

    const sumMemo = memoize((...args: number[]) => {
      fullExecutions += 1;
      return args.reduce((total: number, current: number) => {
        return total + current;
      }, 0);
    });

    expect(sumMemo(5, 7, 9, 6, 1, 8)).toBe(36);
    expect(sumMemo(5, 7, 9, 6, 1, 8)).toBe(36);
    expect(sumMemo(5, 7, 9, 6, 1, 8)).toBe(36);
    expect(fullExecutions).toBe(1);
    expect(sumMemo(234, 71, 432, 78)).toBe(815);
    expect(sumMemo(234, 71, 432, 78)).toBe(815);
    expect(sumMemo(234, 71, 432, 78)).toBe(815);
    expect(fullExecutions).toBe(2);
  });

  it('should memoize an async function with no arguments', async () => {
    let fullExecutions = 0;

    type CarMaker = {id: number; name: string};
    function fetchCarMakers(): Promise<CarMaker[]> {
      fullExecutions += 1;
      return new Promise(resolve => {
        resolve([
          {id: 16, name: 'Hyundai'},
          {id: 26, name: 'Mitsubishi'},
          {id: 27, name: 'Nissan'},
          {id: 37, name: 'Toyota'},
          {id: 38, name: 'Volkswagen'},
        ]);
      });
    }

    const response = [
      {id: 16, name: 'Hyundai'},
      {id: 26, name: 'Mitsubishi'},
      {id: 27, name: 'Nissan'},
      {id: 37, name: 'Toyota'},
      {id: 38, name: 'Volkswagen'},
    ];

    // reduces HTTP requests when arguments are the same
    const getCarMakersMemo = memoize(fetchCarMakers);

    expect(await getCarMakersMemo()).toStrictEqual(response);
    expect(await getCarMakersMemo()).toStrictEqual(response);
    expect(await getCarMakersMemo()).toStrictEqual(response);
    expect(await getCarMakersMemo()).toStrictEqual(response);
    expect(await getCarMakersMemo()).toStrictEqual(response);
    expect(fullExecutions).toBe(1);
  });

  it('should memoize an instance method', async () => {
    let fullExecutions = 0;

    class ServiceMock {
      constructor(private url: string) {}

      public getArticles() {
        fullExecutions += 1;
        return new Promise<{url: string; articles: number}>(resolve => {
          resolve({url: this.url, articles: Math.pow(4, 3)});
        });
      }
    }

    const service = new ServiceMock('//jherax.wordpress.com/');
    /**
     * As getArticles() was defined with function-declaration style
     * in the ServiceMock class prototype, the `this` context
     * may be ambiguous when the method is memoized, that's why
     * we bind explicitly the context of the instance.
     */
    const getArticlesMemo = memoize(
      ServiceMock.prototype.getArticles.bind(service),
    );

    const response = {url: '//jherax.wordpress.com/', articles: 64};
    expect(await getArticlesMemo()).toStrictEqual(response);
    expect(await getArticlesMemo()).toStrictEqual(response);
    expect(await getArticlesMemo()).toStrictEqual(response);
    expect(fullExecutions).toBe(1);
  });
});
