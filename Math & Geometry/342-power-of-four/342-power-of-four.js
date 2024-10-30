/*

Given an integer n, return true if it is a power of four. Otherwise, return false.

An integer n is a power of four, if there exists an integer x such that n == 4x.



Example 1:

Input: n = 16
Output: true
Example 2:

Input: n = 5
Output: false
Example 3:

Input: n = 1
Output: true


Constraints:

-231 <= n <= 231 - 1


Follow up: Could you solve it without loops/recursion?

*/

/**
 * @param {number} n
 * @return {boolean}
 */

// Iterative
const isPowerOfFour0 = function (n) {
  // Known base cases
  if (n === 1 || n === 4) return true;
  // If n > 4
  while (n > 4) {
    // If n is not divisible by 4 => false
    if (n % 4 !== 0) return false;
    // If n is divisble by 4 and the result is 4, it is a power of 4
    if (n / 4 === 4) return true;
    // If n is divisble by 4, it may or may not be a power of 4
    // Determine by reducing it
    n = n / 4;
  }
  // If loop completes without returning, return false
  return false;
};

/*

Time Complexity: O(log n)
Space Complexity: O(1)

*/

// Recursive
const isPowerOfFour1 = function (n) {
  // Known base cases
  if (n === 1 || n === 4) return true;
  if (n % 4 !== 0 || n === 0) return false;
  // If n is divisble by 4, it may or may not be a power of 4
  // Determine by reducing it
  return isPowerOfFour(n / 4);
};

/*

Time Complexity: O(log n)
Space Complexity: O(log n) due to call stack

*/

/*

The key insight is based on the mathematical property of logarithms:

If n is a power of 4, then n = 4^x for some integer x
Taking log base 4 of both sides: log₄(n) = x
Therefore, if n is a power of 4, log₄(n) must be an integer

Let's break it down step by step:

Why Math.log(n) / Math.log(4)?

JavaScript's Math.log() gives us natural logarithm (base e)
To get log base 4, we use the change of base formula:
log₄(n) = ln(n) / ln(4)


Examples:
// n = 16 (is a power of 4)
Math.log(16) / Math.log(4) = 2  // Integer ✓
// Because 4² = 16

// n = 32 (not a power of 4)
Math.log(32) / Math.log(4) = 2.5  // Not an integer ✗

// n = 64 (is a power of 4)
Math.log(64) / Math.log(4) = 3  // Integer ✓
// Because 4³ = 64

Why Number.isInteger()?

If n is a power of 4, this division will result in an exact integer
For any other number, it will result in a non-integer

*/

const isPowerOfFour = function (n) {
  // First check if n is positive (powers of 4 can't be negative or zero)
  if (n <= 0) return false;
  // Log base 4 of n should be an integer
  return Number.isInteger(Math.log(n) / Math.log(4));
};

/*

Time Complexity: O(1)
Space Complexity: O(1)

*/
