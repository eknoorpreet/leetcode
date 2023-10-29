//https://leetcode.com/problems/move-zeroes/description/

/*Given an integer array nums, move all 0's to the end of it while maintaining the relative order of the non-zero elements.

Note that you must do this in-place without making a copy of the array.



Example 1:

Input: nums = [0,1,0,3,12]
Output: [1,3,12,0,0]
Example 2:

Input: nums = [0]
Output: [0]


Constraints:

1 <= nums.length <= 104
-231 <= nums[i] <= 231 - 1

*/

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */

const moveZeroes0 = function (nums) {
  let k = 0;
  let snowBallSize = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === 0) {
      snowBallSize++;
    } else if (snowBallSize > 0) {
      //if we have 0s
      const t = nums[i];
      //replace curr el with 0
      nums[i] = 0;
      //place curr el to the left/start of the snowball
      nums[i - snowBallSize] = t;
    }
  }
  return nums;
};

//TC: O(n)
//SC: O(1)
const moveZeroes1 = function (nums) {
  let k = 0; //index at which curr element should be placed
  for (let i = 0; i < nums.length; i++) {
    //if curr el is not a 0
    if (nums[i] !== 0) {
      //place it
      nums[k] = nums[i];
      //increment k
      k++;
    }
  }

  //modified arr = [1, 3, 12, (k) 3, 12] bcoz 0's are replaced by latter
  //elements (non 0's) But 0's need to come after these => the latter elements
  //also need to be replaced by 0s
  //here, k = 3 since the next element would have been placed at 3rd index
  for (let i = k; i < nums.length; i++) {
    nums[i] = 0;
  }
  return nums;
};
