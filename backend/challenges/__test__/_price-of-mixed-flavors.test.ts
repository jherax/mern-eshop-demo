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

// =====================================

function bubbles(arr: number[]): number[] {
  const end = arr.length - 1;
  for (let right = 0; right < end; right++) {
    for (let x = 0; x < end - right; x++) {
      if (arr[x] > arr[x + 1]) {
        [arr[x], arr[x + 1]] = [arr[x + 1], arr[x]];
      }
    }
  }
  return arr;
}

function selection(arr: number[]): number[] {
  const end = arr.length;

  for (let left = 0; left < end - 1; left++) {
    let min = left;
    for (let x = left + 1; x < end; x++) {
      if (arr[x] < arr[min]) {
        min = x;
      }
    }
    [arr[left], arr[min]] = [arr[min], arr[left]];
  }
  return arr;
}

function insertion(arr: number[]): number[] {
  const end = arr.length;
  for (let incoming = 1; incoming < end; incoming++) {
    const pivot = arr[incoming];
    let left = incoming - 1;
    for (; left >= 0 && arr[left] > pivot; left--) {
      arr[left + 1] = arr[left];
    }
    arr[left + 1] = pivot;
  }
  return arr;
}

function quicksort(arr: number[]): number[] {
  const end = arr.length - 1;
  const pivot = arr[end];
  const left: number[] = [];
  const right: number[] = [];

  for (let i = 0; i < end; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return [...quickSort(left), pivot, ...quickSort(right)];
}

function quicksortInPlace(arr: number[], low = 0, high = arr.length): number[] {
  if (low < high) {
    const pivotIndex = setPartition(arr, low, high);

    quicksortInPlace(arr, low, pivotIndex - 1); // left group
    quicksortInPlace(arr, pivotIndex + 1, high); // right group
  }
  return arr;
}

function setPartition(arr: number[], low: number, high: number): number {
  const pivot = arr[high];
  let pi = low; // future pivot index: [...small, pi, ...large]
  for (let x = low; x < high; x++) {
    if (arr[x] <= pivot) {
      [arr[pi], arr[x]] = [arr[x], arr[pi]];
      pi++;
    }
  }
  // swap pivot to its correct position: [...small, pi, ...large]
  [arr[pi], arr[high]] = [arr[high], arr[pi]];
  return pi;
}
