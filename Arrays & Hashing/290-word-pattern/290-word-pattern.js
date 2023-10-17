/*

Given a pattern and a string s, find if s follows the same pattern.

Here follow means a full match, such that there is a bijection between a letter in pattern and a non-empty word in s.



Example 1:

Input: pattern = "abba", s = "dog cat cat dog"
Output: true
Example 2:

Input: pattern = "abba", s = "dog cat cat fish"
Output: false
Example 3:

Input: pattern = "aaaa", s = "dog cat cat dog"
Output: false


Constraints:

1 <= pattern.length <= 300
pattern contains only lower-case English letters.
1 <= s.length <= 3000
s contains only lowercase English letters and spaces ' '.
s does not contain any leading or trailing spaces.
All the words in s are separated by a single space.

*/

/**
 * @param {string} pattern
 * @param {string} s
 * @return {boolean}
 */

//Same as Isomorphic Strings: https://leetcode.com/problems/isomorphic-strings/
const wordPattern = function (pattern, s) {
  //mapping should go both ways. why? Consider the case:
  //"aba", "cat cat cat"
  //"a" -> "cat"
  //"b" -> "cat" (should not be possible because "cat" should map to "b")
  //"a" -> "cat"
  //this will return true when we know it's not.
  const mapPatterntoS = new Map();
  s = s.split(' ');
  if (s.length !== pattern.length) return false;
  const mapPatternToS = new Map();
  const mapStoPattern = new Map();
  for (let i = 0; i < s.length; i++) {
    if (
      (mapPatternToS.has(pattern[i]) &&
        mapPatternToS.get(pattern[i]) !== s[i]) ||
      (mapStoPattern.has(s[i]) && mapStoPattern.get(s[i]) !== pattern[i])
    )
      return false;
    mapPatternToS.set(pattern[i], s[i]);
    mapStoPattern.set(s[i], pattern[i]);
  }
  return true;
};
//TC: O(s + p)
//SC: O(s + p)
