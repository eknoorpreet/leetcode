/*

Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-231, 231 - 1], then return 0.

Assume the environment does not allow you to store 64-bit integers (signed or unsigned).



Example 1:

Input: x = 123
Output: 321
Example 2:

Input: x = -123
Output: -321
Example 3:

Input: x = 120
Output: 21


Constraints:

-2^31 <= x <= 2^31 - 1

*/

/**
 * @param {number} x
 * @return {number}
 */

const reverse0 = function (x) {
  const reversedInt = parseInt(x.toString().split('').reverse().join(''));
  // -123 => 321-
  // parseInt(321-) => 321
  // Retain the original sign via Math.sign(x)
  return reversedInt > Math.pow(2, 31) ? 0 : reversedInt * Math.sign(x);
};

const reverse = function (x) {
  let result = 0;
  // As long as x has not been exhausted
  while (x !== 0) {
    // Get the last digit of x via: x % 10
    // Place it at the correct decimal place via: result * 10 +
    result = result * 10 + (x % 10);
    // Remove last digit
    x = Math.trunc(x / 10);
  }
  return result > Math.pow(2, 31) || result < Math.pow(-2, 31) ? 0 : result;
};

/*

Time Complexity: O(log n)

The while loop runs once for each digit in x
Number of digits in a number n is log₁₀(n)

Space Complexity: O(1)

*/

/*

Math.trunc vs Math.floor

Positive numbers - both work the same
Math.trunc(3.7)  // 3
Math.floor(3.7)  // 3

Negative numbers - different behavior
Math.trunc(-3.7)  // -3 (truncates towards zero)
Math.floor(-3.7)  // -4 (rounds down towards negative infinity)

*/
