/*

Given two strings s1 and s2, return true if s2 contains a
permutation
 of s1, or false otherwise.

In other words, return true if one of s1's permutations is the substring of s2.



Example 1:

Input: s1 = "ab", s2 = "eidbaooo"
Output: true
Explanation: s2 contains one permutation of s1 ("ba").
Example 2:

Input: s1 = "ab", s2 = "eidboaoo"
Output: false


Constraints:

1 <= s1.length, s2.length <= 10^4
s1 and s2 consist of lowercase English letters.

*/

/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */

/*

Core Idea:


To find if s2 contains a permutation of s1, we need to find a substring in s2 that has exactly the
same characters with the same frequencies as s1. We use a sliding window of size equal to
s1's length, as any permutation will be exactly this length.

*/

const checkInclusion = function (s1, s2) {
  let start = 0;
  // Count characters whose frequencies in our current window match the required frequencies from s1
  let charMatches = 0;

  //a hashmap to store the frequencies of all characters in the pattern
  const map = new Map();
  for (let c of s1) {
    map.set(c, (map.get(c) || 0) + 1);
  }
  for (let end = 0; end < s2.length; end++) {
    //if the character being added charMatches a character in the HashMap,
    //decrement its frequency
    if (map.has(s2[end])) {
      map.set(s2[end], map.get(s2[end]) - 1);
      //if frequency becomes zero => frequency of the character in pattern and window are equal
      if (map.get(s2[end]) === 0) charMatches++;
    }
    //if frequency of all characters in pattern and window are equal => permutation exists!
    if (charMatches === map.size) return true;
    // if window size is greater than the pattern length, shrink window (to the size of the pattern)
    if (end >= s1.length - 1) {
      //character going out was in the pattern, then we must have decreased its frequency before
      if (map.has(s2[start])) {
        if (map.get(s2[start]) === 0) charMatches--;
        //increment its frequency
        map.set(s2[start], map.get(s2[start]) + 1);
      }
      start++;
    }
  }
  return false;
};

checkInclusion('aabc', 'aaacb'); //true

// TC: O(n), where n is the length of s2

// SC: O(26) => O(1) since in the worst case, the whole pattern can have 26 distinct characters
// which will go into the hashmap.
