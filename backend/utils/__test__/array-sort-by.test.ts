/* eslint-disable curly */

// item T is converted to unknown[]
// when decorating the array, and T
// is incompatible with unknown[]
type Decorated = unknown;
type PlainObject = {
  [key: string]: unknown;
};

/**
 * Sorts an array of objects In-Place,
 * sorting by multiple fields sequentially.
 *
 * @description This function is meant to be used
 * with arrays of objects, AND when you need to set
 * multiple sorting criteria. For other cases it is
 * recommended to use the native method `array.sort(callback)`
 * since for simple cases this function is more expensive
 * in time and memory.
 *
 * @param array List of objects to sort
 * @param parser Function that returns an array with the fields to sort
 * @returns Original array sorted
 */
function arraySortBy<T extends PlainObject>(
  array: T[],
  parser: (item: T) => Decorated[],
): T[] {
  let item: T;
  // Schwartzian transform (decorate-sort-undecorate)
  for (let i = array.length; i; ) {
    item = array[--i];
    // decorate items in array, by appending the sorting criteria
    (array[i] as Decorated) = [item, ...parser(item)];
  }
  // sort the decorated array
  (array as Decorated[]).sort(sortItems);
  // undecorate the array
  for (let i = array.length; i; ) {
    item = array[--i];
    array[i] = (item as Decorated)[0];
  }
  return array;
}

function sortItems(a: Decorated[], b: Decorated[]): number {
  // first position is the original element in the array
  // and the following values are the sorting criteria
  for (let i = 1, sorted = 0; i < a.length; i += 1) {
    // sort by multiple fields sequentially
    sorted = comparer(a[i], b[i]);
    if (sorted) return sorted;
  }
  return 0;
}

function comparer<T>(a: T, b: T): number {
  if (typeof a !== 'string') {
    if (a === b) return 0;
    return a > b ? 1 : -1;
  }
  // used this convention for descending sort,
  // to not care about case sensitivity.
  if (a.startsWith('<<:')) [a, b] = [b, a];
  return (a as string).localeCompare(b as string);
}

describe('Testing arraySortBy()', () => {
  it('should sort the array by name (asc) and by age (desc)', () => {
    const array = [
      {id: 6, age: 21, name: 'Pedro'},
      {id: 9, age: 26, name: 'pedro'},
      {id: 2, age: 26, name: 'maría'},
      {id: 7, age: 32, name: 'Maria'},
    ];

    // to indicate descending order for numbers,
    // just convert it to a negative value.
    arraySortBy(array, item => [item.name, -item.age]);

    expect(array).toStrictEqual([
      {id: 7, age: 32, name: 'Maria'},
      {id: 2, age: 26, name: 'maría'},
      {id: 9, age: 26, name: 'pedro'},
      {id: 6, age: 21, name: 'Pedro'},
    ]);
  });

  it('should sort the array by status (desc) and by birthday (desc)', () => {
    const array = [
      {
        birthday: '1983/03/06',
        name: 'David',
        task: 'Raw material',
        status: 'Completed',
      },
      {
        birthday: '1980/12/24',
        name: 'Marlin',
        task: 'Job material',
        status: 'Not started',
      },
      {
        birthday: '1985/08/31',
        name: 'Töm',
        task: 'Scrap material',
        status: 'Completed',
      },
      {
        birthday: '1983/03/05',
        name: 'Mark',
        task: 'Raw material',
        status: 'In progress',
      },
    ];

    // for descending order in strings,
    // just prepend the key "<<:"
    arraySortBy(array, item => [`<<:${item.status}`, -new Date(item.birthday)]);

    expect(array).toStrictEqual([
      {
        birthday: '1980/12/24',
        name: 'Marlin',
        task: 'Job material',
        status: 'Not started',
      },
      {
        birthday: '1983/03/05',
        name: 'Mark',
        task: 'Raw material',
        status: 'In progress',
      },
      {
        birthday: '1985/08/31',
        name: 'Töm',
        task: 'Scrap material',
        status: 'Completed',
      },
      {
        birthday: '1983/03/06',
        name: 'David',
        task: 'Raw material',
        status: 'Completed',
      },
    ]);
  });
});
