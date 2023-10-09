/*Given an integer array nums, return true if any value appears at least twice in the array,
and return false if every element is distinct.

Example 1:

Input: nums = [1,2,3,1]
Output: true
Example 2:

Input: nums = [1,2,3,4]
Output: false
Example 3:

Input: nums = [1,1,1,3,3,4,3,2,4,2]
Output: true

*/

/**
 * @param {number[]} nums
 * @return {boolean}
 */

//TC: O(n^2)
//SC: O(1)
// const containsDuplicate = function (nums) {
//   for (let i = 0; i < nums.length - 1; i++) {
//     for (let j = i + 1; j < nums.length; j++) {
//       if (nums[i] === nums[j]) return true;
//     }
//   }
//   //loop ended => we never encountered a duplicate
//   return false;
// };

//TC: O(nlogn)
//SC: O(1)
//  const containsDuplicate = function(nums) {
//      //sort the array so the duplicates are next to each other
//     nums.sort((a, b) => a - b)

//     //go through all elements of array
//     for(let i = 1; i < nums.length; i++) {
//         //are the 2 adjacent elements duplicates?
//         if(nums[i - 1] === nums[i]) return true
//     }
//     //loop ended => we never encountered a duplicate
//     return false
// };

//TC: O(n)
//SC: O(n)
const containsDuplicate = function (nums) {
  //go through all elements of array and add in set
  const set = new Set();
  for (let num of nums) {
    //if element already in set => duplicate encountered
    if (set.has(num)) return true;
    //if not => add it
    else set.add(num);
  }
  //loop ended => we never encountered a duplicate
  return false;
};
