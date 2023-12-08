/*

You are given a string s and an integer k, a k duplicate removal consists of choosing k adjacent and equal letters from s and removing them, causing the left and the right side of the deleted substring to concatenate together.

We repeatedly make k duplicate removals on s until we no longer can.

Return the final string after all such duplicate removals have been made. It is guaranteed that the answer is unique.



Example 1:

Input: s = "abcd", k = 2
Output: "abcd"
Explanation: There's nothing to delete.
Example 2:

Input: s = "deeedbbcccbdaa", k = 3
Output: "aa"
Explanation:
First delete "eee" and "ccc", get "ddbbbdaa"
Then delete "bbb", get "dddaa"
Finally delete "ddd", get "aa"
Example 3:

Input: s = "pbbcggttciiippooaais", k = 2
Output: "ps"


Constraints:

1 <= s.length <= 10^5
2 <= k <= 10^4
s only contains lowercase English letters.

*/

/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */

/*

We only need to pop from the stack (all chars in a row) if the count (in the row) reaches k. We can
keep on popping when it reaches k until that substring is eliminated but that's inefficient. To avoid that, we can store chars as unique as such: [char, countInSubstring]

*/

const removeDuplicates = function (s, k) {
  const stack = []; // [char, countInSubstring]
  for (const char of s) {
    // If curr char is the same as the last processed => increment its count
    if (stack.length && stack.at(-1)[0] === char) {
      stack.at(-1)[1]++;
    } else {
      // Else, this is the first occurrence (previous char was different)
      stack.push([char, 1]);
    }
    // If, including curr iteration, count of curr char reaches k => remove it char from stack!
    if (stack.at(-1)[1] === k) stack.pop();
  }
  // At this point, stack holds unique chars and no. of times they're supposed to repeat in a
  // row!

  // Build the output string using stack
  let result = '';
  for (const [char, count] of stack) {
    result += char.repeat(count);
  }
  return result;
};

//TC: O(n)
//SC: O(n)
