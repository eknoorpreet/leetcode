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

//TC: O(s)
//SC: O(s + t)
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

// //TC: O(s + t) => O(s)
// //SC: O(s)
const isAnagram = function (s, t) {
  if (s.length !== t.length) return false;
  const charFrequency = new Map();
  for (let char of s) {
    charFrequency.set(char, (charFrequency.get(char) || 0) + 1);
  }
  //if both (same length) strings have the same character count
  //each char in hashmap should have 0 count after going through t and "undoing"
  //its count
  for (let char of t) {
    charFrequency.set(char, charFrequency.get(char) - 1);
  }
  for (let frequency of charFrequency.values()) {
    if (frequency > 0) return false;
  }
  return true;
};
