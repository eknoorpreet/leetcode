/*

You are given a sorted array consisting of only integers where every element appears exactly twice, except for one element which appears exactly once.

Return the single element that appears only once.

Your solution must run in O(log n) time and O(1) space.



Example 1:

Input: nums = [1,1,2,3,3,4,4,8,8]
Output: 2
Example 2:

Input: nums = [3,3,7,7,10,11,11]
Output: 10


Constraints:

1 <= nums.length <= 10^5
0 <= nums[i] <= 10^5

*/

/**
 * @param {number[]} nums
 * @return {number}
 */

const singleNonDuplicate0 = function (nums) {
  const map = new Map();
  for (let num of nums) {
    map.set(num, (map.get(num) || 0) + 1);
  }
  for (const [num, frequency] of map.entries()) {
    if (frequency === 1) return num;
  }
};

//TC: O(n)
//SC: O(n)

const singleNonDuplicate1 = function (nums) {
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== nums[i - 1] && nums[i] !== nums[i + 1]) return nums[i];
  }
};

//TC: O(n)
//SC: O(1)

/*

The size of the search space is always going to be 2(n) + 1.

*/

const singleNonDuplicate2 = function (nums) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    // if mid is not equal to its left neighbour (or doesn't have it)
    // and mid is not equal to its right neighbour (or doesn't have it)
    if (
      (mid - 1 < 0 || nums[mid] !== nums[mid - 1]) &&
      (mid + 1 === nums.length || nums[mid] !== nums[mid + 1])
    )
      return nums[mid];

    // Input = [1,1,2,3,3,4,4,8,8]
    // left = 0, right = 8, mid = 4, nums[mid] = 3 (not the answer)
    // Next, we want to eliminate both copies of mid (3)
    // By "eliminate", we mean "don't include in the search space"

    // If nums[mid] is equal to its left neighbour (as 3 is, in this case)
    // We set the correctedMid to nums[mid - 1]
    // Otherwise, we set till nums[mid]
    const correctedMid = nums[mid - 1] === nums[mid] ? mid - 1 : mid;
    // right = mid - 1 also works!
    // I want the search space to only be limited to potential answers.
    // Hence, if below condition is true, we don't include nums[mid - 1] or nums[mid]
    // (since they are not potential answers)
    if (correctedMid % 2) right = correctedMid - 1;
    else left = mid + 1;
  }
};

//TC: O(log n)
//SC: O(1)
