/**
 * @param {number[]} nums
 * @return {boolean}
 */

//TC: O(n^2)
//SC: O(1)
//  const containsDuplicate = function(nums) {
//     for(let i = 0; i < nums.length - 1; i++) {
//        for(let j = i + 1; j < nums.length; j++) {
//            if(nums[i] === nums[j]) return true
//        }
//     }
//     //loop ended => we never encountered a duplicate
//     return false
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
  for (let i = 0; i < nums.length; i++) {
    //if element not in set
    if (!set.has(nums[i])) {
      //add it
      set.add(nums[i]);
    } else {
      //element already in set => duplicate encountered
      return true;
    }
  }
  //loop ended => we never encountered a duplicate
  return false;
};
