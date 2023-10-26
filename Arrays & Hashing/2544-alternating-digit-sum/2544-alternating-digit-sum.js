/*

You are given a positive integer n. Each digit of n has a sign according to the following rules:

The most significant digit is assigned a positive sign.
Each other digit has an opposite sign to its adjacent digits.
Return the sum of all digits with their corresponding sign.



Example 1:

Input: n = 521
Output: 4
Explanation: (+5) + (-2) + (+1) = 4.
Example 2:

Input: n = 111
Output: 1
Explanation: (+1) + (-1) + (+1) = 1.
Example 3:

Input: n = 886996
Output: 0
Explanation: (+8) + (-8) + (+6) + (-9) + (+9) + (-6) = 0.


Constraints:

1 <= n <= 10^9

*/

/**
 * @param {number} n
 * @return {number}
 */

const alternateDigitSum0 = function (n) {
  let sum = 0;
  const str = `${n}`;
  for (let i = 0; i < str.length; i++) {
    const sign = i % 2 === 0 ? 1 : -1;
    sum += sign * Number(str[i]);
  }
  return sum;
};

const alternateDigitSum1 = function (n) {
  let sign = 1;
  let sum = 0;
  const str = `${n}`;
  for (let i = 0; i < str.length; i++) {
    sum += sign * Number(str[i]);
    sign = sign * -1;
  }
  return sum;
};

const alternateDigitSum = function (n) {
  let sign = 1;
  let sum = 0;
  //going right to left
  while (n > 0) {
    sign = sign * -1;
    const digit = n % 10;
    sum += sign * digit;
    n = Math.floor(n / 10);
  }
  return sign * sum;
};

/*

Case 1: no. of digits are even
If we start from right, we have to use -ve else +ve from right.

Case 2: no. of digits are odd
sign pattern looks like +, - , +
if we start with -ve from right. we will have the following pattren (-, + -). then we have to multiply with -ve to toggle all the signs.
(-, + , -) * - => (+, -, +).

So, in both cases if we start with -ve sign from right to left. it will handle both cases and efficiently without pre-calculating or storing the values.

*/
