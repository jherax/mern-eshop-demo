import EventEmitter from 'events';

// @see how to handle tuples of types
// https://stackoverflow.com/a/69038690/2247494

type Task<TResult> = () => Promise<TResult>;
type CompletedAll<TResolved> = (results: TResolved[]) => void;

export default function parallel<TResolved>(
  tasks: Task<TResolved>[],
  onComplete?: CompletedAll<TResolved>,
): Promise<TResolved[]> {
  const emitter = new EventEmitter();
  const status = {finished: 0, total: tasks.length};
  const results = new Array<TResolved>(status.total);

  return new Promise((resolve, reject) => {
    emitter.on('resolved', (data: TResolved, index: number) => {
      results[index] = data;
      status.finished += 1;
      if (status.finished === status.total) {
        if (typeof onComplete === 'function') {
          onComplete(results);
        }
        resolve(results);
      }
    });

    tasks.forEach((task, index) => {
      task()
        .then(data => emitter.emit('resolved', data, index))
        .catch(reject);
    });
  });
}
