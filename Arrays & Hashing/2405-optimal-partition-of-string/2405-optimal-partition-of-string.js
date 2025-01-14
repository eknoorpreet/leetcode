/*

Given a string s, partition the string into one or more substrings such that the characters in each substring are unique. That is, no letter appears in a single substring more than once.

Return the minimum number of substrings in such a partition.

Note that each character should belong to exactly one substring in a partition.



Example 1:

Input: s = "abacaba"
Output: 4
Explanation:
Two possible partitions are ("a","ba","cab","a") and ("ab","a","ca","ba").
It can be shown that 4 is the minimum number of substrings needed.
Example 2:

Input: s = "ssssss"
Output: 6
Explanation:
The only valid partition is ("s","s","s","s","s","s").


*/

/**
 * @param {string} s
 * @return {number}
 */

const partitionString0 = function (s) {
  let count = 1;
  let partitionStart = 0;
  const map = new Map();

  for (let i = 0; i < s.length; i++) {
    // If character exists and its last occurrence is within current partition
    if (map.has(s[i]) && map.get(s[i]) >= partitionStart) {
      count++;
      partitionStart = i;
      // No need to clear map, just update position
    }
    map.set(s[i], i);
  }
  return count;
};

/*

Better:

Use Set instead of Map (we only need to track existence)
Clear the Set when starting new partition
Check for duplicates before adding
Increment count and starts new partition immediately on finding duplicate

*/

const partitionString = function (s) {
  let result = 1;
  const seen = new Set();

  for (let char of s) {
    if (seen.has(char)) {
      result++;
      // Empty set for the curr substring
      seen.clear();
    }
    seen.add(char);
  }

  return result;
};

/*

Time complexity: O(n)
Space complexity: O(n)

*/
