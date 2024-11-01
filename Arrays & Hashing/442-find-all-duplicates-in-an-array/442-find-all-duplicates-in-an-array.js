/*

Given an integer array nums of length n where all the integers of nums are in the range [1, n] and each integer appears at most twice, return an array of all the integers that appears twice.

You must write an algorithm that runs in O(n) time and uses only constant auxiliary space, excluding the space needed to store the output



Example 1:

Input: nums = [4,3,2,7,8,2,3,1]
Output: [2,3]
Example 2:

Input: nums = [1,1,2]
Output: [1]
Example 3:

Input: nums = [1]
Output: []


Constraints:

n == nums.length
1 <= n <= 10^5
1 <= nums[i] <= n
Each element in nums appears once or twice.

*/

/**
 * @param {number[]} nums
 * @return {number[]}
 */

const findDuplicates0 = function (nums) {
  const duplicates = [];
  nums.sort((a, b) => a - b);
  for (let i = 0; i < nums.length - 1; i++) {
    if (nums[i] === nums[i + 1]) {
      duplicates.push(nums[i]);
    }
  }
  return duplicates;
};

// TC: O(nlogn)
// SC: O(n)

const findDuplicates1 = function (nums) {
  const duplicates = [];
  const set = new Set();
  for (let i = 0; i < nums.length; i++) {
    if (set.has(nums[i])) {
      duplicates.push(nums[i]);
    } else {
      set.add(nums[i]);
    }
  }
  return duplicates;
};

// TC: O(n)
// SC: O(n)

/**
 * @param {number[]} nums
 * @return {number[]}
 */

/*

Use "cyclic sort" technique to find duplicates.

Key Insight:

Given numbers are from 1 to n (where n is array length)
Each number ideally should be at index = value - 1
Example: number 4 should be at index 3

Why it works:

After cyclic sort, each number should be at index = value-1
If a number appears twice, it can't be in its correct position both times
The second copy will be found in the wrong position during verification

*/

const findDuplicates = function (nums) {
  const duplicates = [];
  let i = 0;
  while (i < nums.length) {
    // Current element
    const currNum = nums[i];
    // Its correct index
    const correctInd = currNum - 1;
    // If not in correct position
    if (currNum !== nums[correctInd]) {
      // Swap
      [nums[i], nums[correctInd]] = [nums[correctInd], nums[i]];
    } else {
      // Move to next if in position
      i++;
    }
  }
  // nums = [1, 2, 3, 4, 3, 2, 7, 8]

  for (let i = 0; i < nums.length; i++) {
    // If number isn't in correct position
    if (nums[i] !== i + 1) {
      // It must be a duplicate
      duplicates.push(nums[i]);
    }
  }
  return duplicates;
};

/*

Time: O(n)

While loop makes at most n swaps
Second loop is O(n)

Space: O(1)

Only uses a few variables
Output array doesn't count as per question

*/
