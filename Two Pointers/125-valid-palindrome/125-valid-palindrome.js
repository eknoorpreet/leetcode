/*

A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.

Given a string s, return true if it is a palindrome, or false otherwise.

Example 1:

Input: s = "A man, a plan, a canal: Panama"
Output: true
Explanation: "amanaplanacanalpanama" is a palindrome.
Example 2:

Input: s = "race a car"
Output: false
Explanation: "raceacar" is not a palindrome.
Example 3:

Input: s = " "
Output: true
Explanation: s is an empty string "" after removing non-alphanumeric characters.
Since an empty string reads the same forward and backward, it is a palindrome.

Constraints:

1 <= s.length <= 2 * 10^5
s consists only of printable ASCII characters.

*/

/**
 * @param {string} s
 * @return {boolean}
 */

//TC: O(n)
const isPalindrome0 = function (s) {
  //convert uppercase to lowercase, remove alphanumeric characters from string
  s = s.toLowerCase().replace(/[^a-z0-9]/g, ''); //O(n)
  return s === [...s].reverse().join(''); //O(n)
};

//Another way (build the reversed string iteratively)
const isPalindrome1 = function (s) {
  let reversed = '';

  s = s.toLowerCase().replace(/[^a-z0-9]/g, '');

  for (let i = s.length - 1; i >= 0; i--) {
    reversed += s[i];
  }

  return s === reversed;
};

const isPalindrome = function (s) {
  //convert uppercase to lowercase, remove alphanumeric characters from string
  s = s.toLowerCase().replace(/[^a-z0-9]/g, '');
  //use two pointers to iterate from both front and back and check if respective chars match
  let left = 0;
  let right = s.length - 1;
  while (left <= right) {
    //if respective chars match,check the next ones
    if (s[left] === s[right]) {
      left++;
      right--;
    } else {
      //if they don't match => not a palindrome
      return false;
    }
  }
  //we reached the center of string and first half equals second half => palidrome!
  return true;
};
//TC: O(n)
//SC: O(1)
