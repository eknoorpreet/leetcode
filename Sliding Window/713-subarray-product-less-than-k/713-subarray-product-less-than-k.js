/*

Given an array of integers nums and an integer k, return the number of contiguous subarrays where the product of all the elements in the subarray is strictly less than k.



Example 1:

Input: nums = [10,5,2,6], k = 100
Output: 8
Explanation: The 8 subarrays that have product less than 100 are:
[10], [5], [2], [6], [10, 5], [5, 2], [2, 6], [5, 2, 6]
Note that [10, 5, 2] is not included as the product of 100 is not strictly less than k.
Example 2:

Input: nums = [1,2,3], k = 0
Output: 0


Constraints:

1 <= nums.length <= 3 * 10^4
1 <= nums[i] <= 1000
0 <= k <= 10^6

*/

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const numSubarrayProductLessThanK = function (nums, k) {
  let windowStart = 0;
  let windowProduct = 1;
  let count = 0;
  if (k === 0 || k === 1) return 0;
  for (let windowEnd = 0; windowEnd < nums.length; windowEnd++) {
    windowProduct *= nums[windowEnd];
    // window product > k, divide by beginning element until it becomes less than k
    while (windowProduct >= k) {
      windowProduct /= nums[windowStart];
      windowStart++;
    }
    // Here, window product is strictly less than k
    // Because, all subarrays ending at windowEnd and starting at windowStart contribute to the count!
    count += windowEnd - windowStart + 1;
  }
  return count;
};

//TC: O(n)
//SC: O(1)
