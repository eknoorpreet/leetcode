/*

Given a non-negative integer x, return the square root of x rounded down to the nearest integer. The returned integer should be non-negative as well.

You must not use any built-in exponent function or operator.

For example, do not use pow(x, 0.5) in c++ or x ** 0.5 in python.


Example 1:

Input: x = 4
Output: 2
Explanation: The square root of 4 is 2, so we return 2.
Example 2:

Input: x = 8
Output: 2
Explanation: The square root of 8 is 2.82842..., and since we round it down to the nearest integer, 2 is returned.


Constraints:

0 <= x <= 2^31 - 1

*/

/**
 * @param {number} x
 * @return {number}
 */

/*

When the loop ends, left is the smallest integer whose square is greater than x.
So left - 1 is the largest integer whose square is less than or equal to x. The left - 1 ensures we always return the floor of the square root, rounding down to the nearest integer.

*/

const mySqrt = function (x) {
  if (x < 2) return x;

  let left = 0;
  let right = x;
  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);
    const squared = mid * mid;
    if (squared < x) {
      left = mid + 1;
    } else if (squared > x) {
      // Ensure we don't accidentally eliminate / miss the correct square root
      right = mid;
    } else {
      return mid;
    }
  }
  return left - 1;
};

/*

Time Complexity: O(log x)
Space Complexity: O(1)

*/
