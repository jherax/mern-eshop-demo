/**
 * Given an array `prices` where `prices[i]` is the price of the stock
 * in that day, starting with [1st..nth] day, choose a single day to buy
 * one stock and choose a different day in the future to sell that stock.
 * Return the maximum profit you can achieve.
 * If you cannot achieve any profit, return 0.
 *
 * @see https://leetcode.com/problems/best-time-to-buy-and-sell-stock/
 */
describe('Best Time to Buy and Sell Stock', () => {
  it('should get the max profit obtained in a stock transaction', () => {
    expect(maxProfit([7, 1, 5, 3, 6, 4])).toBe(5); // buy day 2, and sell day 5, profit: $5 (6-1)
    expect(maxProfit([7, 6, 4, 3, 1])).toBe(0); // no profit
    expect(maxProfit([2, 4, 1])).toBe(2); // buy day 1, and sell day 2, profit: $2 (4-2)
    expect(maxProfit([5, 9])).toBe(4); // buy day 1, and sell day 2, profit: $4 (9-5)
    expect(maxProfit([2, 1])).toBe(0); // no profit
    expect(maxProfit([8])).toBe(0); // no profit
  });
});

/**
 * Get the maximum profit you can achieve.
 * If you cannot achieve any profit, return 0.
 * @param prices Array of stock prices by day
 * @returns Max profit
 */
function maxProfit(prices: number[]): number {
  if (prices.length < 2) {
    return 0;
  }
  let profit = 0;
  let buy = 0; // day to buy at cheaper price
  for (let day = 1; day < prices.length; day++) {
    if (prices[day] < prices[buy]) {
      buy = day;
    }
    if (prices[day] - prices[buy] > profit) {
      profit = prices[day] - prices[buy];
    }
  }
  return profit;
}
