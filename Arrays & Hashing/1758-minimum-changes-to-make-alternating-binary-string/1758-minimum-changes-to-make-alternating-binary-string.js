/*

You are given a string s consisting only of the characters '0' and '1'. In one operation, you can change any '0' to '1' or vice versa.

The string is called alternating if no two adjacent characters are equal. For example, the string "010" is alternating, while the string "0100" is not.

Return the minimum number of operations needed to make s alternating.



Example 1:

Input: s = "0100"
Output: 1
Explanation: If you change the last character to '1', s will be "0101", which is alternating.
Example 2:

Input: s = "10"
Output: 0
Explanation: s is already alternating.
Example 3:

Input: s = "1111"
Output: 2
Explanation: You need two operations to reach "0101" or "1010".


Constraints:

1 <= s.length <= 10^4
s[i] is either '0' or '1'.

*/

/**
 * @param {string} s
 * @return {number}
 */

/*

Main Idea:

An alternating string can only be one of two patterns:

Pattern starting with '0': "0101..."
Pattern starting with '1': "1010..."

The solution counts changes needed for both patterns simultaneously

*/

const minOperations0 = function (s) {
  let start0 = 0; // counts changes needed if we want string to start with '0'
  let start1 = 0; // counts changes needed if we want string to start with '1'

  for (let i = 0; i < s.length; i++) {
    if (i % 2 === 0) {
      // Even positions (0,2,4,...)
      if (s[i] === '0') {
        start1++; // If we have 0 but want pattern starting with 1
      } else {
        start0++; // If we have 1 but want pattern starting with 0
      }
    } else {
      // Odd positions (1,3,5,...)
      if (s[i] === '1') {
        start1++; // If we have 1 but want pattern starting with 1
      } else {
        start0++; // If we have 0 but want pattern starting with 0
      }
    }
  }

  return Math.min(start0, start1);
};

// Using only 1 pointer
const minOperations = function (s) {
  let start0 = 0;

  for (let i = 0; i < s.length; i++) {
    if (i % 2 === 0) {
      if (s[i] === '1') {
        start0++;
      }
    } else {
      if (s[i] === '0') {
        start0++;
      }
    }
  }

  return Math.min(start0, s.length - start0);
};

/*

TC: O(n)
SC: O(1)

*/
