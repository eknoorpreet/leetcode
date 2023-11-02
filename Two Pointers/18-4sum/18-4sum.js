// https://leetcode.com/problems/4sum/

/*

Given an array nums of n integers, return an array of all the unique quadruplets [nums[a], nums[b], nums[c], nums[d]] such that:

0 <= a, b, c, d < n
a, b, c, and d are distinct.
nums[a] + nums[b] + nums[c] + nums[d] == target
You may return the answer in any order.



Example 1:

Input: nums = [1,0,-1,0,-2,2], target = 0
Output: [[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]
Example 2:

Input: nums = [2,2,2,2,2], target = 8
Output: [[2,2,2,2]]


Constraints:

1 <= nums.length <= 200
-10^9 <= nums[i] <= 10^9
-10^9 <= target <= 10^9

*/

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
const search = function (arr, targetSum, first, second, quadruplets) {
  //i = first number, j = second number, left = third, right = fourth
  let left = second + 1;
  let right = arr.length - 1;
  while (left < right) {
    let currSum = arr[first] + arr[second] + arr[left] + arr[right];
    if (currSum === targetSum) {
      quadruplets.push([arr[first], arr[second], arr[left], arr[right]]);
      left++;
      right--;
      while (left < right && arr[left] === arr[left - 1]) {
        left++;
      }
      while (left < right && arr[right] === arr[right + 1]) {
        right--;
      }
    } else if (currSum < targetSum) {
      left++;
    } else {
      right--;
    }
  }
};

const fourSum0 = function (nums, target) {
  const quadruplets = [];
  nums.sort((a, b) => a - b);
  for (let i = 0; i < nums.length - 3; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) {
      continue;
    }
    for (let j = i + 1; j < nums.length - 2; j++) {
      if (j > i + 1 && nums[j] === nums[j - 1]) {
        continue;
      }
      search(nums, target, i, j, quadruplets);
    }
  }
  return quadruplets;
};

const fourSum = function (nums, target) {
  //helps us use the 2-pointer technique and also handle duplicates
  nums.sort((a, b) => a - b);
  const quadruplets = [];
  for (let i = 0; i < nums.length - 3; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    for (let j = i + 1; j < nums.length - 2; j++) {
      if (j > i + 1 && nums[j] === nums[j - 1]) continue;
      let left = j + 1;
      let right = nums.length - 1;
      while (left < right) {
        const currSum = nums[i] + nums[j] + nums[left] + nums[right];
        if (currSum === target) {
          quadruplets.push([nums[i], nums[j], nums[left], nums[right]]);
          left++;
          right--;
          while (left < right && nums[left] === nums[left - 1]) left++;
          while (left < right && nums[right] === nums[right + 1]) right--;
        } else if (currSum < target) left++;
        else right--;
      }
    }
  }
  return quadruplets;
};

//TC: O(n^3)
//SC: O(n)

fourSum([1, 0, -1, 0, -2, 2], 0); //[[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]

/*Time complexity: Sorting will take O(nlogn). Overall fourSum() will take
O(nlogn + n^3) => asymptotically equivalent to O(n^3).

Space complexity: The space complexity will be O(n) which is required for sorting. */
