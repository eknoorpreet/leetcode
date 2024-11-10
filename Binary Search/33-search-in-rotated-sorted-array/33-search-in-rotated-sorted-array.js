/*

There is an integer array nums sorted in ascending order (with distinct values).

Prior to being passed to your function, nums is possibly rotated at an unknown pivot index k (1 <= k < nums.length) such that the resulting array is [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]] (0-indexed). For example, [0,1,2,4,5,6,7] might be rotated at pivot index 3 and become [4,5,6,7,0,1,2].

Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.

You must write an algorithm with O(log n) runtime complexity.



Example 1:

Input: nums = [4,5,6,7,0,1,2], target = 0
Output: 4
Example 2:

Input: nums = [4,5,6,7,0,1,2], target = 3
Output: -1
Example 3:

Input: nums = [1], target = 0
Output: -1


Constraints:

1 <= nums.length <= 5000
-10^4 <= nums[i] <= 10^4
All values of nums are unique.
nums is an ascending array that is possibly rotated.
-10^4 <= target <= 10^4

*/

/*

The solution preserves the O(log n) time complexity of binary search while handling the rotation by:

Identifying which portion we're in
Using the sorted property of that portion to make a binary decision
Maintaining the elimination of half the search space at each step

*/

const search = function (nums, target) {
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    let mid = left + Math.floor((right - left) / 2);
    if (target === nums[mid]) {
      return mid;
    }
    // We're in the left portion
    // Elements are in increasing order
    // If target is greater than the middle element or it's less than left => search right
    else if (nums[left] <= nums[mid]) {
      if (target > nums[mid] || target < nums[left]) {
        // Search right
        left = mid + 1;
      } else {
        // If target is lesser than the middle element or it's greater than left => search left
        right = mid - 1;
      }
    } else {
      // We're in the right portion
      // Elements are in increasing order
      // If target is lesser than the middle element or it's greater than right => search left
      if (target < nums[mid] || target > nums[right]) {
        right = mid - 1;
      } else {
        // If target is greater than the middle element or it's lesser than right => search right
        left = mid + 1;
      }
    }
  }
  return -1;
};

// TC: O(log n)
// SC: O(1)
