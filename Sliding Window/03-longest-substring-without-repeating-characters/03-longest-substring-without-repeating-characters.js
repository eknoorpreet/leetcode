/*

Given a string s, find the length of the longest
substring
 without repeating characters.



Example 1:

Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.
Example 2:

Input: s = "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.
Example 3:

Input: s = "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3.
Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.


Constraints:

0 <= s.length <= 5 * 10^4
s consists of English letters, digits, symbols and spaces.

*/

/**
 * @param {string}
 * @return {number}
 */

/*

Intuition: When we hit a character already visited before => slide window
(move 'start' to next character after repeating one; the last index of the
repeating character being stored in the hashmap)

*/

const lengthOfLongestSubstring = function (s) {
  let maxLength = 0;
  // A hashmap to store characters and their (last) indices (so we know where to start from when
  // we encounter a repeating character)
  let map = new Map(); //stores char, last index
  let start = 0;
  for (let end = 0; end < s.length; end++) {
    // character already in hashmap (repeating char) ? => shrink window so we only
    // have 1 freq of character (i.e. exclude that character from beginning)
    // get its index via map.get(s[end]) and start from next
    if (map.has(s[end])) {
      // important! Why not always set start to map.get(s[end]) + 1?
      // Consider 'abccad'. At 2nd 'c', we move 'start' to 3. At 'a', we move start to ... 1 => wrong!
      // Since map.get('a') + 1 (1) < start (3), that character is not present in our window (twice)
      // => no need to slide!
      start = Math.max(start, map.get(s[end]) + 1);
    }
    map.set(s[end], end);
    maxLength = Math.max(maxLength, end - start + 1);
  }
  return maxLength;
};

lengthOfLongestSubstring('abcabcbb'); //3

// TC: O(n): The for loop runs for n characters
// SC: O(k), n = number of distinct characters in string; k <= n but since characters are 26 => O(1)
