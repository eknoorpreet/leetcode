/*

Given a binary array nums, return the maximum length of a contiguous subarray with an equal number of 0 and 1.



Example 1:

Input: nums = [0,1]
Output: 2
Explanation: [0, 1] is the longest contiguous subarray with an equal number of 0 and 1.
Example 2:

Input: nums = [0,1,0]
Output: 2
Explanation: [0, 1] (or [1, 0]) is a longest contiguous subarray with equal number of 0 and 1.


Constraints:

1 <= nums.length <= 10^5
nums[i] is either 0 or 1.

*/

/**
 * @param {number[]} nums
 * @return {number}
 */

/*

Key Insight:

Use a hashmap to track sum and the index
    1 detected? Add 1
    Otherwise, 0 detected? Subtract 1
A subarray with equal 0s and 1s will have a sum of 0
Track running sum (count) and store earliest index for each sum

*/

const findMaxLength = function (nums) {
  // Store {count => index}
  // Initialize with count 0 at index -1
  // Because, initially, the sum is 0
  const map = new Map([[0, -1]]);
  let count = 0; // Running count
  let maxLength = 0; // Track max length found

  for (let i = 0; i < nums.length; i++) {
    // 1 detected? Add 1
    // Otherwise, 0 detected? Subtract 1
    count += nums[i] === 1 ? 1 : -1;
    // If curr sum (count) already exists => sum between those indices is 0
    // => 0s and 1s are at the same count here
    // Calculate the length of the subarray
    if (map.has(count)) {
      maxLength = Math.max(maxLength, i - map.get(count));
    } else {
      // Track running sum (count) and store earliest index (to get maximum length) for each sum
      map.set(count, i);
    }
  }
  return maxLength;
};

/*

Time Complexity: O(n) - single pass through array
Space Complexity: O(n) - storing counts in map

*/
