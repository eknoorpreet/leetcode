/*

Given a string s, return the length of the longest substring between two equal characters, excluding the two characters. If there is no such substring return -1.

A substring is a contiguous sequence of characters within a string.



Example 1:

Input: s = "aa"
Output: 0
Explanation: The optimal substring here is an empty substring between the two 'a's.
Example 2:

Input: s = "abca"
Output: 2
Explanation: The optimal substring here is "bc".
Example 3:

Input: s = "cbzxy"
Output: -1
Explanation: There are no characters that appear twice in s.


Constraints:

1 <= s.length <= 300
s contains only lowercase English letters.

*/

/**
 * @param {string} s
 * @return {number}
 */

const maxLengthBetweenEqualCharacters = function (s) {
  let maxLength = -Infinity;
  const map = new Map(); // {char => index}

  for (let i = 0; i < s.length; i++) {
    // Char spotted again? => Calculate distance and update maximum distance
    if (map.has(s[i])) {
      maxLength = Math.max(maxLength, i - map.get(s[i]) - 1);
    } else {
      // If it's a different char, add to hashmap
      map.set(s[i], i);
    }
  }
  return maxLength === -Infinity ? -1 : maxLength;
};

/*

TC: O(n)

SC: O(26) => O(1): The input consists of only lowercase English letters. Thus, the size of the hashmap can never exceed 26.

*/
