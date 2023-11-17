/*

Given an array of positive integers nums and a positive integer target, return the minimal
length of a subarray whose sum is greater than or equal to target. If there is no such subarray,
return 0 instead.

Example 1:

Input: target = 7, nums = [2,3,1,2,4,3]
Output: 2
Explanation: The subarray [4,3] has the minimal length under the problem constraint.
Example 2:

Input: target = 4, nums = [1,4,4]
Output: 1
Example 3:

Input: target = 11, nums = [1,1,1,1,1,1,1,1]
Output: 0


Constraints:

1 <= target <= 10^9
1 <= nums.length <= 10^5
1 <= nums[i] <= 10^4

*/

// https://leetcode.com/problems/minimum-size-subarray-sum
/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */

/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
const minSubArrayLen = function (target, nums) {
  let minLength = Number.POSITIVE_INFINITY;
  let windowStart = 0;
  let windowSum = 0;
  for (let windowEnd = 0; windowEnd < nums.length; windowEnd++) {
    windowSum += nums[windowEnd];
    //windowSum >= target => subarray reached
    //shrink the window until sum < target (as adding more won't give us the smallest subarray)
    while (windowSum >= target) {
      minLength = Math.min(minLength, windowEnd - windowStart + 1);
      windowSum -= nums[windowStart];
      windowStart++;
    }
  }
  if (minLength === Number.POSITIVE_INFINITY) minLength = 0;
  return minLength === Number.POSITIVE_INFINITY ? 0 : minLength;
};

minSubArrayLen(7, [2, 3, 1, 2, 4, 3]);

/*

TC: O(n): The for loop runs for n elements while the inner while loop runs only when sum >= target
and slides the window accordingly (running through each element once) => O(n + n) => O(n)

SC: O(1)

*/
