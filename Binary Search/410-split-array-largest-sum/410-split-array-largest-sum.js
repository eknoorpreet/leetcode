/*

Given an integer array nums and an integer k, split nums into k non-empty subarrays such that the largest sum of any subarray is minimized.

Return the minimized largest sum of the split.

A subarray is a contiguous part of the array.



Example 1:

Input: nums = [7,2,5,10,8], k = 2
Output: 18
Explanation: There are four ways to split nums into two subarrays.
The best way is to split it into [7,2,5] and [10,8], where the largest sum among the two subarrays is only 18.
Example 2:

Input: nums = [1,2,3,4,5], k = 2
Output: 9
Explanation: There are four ways to split nums into two subarrays.
The best way is to split it into [1,2,3] and [4,5], where the largest sum among the two subarrays is only 9.


Constraints:

1 <= nums.length <= 1000
0 <= nums[i] <= 10^6
1 <= k <= min(50, nums.length)


*/

/**
 * @param {number[]} nums
 * @param {number} m
 * @return {number}
 */

const isJobPossible = (arr, mid, m) => {
  let sum = 0;
  let subarrayCount = 1;
  for (const num of arr) {
    sum += num;
    // Is our sum greater than the proposed answer
    if (sum > mid) {
      sum = num;
      // Reset the sum => move the current el to next subarray
      subarrayCount++;
    }
  }
  return subarrayCount <= m;
};

const splitArray = function (nums, m) {
  let low = 0;
  let high = 0;
  let result = 0;
  for (const num of nums) {
    low = Math.max(low, num);
    high += num;
  }
  while (low <= high) {
    const mid = low + Math.floor((high - low) / 2);
    if (isJobPossible(nums, mid, m)) {
      result = mid;
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }
  return result;
};

/*

The time complexity of the given code is O(N * log(S)), where N is the length of the array,
and S is the sum of all elements in the array.

The space complexity is O(1).

*/
