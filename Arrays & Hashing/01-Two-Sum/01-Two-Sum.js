/*

Given an array of integers nums and an integer target, return indices of the two numbers such
that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same
element twice.

You can return the answer in any order.



Example 1:

Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
Example 2:

Input: nums = [3,2,4], target = 6
Output: [1,2]
Example 3:

Input: nums = [3,3], target = 6
Output: [0,1]


Constraints:

2 <= nums.length <= 104
-109 <= nums[i] <= 109
-109 <= target <= 109
Only one valid answer exists.

*/

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */

//TC: O(n^2)
//SC: O(1)
// const twoSum = function(nums, target) {
//     for(let i = 0; i < nums.length - 1; i++) {
//         for(let j = i + 1; j < nums.length; j++) {
//             if(nums[i] + nums[j] === target) return [i, j]
//         }
//     }
// };

//TC: O(n)
//SC: O(n)
const twoSum1 = function (nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    //A + B = target. We store [A, A's index]
    //we store {2 => 0}.
    //We try to find B. Is the curr char a B, i.e. for B, does A (= target - B) already exist in hashmap => [A's index, B's/curr index] [map.get(target - B), i]
    //2nd iteration: If map has 9 - 7 = 2, return [2's index, curr index]
    if (map.has(target - nums[i])) return [map.get(target - nums[i]), i];
    else map.set(nums[i], i);
  }
};

// const twoSum = function (nums, target) {
//   const map = new Map()
//   for(let i = 0; i < nums.length; i++) {
//     if(map.has(nums[i])) return [map.get(nums[i]), i]
//     map.set(target - nums[i], i)
//   }
// };

const twoSum = function (nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    //A + B = target. We store [A, A's index]
    //we store {2 => 0}.
    //We try to find B. Is the curr char a B, i.e. for B, does A (= target - B) already exist in hashmap => [A's index, B's/curr index] [map.get(target - B), i]
    //2nd iteration: If map has 9 - 7 = 2, return [2's index, curr index]
    if (map.has(target - nums[i])) return [map.get(target - nums[i]), i];
    else map.set(nums[i], i);
  }
};
