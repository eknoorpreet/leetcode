/*

An array is monotonic if it is either monotone increasing or monotone decreasing.

An array nums is monotone increasing if for all i <= j, nums[i] <= nums[j]. An array nums is monotone decreasing if for all i <= j, nums[i] >= nums[j].

Given an integer array nums, return true if the given array is monotonic, or false otherwise.



Example 1:

Input: nums = [1,2,2,3]
Output: true
Example 2:

Input: nums = [6,5,4,4]
Output: true
Example 3:

Input: nums = [1,3,2]
Output: false


Constraints:

1 <= nums.length <= 10^5
-10^5 <= nums[i] <= 10^5

*/

/**
 * @param {number[]} nums
 * @return {boolean}
 */

const isMonotonic0 = function (nums) {
  const isMonotonicDecreasing = (nums) => {
    for (let i = 1; i < nums.length; i++) {
      if (nums[i] > nums[i - 1]) return false;
    }
    return true;
  };

  const isMonotonicIncreasing = (nums) => {
    for (let i = 1; i < nums.length; i++) {
      if (nums[i] < nums[i - 1]) return false;
    }
    return true;
  };
  return isMonotonicDecreasing(nums) || isMonotonicIncreasing(nums);
};
// TC: O(n)
// SC: O(1)

// One pass
const isMonotonic = function (nums) {
  let increasing = true;
  let decreasing = true;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > nums[i - 1]) {
      decreasing = false;
    }
    if (nums[i] < nums[i - 1]) {
      increasing = false;
    }
  }
  return increasing || decreasing;
};

// TC: O(n)
// SC: O(1)
