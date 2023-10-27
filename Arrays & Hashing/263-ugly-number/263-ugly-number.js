/*

An ugly number is a positive integer whose prime factors are limited to 2, 3, and 5.

Given an integer n, return true if n is an ugly number.



Example 1:

Input: n = 6
Output: true
Explanation: 6 = 2 × 3
Example 2:

Input: n = 1
Output: true
Explanation: 1 has no prime factors, therefore all of its prime factors are limited to 2, 3, and 5.
Example 3:

Input: n = 14
Output: false
Explanation: 14 is not ugly since it includes the prime factor 7.


Constraints:

-2^31 <= n <= 2^31 - 1

*/

/**
 * @param {number} n
 * @return {boolean}
 */

const isUgly = function (n) {
  if (n <= 0) return false;
  //if n is divisible by 2, 3 or 5, we keep repeatedly dividing it by them
  //until we can't. If we reach 1 => ugly. If it can still be broken down (futher divisible)
  //but by at least one prime factor other than 2, 3, or 5 => not ugly!
  while (n > 1) {
    if (n % 2 === 0) n = n / 2;
    else if (n % 3 === 0) n = n / 3;
    else if (n % 5 === 0) n = n / 5;
    else break;
  }
  return n === 1;
};

/*

Time complexity:

The time complexity of the provided code is O(log(n)), where 'n' is the input integer.

Here's the breakdown:

In the worst case, the loop iterates until 'n' is reduced to 1. For each iteration, the code checks if 'n' is divisible by 2, 3, or 5. If any of these conditions are met, it performs a division operation, reducing 'n' by a factor of 2, 3, or 5.

The number of iterations required to reach 1 depends on how many times 'n' can be divided by 2, 3, and 5 until it's no longer divisible. This is essentially a logarithmic process. The number of iterations is determined by the number of prime factors of 2, 3, and 5 in 'n'.

In the worst case, the number of iterations is bounded by the logarithm of 'n' (log(n)), making the time complexity O(log(n)).

So, the code has a logarithmic time complexity, which means it has a very efficient runtime even for large input values.

Space complexity: O(1)

*/
