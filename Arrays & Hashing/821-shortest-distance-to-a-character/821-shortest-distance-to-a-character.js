/*

Given a string s and a character c that occurs in s, return an array of integers answer where answer.length == s.length and answer[i] is the distance from index i to the closest occurrence of character c in s.

The distance between two indices i and j is abs(i - j), where abs is the absolute value function.



Example 1:

Input: s = "loveleetcode", c = "e"
Output: [3,2,1,0,1,0,0,1,2,2,1,0]
Explanation: The character 'e' appears at indices 3, 5, 6, and 11 (0-indexed).
The closest occurrence of 'e' for index 0 is at index 3, so the distance is abs(0 - 3) = 3.
The closest occurrence of 'e' for index 1 is at index 3, so the distance is abs(1 - 3) = 2.
For index 4, there is a tie between the 'e' at index 3 and the 'e' at index 5, but the distance is still the same: abs(4 - 3) == abs(4 - 5) = 1.
The closest occurrence of 'e' for index 8 is at index 6, so the distance is abs(8 - 6) = 2.
Example 2:

Input: s = "aaab", c = "b"
Output: [3,2,1,0]


Constraints:

1 <= s.length <= 10^4
s[i] and c are lowercase English letters.
It is guaranteed that c occurs at least once in s.

*/

/**
 * @param {string} s
 * @param {character} c
 * @return {number[]}
 */

/*

Have a map to store first occurrence. Second occurrence spotted => calculate distance
and store in the 'answer' array

*/

const shortestToChar0 = function (s, c) {
  const answer = Array(s.length).fill(Infinity);
  const map = new Map();
  const set = new Set();
  for (let i = 0; i < s.length; i++) {
    if (s[i] === c) set.add(i);
  }
  for (let i = 0; i < s.length; i++) {
    for (const index of Array.from(set)) {
      answer[i] = Math.min(Math.abs(i - index), answer[i]);
    }
  }
  return answer;
};

//TC: O(n)
//SC: O(n)

const shortestToChar = function (s, c) {
  const n = s.length;
  // track latest position of c
  let pos = -Infinity;
  const answer = new Array(n);
  for (let i = 0; i < n; ++i) {
    // If curr char is c => update pos
    if (s[i] === c) pos = i;
    // Calculate distance
    // For characters equal to c, distance will be 0
    // For others, it will be a big incorrect value before we encounter c
    // And mix of correct and incorrect (since there might be a
    // closer c on the right side) values
    // after we encounter c
    answer[i] = i - pos;
  }

  // Here, pos has the last position of c
  // Scan right to left
  for (let i = pos - 1; i >= 0; --i) {
    if (s[i] === c) pos = i;
    // We earlier calculated distances based on left occurences of c
    // If there's a closer c on the right side, calculate distances based on that
    answer[i] = Math.min(answer[i], pos - i);
  }
  return answer;
};

//TC: O(n)
//SC: O(1)
