/*

Given an integer array nums and an integer k, return true if there are two distinct indices i and
j in the array such that nums[i] == nums[j] and abs(i - j) <= k.



Example 1:

Input: nums = [1,2,3,1], k = 3
Output: true
Example 2:

Input: nums = [1,0,1,1], k = 1
Output: true
Example 3:

Input: nums = [1,2,3,1,2,3], k = 2
Output: false


Constraints:

1 <= nums.length <= 10^5
-109 <= nums[i] <= 10^9
0 <= k <= 10^5

*/

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
const containsNearbyDuplicate0 = function (nums, k) {
  let indexOfDuplicate;
  let firstIndex;
  const obj = {};

  for (let i = 0; i < nums.length; i++) {
    let el = nums[i];
    if (!(el in obj)) {
      obj[el] = i;
    } else {
      indexOfDuplicate = i; //j index
      firstIndex = obj[el]; //i index
      if (Math.abs(firstIndex - indexOfDuplicate) <= k) return true;
      // it's a duplicate but the k condition not satisfied?
      // Update index of element cuz curr index might satisfy the condition
      // But firstIndex never will
      // Cuz indices are in increasing order: |0 - 2| <= 1, later: |0 - 3| <= 1. Same result!
      else obj[el] = i;
    }
  }
  return false;
};

/*

TC: O(n)
SC: O(n): In the worst case, when there are no duplicates, the hash table would store all
unique elements, resulting in O(n) space complexity.

*/

/*

Approach 2: Sliding window:

abs(i - j) <= k => The size of the window should be <= k

*/

const containsNearbyDuplicate = function (nums, k) {
  let start = 0;
  const window = new Set();
  for (let end = 0; end < nums.length; end++) {
    //is window invalid? => make it valid by shrinking
    if (end - start > k) {
      window.delete(nums[start]);
      start++;
    }
    //is curr el a duplicate (window is already valid unless caught in above condition) => true
    if (window.has(nums[end])) return true;
    window.add(nums[end]);
  }
  return false;
};

/*

TC: O(n)
SC: O(n): In the worst case, when there are no duplicates, the hash set would store all
unique elements, resulting in O(n) space complexity.

*/
