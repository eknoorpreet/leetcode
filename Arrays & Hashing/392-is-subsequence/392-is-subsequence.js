/*

Given two strings s and t, return true if s is a subsequence of t, or false otherwise.

A subsequence of a string is a new string that is formed from the original string
by deleting some (can be none) of the characters without disturbing the relative positions
of the remaining characters. (i.e., "ace" is a subsequence of "abcde" while "aec" is not).


Example 1:

Input: s = "abc", t = "ahbgdc"
Output: true
Example 2:

Input: s = "axc", t = "ahbgdc"
Output: false


Constraints:

0 <= s.length <= 100
0 <= t.length <= 104
s and t consist only of lowercase English letters.

*/
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */

const isSubsequence = function (s, t) {
  if (s.length > t.length) return false;
  if (s.length === 0) return true;
  let i1 = 0; //pointer for s
  let i2 = 0; //pointer for t
  while (i1 < s.length && i2 < t.length) {
    if (s[i1] === t[i2]) {
      i1++;
    }
    i2++;
  }
  //the loop ends => either because we reached the end of both strings (is subsequence) or we
  //exhausted only one. If it's s we exhausted => true!
  //just check if we have exhausted s
  return i1 === s.length;
};

//TC: O(s), where s is the length of string
//SC: O(1)

console.log(isSubsequence('abc', 'ahbgdc'));
console.log(isSubsequence('abz', 'ahbgdc'));
console.log(isSubsequence('', 'ahbgdc'));
