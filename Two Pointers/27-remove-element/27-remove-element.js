//https://leetcode.com/problems/remove-element/description/

/*Given an integer array nums and an integer val, remove all occurrences of val in nums in-place.
The relative order of the elements may be changed.

Since it is impossible to change the length of the array in some languages,
you must instead have the result be placed in the first part of the array nums.
More formally, if there are k elements after removing the duplicates, then the first k elements
of nums should hold the final result. It does not matter what you leave beyond the first
k elements.

Return k after placing the final result in the first k slots of nums.

Do not allocate extra space for another array. You must do this by modifying the input array
in-place with O(1) extra memory.

*/

/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */

//TC: O(n)
//SC: O(1)
const removeElement = function (nums, val) {
  let k = 0; //k represents the index of the curr element (that's not val)
  for (let i = 0; i < nums.length; i++) {
    //if curr element is not val
    if (nums[i] !== val) {
      //place it
      nums[k] = nums[i];
      //move the curr element index
      k++;
    }
  }
  //at the end, k will equal to the count of number of "placed" elements
  //i.e. not equal to val
  return k;
};
