/*

Given an integer array nums of length n and an integer target, find three integers in nums
such that the sum is closest to target.

Return the sum of the three integers.

You may assume that each input would have exactly one solution.

Example 1:

Input: nums = [-1,2,1,-4], target = 1
Output: 2
Explanation: The sum that is closest to the target is 2. (-1 + 2 + 1 = 2).
Example 2:

Input: nums = [0,0,0], target = 1
Output: 0
Explanation: The sum that is closest to the target is 0. (0 + 0 + 0 = 0).


Constraints:

3 <= nums.length <= 500
-1000 <= nums[i] <= 1000
-104 <= target <= 104

*/

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */

const threeSumClosest = function (nums, target) {
  nums.sort((a, b) => a - b);
  let minDiff = Number.MAX_VALUE;
  for (let i = 0; i < nums.length - 2; i++) {
    let left = i + 1;
    let right = nums.length - 1;
    while (left < right) {
      const currDiff = target - nums[i] - nums[left] - nums[right];
      if (currDiff === 0) {
        return target - currDiff; //sum
      }
      //minDiff: as close to 0 as possible (negligible), not as low as possible!
      //currDiff = -5, minDiff = -2, target = 1
      //we should not set minDiff to currDiff. Even though currDiff
      //is smaller, it's further away from 0 (and hence, from target as well)
      //=> only compare absolute values
      // if(Math.abs(currDiff) < Math.abs(minDiff)) minDiff = currDiff
      minDiff = Math.abs(currDiff) < Math.abs(minDiff) ? currDiff : minDiff;
      //least diff => closest to 0
      if (currDiff > 0) {
        //diff > 0, need a lesser diff => bigger sum
        left++; //we need a bigger sum
      } else {
        right--;
      }
    }
  }
  return target - minDiff;
};

threeSumClosest([-1, 2, 1, -4], 1);

/*
Time complexity:
Sorting: O(nlogn). The remaining function will take O(n * logn + n^2) =>  asymptotically equivalent to O(n^2)

Space complexity: O(n) (required for sorting) */
