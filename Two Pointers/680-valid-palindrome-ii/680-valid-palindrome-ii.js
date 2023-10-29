/*

Given a string s, return true if the s can be palindrome after deleting at most one character from it.



Example 1:

Input: s = "aba"
Output: true
Example 2:

Input: s = "abca"
Output: true
Explanation: You could delete the character 'c'.
Example 3:

Input: s = "abc"
Output: false


Constraints:

1 <= s.length <= 10^5
s consists of lowercase English letters.

*/

/**
 * @param {string} s
 * @return {boolean}
 */

/**
 * @param {string} s
 * @return {boolean}
 */

/*

Think of a palindrome: "race a car". Take any substring in a palindromic stirng and it'll be a
palindrome. For example: "e a c", "ae a ca" and so on.

Algorithm: Iterate over the string using two pointers to check if the string is a palindrome. At
a point where s[left] and s[right] are not equal, it means the substring from [left, right] is not
a palindrome. Now, check if excluding a character from either left or right side makes it a palindrome.
If it does => true. If it doesn't => we used our "at most 1 character deletion" so => false

*/
const isPalindrome = function (s, left, right) {
  while (left <= right) {
    if (s.charAt(left) === s.charAt(right)) {
      left++;
      right--;
    } else {
      return false;
    }
  }
  return true;
};

const validPalindrome = function (s) {
  let left = 0;
  let right = s.length - 1;
  while (left < right) {
    if (s[left] !== s[right]) {
      //mismatch => exclude left char and check for palindrome
      //OR exclude right char and check for palindrome
      return (
        isPalindrome(s, left + 1, right) || isPalindrome(s, left, right - 1)
      );
    } else {
      left++;
      right--;
    }
  }
  return true;
};
//TC: O(n)
//SC: O(1)
