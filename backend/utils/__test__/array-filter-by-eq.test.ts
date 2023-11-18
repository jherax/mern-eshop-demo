/* eslint-disable curly */
const value = <T>(v: T) => (typeof v === 'string' ? v.toUpperCase() : v);

/**
 * Filters an array of objects using a list of valid values.
 * @param array List of elements to filter
 * @param filters Object whith lists of valid values
 * @returns Filtered array
 */
export default function filterArrayByEq<T extends {[key: string]: unknown}>(
  array: T[],
  filters: FiltersByEq<T>,
): T[] {
  const filterKeys = Object.keys(filters);
  return array.filter(item => {
    // validates all filters (AND operator)
    return filterKeys.every(key => {
      // ignores empty filters
      if (!filters[key].length) return true;
      return filters[key].find(f => value(f) === value(item[key]));
    });
  });
}

export type FiltersByEq<T> = {
  [K in keyof T]?: T[K][];
};

// =====================================

describe('Testing filterArrayByEq()', () => {
  type Product = {
    name: string;
    color: string;
    size: number;
  };

  it('should filter an array of objects using a list of valid values', () => {
    const products: Product[] = [
      {name: 'A', color: 'Blue', size: 50},
      {name: 'B', color: 'Blue', size: 60},
      {name: 'C', color: 'Black', size: 70},
      {name: 'D', color: 'Green', size: 50},
    ];

    // Filters are applied using AND operator.
    // Each filter uses a list of valid values, compared using === operator.
    // String values are not case-sensitive.
    const filters: FiltersByEq<Product> = {
      color: ['BLUE', 'black'],
      size: [70, 50],
    };

    const expected: Product[] = [
      {name: 'A', color: 'Blue', size: 50},
      {name: 'C', color: 'Black', size: 70},
    ];

    const filtered = filterArrayByEq(products, filters);
    expect(filtered).toStrictEqual(expected);
  });
});
