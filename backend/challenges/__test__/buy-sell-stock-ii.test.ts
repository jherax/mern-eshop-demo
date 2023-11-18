/**
 * Given an array `prices` where `prices[i]` is the price of the stock
 * in that day, starting with [1st..nth] day, choose a day to buy
 * one stock and choose a different day in the future to sell that stock.
 * You can perform more than one transaction.
 * Return the maximum accumulated profit you can achieve.
 * If you cannot achieve any profit, return 0.
 *
 * @see https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii
 */
describe('Best Time to Buy and Sell Stock II', () => {
  it('should get the max profit obtained in from stock transactions', () => {
    expect(maxProfit2Native([7, 1, 5, 3, 6, 4])).toBe(7); // profit: $7 (5-1, 6-3)
    expect(maxProfit2Native([1, 2, 3, 4, 5])).toBe(4); // profit: $4 (2-1, 3-2, 4-3, 5-4)
    expect(maxProfit2Native([7, 6, 4, 3, 1])).toBe(0); // no profit
    expect(maxProfit2([2, 4, 1])).toBe(2); // profit: $2 (4-2)
    expect(maxProfit2([5, 9])).toBe(4); // profit: $4 (9-5)
    expect(maxProfit2([2, 1])).toBe(0); // no profit
    expect(maxProfit2([8])).toBe(0); // no profit
  });
});

/**
 * Get the maximum accumulated profit you can achieve.
 * If you cannot achieve any profit, return 0.
 * @param prices Array of stock prices by day
 * @returns Accumulated profit
 */
function maxProfit2(prices: number[]): number {
  if (prices.length < 2) {
    return 0;
  }
  let profit = 0;
  let buy = 0; // day to buy at cheaper price
  for (let day = 1; day < prices.length; day++) {
    if (prices[day] < prices[buy]) {
      buy = day;
    }
    if (prices[day] - prices[buy] > 0) {
      profit += prices[day] - prices[buy];
      // set the same day as the buy day,
      // in case the next day we have a better price to sell
      buy = day;
    }
  }
  return profit;
}

/**
 * Get the maximum accumulated profit you can achieve.
 * If you cannot achieve any profit, return 0.
 * @param prices Array of stock prices by day
 * @returns Accumulated profit
 */
function maxProfit2Native(prices: number[]): number {
  if (prices.length < 2) {
    return 0;
  }
  let next: number;
  let trade: number;
  // accumulate profitable trades
  return prices.reduce((profit, price, i) => {
    next = i + 1; // sell day
    if (next === prices.length) {
      return profit;
    }
    // trade = sell day - buy day
    trade = prices[next] - price;
    return trade > 0 ? profit + trade : profit;
  }, 0);
}
