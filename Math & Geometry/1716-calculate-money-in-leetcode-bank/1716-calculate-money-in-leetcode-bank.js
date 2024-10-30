/*

Hercy wants to save money for his first car. He puts money in the Leetcode bank every day.

He starts by putting in $1 on Monday, the first day. Every day from Tuesday to Sunday, he will put in $1 more than the day before. On every subsequent Monday, he will put in $1 more than the previous Monday.

Given n, return the total amount of money he will have in the Leetcode bank at the end of the nth day.



Example 1:

Input: n = 4
Output: 10
Explanation: After the 4th day, the total is 1 + 2 + 3 + 4 = 10.
Example 2:

Input: n = 10
Output: 37
Explanation: After the 10th day, the total is (1 + 2 + 3 + 4 + 5 + 6 + 7) + (2 + 3 + 4) = 37. Notice that on the 2nd Monday, Hercy only puts in $2.
Example 3:

Input: n = 20
Output: 96
Explanation: After the 20th day, the total is (1 + 2 + 3 + 4 + 5 + 6 + 7) + (2 + 3 + 4 + 5 + 6 + 7 + 8) + (3 + 4 + 5 + 6 + 7 + 8) = 96.


Constraints:

1 <= n <= 1000

*/

/**
 * @param {number} n
 * @return {number}
 */

/**
 * @param {number} n
 * @return {number}
 */

const totalMoney0 = function (n) {
  // track money for the week
  // reset on a Moonday
  let deposit = 1;
  let sum = 0;
  for (let day = 1; day <= n; day++) {
    // Assumung the first day is Monday
    // If it's a Monday
    if (day > 7 && day % 7 === 1) {
      // Calculate week number
      // 1st monday = $1 deposit, 2nd monday = $2 deposit and so on...
      const weekCount = Math.floor(day / 7) + 1;
      deposit = weekCount;
    }
    sum += deposit;
    deposit++;
  }
  return sum;
};

/*

Optimal solution:

Let's first understand the pattern:

Week 1: 1, 2, 3, 4, 5, 6, 7
Week 2: 2, 3, 4, 5, 6, 7, 8
Week 3: 3, 4, 5, 6, 7, 8, 9

We can optimize this in two ways:

Use arithmetic sequence formula:

For a sequence: a, a+1, a+2, ..., a+(n-1)
Sum = n * (first term + last term) / 2
Sum = n * (2a + (n-1)) / 2


Split into complete weeks and remaining days

*/

const totalMoney = function (n) {
  const completeWeeks = Math.floor(n / 7);
  const remainingDays = n % 7;

  // Part 1: Calculate complete weeks
  // 1 + 2 + 3 + 4 + 5 + 6 + 7 = 28
  const firstWeek = 28;
  // If n = 30, lastWeek = 49
  // First week sums to 28
  // Each subsequent week's sum increases by 7
  const lastWeek = firstWeek + (completeWeeks - 1) * 7;
  // For complete weeks, we have an arithmetic sequence of weekly sums
  // weeklySum = 154
  const weeklySum = (completeWeeks * (firstWeek + lastWeek)) / 2;

  const mondayValue = completeWeeks + 1;
  const remainingSum =
    (remainingDays * (2 * mondayValue + (remainingDays - 1))) / 2;

  return weeklySum + remainingSum;
};

// Time Complexity: O(1) - constant time regardless of input size
// Space Complexity: O(1) - uses only a fixed number of variables
