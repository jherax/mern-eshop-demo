describe('Get the top 3 companies based on their historical stock price', () => {
  it('Testing getTopStocks()', () => {
    expect(
      getTopStocks(
        ['AMZN', 'CACC', 'EQIX', 'GOOG', 'ORLY', 'ULTA'],
        [
          [12.81, 11.09, 12.11, 10.93, 9.83, 8.14],
          [10.34, 10.56, 10.14, 12.7, 13.1, 11.22],
          [11.53, 10.67, 10.42, 11.88, 11.77, 10.21],
        ],
      ),
    ).toEqual(['GOOG', 'ORLY', 'AMZN']);
  });
});

const MAXT_TOP = 3;

function getTopStocks(stocks: string[], prices: number[][]): string[] {
  const avgStocks = {};

  stocks.forEach((ticker, index) => {
    const sumPrices = prices.reduce((avg, currentPriceArr) => {
      return avg + currentPriceArr[index];
    }, 0);
    avgStocks[ticker] = sumPrices / prices.length;
  });

  // desc sorting
  stocks.sort((a, b) => {
    return avgStocks[b] - avgStocks[a];
  });

  return stocks.slice(0, MAXT_TOP);
}
