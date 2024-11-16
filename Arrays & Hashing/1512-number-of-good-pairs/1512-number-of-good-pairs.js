/*

Given an array of integers nums, return the number of good pairs.

A pair (i, j) is called good if nums[i] == nums[j] and i < j.



Example 1:

Input: nums = [1,2,3,1,1,3]
Output: 4
Explanation: There are 4 good pairs (0,3), (0,4), (3,4), (2,5) 0-indexed.
Example 2:

Input: nums = [1,1,1,1]
Output: 6
Explanation: Each pair in the array are good.
Example 3:

Input: nums = [1,2,3]
Output: 0


Constraints:

1 <= nums.length <= 100
1 <= nums[i] <= 100


*/

/**
 * @param {number[]} nums
 * @return {number}
 */

const numIdenticalPairs0 = function (nums) {
  let count = 0;
  for (let i = 0; i < nums.length - 1; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] === nums[j]) count++;
    }
  }
  return count;
};

// Time complexity: O(n^2)
// Space complexity: O(1)

/*

Let's say that we are iterating over the input, and we encounter a number x = 6. We also know that we have seen 6 three times before the current index. The current 6 could pair with any of the previous three to form a good pair.

In general, whenever we encounter a number, it can form k good pairs with previously traversed numbers, where k is the number of times we have seen the number previously.

*/
const numIdenticalPairs = function (nums) {
  let count = 0;
  const map = new Map();
  for (const num of nums) {
    count += map.get(num) || 0;
    map.set(num, (map.get(num) || 0) + 1);
  }
  return count;
};

// Time complexity: O(n)
// Space complexity: O(n)
