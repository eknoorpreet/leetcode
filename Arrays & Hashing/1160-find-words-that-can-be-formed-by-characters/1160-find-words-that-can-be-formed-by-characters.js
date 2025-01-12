/*

You are given an array of strings words and a string chars.

A string is good if it can be formed by characters from chars (each character can only be used once).

Return the sum of lengths of all good strings in words.



Example 1:

Input: words = ["cat","bt","hat","tree"], chars = "atach"
Output: 6
Explanation: The strings that can be formed are "cat" and "hat" so the answer is 3 + 3 = 6.
Example 2:

Input: words = ["hello","world","leetcode"], chars = "welldonehoneyr"
Output: 10
Explanation: The strings that can be formed are "hello" and "world" so the answer is 5 + 5 = 10.


*/

/**
 * @param {string[]} words
 * @param {string} chars
 * @return {number}
 */

const isGoodString = function (word, chars, mapChars) {
  const mapWord = new Map();

  // Count frequency of characters in the word
  for (const char of word) {
    const newCount = (mapWord.get(char) || 0) + 1;
    // Check if we have enough characters
    if (!mapChars.has(char) || newCount > mapChars.get(char)) {
      return false;
    }
    mapWord.set(char, newCount);
  }

  return true;
};

const countCharacters = function (words, chars) {
  let count = 0;

  const map = new Map();
  for (const char of chars) {
    map.set(char, (map.get(char) || 0) + 1);
  }

  for (const word of words) {
    if (isGoodString(word, chars, map)) {
      count += word.length;
    }
  }

  return count;
};

/*

Time & Space Complexity:

Time: O(m + n * k) where n as the length of chars, n is total length of words and k is average word length
Space: O(26) => O(1)

*/
