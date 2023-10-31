// https://leetcode.com/problems/3sum/

/*

Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.

Notice that the solution set must not contain duplicate triplets.



Example 1:

Input: nums = [-1,0,1,2,-1,-4]
Output: [[-1,-1,2],[-1,0,1]]
Explanation:
nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.
nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.
nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.
The distinct triplets are [-1,0,1] and [-1,-1,2].
Notice that the order of the output and the order of the triplets does not matter.
Example 2:

Input: nums = [0,1,1]
Output: []
Explanation: The only possible triplet does not sum up to 0.
Example 3:

Input: nums = [0,0,0]
Output: [[0,0,0]]
Explanation: The only possible triplet sums up to 0.


Constraints:

3 <= nums.length <= 3000
-105 <= nums[i] <= 105

*/

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
//Approach: To make it similar to 'pair (2) with target sum'
//x + A + B = 0 => A + B = -x
const threeSum0 = function (nums) {
  //to make it easier to work with the two pointers approach, we can sort the array
  nums.sort((a, b) => a - b);
  const triplets = [];
  for (let i = 0; i < nums.length - 2; i++) {
    //if nums[i] was part of a triplet previously => it will result in a duplicate triplet => skip
    //(bcoz for num[i], we've found all A & Bs that make sum = 0)
    if (i > 0 && nums[i] === nums[i - 1]) {
      continue;
    }
    //num[i] + A + B = 0 => A + B = -num[i] (our target)
    //For every num[i], we'll try to find as many A & Bs such that the above condition is true
    let target = -nums[i];
    let left = i + 1;
    let right = nums.length - 1;
    while (left < right) {
      const currSum = nums[left] + nums[right];
      if (target === currSum) {
        triplets.push([-target, nums[left], nums[right]]);
        left++;
        right--;
        //if the current num at left is the same as previous num, the resulting triplet might be a duplicate => skip
        while (left < right && nums[left] === nums[left - 1]) {
          left++;
        }
        //if the current num at right is the same as previous num, the resulting triplet might be a duplicate => skip
        while (left < right && nums[right] === nums[right + 1]) {
          right--;
        }
      } else if (currSum < target) {
        left++;
      } else {
        right--;
      }
    }
  }
  return triplets;
};

const threeSum = function (nums) {
  //to make it easier to work with pointers, we can sort the array
  nums.sort((a, b) => a - b);
  const triplets = [];
  for (let i = 0; i < nums.length - 2; i++) {
    //if num[i - 1] was part of a triplet previously => num[i] will result in a duplicate triplet => skip
    //(bcoz for num[i - 1], we've found all A & Bs that make sum = 0)
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    //i //pointer 1
    let left = i + 1; //pointer 2
    let right = nums.length - 1; //pointer 3
    while (left < right) {
      const currSum = nums[i] + nums[left] + nums[right];
      if (currSum === 0) {
        triplets.push([nums[i], nums[left], nums[right]]);
        left++;
        right--;
        //if the current num is the same as previous num, the resulting triplet might be a duplicate => skip
        while (left < right && nums[left] === nums[left - 1]) left++;
        //if the current num is the same as previous num, the resulting triplet might be a duplicate => skip
        while (left < right && nums[right] === nums[right + 1]) right--;
      } else if (currSum < 0) {
        //we need a bigger sum
        left++;
      } else {
        //we need a smaller sum
        right--;
      }
    }
  }
  return triplets;
};

threeSum([-1, 0, 1, 2, -1, -4]); //[[-1,-1,2],[-1,0,1]]

threeSum([-1, 0, 1, 2, -1, -4]); //[[-1,-1,2],[-1,0,1]]

/*
Time complexity:
Sorting: O(nlogn). The entire function will take O(n * logn + n^2) =>  asymptotically equivalent to O(n^2)

Space complexity: Apart from the space required for the output array, the space complexity of the above algorithm will be O(n)
which is required for sorting. */
