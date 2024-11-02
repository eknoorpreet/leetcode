/*

You are given an integer array prices where prices[i] is the price of a given stock on the ith day.

On each day, you may decide to buy and/or sell the stock. You can only hold at most one share of the stock at any time. However, you can buy it then immediately sell it on the same day.

Find and return the maximum profit you can achieve.



Example 1:

Input: prices = [7,1,5,3,6,4]
Output: 7
Explanation: Buy on day 2 (price = 1) and sell on day 3 (price = 5), profit = 5-1 = 4.
Then buy on day 4 (price = 3) and sell on day 5 (price = 6), profit = 6-3 = 3.
Total profit is 4 + 3 = 7.
Example 2:

Input: prices = [1,2,3,4,5]
Output: 4
Explanation: Buy on day 1 (price = 1) and sell on day 5 (price = 5), profit = 5-1 = 4.
Total profit is 4.
Example 3:

Input: prices = [7,6,4,3,1]
Output: 0
Explanation: There is no way to make a positive profit, so we never buy the stock to achieve the maximum profit of 0.


Constraints:

1 <= prices.length <= 3 * 10^4
0 <= prices[i] <= 10^4

*/

/**
 * @param {number[]} prices
 * @return {number}
 */

/*

Intuition:

Since we can buy and sell on the same day, instead of trying to find optimal buy-sell pairs, we can simply collect ALL positive price differences between consecutive days.
Any price increase represents a potential profit we should take. Just accumulate profits whenever
there's an opportunity to do so.

prices = [7,1,5,3,6,4]

i=1: prices[1]=1, prices[0]=7
     1-7 = -6 (negative, skip)

i=2: prices[2]=5, prices[1]=1
     5-1 = 4 (positive, add to profit)
     profit = 4

i=3: prices[3]=3, prices[2]=5
     3-5 = -2 (negative, skip)

i=4: prices[4]=6, prices[3]=3
     6-3 = 3 (positive, add to profit)
     profit = 4 + 3 = 7

i=5: prices[5]=4, prices[4]=6
     4-6 = -2 (negative, skip)

Final profit = 7

*/

const maxProfit = function (prices) {
  let profit = 0;
  for (let i = 1; i < prices.length; i++) {
    //prices[i]: potential selling price
    //prices[i - 1]: potential purchase price
    //is there a profit
    if (prices[i] > prices[i - 1]) {
      //accumulate it (every time the value is in increasing order, add it)
      profit += prices[i] - prices[i - 1];
    }
  }
  return profit;
};

/*

Time & Space Complexity:

Time: O(n) - we make one pass through the array
Space: O(1) - we only use one variable for profit

*/
