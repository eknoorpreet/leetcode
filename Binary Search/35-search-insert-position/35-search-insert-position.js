/*

Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.

You must write an algorithm with O(log n) runtime complexity.



Example 1:

Input: nums = [1,3,5,6], target = 5
Output: 2
Example 2:

Input: nums = [1,3,5,6], target = 2
Output: 1
Example 3:

Input: nums = [1,3,5,6], target = 7
Output: 4


Constraints:

1 <= nums.length <= 10^4
-10^4 <= nums[i] <= 10^4
nums contains distinct values sorted in ascending order.
-10^4 <= target <= 10^4

*/

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */

const searchInsert0 = function (nums, target) {
  let start = 0;
  let end = nums.length - 1;
  while (start <= end) {
    let mid = start + Math.floor((end - start) / 2);
    if (target === nums[mid]) {
      return mid;
    } else if (target < nums[mid]) {
      end = mid - 1;
    } else if (target > nums[mid]) {
      start = mid + 1;
    }
  }
  return start;
};

/*

If target is found => return target
If target is not found => return index before the target
Let's try to fins the left border of the target. This way, if target exists, we return the target index (first condition satisfied). If it doesn't, we return where it would have been (second condition satisfied)
*/

//[left, right] (make sure both sides are closed at all steps)
const searchInsert = function (nums, target) {
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (nums[mid] === target) right = mid - 1;
    else if (nums[mid] < target) left = mid + 1;
    else if (nums[mid] > target) right = mid - 1;
  }
  return left;
};

//TC: O(log n)
//SC: O(1)
