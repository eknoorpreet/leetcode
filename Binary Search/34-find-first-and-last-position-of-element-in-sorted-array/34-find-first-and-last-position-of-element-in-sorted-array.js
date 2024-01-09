/*

Given an array of integers nums sorted in non-decreasing order, find the starting and ending position of a given target value.

If target is not found in the array, return [-1, -1].

You must write an algorithm with O(log n) runtime complexity.



Example 1:

Input: nums = [5,7,7,8,8,10], target = 8
Output: [3,4]
Example 2:

Input: nums = [5,7,7,8,8,10], target = 6
Output: [-1,-1]
Example 3:

Input: nums = [], target = 0
Output: [-1,-1]


Constraints:

0 <= nums.length <= 10^5
-10^9 <= nums[i] <= 10^9
nums is a non-decreasing array.
-10^9 <= target <= 10^9

*/

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */

// Return indices of the el
const search = (nums, target, findLeftIndex) => {
  let index = -1;
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    let mid = left + Math.floor((right - left) / 2);
    // If target < mid element, it lies in left portion
    if (target < nums[mid]) {
      right = mid - 1;
    } else if (target > nums[mid]) {
      // otherwise, it lies in right portion
      left = mid + 1;
    } else {
      // Found the target
      index = mid;
      // If we're looking for the left index, look in the left portion
      if (findLeftIndex) {
        right = mid - 1;
      } else {
        // otherwise, look in the right portion
        left = mid + 1;
      }
    }
  }
  return index;
};

const searchRange = function (nums, target) {
  // Run Binary Seach to find the left index
  let leftPosition = search(nums, target, true);
  // Run Binary Seach to find the right index
  let rightPosition = search(nums, target, false);
  return [leftPosition, rightPosition];
};

//TC: O(log n)
//SC: O(1)
