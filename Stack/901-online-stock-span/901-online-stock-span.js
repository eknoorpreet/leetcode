/*

Design an algorithm that collects daily price quotes for some stock and returns the span of that stock's price for the current day.

The span of the stock's price in one day is the maximum number of consecutive days (starting from that day and going backward) for which the stock price was less than or equal to the price of that day.

For example, if the prices of the stock in the last four days is [7,2,1,2] and the price of the stock today is 2, then the span of today is 4 because starting from today, the price of the stock was less than or equal 2 for 4 consecutive days.
Also, if the prices of the stock in the last four days is [7,34,1,2] and the price of the stock today is 8, then the span of today is 3 because starting from today, the price of the stock was less than or equal 8 for 3 consecutive days.
Implement the StockSpanner class:

StockSpanner() Initializes the object of the class.
int next(int price) Returns the span of the stock's price given that today's price is price.


Example 1:

Input
["StockSpanner", "next", "next", "next", "next", "next", "next", "next"]
[[], [100], [80], [60], [70], [60], [75], [85]]
Output
[null, 1, 1, 1, 2, 1, 4, 6]

Explanation
StockSpanner stockSpanner = new StockSpanner();
stockSpanner.next(100); // return 1
stockSpanner.next(80);  // return 1
stockSpanner.next(60);  // return 1
stockSpanner.next(70);  // return 2
stockSpanner.next(60);  // return 1
stockSpanner.next(75);  // return 4, because the last 4 prices (including today's price of 75) were less than or equal to today's price.
stockSpanner.next(85);  // return 6


Constraints:

1 <= price <= 10^5
At most 10^4 calls will be made to next.

*/

const StockSpanner = function () {
  this.stack = [];
};

/**
 * @param {number} price
 * @return {number}
 */

/*

Basically, we need to find the previous greater. Until we find the previous greater, keep on accumulating the days (popping)!

*/
StockSpanner.prototype.next = function (price) {
  let span = 1;
  //go back as long as previous price is smaller/equal => add to span
  //i.e. as long as previous price is NOT greater => calculate span
  //monotonic strictly decreasing stack

  // The current price (`price`) wants to find its previous greater in the stack top
  // As long as the below condition is true => previous prices < curr price => keep accumulating
  // condition becomes false => span for current price is calculated => push to stack

  // Every stack entry holds the span for that price
  // "span" means the max days for which the previous prices were lower
  // If x price < currPrice, instead of having to go back all the way, we can just use
  // x's span and add it to calculate currPrice's span (since if x price < currPrice, the
  // prices that resulted in x's span would also be < currPrice)

  while (this.stack.length && this.stack.at(-1)[0] <= price) {
    span += this.stack.pop()[1];
  }
  this.stack.push([price, span]);
  return span;
};

/**
 * Your StockSpanner object will be instantiated and called as such:
 * var obj = new StockSpanner()
 * var param_1 = obj.next(price)
 */
