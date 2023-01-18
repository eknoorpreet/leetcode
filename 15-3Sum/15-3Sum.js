// https://leetcode.com/problems/3sum/

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
//Approach: To make it similar to 'pair (2) with target sum'
//x + A + B = 0 => A + B = -x
const threeSum0 = function (nums) {
  //to make it easier to work with pointers, we can sort the array
  nums.sort((a, b) => a - b);
  const triplets = [];
  for (let i = 0; i < nums.length; i++) {
    //if num[i] was part of a triplet previosuly => num[i - 1] will result in a duplicate triplet => skip
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
        //for num[i], we already have num[left] and num[right] such sum = 0
        //if the current num is the same as previous num, the resulting triplet might be a duplicate => skip
        while (left < right && nums[left] === nums[left - 1]) {
          left++;
        }
        //if the current num is the same as previous num, the resulting triplet might be a duplicate => skip
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
  for (let i = 0; i < nums.length; i++) {
    //if num[i - 1] was part of a triplet previously => num[i] will result in a duplicate triplet => skip
    //(bcoz for num[i - 1], we've found all A & Bs that make sum = 0)
    if (i > 0 && nums[i] === nums[i - 1]) {
      continue;
    }
    //i //pointer 1
    let left = i + 1; //pointer 2
    let right = nums.length - 1; //pointer 3
    while (left < right) {
      const currSum = nums[i] + nums[left] + nums[right];
      if (currSum === 0) {
        triplets.push([nums[i], nums[left], nums[right]]);
        left++;
        right--;
        //for num[i], we already have num[left] and num[right] such sum = 0
        //if the current num is the same as previous num, the resulting triplet might be a duplicate => skip
        while (left < right && nums[left] === nums[left - 1]) {
          left++;
        }
        //if the current num is the same as previous num, the resulting triplet might be a duplicate => skip
        while (left < right && nums[right] === nums[right + 1]) {
          right--;
        }
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

Space complexity: Apart from the space required for the output array, the space complexity of the above algorithm will be O(n) which is required for sorting. */
