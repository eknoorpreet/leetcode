/*

Given a string s, return the longest
palindromic

substring
 in s.



Example 1:

Input: s = "babad"
Output: "bab"
Explanation: "aba" is also a valid answer.
Example 2:

Input: s = "cbbd"
Output: "bb"


Constraints:

1 <= s.length <= 1000
s consist of only digits and English letters.

*/

/**
 * @param {string} s
 * @return {string}
 */

const checkPalindrome1 = (s, start, end) => {
  let left = start;
  let right = end - 1;

  while (left < right) {
    if (s[left] !== s[right]) return false;
    else {
      left++;
      right--;
    }
  }
  return true;
};

const longestPalindrome0 = function (s) {
  // Using substring(start, end), the end index is exclusive - meaning it goes up to but doesn't
  // include the character at the end index.
  // Therefore, start from s.length which will be exclusive but s.length - 1 will be inclusive
  for (let length = s.length; length > 0; length--) {
    for (let start = 0; start <= s.length - length; start++) {
      if (checkPalindrome(s, start, start + length)) {
        return s.substring(start, start + length);
      }
    }
  }
  return '';
};

/*

Time: O(n³)
The two nested for loops iterate O(n^2) times. In each iteration of the while loop, we perform a palindrome check. The cost of this check is linear with n as well, giving us a time complexity of O(n^3)

Space: O(1)

*/
