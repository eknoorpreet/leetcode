/*

Given an integer array nums, rotate the array to the right by k steps, where k is non-negative.

Example 1:

Input: nums = [1,2,3,4,5,6,7], k = 3
Output: [5,6,7,1,2,3,4]
Explanation:
rotate 1 steps to the right: [7,1,2,3,4,5,6]
rotate 2 steps to the right: [6,7,1,2,3,4,5]
rotate 3 steps to the right: [5,6,7,1,2,3,4]
Example 2:

Input: nums = [-1,-100,3,99], k = 2
Output: [3,99,-1,-100]
Explanation:
rotate 1 steps to the right: [99,-1,-100,3]
rotate 2 steps to the right: [3,99,-1,-100]

Constraints:

1 <= nums.length <= 10^5
-2^31 <= nums[i] <= 2^31 - 1
0 <= k <= 10^5

*/

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */

//rotate => shifting each element to right by k times (last ones will be looped back to front)
//pattern: How to cycle back in array? Each element => (i + k) % nums.length => always stays in array!
//i(4) + k(2) = 6 % 5 = index 1
const rotate = function (nums, k) {
  //k could be greater than array length
  //k = array.length => k % length = rotate 0 times (just return)
  if (k % nums.length === 0) return nums;
  //k > array.length => k (5) % length (4) = rotate 1 time

  //what if we have k = 101 and array length is 7, then we will not rotate it 101 times. It
  //simply means we will rotate only 100 % = 2 times => [6,7,1,2,3,4,5]

  k = k % nums.length;

  /*[1,2,3,4,5,6,7], k = -1
  Output : [2,3,4,5,6,7,1]

  k = -1 => k = 6. So, what It represent is that add the -ve value to the length of array.*/

  if (k < 0) {
    // if we get -ve value, then -ve is just equals to it's -ve + array.length
    k += nums.length;
  }

  //input arr = [1,2,3,4,5,6,7], k = 3, result should be: [5,6,7,1,2,3,4]
  //input arr into 2 portions:
  //part 1: [1,2,3,4], part 2: [5,6,7]

  reverse(nums, 0, nums.length - 1); //entire arr reversed => [1,2,3,4,5,6,7] => [7,6,5,4,3,2,1]
  reverse(nums, 0, k - 1); // k elements (now at front) [7,6,5] => [5,6,7] => [5,6,7,4,3,2,1]
  reverse(nums, k, nums.length - 1); //remaining elements: [4,3,2,1] => [1,2,3,4]
  //=> [5,6,7,1,2,3,4]
};

const reverse = (nums, left, right) => {
  //until both pointers meet each other,
  while (left < right) {
    //swap both elements
    [nums[left], nums[right]] = [nums[right], nums[left]];
    left++;
    right--;
  }
};

//TC: O(n)
//SC: O(1)
