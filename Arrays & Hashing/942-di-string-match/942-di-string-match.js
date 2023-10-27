/*

A permutation perm of n + 1 integers of all the integers in the range [0, n] can be represented as a string s of length n where:

s[i] == 'I' if perm[i] < perm[i + 1], and
s[i] == 'D' if perm[i] > perm[i + 1].
Given a string s, reconstruct the permutation perm and return it. If there are multiple valid permutations perm, return any of them.

Example 1:

Input: s = "IDID"
Output: [0,4,1,3,2]
Example 2:

Input: s = "III"
Output: [0,1,2,3]
Example 3:

Input: s = "DDI"
Output: [3,2,0,1]


Constraints:

1 <= s.length <= 10^5
s[i] is either 'I' or 'D'.

*/
/**
 * @param {string} s
 * @return {number[]}
 */

//if curr index in string = "I", curr index in perm holds lesser el than next
//if curr index in string = "D", curr index in perm holds greater el than next

const diStringMatch = (s) => {
  const n = s.length;
  const perm = Array(n + 1);
  let left = 0;
  let right = n;
  for (let i = 0; i < n; i++) {
    // If curr char is 'I', perm[i] should holds lesser el than next
    // Hence, set perm[i] to left (and increment it, since 'left' has been used)
    if (s[i] === 'I') {
      perm[i] = left;
      left++;
    } else {
      // else, perm[i] should holds greater el than next
      // Hence, set it to right (and decrement it, since 'right' has been used)
      perm[i] = right;
      right--;
    }
  }
  perm[n] = right;
  return perm;
};

//Concise
const diStringMatch0 = (s) => {
  const n = s.length;
  let left = 0;
  let right = n;
  const perm = new Array(n + 1);
  for (let i = 0; i < n; i++) {
    perm[i] = s[i] === 'I' ? left++ : right--;
  }
  perm[n] = left;
  return perm;
};

//TC: O(n)
//SC: O(1)
