/*

You are given a 0-indexed integer array nums, where nums[i] represents the score of the ith student. You are also given an integer k.

Pick the scores of any k students from the array so that the difference between the highest and the lowest of the k scores is minimized.

Return the minimum possible difference.



Example 1:

Input: nums = [90], k = 1
Output: 0
Explanation: There is one way to pick score(s) of one student:
- [90]. The difference between the highest and lowest score is 90 - 90 = 0.
The minimum possible difference is 0.
Example 2:

Input: nums = [9,4,1,7], k = 2
Output: 2
Explanation: There are six ways to pick score(s) of two students:
- [9,4,1,7]. The difference between the highest and lowest score is 9 - 4 = 5.
- [9,4,1,7]. The difference between the highest and lowest score is 9 - 1 = 8.
- [9,4,1,7]. The difference between the highest and lowest score is 9 - 7 = 2.
- [9,4,1,7]. The difference between the highest and lowest score is 4 - 1 = 3.
- [9,4,1,7]. The difference between the highest and lowest score is 7 - 4 = 3.
- [9,4,1,7]. The difference between the highest and lowest score is 7 - 1 = 6.
The minimum possible difference is 2.


Constraints:

1 <= k <= nums.length <= 1000
0 <= nums[i] <= 10^5

*/

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */

const minimumDifference = function (nums, k) {
  nums.sort((a, b) => a - b);
  let minDiff = Number.POSITIVE_INFINITY;
  let start = 0;
  for (let end = 0; end < nums.length; end++) {
    if (end >= k - 1) {
      const currKDiff = nums[end] - nums[start];
      minDiff = Math.min(minDiff, currKDiff);
      start++;
    }
  }
  return minDiff;
};

//Another way: start when you've reached the first window (k elements)
const minimumDifference0 = function (nums, k) {
  nums.sort((a, b) => a - b);
  let minDiff = Number.POSITIVE_INFINITY;
  let start = 0;
  for (let end = k - 1; end < nums.length; end++) {
    minDiff = Math.min(minDiff, nums[end] - nums[start]);
    start++;
  }
  return minDiff;
};

//TC: O(nlogn + n) => O(nlogn)
//SC: O(1)
