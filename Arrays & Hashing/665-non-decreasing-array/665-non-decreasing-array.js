/*

Given an array nums with n integers, your task is to check if it could become non-decreasing by modifying at most one element.

We define an array is non-decreasing if nums[i] <= nums[i + 1] holds for every i (0-based) such that (0 <= i <= n - 2).

Example 1:

Input: nums = [4,2,3]
Output: true
Explanation: You could modify the first 4 to 1 to get a non-decreasing array.
Example 2:

Input: nums = [4,2,1]
Output: false
Explanation: You cannot get a non-decreasing array by modifying at most one element.


Constraints:

n == nums.length
1 <= n <= 10^4
-10^5 <= nums[i] <= 10^5

*/

/**
 * @param {number[]} nums
 * @return {boolean}
 */

const checkPossibility = function (nums) {
  let changed = false;
  for (let i = 0; i < nums.length - 1; i++) {
    //if it's ascending
    if (nums[i] <= nums[i + 1]) {
      //do nothing
      continue;
    }
    //array is unsorted but we already used our chance
    if (changed) {
      return false;
    } else {
      //[1, 4, 2]
      //we want to prioritize changing 4 to 2. Why? Because that's how we increase our
      //chances of getting a non-decreasing array. If we change 2 to 4, we don't know what
      //lies ahead; we made an element greater but future elements could be smaller =>
      //decreasing our chances.

      //Ex: if we do: [1, 4, 4] and next el is 3: [1, 4, 4, 3] => deadend!
      // but if we do: [1, 2, 2] and next el is 3: [1, 2, 2, 3] => success!

      //Therefore, we try to decrease the left element and increase
      //the right one only if the former strategy doesn't work

      //condition: nums[i+1] >= nums[i-1]
      //if arr is [3, 4, 2], changing 4 to 2 will make [2, 2] non-decreasing but not [3, 2, 2].
      //The problem? 3 > 2. Therefore, do this only if nums[i+1] >= nums[i-1]
      //i.e. when only only nums[i] is not in order!.
      //This way, nums[i] will be equal to nums[i + 1] and also >= nums[i - 1]
      //if it's the first element, no left neighbor so just update curr to its right
      if (i === 0 || nums[i + 1] >= nums[i - 1]) {
        nums[i] = nums[i + 1];
      } else {
        nums[i + 1] = nums[i];
      }
      changed = true;
    }
  }
  return true;
};

//TC: O(n)
//SC: O(1)
