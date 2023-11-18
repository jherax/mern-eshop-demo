type FilterOperator = 'AND' | 'OR';
export type FiltersBy<T> = {
  [K in keyof T]?: (value: T[K]) => boolean;
};

/**
 * Factory function that creates a specialized function to filter
 * arrays, by validating all filters (AND operator),
 * or validating just one of the filters (OR operator).
 * @param operator Method to validate all filters: AND, OR
 * @returns Specialized function
 */
export default function arrayFilterFactory(operator: FilterOperator) {
  const method = operator === 'AND' ? 'every' : 'some';

  /**
   * Filters an array of objects using custom predicates.
   * @param array List of elements to filter
   * @param filters Object with predicates as filters
   * @returns Filtered array
   */
  return function filterArrayBy<T>(array: T[], filters: FiltersBy<T>): T[] {
    const filterKeys = Object.keys(filters);
    return array.filter(item => {
      // validates filters (AND|OR operator)
      return filterKeys[method](prop => {
        return filters[prop](item[prop]);
      });
    });
  };
}

// =====================================

describe('Testing arrayFilterFactory()', () => {
  const arrayFilterEvery = arrayFilterFactory('AND');
  const arrayFilterSome = arrayFilterFactory('OR');

  type Person = {
    age: number;
    name: string;
    email: string;
    nation: string;
  };

  const users: Person[] = [
    {age: 28, name: 'John', email: 'johnson@mail.com', nation: 'USA'},
    {age: 38, name: 'Marlin', email: 'marlin@mail.com', nation: 'England'},
    {age: 35, name: 'Tom', email: 'tom@mail.com', nation: 'England'},
    {age: 28, name: 'Mark', email: 'mark@mail.com', nation: 'England'},
  ];

  it('should filter an array of objects validating just one of the filters', () => {
    // filters are applied using OR operator
    const filters: FiltersBy<Person> = {
      nation: country => country.toUpperCase() === 'USA',
      age: age => age < 30,
    };

    const expected: Person[] = [
      {age: 28, name: 'John', email: 'johnson@mail.com', nation: 'USA'},
      {age: 28, name: 'Mark', email: 'mark@mail.com', nation: 'England'},
    ];

    const filtered = arrayFilterSome(users, filters);
    expect(filtered).toStrictEqual(expected);
  });

  it('should filter an array of objects validating all filters', () => {
    // filters are applied using OR operator
    const filters: FiltersBy<Person> = {
      age: age => age < 30,
      nation: country => country.toUpperCase() === 'USA',
    };

    const expected: Person[] = [
      {age: 28, name: 'John', email: 'johnson@mail.com', nation: 'USA'},
    ];

    const filtered = arrayFilterEvery(users, filters);
    expect(filtered).toStrictEqual(expected);
  });
});
