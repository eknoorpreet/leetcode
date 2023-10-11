/*

Given an array nums of n integers where nums[i] is in the range [1, n], return an array of all the integers in the range [1, n] that do not appear in nums.



Example 1:

Input: nums = [4,3,2,7,8,2,3,1]
Output: [5,6]
Example 2:

Input: nums = [1,1]
Output: [2]


Constraints:

n == nums.length
1 <= n <= 105
1 <= nums[i] <= n

*/

/**
 * @param {number[]} nums
 * @return {number[]}
 */

/*
[1, n] is a range of unique numbers, where n is the length of nums. If a number
doesn't appear in nums, it's because others are being repeated.
*/
//TC: O(n)
//SC: O(n)
const findDisappearedNumbers0 = function (nums) {
  //use a set to store (our desired) elements (1 to n) for O(1) access
  const set = new Set();
  const result = [];
  //add 1 to n to the set
  for (let i = 1; i <= nums.length; i++) {
    set.add(i);
  }
  //go through all elements in array
  for (let i = 0; i < nums.length; i++) {
    //if curr el exists in our set, delete it
    //Basically, check which elements from 1 to n (represented by our set)
    //exist in nums and delete them
    if (set.has(nums[i])) set.delete(nums[i]);
  }
  //remaining elements in set will be the missing ones
  return Array.from(set);
};

const findDisappearedNumbers = function (nums) {
  const cyclicSort = (nums) => {
    for (let i = 0; i < nums.length; ) {
      //curr element
      const num = nums[i];
      //since the numbers are in the range [1, n], correct index = num - 1
      const correctIndex = num - 1;
      //if the curr number is not equal to the number at its correct index
      if (num !== nums[correctIndex]) {
        //swap two nums to move the curr num to its correct position.
        [nums[i], nums[correctIndex]] = [nums[correctIndex], nums[i]];
      } else {
        i++;
      }
    }
    return nums;
  };

  const result = [];
  console.log(nums); //[4,3,2,7,8,2,3,1]
  nums = cyclicSort(nums);
  console.log(nums); //=> [1, 2, 3, 4, 3, 2, 7, 8]

  for (let i = 1; i <= nums.length; i++) {
    //Check if the current index i does not match the number at index i - 1
    //in the sorted array (cycledArray[i - 1]). If they are not equal, it
    //means that i is missing in the original array, so add i to the result
    if (i !== nums[i - 1]) result.push(i);
  }
  return result;
};
