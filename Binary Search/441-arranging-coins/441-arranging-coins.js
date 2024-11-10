/*

You have n coins and you want to build a staircase with these coins. The staircase consists of k rows where the ith row has exactly i coins. The last row of the staircase may be incomplete.

Given the integer n, return the number of complete rows of the staircase you will build.



Example 1:


Input: n = 5
Output: 2
Explanation: Because the 3rd row is incomplete, we return 2.
Example 2:


Input: n = 8
Output: 3
Explanation: Because the 4th row is incomplete, we return 3.


Constraints:

1 <= n <= 2^31 - 1

*/

/**
 * @param {number} n
 * @return {number}
 */

/*
Brute force: 1st row: 10 coins - 1 = 9
2nd row: 9 coins - 2 = 7
3rd row: 7 coins - 3 = 4
4th row: 4 coins - 4 = 0
We didn't go -ve; we're able to build the 4th row completely using 10 coins => 4

*/

//TC: O(n)
//SC: O(1)
const arrangeCoins0 = function (n) {
  let completeRows = 0;

  // As long as coins (n) can form a complete row
  // We need 1 coin for row 1, 2 coins for row 2.
  // Basically, we need [row]th Coins for [row]th row

  // We're checking if the remaining coins (n) is greater than or equal to the number of coins needed for the next row (completeRows + 1).
  while (n >= completeRows + 1) {
    // increment row count
    completeRows++;
    // Deduct coins
    // We used 1 coin for row 1, 2 coins for row 2.
    // Basically, deduct [row]th Coins
    n -= completeRows;
  }

  // Can't form a complete row anymore
  return completeRows;
};

/*

Gauss' formula:  n/2 (n + 1)


Summing up 1, 2, 3, ...., 98, 99, 100 = 50 pairs * 101 = 5050 => n / 2 * (n + 1) (why + 1...  because we're starting summing up from 1)

1. 50 because (total number of pairs) / 2
2. 101 because that's the sum of the largest and smallest value that can be formed

So, we know how to calculate sum of a series of values. How does this help us?
Max number of rows we can have? An "estimate" (not really, just an upper bound) is n.

left = 1, right = n (5), mid = 3: How many coins needed to build mid (3) rows: Formula says n / 2 * (n + 1) = 6

Why the above logic? Well,

We need 1 coin for 1 row
We need 3 coins for 2 rows
We need 6 coins for 3 rows

As you can see, we are just summing the rows (similar to summing our series)!

But, we only have 5 coins. Therefore, we cannot build 3 (or greater) rows.
We might be able to build: left = 1, 2: right = mid - 1 = 2. mid = 1. Formula says n / 2 * (n + 1) = 1.
We can build 1 row from 5 coins but we want to know the maximum no of rows we can complete.
So, we try to maximize and do left = mid + 1 = 2, mid = 2. Formula says n/2*(n+1) = 2

Basically, key Intuition:

For k rows, we need 1 + 2 + 3 + ... + k coins
This sum can be calculated using Gauss's formula: k(k+1)/2
We can binary search for the largest k where this sum ≤ n

*/

const arrangeCoins = function (n) {
  let left = 1;
  let right = n;
  let completeRows = 0;
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    const coinsNeeded = (mid / 2) * (mid + 1);
    // If coinsNeeded (for mid rows) is greater than what we have (n)
    // We cannot complete mid rows, let's try for < mid
    if (coinsNeeded > n) {
      right = mid - 1;
    } else {
      // Otherwise, we can complete mid rows, let's try for > mid
      left = mid + 1;
      // Update result
      completeRows = Math.max(completeRows, mid);
    }
  }
  return completeRows;
};

//TC: O(log n)
//SC: O(1)

/*

To solve this problem in O(1) time, we can use the formula for the sum of the first k natural
numbers, which is given by sum = (k * (k + 1)) / 2. We want to find the maximum value of k such
that the sum is less than or equal to n.

*/

const arrangeCoins1 = function (n) {
  // Using the quadratic formula to find the positive root
  // (-b + sqrt(b^2 - 4ac)) / 2a
  return Math.floor((Math.sqrt(8 * n + 1) - 1) / 2);
};

//TC: O(1)
//SC: O(1)
