import {setTimeout} from 'node:timers/promises';

import logger from '../logger';
import parallel from './parallel';

describe('Testing parallel()', () => {
  const spyOnLogger = jest.spyOn(logger, 'info').mockImplementation(jest.fn());

  beforeEach(() => spyOnLogger.mockClear());

  it('should execute the onComplete() callback with the array of results in the correct order', async () => {
    const tasks = getListOfTasks();
    const results = await parallel(tasks, results => {
      logger.info('Finished: ' + results.join(','));
    });

    expect(results).toStrictEqual([1, 2, 3]);
    expect(logger.info).toHaveBeenCalledWith('Finished: 1,2,3');
  });

  it('should be thenable and get the results in the correct order', done => {
    const tasks = getListOfTasks();
    parallel(tasks).then(results => {
      logger.info('Finished: ' + results.join(','));
      expect(results).toStrictEqual([1, 2, 3]);
      expect(logger.info).toHaveBeenCalledWith('Finished: 1,2,3');
      done();
    });
  });
});

// ---------------------------------

function getListOfTasks() {
  const task1 = delayedFn(500, () => 1);
  const task2 = delayedFn(900, () => 2);
  const task3 = delayedFn(100, () => 3);
  return [task1, task2, task3];
}

function delayedFn<TResult>(ms: number, callback: () => TResult) {
  return () => setTimeout<TResult>(ms).then(callback);
}
