/*


You are given an array of characters letters that is sorted in non-decreasing order, and a character target. There are at least two different characters in letters.

Return the smallest character in letters that is lexicographically greater than target. If such a character does not exist, return the first character in letters.



Example 1:

Input: letters = ["c","f","j"], target = "a"
Output: "c"
Explanation: The smallest character that is lexicographically greater than 'a' in letters is 'c'.
Example 2:

Input: letters = ["c","f","j"], target = "c"
Output: "f"
Explanation: The smallest character that is lexicographically greater than 'c' in letters is 'f'.
Example 3:

Input: letters = ["x","x","y","y"], target = "z"
Output: "x"
Explanation: There are no characters in letters that is lexicographically greater than 'z' so we return letters[0].


Constraints:

2 <= letters.length <= 10^4
letters[i] is a lowercase English letter.
letters is sorted in non-decreasing order.
letters contains at least two different characters.
target is a lowercase English letter.

*/

/**
 * @param {character[]} letters
 * @param {character} target
 * @return {character}
 */

const nextGreatestLetter0 = function (letters, target) {
  let left = 0;
  let right = letters.length - 1;
  while (left <= right) {
    let mid = left + Math.floor((right - left) / 2);
    if (target < letters[mid]) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  // if the greater character doesn't exist => return first character
  // When will that happen? The search space will be exhausted
  // when left index will be at right + 1 (and right will be at the last index).
  // So, if array length is 4, right will be at 3 and left will be at 4
  // 4 % 4 = 0 => first character

  // (Any other index) % arrayLength = (Any other index)
  // 2 % 4 = 2, 1 % 4 = 1
  return letters[left % letters.length];
};

//TC: O(log n)
//SC: O(1)
