/*

Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.

You must write an algorithm with O(log n) runtime complexity.



Example 1:

Input: nums = [-1,0,3,5,9,12], target = 9
Output: 4
Explanation: 9 exists in nums and its index is 4
Example 2:

Input: nums = [-1,0,3,5,9,12], target = 2
Output: -1
Explanation: 2 does not exist in nums so return -1


Constraints:

1 <= nums.length <= 10^4
-10^4 < nums[i], target < 10^4

All the integers in nums are unique.
nums is sorted in ascending order.

*/

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */

// const search = function(nums, target) {
//     let left = 0; //potential answer
//     let right = nums.length //can never be a potentail answer
//     //Hence, at every step, search interval = [left, right)
//     while(left < right) {
//         let mid = left + Math.floor((right - left) / 2)
//         if(target === nums[mid]) {
//             return mid
//         } else if(nums[mid] < target ) {
//             //we know that if we're here mid is not a potential answer
//             //so start the next search interval from [mid + 1, right)
//             left = mid + 1
//         } else if(nums[mid] > target) {
//             //we know that if we're here mid is not a potential answer but it's left open, right closed
//             //so start the next search interval from [left, mid)
//             right = mid
//         } else {
//             return mid
//         }
//     }
//     //while loop terminates when left === right. So, you can either left or right here
//     // return nums[right] === target ? right : -1
//     return nums[left] === target ? left : -1
// };

//My preferred method:
//[left, right], left <= right (make sure it's closed intervals at all steps)
const search = function (nums, target) {
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (nums[mid] === target) return mid;
    else if (nums[mid] < target) left = mid + 1;
    else if (nums[mid] > target) right = mid - 1;
  }
  // At this point, the search space is empty!
  return -1;
};

//[left, right], left < right
const search2 = function (nums, target) {
  let left = 0;
  let right = nums.length - 1;
  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);
    if (nums[mid] === target) return mid;
    else if (nums[mid] < target) left = mid + 1;
    else if (nums[mid] > target) right = mid - 1;
  }
  // At this point, the search space is NOT empty!
  // [left, left] or [right, right] is left => check!
  return nums[left] === target ? left : -1;
};

//My 2nd preferred method:
//[left, right), left < right (make sure left closed, right open at all steps)
const search3 = function (nums, target) {
  let left = 0;
  let right = nums.length;
  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);
    if (nums[mid] === target) return mid;
    else if (nums[mid] < target) left = mid + 1;
    else if (nums[mid] > target) right = mid;
  }
  // At this point, the search space is NOT empty!
  // [left, left] or [right, right] is left => check!
  return nums[left] === target ? left : -1;
};

//[left, right), left < right
const search4 = function (nums, target) {
  let left = 0;
  let right = nums.length;
  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);
    if (nums[mid] === target) return mid;
    else if (nums[mid] < target) left = mid + 1;
    else if (nums[mid] > target) right = mid - 1;
  }
  return nums[left] === target ? left : -1;
};

//TC: O(log n)
//SC: O(1)
