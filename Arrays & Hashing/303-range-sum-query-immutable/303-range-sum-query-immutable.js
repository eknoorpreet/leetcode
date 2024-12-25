/*

Given an integer array nums, handle multiple queries of the following type:

Calculate the sum of the elements of nums between indices left and right inclusive where left <= right.
Implement the NumArray class:

NumArray(int[] nums) Initializes the object with the integer array nums.
int sumRange(int left, int right) Returns the sum of the elements of nums between indices left and right inclusive (i.e. nums[left] + nums[left + 1] + ... + nums[right]).


Example 1:

Input
["NumArray", "sumRange", "sumRange", "sumRange"]
[[[-2, 0, 3, -5, 2, -1]], [0, 2], [2, 5], [0, 5]]
Output
[null, 1, -1, -3]

Explanation
NumArray numArray = new NumArray([-2, 0, 3, -5, 2, -1]);
numArray.sumRange(0, 2); // return (-2) + 0 + 3 = 1
numArray.sumRange(2, 5); // return 3 + (-5) + 2 + (-1) = -1
numArray.sumRange(0, 5); // return (-2) + 0 + 3 + (-5) + 2 + (-1) = -3


Constraints:

1 <= nums.length <= 104
-105 <= nums[i] <= 105
0 <= left <= right < nums.length
At most 10^4 calls will be made to sumRange.

/**
 * @param {number[]} nums
 */
var NumArray0 = function (nums) {
  this.nums = nums;
};

/**
 * @param {number} left
 * @param {number} right
 * @return {number}
 */
NumArray0.prototype.sumRange = function (left, right) {
  let result = 0;
  for (let i = left; i <= right; i++) {
    result += this.nums[i];
  }
  return result;
};

/*

Optimization:

Approach: Prefix Sum (Cumulative Sum)
The key idea behind this solution is to precompute a prefix sum array during the constructor,
which allows us to calculate range sums in O(1) time complexity for each query.

Intuition:

Instead of calculating the sum from scratch for each range query, we precompute a cumulative
sum array.
The prefix sum array stores the running total of elements up to each index.
To get the sum of a range [left, right], we can subtract the cumulative sum up to the
left boundary from the cumulative sum up to the right boundary.

*/

const NumArray = function (nums) {
  this.prefix = [];
  let sum = 0;
  for (let num of nums) {
    sum += num;
    this.prefix.push(sum);
  }
};

/**
 * @param {number} left
 * @param {number} right
 * @return {number}
 */
NumArray.prototype.sumRange = function (left, right) {
  let result = 0;
  // We want to include nums[left], therefore, subtract the sum at this.prefix[left - 1]
  // Handle the case when left is the first element
  let leftSum = left > 0 ? this.prefix[left - 1] : 0;
  // Get the cumulative sum up to the right boundary
  let rightSum = this.prefix[right];
  // Return the difference to get the range sum
  return rightSum - leftSum;
};

/*

Time and Space Complexity:

Constructor: O(n) time, O(n) space
Range Query: O(1) time
Space: O(n) to store the prefix sum array

*/

/**
 * Your NumArray object will be instantiated and called as such:
 * var obj = new NumArray(nums)
 * var param_1 = obj.sumRange(left,right)
 */
