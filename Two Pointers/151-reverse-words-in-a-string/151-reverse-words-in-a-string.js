/*

Given an input string s, reverse the order of the words.

A word is defined as a sequence of non-space characters. The words in s will be separated by at least one space.

Return a string of the words in reverse order concatenated by a single space.

Note that s may contain leading or trailing spaces or multiple spaces between two words. The returned string should only have a single space separating the words. Do not include any extra spaces.



Example 1:

Input: s = "the sky is blue"
Output: "blue is sky the"
Example 2:

Input: s = "  hello world  "
Output: "world hello"
Explanation: Your reversed string should not contain leading or trailing spaces.
Example 3:

Input: s = "a good   example"
Output: "example good a"
Explanation: You need to reduce multiple spaces between two words to a single space in the reversed string.


Constraints:

1 <= s.length <= 10^4
s contains English letters (upper-case and lower-case), digits, and spaces ' '.
There is at least one word in s.

*/

/**
 * @param {string} s
 * @return {string}
 */
const reverseWords0 = function (s) {
  const result = [];
  s = s.trim();
  let i = s.length - 1;
  let j = s.length;
  while (i >= 0 && j >= 0) {
    // If current char is a space (separator)
    if (s[i] === ' ') {
      // Extract the word
      const word = s.substring(i + 1, j).trim();
      // If word is not "" or " "
      if (word.length !== 0 && word !== ' ') {
        // Add to result
        result.push(word);
        // Move the end pointer to start
        j = i;
      }
    }
    i--;
  }
  // Add the last (first) word
  result.push(s.substring(i + 1, j).trim());
  return result.join(' ');
};

const reverseWords2 = function (s) {
  // Trim all spaces
  const arr = trimSpaces(s);
  // Reverse the Whole String
  reverse(arr, 0, arr.length - 1);
  // Then Reverse Each Word
  reverseEachWord(arr);

  return arr.join('');
};

const trimSpaces = function (s) {
  let left = 0;
  let right = s.length - 1;
  while (left <= right && s[left] === ' ') left++;
  while (left <= right && s[right] === ' ') right--;

  const result = [];
  while (left <= right) {
    if (s[left] !== ' ') result.push(s[left]);
    else if (result[result.length - 1] !== ' ') result.push(s[left]);
    left++;
  }
  return result;
};

const reverse = function (arr, left, right) {
  while (left < right) {
    [arr[left++], arr[right--]] = [arr[right], arr[left]];
  }
};

const reverseEachWord = function (arr) {
  const n = arr.length;
  let left = 0;
  let right = 0;
  while (left < n) {
    // As long it's not a space, continue
    while (right < n && arr[right] !== ' ') right++;
    // Space found => Word exhausted => Reverse
    reverse(arr, left, right - 1);
    left = right + 1;
    right++;
  }
};

const reverseWords = function (s) {
  let result = '';
  const words = s.trim().split(' ');
  for (let i = words.length - 1; i >= 0; i--) {
    if (words[i] === '' || words[i] === ' ') continue;
    result += words[i] + ' ';
  }
  return result.trim();
};

/*

Time Complexity: O(n) where n is the length of string s
Space Complexity: O(n)

*/
