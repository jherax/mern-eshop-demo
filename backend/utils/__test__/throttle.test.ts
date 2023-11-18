/**
 * Creates a throttled version of the `callback` that controls
 * how many times we allow a function to be executed over time.
 *
 * @see https://cutt.ly/debounce-throttle
 *
 * @param callback The function to defer the execution
 * @param delay Milliseconds to delay the execution
 */
export default function throttle<Args extends unknown[], R>(
  callback: (...args: Args) => R,
  delay: number,
) {
  let taskId: number | NodeJS.Timeout;
  let leading = true;

  return function throttledCallback(...args: Args) {
    if (leading) {
      leading = false;
      callback(...args);
    }
    if (taskId == null) {
      taskId = setTimeout(() => {
        callback(...args);
        clearTimeout(taskId);
        taskId = null;
      }, delay);
    }
  };
}

/**
 * @see https://jestjs.io/docs/timer-mocks#run-all-timers
 */
describe('Testing throttle() utility', () => {
  it('should call the throttled function every 200ms', async () => {
    expect.assertions(3);

    const ms100 = 100;
    const msLimit = 2000;
    const msDelay = 200;

    const spyOn = {calls: 0};
    const onScroll = jest.fn(() => spyOn.calls++);
    const throttledFunction = throttle(onScroll, msDelay);

    const callEvery100ms = callEvery(ms100, msLimit);
    // calls throttledFunction every 100ms (avg) during 2 seconds
    const totalCalls = await callEvery100ms(throttledFunction);

    // throttledFunction invoked 20 times during 2 seconds
    expect(totalCalls).toBeLessThanOrEqual(Math.floor(msLimit / ms100 + 1)); // 21

    // onScroll is wrapped by throttledFunction,
    // it runs every 200ms (avg), which means onScroll is
    // executed only 10 times (avg) during 2 second, instead of 20 times.
    const groupedCalls = Math.ceil(msLimit / msDelay) + 1; // 10 (avg)
    expect(onScroll.mock.calls.length).toBeLessThanOrEqual(groupedCalls);
    expect(spyOn.calls).toBeLessThanOrEqual(groupedCalls);
  });
});

// -------------------------------

/**
 * Higher-order function that creates a specialized function to
 * execute a callback at an interval during the specified seconds.
 *
 * Warning: `setTimeout` and `setInterval` don't guarantee timer delay.
 * @see https://johnresig.com/blog/how-javascript-timers-work/
 *
 * @param interval Time interval, in milliseconds
 * @param maxSeconds Time limit, in milliseconds
 */
function callEvery(interval: number, maxSeconds: number) {
  const limit = Math.floor(maxSeconds / interval);

  return function callInterval(
    callback: (...args: unknown[]) => void,
  ): Promise<number> {
    return new Promise<number>(resolve => {
      let calls = 0;

      const taskId = setInterval(() => {
        callback();
        if (++calls === limit) {
          clearInterval(taskId);
          resolve(calls);
        }
      }, interval);
    });
  };
}
