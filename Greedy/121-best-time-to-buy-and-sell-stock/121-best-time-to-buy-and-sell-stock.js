/*
You are given an array prices where prices[i] is the price of a given stock on the ith day.

You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.

Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.

Example 1:

Input: prices = [7,1,5,3,6,4]
Output: 5
Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.
Example 2:

Input: prices = [7,6,4,3,1]
Output: 0
Explanation: In this case, no transactions are done and the max profit = 0.

*/

/**
 * @param {number[]} prices
 * @return {number}
 */

/**
 * @param {number[]} prices
 * @return {number}
 */

/*

Greedy Characteristics:

At each step, it makes a locally optimal choice
It makes an irrevocable decision about the buying price
It continuously tracks the maximum possible profit

Key Greedy Choices:

Always choose the lowest price seen so far as the buying price
Always update the maximum profit if a better profit is found
Make these decisions in a single pass without backtracking

*/

const maxProfit = function (prices) {
  let buyingPrice = prices[0];
  let result = 0;

  // Iterate through the prices
  for (let i = 0; i < prices.length; i++) {
    // Update the minimum buying price seen so far
    buyingPrice = Math.min(buyingPrice, prices[i]);
    // Calculate the potential profit if selling at the current price
    const currProfit = prices[i] - buyingPrice;
    // Update the maximum profit if the current profit is higher
    result = Math.max(result, currProfit);
  }
  return result;
};

// Time Complexity: O(n), where n is the number of prices
// Space Complexity: O(1), using only a few variables
