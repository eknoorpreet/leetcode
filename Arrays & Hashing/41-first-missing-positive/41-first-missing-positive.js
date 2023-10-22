/*

Given an unsorted integer array nums, return the smallest missing positive integer.

You must implement an algorithm that runs in O(n) time and uses O(1) auxiliary space.



Example 1:

Input: nums = [1,2,0]
Output: 3
Explanation: The numbers in the range [1,2] are all in the array.
Example 2:

Input: nums = [3,4,-1,1]
Output: 2
Explanation: 1 is in the array but 2 is missing.
Example 3:

Input: nums = [7,8,9,11,12]
Output: 1
Explanation: The smallest positive integer 1 is missing.


Constraints:

1 <= nums.length <= 10^5
-2^31 <= nums[i] <= 2^31 - 1

*/

/**
 * @param {number[]} nums
 * @return {number}
 */

/*

First missing positive => starting from 1 => [1, n] (ordered) => cyclic sort!

*/

const firstMissingPositive = function (nums) {
  for (let i = 0; i < nums.length; ) {
    let el = nums[i];
    let corrInd = el - 1;
    //If the current element is positive and within the valid range, but not in its correct
    //position), place it in its correct position (swap el with the element at its correct
    //index corrInd).
    if (el > 0 && el <= nums.length && el !== nums[corrInd]) {
      [nums[i], nums[corrInd]] = [nums[corrInd], nums[i]];
      console.log(nums);
    } else {
      i++;
    }
  }
  //go through the resultant array in which (positive) elements are in in their correct positions
  for (let i = 0; i < nums.length; i++) {
    //find the first element that is not in its correct position
    //(where index i doesn't holdi + 1)
    if (nums[i] !== i + 1) {
      return i + 1;
    }
  }

  // for(let i = 1; i < nums.length + 1; i++) {
  //     if(nums[i - 1] !== i) return i
  // }

  //If you don't find any element that is out of position during the second loop, it means that
  //all positive integers from 1 to the length of the array are present in the array. In this
  //case, return nums.length + 1 as the smallest missing positive integer.
  return nums.length + 1;
};

//TC: O(n)
//SC: O(1)
