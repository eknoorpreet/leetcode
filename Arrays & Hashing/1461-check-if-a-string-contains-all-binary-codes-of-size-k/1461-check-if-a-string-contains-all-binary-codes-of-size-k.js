/*

Given a binary string s and an integer k, return true if every binary code of length k is a substring of s. Otherwise, return false.



Example 1:

Input: s = "00110110", k = 2
Output: true
Explanation: The binary codes of length 2 are "00", "01", "10" and "11". They can be all found as substrings at indices 0, 1, 3 and 2 respectively.
Example 2:

Input: s = "0110", k = 1
Output: true
Explanation: The binary codes of length 1 are "0" and "1", it is clear that both exist as a substring.
Example 3:

Input: s = "0110", k = 2
Output: false
Explanation: The binary code "00" is of length 2 and does not exist in the array.


Constraints:

1 <= s.length <= 5 * 10^5
s[i] is either '0' or '1'.
1 <= k <= 20

*/

/**
 * @param {string} s
 * @param {number} k
 * @return {boolean}
 */

//Brute force: Generate all possible codes of size k; go through the string and check if all codes
// exist
/*
Time Complexity: O(2^k), where k is the length of binary codes to be generated. This is because, in the worst case, it generates all possible binary codes of length k.
Space Complexity: O(2^k), as it creates an array result to store all possible binary codes.
*/
function generateBinaryCodes(k) {
  const result = [];

  function backtrack(code) {
    if (code.length === k) {
      result.push(code);
      return;
    }

    backtrack(code + '0');
    backtrack(code + '1');
  }

  backtrack('');
  return result;
}

//TC: O(2^k * n)
const hasAllCodes0 = function (s, k) {
  const codes = generateBinaryCodes(k);
  for (const code of codes) {
    if (!s.includes(code)) return false;
  }
  return true;
};

/*

Get every single substring of size k and check how many unique substrings of size k are there. What if we find only 1? We want exact 2^k.

The intuition behind this solution is that if all possible binary codes of length k are present in the string s, then the size of the Set containing these codes should be equal to 2^k, as there are 2^k possible binary codes of length k.

*/
const hasAllCodes = function (s, k) {
  const set = new Set();
  for (let i = 0; i < s.length - k + 1; i++) {
    const code = s.slice(i, i + k);
    set.add(code);
  }
  return set.size === Math.pow(2, k);
};

/*

Time complexity:
The overall time complexity is O((n - k + 1) * k) => O(n * k),
where n is the length of the string s and k is the length of the binary codes.
This is because we need to iterate through the entire string s and extract a
substring of length k for each iteration.

Space Complexity:
The code uses a set set to store unique binary codes found in the string s.
In the worst case, when all possible unique binary codes of length k are found,
the space complexity is O(2^k), as there can be 2^k unique codes.

*/
