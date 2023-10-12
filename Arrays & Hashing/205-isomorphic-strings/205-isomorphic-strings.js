/*

Given two strings s and t, determine if they are isomorphic.

Two strings s and t are isomorphic if the characters in s can be replaced to get t.

All occurrences of a character must be replaced with another character while preserving the order of characters. No two characters may map to the same character, but a character may map to itself.



Example 1:

Input: s = "egg", t = "add"
Output: true
Example 2:

Input: s = "foo", t = "bar"
Output: false
Example 3:

Input: s = "paper", t = "title"
Output: true


Constraints:

1 <= s.length <= 5 * 104
t.length == s.length
s and t consist of any valid ascii character.


*/

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */

//When we map s to t, if g => d and g => e ===> false. If g => d and i => d ===> false.
//Therefore, check if curr char in s is aready mapping to a diff char in t => false. Check if curr char in t is aready mapping to a diff char in s => false (both need to be isomorphic!)
const isIsomorphic = function (s, t) {
  //both strings are the same length acc to the problem
  const mapStoT = new Map();
  const mapTtoS = new Map();
  for (let i = 0; i < s.length; i++) {
    if (
      (mapStoT.has(s[i]) && mapStoT.get(s[i]) !== t[i]) ||
      (mapTtoS.has(t[i]) && mapTtoS.get(t[i]) !== s[i])
    )
      return false;
    mapStoT.set(s[i], t[i]);
    mapTtoS.set(t[i], s[i]);
  }
  return true;
};

//TC: O(2n) => O(n), where n is th length of both strings
//SC: O(n)
