/**
 * Filters an array of objects using custom predicates.
 * @param array List of elements to filter
 * @param filters Object with predicates as filters
 * @returns Filtered array
 */
export default function filterArrayBy<T>(
  array: T[],
  filters: FiltersBy<T>,
): T[] {
  const filterKeys = Object.keys(filters);
  return array.filter(item => {
    // validates all filters (AND operator)
    return filterKeys.every(prop => {
      return filters[prop](item[prop]);
    });
  });
}

export type FiltersBy<T> = {
  [K in keyof T]?: (value: T[K]) => boolean;
};

// =====================================

describe('Testing filterArrayBy()', () => {
  type Product = {
    name: string;
    color: string;
    size: number;
    locations: string[];
    details: {length: number; width: number};
  };

  it('should filter an array of products by multiple properties', () => {
    const products: Product[] = [
      {
        name: 'A',
        color: 'Blue',
        size: 50,
        locations: ['USA', 'Europe'],
        details: {length: 20, width: 70},
      },
      {
        name: 'B',
        color: 'Blue',
        size: 60,
        locations: [],
        details: {length: 20, width: 70},
      },
      {
        name: 'C',
        color: 'Black',
        size: 70,
        locations: ['Japan'],
        details: {length: 20, width: 71},
      },
      {
        name: 'D',
        color: 'Green',
        size: 50,
        locations: ['USA'],
        details: {length: 20, width: 71},
      },
    ];

    // filters are applied using AND operator
    const filters: FiltersBy<Product> = {
      size: size => size === 50 || size === 70,
      color: color => ['blue', 'black'].includes(color.toLowerCase()),
      locations: countries =>
        !!countries.find(c => ['japan', 'usa'].includes(c.toLowerCase())),
      details: details => details.length < 30 && details.width >= 70,
    };

    const expected: Product[] = [
      {
        name: 'A',
        color: 'Blue',
        size: 50,
        locations: ['USA', 'Europe'],
        details: {length: 20, width: 70},
      },
      {
        name: 'C',
        color: 'Black',
        size: 70,
        locations: ['Japan'],
        details: {length: 20, width: 71},
      },
    ];

    const filtered = filterArrayBy(products, filters);
    expect(filtered).toStrictEqual(expected);
  });
});
