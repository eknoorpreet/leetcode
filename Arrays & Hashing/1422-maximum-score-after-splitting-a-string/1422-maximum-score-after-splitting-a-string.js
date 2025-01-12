/*

Given a string s of zeros and ones, return the maximum score after splitting the string into two non-empty substrings (i.e. left substring and right substring).

The score after splitting a string is the number of zeros in the left substring plus the number of ones in the right substring.



Example 1:

Input: s = "011101"
Output: 5
Explanation:
All possible ways of splitting s into two non-empty substrings are:
left = "0" and right = "11101", score = 1 + 4 = 5
left = "01" and right = "1101", score = 1 + 3 = 4
left = "011" and right = "101", score = 1 + 2 = 3
left = "0111" and right = "01", score = 1 + 1 = 2
left = "01110" and right = "1", score = 2 + 1 = 3
Example 2:

Input: s = "00111"
Output: 5
Explanation: When left = "00" and right = "111", we get the maximum score = 2 + 3 = 5
Example 3:

Input: s = "1111"
Output: 3


Constraints:

2 <= s.length <= 500
The string s consists of characters '0' and '1' only.

*/

/**
 * @param {string} s
 * @return {number}
 */

const maxScore0 = function (s) {
  let result = 0;

  for (let i = 0; i < s.length - 1; i++) {
    let currScore = 0;

    // Get the left score (add all Os)
    for (let j = 0; j <= i; j++) {
      if (s[j] === '0') {
        currScore++;
      }
    }

    // Get the right score (add all 1s)
    for (let j = i + 1; j < s.length; j++) {
      if (s[j] === '1') {
        currScore++;
      }
    }

    result = Math.max(result, currScore);
  }

  return result;
};

/*

Time complexity: O(n^2)

Space complexity: O(1)

*/

/*

Why we end the loop at s.length - 1:

The key is the requirement that both substrings must be non-empty. Let's walk through why:

When splitting string "011101" into left and right substrings:
// Valid splits:

"0" | "11101"     // index 1
"01" | "1101"     // index 2
"011" | "101"     // index 3
"0111" | "01"     // index 4
"01110" | "1"     // index 5

We can't split at index 6 (s.length) because:
"011101" | ""     // INVALID: right substring is empty

*/

const maxScore = function (s) {
  let result = 0;

  // How many 0 are in the left part.
  let countZeros = 0;
  let countOnes = 0;

  for (const c of s) {
    if (c === '1') countOnes++;
  }

  for (let i = 0; i < s.length - 1; i++) {
    // "1" belongs in the right part => exclude from here
    if (s[i] === '1') countOnes--;
    // "0" belongs in the left part => include here
    else countZeros++;

    result = Math.max(result, countZeros + countOnes);
  }

  return result;
};

/*

TC: O(n)
SC: O(1)

*/
