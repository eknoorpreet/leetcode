//https://leetcode.com/problems/move-zeroes/description/

/*Given an integer array nums, move all 0's to the end of it while maintaining the relative order of the non-zero elements.

Note that you must do this in-place without making a copy of the array. */

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */

//TC: O(n)
//SC: O(1)
const moveZeroes = function (nums) {
  let k = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      nums[k] = nums[i];
      k++;
    }
  }

  //modified arr = [1, 3, 12 (k), 3, 12] bcoz 0's are replaced by latter elements (non 0's) But 0's need to
  //come after these => the latter elements also need to be replaced by 0s

  for (let i = k; i < nums.length; i++) {
    nums[i] = 0;
  }
  return nums;
};
