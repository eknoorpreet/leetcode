/*

You are given a string s consisting of lowercase English letters. A duplicate removal consists of choosing two adjacent and equal letters and removing them.

We repeatedly make duplicate removals on s until we no longer can.

Return the final string after all such duplicate removals have been made. It can be proven that the answer is unique.



Example 1:

Input: s = "abbaca"
Output: "ca"
Explanation:
For example, in "abbaca" we could remove "bb" since the letters are adjacent and equal, and this is the only possible move.  The result of this move is that the string is "aaca", of which only "aa" is possible, so the final string is "ca".


Example 2:

Input: s = "azxxzy"
Output: "ay"


Constraints:

1 <= s.length <= 10^5
s consists of lowercase English letters.

*/

/**
 * @param {string} s
 * @return {string}
 */
const removeDuplicates = function (s) {
  const stack = [];
  for (const char of s) {
    // If curr char is the same as the last processed => pop!
    if (stack.length && stack.at(-1) === char) {
      stack.pop();
    } else {
      // Else, this is the first occurrence (previous char was different)
      stack.push(char);
    }
  }
  // At this point, stack holds unique chars
  return stack.join('');
};

//TC: O(n)
//SC: O(n)
