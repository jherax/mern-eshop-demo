it('Testing computeTotalPrice()', () => {
  let price: number;
  price = computeTotalPrice(1, [
    'Vanilla',
    'Banana',
    'Apple',
    'Cherry',
    'Peach',
    'Lemon',
  ]);
  expect(price).toBe(4);

  price = computeTotalPrice(4, ['Vanilla', 'Apple', 'Vanilla', 'Apple']);
  expect(price).toBe(14);

  price = computeTotalPrice(4, ['Peach', 'Peach', 'Apple', 'Vanilla']);
  expect(price).toBe(13);

  price = computeTotalPrice(1, [
    'Vanilla',
    'Banana',
    'Apple',
    'Cherry',
    'Peach',
    'Banana',
    'Apple',
    'Peach',
    'Banana',
  ]);
  expect(price).toBe(6);
});

function computeTotalPrice(unitPrice: number, macarons: string[]): number {
  const sets: Array<{count: number; [key: string]: unknown}> = [];

  // create each set with unique flavors
  macarons.forEach(flavor => {
    const current = sets.find(mset => mset.count < 5 && !mset[flavor]);
    if (current == null) {
      sets.push({count: 1, [flavor]: flavor});
    } else {
      current.count++;
      current[flavor] = flavor;
    }
  });

  let totalPrice = 0;
  let pricePerSet: number;
  let discount: number;

  // compute price for each set
  sets.forEach(mset => {
    discount = (mset.count - 1) / 10; // same: (mset.count - 1) * 10 / 100
    pricePerSet = unitPrice * mset.count;
    pricePerSet -= pricePerSet * discount;
    totalPrice += pricePerSet;
  });

  return Math.floor(totalPrice);
}
