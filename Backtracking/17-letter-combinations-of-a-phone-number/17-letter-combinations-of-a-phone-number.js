/*


Code
Testcase
Testcase
Test Result
17. Letter Combinations of a Phone Number
Solved
Medium
Topics
Companies
Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent. Return the answer in any order.

A mapping of digits to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.




Example 1:

Input: digits = "23"
Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]
Example 2:

Input: digits = ""
Output: []
Example 3:

Input: digits = "2"
Output: ["a","b","c"]


Constraints:

0 <= digits.length <= 4
digits[i] is a digit in the range ['2', '9'].

*/

/**
 * @param {string} digits
 * @return {string[]}
 */

const digitToChar = {
  2: 'abc',
  3: 'def',
  4: 'ghi',
  5: 'jkl',
  6: 'mno',
  7: 'pqrs',
  8: 'tuv',
  9: 'wxyz',
};

const letterCombinations = (digits) => {
  const result = [];
  if (digits.length === 0) return result;
  const helper = (processed, index) => {
    if (index >= digits.length) {
      result.push(processed);
      return result;
    }

    // Get characters for current digit
    const digit = Number(digits[index]);
    const chars = digitToChar[digit];

    // Try each character
    for (let char of chars) {
      helper(processed + char, index + 1);
    }
    return result;
  };
  return helper('', 0);
};

/*

Time Complexity: O(4^n)

Worst case: Each digit has 4 possible characters (like 7 and 9)
n is the length of input digits

Space Complexity: O(n)

Recursion depth is n (number of digits)

*/
