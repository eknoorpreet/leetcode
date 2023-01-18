/*Given an integer array nums of length n and an integer target, find three integers in nums such that the sum is closest to target.

Return the sum of the three integers.

You may assume that each input would have exactly one solution. */

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
const threeSumClosest = function (nums, target) {
  nums.sort((a, b) => a - b);
  let smallestDiff = Number.MAX_VALUE;
  for (let i = 0; i < nums.length - 2; i++) {
    let left = i + 1;
    let right = nums.length - 1;
    while (left < right) {
      const targetDiff = target - nums[i] - nums[left] - nums[right];
      //least diff => closest to 0
      if (targetDiff === 0) return target - targetDiff;
      //compare the absolute values of the 2, set it to the actual value
      //why?
      //currDiff = -5, smallestDiff = -2, target = 1
      //we should not set smallestDiff to currDiff. Even though currDiff
      //is smaller, it's further away from target
      //=> only compare absolute values
      if (Math.abs(targetDiff) < Math.abs(smallestDiff))
        smallestDiff = targetDiff;
      //we want a bigger sum => lesser diff
      //sum < target => 0 < target - sum => 0 < diff
      //Basically, if diff > 0 => need a lesser diff => bigger sum
      if (targetDiff > 0) {
        left++;
      } else {
        right--;
      }
    }
  }
  return target - smallestDiff;
};

threeSumClosest([-1, 2, 1, -4], 1);

/*
Time complexity:
Sorting: O(nlogn). The remaining function will take O(n * logn + n^2) =>  asymptotically equivalent to O(n^2)

Space complexity: O(n) (required for sorting) */
