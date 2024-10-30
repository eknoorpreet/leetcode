/*

Given an integer x, return true if x is a
palindrome
, and false otherwise.



Example 1:

Input: x = 121
Output: true
Explanation: 121 reads as 121 from left to right and from right to left.
Example 2:

Input: x = -121
Output: false
Explanation: From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.
Example 3:

Input: x = 10
Output: false
Explanation: Reads 01 from right to left. Therefore it is not a palindrome.


Constraints:

-231 <= x <= 231 - 1


Follow up: Could you solve it without converting the integer to a string?

*/

/**
 * @param {number} x
 * @return {boolean}
 */

const isPalindrome0 = function (x) {
  // Convert number to string for easier comparison
  const xString = x.toString();
  // Use two pointers to compare characters from both ends
  let left = 0;
  let right = xString.length - 1;
  while (left < right) {
    if (xString[left] !== xString[right]) return false;
    left++;
    right--;
  }
  return true;
};

/*

Time Complexity: O(log x) - number of digits
Space Complexity: O(log x) - for string conversion

*/

const isPalindrome = function (x) {
  // Negative numbers can't be palindromes due to '-' sign
  if (x < 0) return false;
  let reversedX = 0;
  let copyX = x;
  // Build reversed number digit by digit
  while (copyX > 0) {
    // Get last digit
    const lastDigit = copyX % 10;
    // Multiply current reversed number by 10 to shift digits left, add last digit to reversed number
    reversedX = reversedX * 10 + lastDigit;
    // Remove last digit
    copyX = Math.floor(copyX / 10);
  }
  return reversedX === x;
};

/*

Time Complexity: O(log x) for both - where x is the input number
Space Complexity: O(1)

*/

/*

Why the time complexity is O(log x) for both solutions, where x is the input number.
The key insight is: The number of digits in a number x is approximately log₁₀(x)
Let's break this down:

Relationship between digits and logarithm:

CopyFor a number x:
1 digit:   1-9        (10⁰ to 10¹-1)
2 digits:  10-99      (10¹ to 10²-1)
3 digits:  100-999    (10² to 10³-1)
4 digits:  1000-9999  (10³ to 10⁴-1)
So for a number x:

Number of digits = floor(log₁₀(x)) + 1
Example: 121 ≈ log₁₀(121) ≈ 2.08 → 3 digits

*/
