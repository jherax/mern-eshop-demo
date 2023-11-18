/**
 * Creates a debounced version of the `callback` that controls
 * how many times we allow a function to be executed over time.
 *
 * @see https://cutt.ly/debounce-throttle
 *
 * @param callback The function to defer the execution
 * @param delay Milliseconds to delay the execution
 */
export default function debounce<Args extends unknown[], R>(
  callback: (...args: Args) => R,
  delay: number,
) {
  let taskId: number | NodeJS.Timeout;

  // generator-function pattern
  return function debouncedCallback(...args: Args) {
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
describe('Testing debounce() utility', () => {
  it('should call the debounced function every 150ms', async () => {
    expect.assertions(3);

    const ms50 = 50;
    const msLimit = 1000;
    const msDelay = 150;

    const spyOn = {calls: 0};
    const onKeyUp = jest.fn(() => spyOn.calls++);
    const debouncedFunction = debounce(onKeyUp, msDelay);

    const callEvery50ms = callEvery(ms50, msLimit);
    // calls debouncedFunction every 50ms (avg) during 1 second
    const totalCalls = await callEvery50ms(debouncedFunction);

    // debouncedFunction invoked 20 times during 1 second
    expect(totalCalls).toBeLessThanOrEqual(Math.floor(msLimit / ms50)); // 20

    // onKeyUp is wrapped by debouncedFunction,
    // it runs every 150ms (avg), which means onKeyUp is
    // executed only 7 times (avg) during 1 second, instead of 20 times.
    const groupedCalls = Math.ceil(msLimit / msDelay); // 7 (avg)
    expect(onKeyUp.mock.calls.length).toBeLessThanOrEqual(groupedCalls);
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
