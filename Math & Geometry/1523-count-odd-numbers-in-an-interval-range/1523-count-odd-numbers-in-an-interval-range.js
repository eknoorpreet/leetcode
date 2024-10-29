/*

Given two non-negative integers low and high. Return the count of odd numbers between low and high (inclusive).



Example 1:

Input: low = 3, high = 7
Output: 3
Explanation: The odd numbers between 3 and 7 are [3,5,7].
Example 2:

Input: low = 8, high = 10
Output: 1
Explanation: The odd numbers between 8 and 10 are [9].


Constraints:

0 <= low <= high <= 10^9

*/

/**
 * @param {number} low
 * @param {number} high
 * @return {number}
 */

// brute-force
// TC: O(n)
// SC: O(1)
const countOdds0 = function (low, high) {
  let count = 0;
  let start = low % 2 === 1 ? low : low + 1;
  let end = high;
  for (let i = start; i <= end; i += 2) {
    if (i % 2 === 1) count++;
  }
  return count;
};

/*



When the range is even length (no matter what the start and end points are), we just divide by 2:
3 - 6 => 4 nums => [3, 5] => 2 odd nums
2 - 5 => 4 nums => [3, 5] => 2 odd nums
4 - 7 => 4 nums => [5, 7] => 2 odd nums

When the range is odd length:
4 - 6 => 3 nums => [5] => 1 odd num

But if one end is odd
3 - 7 => 5 nums => [3, 5, 7] => 3 odd nums
3 - 5 => 3 nums => [3, 5] => 2 odd num

If one is odd and it's odd length, add 1.
Only need to check for one end, becuase if that's odd and the length is odd, the second end will also be odd. Same with even

*/

const countOdds = function (low, high) {
  const range = high - low + 1;
  let count = Math.floor(range / 2);
  if (range % 2 === 1 && low % 2 === 1) count++;
  return count;
};

//TC: O(1)
//SC: O(1)
