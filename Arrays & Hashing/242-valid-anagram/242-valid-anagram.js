/*

Given two strings s and t, return true if t is an anagram of s, and false otherwise.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.


Example 1:

Input: s = "anagram", t = "nagaram"
Output: true

Example 2:

Input: s = "rat", t = "car"
Output: false

Constraints:

1 <= s.length, t.length <= 5 * 104
s and t consist of lowercase English letters.
*/

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */

//TC: O(nlogn), where 'n' is the length of the longer string between s and t.
//SC: O(1)
// const isAnagram = function(s, t) {
//     if(s.length !== t.length) return false
//     return [...s].sort().join("") === [...t].sort().join("")
// };

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */

//TC: O(nlogn)
//SC: O(n)
// const isAnagram = function(s, t) {
//     if(s.length !== t.length) return false
//     return [...s].sort().join("") === [...t].sort().join("")
// };

//TC: O(s)
//SC: O(k), where k is number of unique characters
// const isAnagram = function(s, t) {
//     if(s.length !== t.length) return false
//     const sMap = new Map() //count frequencies of chars in s
//     const tMap = new Map() //count frequencies of chars in t
//since both s and t are of same length, we only traverse through 1
//     for(let i = 0; i < s.length; i++) {
//store frequencies of curr char of s
//         sMap.set(s[i], (sMap.get(s[i]) || 0) + 1)
//store frequencies of curr char of t
//         tMap.set(t[i], (tMap.get(t[i]) || 0) + 1)
//     }

//     for(let c of sMap.keys()) {
//         if(sMap.get(c) !== tMap.get(c)) return false
//     }
//     return true
// };

//TC: O(s)
//SC: O(k), where k is number of unique characters
const isAnagram = function (s, t) {
  if (s.length !== t.length) return false;
  const charFrequency = new Map();
  for (let char of s) {
    charFrequency.set(char, (charFrequency.get(char) || 0) + 1);
  }
  for (let char of t) {
    charFrequency.set(char, charFrequency.get(char) - 1);
  }
  for (let [char, frequency] of charFrequency.entries()) {
    if (frequency > 0) return false;
  }
  return true;
};

/*

While both solutions have the same big-O complexity,
Solution 2 is more space-efficient and likely to be marginally faster in practice
due to fewer operations and better memory usage.

*/
