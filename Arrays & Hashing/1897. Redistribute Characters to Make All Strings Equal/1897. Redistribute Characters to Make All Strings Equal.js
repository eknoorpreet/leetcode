/*

You are given an array of strings words (0-indexed).

In one operation, pick two distinct indices i and j, where words[i] is a non-empty string, and move any character from words[i] to any position in words[j].

Return true if you can make every string in words equal using any number of operations, and false otherwise.



Example 1:

Input: words = ["abc","aabc","bc"]
Output: true
Explanation: Move the first 'a' in words[1] to the front of words[2],
to make words[1] = "abc" and words[2] = "abc".
All the strings are now equal to "abc", so return true.
Example 2:

Input: words = ["ab","a"]
Output: false
Explanation: It is impossible to make all the strings equal using the operation.


Constraints:

1 <= words.length <= 100
1 <= words[i].length <= 100
words[i] consists of lowercase English letters.

*/

/**
 * @param {string[]} words
 * @return {boolean}
 */

const makeEqual0 = function (words) {
  const count = new Array(26).fill(0);

  //go through all words
  for (const word of words) {
    //for each word, count the frequency of each character
    for (const char of word) {
      count[char.charCodeAt(0) - 'a'.charCodeAt(0)]++;
    }
  }

  // console.log(count)

  // for(let c of count) {
  //     if(c % words.length !== 0) return false
  // }
  // return true

  return count.every((c) => c % words.length === 0);
};

const makeEqual = function (words) {
  // Track frequency of each char
  const charFrequency = new Map();

  for (const word of words) {
    for (const char of word) {
      charFrequency.set(char, (charFrequency.get(char) || 0) + 1);
    }
  }

  // If frequency of each char is divisble by number of words => that char can appear in every word
  for (const freq of charFrequency.values()) {
    if (freq % words.length !== 0) return false;
  }

  return true;
};

/*

TC: O(n)
SC: O(26) => O(1)

*/
