// https://leetcode.com/problems/find-all-anagrams-in-a-string

/*

Given two strings s and p, return an array of all the start indices of p's anagrams in s. You may return the answer in any order.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.



Example 1:

Input: s = "cbaebabacd", p = "abc"
Output: [0,6]
Explanation:
The substring with start index = 0 is "cba", which is an anagram of "abc".
The substring with start index = 6 is "bac", which is an anagram of "abc".
Example 2:

Input: s = "abab", p = "ab"
Output: [0,1,2]
Explanation:
The substring with start index = 0 is "ab", which is an anagram of "ab".
The substring with start index = 1 is "ba", which is an anagram of "ab".
The substring with start index = 2 is "ab", which is an anagram of "ab".


Constraints:

1 <= s.length, p.length <= 3 * 104
s and p consist of lowercase English letters.

*/
/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */

const findAnagrams = function (s, p) {
  const result = [];
  const map = new Map();
  for (let char of p) {
    //{chars in p => frequency}
    map.set(char, (map.get(char) || 0) + 1);
  }
  let start = 0;
  let charMatches = 0;
  for (let end = 0; end < s.length; end++) {
    //is curr char in p
    if (map.has(s[end])) {
      //decrement its freq in map
      map.set(s[end], map.get(s[end]) - 1);
      //if freq reaches 0 => 1 char matched!
      if (map.get(s[end]) === 0) charMatches++;
      if (charMatches === map.size) result.push(start);
    }
    //window of size p reached/exceeded => shrink it
    //(let go of the char at start)
    if (end >= p.length - 1) {
      //is the outgoing char in start => reflect its impact on map
      if (map.has(s[start])) {
        //did it contribute to our matches? => undo it
        if (map.get(s[start]) === 0) charMatches--;
        //add it back to map
        //(since we freshly restart our search in next window)
        map.set(s[start], map.get(s[start]) + 1);
      }
      //move start pointer one step ahead
      start++;
    }
  }
  return result;
};

/*TC: The time complexity of this code is O(s + p), where 's' is the length of string s, and 'p' is the length of string p.

SC: The space complexity is determined by the result array, which stores the start indices of anagrams. In the worst case, where there are many anagrams, the size of the result array can be O(s).

The map object: O(26) => O(1) since in the worst case, the whole pattern can have 26 distinct characters which
//will go into the hashmap.
*/

findAnagrams('cbaebabacd', 'abc'); //[0,6]
