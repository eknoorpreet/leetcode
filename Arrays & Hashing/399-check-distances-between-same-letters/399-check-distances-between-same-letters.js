/*

You are given a 0-indexed string s consisting of only lowercase English letters, where each letter in s appears exactly twice. You are also given a 0-indexed integer array distance of length 26.

Each letter in the alphabet is numbered from 0 to 25 (i.e. 'a' -> 0, 'b' -> 1, 'c' -> 2, ... , 'z' -> 25).

In a well-spaced string, the number of letters between the two occurrences of the ith letter is distance[i]. If the ith letter does not appear in s, then distance[i] can be ignored.

Return true if s is a well-spaced string, otherwise return false.



Example 1:

Input: s = "abaccb", distance = [1,3,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
Output: true
Explanation:
- 'a' appears at indices 0 and 2 so it satisfies distance[0] = 1.
- 'b' appears at indices 1 and 5 so it satisfies distance[1] = 3.
- 'c' appears at indices 3 and 4 so it satisfies distance[2] = 0.
Note that distance[3] = 5, but since 'd' does not appear in s, it can be ignored.
Return true because s is a well-spaced string.
Example 2:

Input: s = "aa", distance = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
Output: false
Explanation:
- 'a' appears at indices 0 and 1 so there are zero letters between them.
Because distance[0] = 1, s is not a well-spaced string.

Constraints:

2 <= s.length <= 52
s consists only of lowercase English letters.
Each letter appears in s exactly twice.
distance.length == 26
0 <= distance[i] <= 50
*/

/**
 * @param {string} s
 * @param {number[]} distance
 * @return {boolean}
 */

/*

Calculate distance for each letter and check it in the distance array

distance aray: contains distances for all 26 letters
*/
const letterToNumberMap = {
  a: 0,
  b: 1,
  c: 2,
  d: 3,
  e: 4,
  f: 5,
  g: 6,
  h: 7,
  i: 8,
  j: 9,
  k: 10,
  l: 11,
  m: 12,
  n: 13,
  o: 14,
  p: 15,
  q: 16,
  r: 17,
  s: 18,
  t: 19,
  u: 20,
  v: 21,
  w: 22,
  x: 23,
  y: 24,
  z: 25,
};

const checkDistances0 = function (s, distance) {
  const map = new Map(); // {letter => index}
  for (let i = 0; i < s.length; i++) {
    if (!map.has(s[i])) map.set(s[i], i);
    // If this is the 2nd occurrence of the character, calculate the distance!
    else {
      const currDistance = i - map.get(s[i]) - 1;
      // If the calculated distance is not equal to the corresponding distance
      // in 'distance' array => false
      if (currDistance !== distance[letterToNumberMap[s[i]]]) return false;
    }
  }
  return true;
};

/*

Above, we had to map each letter to a number. Let's make use of an already
existing alphabet map, i.e. each alphabet is mapped to UTF-16 code unit.

'a'.charCodeAt() - 97 => 0
'b'.charCodeAt() - 97 => 1

Which is the same as the representation in the 'distance' array
('a' has distance at index 0, 'b' has distance at index 1...)

*/

const checkDistances = (s, distance) => {
  const map = new Map();
  for (let i = 0; i < s.length; i++) {
    if (!map.has(s[i])) map.set(s[i], i);
    else {
      const initial = map.get(s[i]);
      const currDistance = i - initial - 1;
      // If the calculated distance is not equal to the corresponding distance
      // in 'distance' array => false
      if (currDistance !== distance[s[i].charCodeAt() - 97]) return false;
    }
  }
  return true;
};

//TC: O(n)
//SC: O(n)
