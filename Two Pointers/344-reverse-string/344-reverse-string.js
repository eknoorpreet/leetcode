/*

Write a function that reverses a string. The input string is given as an array of characters s.

You must do this by modifying the input array in-place with O(1) extra memory.



Example 1:

Input: s = ["h","e","l","l","o"]
Output: ["o","l","l","e","h"]
Example 2:

Input: s = ["H","a","n","n","a","h"]
Output: ["h","a","n","n","a","H"]


Constraints:

1 <= s.length <= 10^5
s[i] is a printable ascii character.

*/

/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */

const reverseString1 = function (s) {
  return s.reverse();
};

const reverseString = function (s) {
  let left = 0;
  let right = s.length - 1;
  while (left < right) {
    //swap 0th and last chars and so on...
    [s[left], s[right]] = [s[right], s[left]];
    // let temp = s[left]
    // s[left] = s[right]
    // s[right] = temp
    left++;
    right--;
  }
  return s;
};
//TC: O(n)
//SC: O(1)
