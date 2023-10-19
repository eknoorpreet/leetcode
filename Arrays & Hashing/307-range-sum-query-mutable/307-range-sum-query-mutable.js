/*

Given an integer array nums, handle multiple queries of the following types:

Update the value of an element in nums.
Calculate the sum of the elements of nums between indices left and right inclusive where left <= right.
Implement the NumArray class:

NumArray(int[] nums) Initializes the object with the integer array nums.
void update(int index, int val) Updates the value of nums[index] to be val.
int sumRange(int left, int right) Returns the sum of the elements of nums between indices left and right inclusive (i.e. nums[left] + nums[left + 1] + ... + nums[right]).


Example 1:

Input
["NumArray", "sumRange", "update", "sumRange"]
[[[1, 3, 5]], [0, 2], [1, 2], [0, 2]]
Output
[null, 9, null, 8]

Explanation
NumArray numArray = new NumArray([1, 3, 5]);
numArray.sumRange(0, 2); // return 1 + 3 + 5 = 9
numArray.update(1, 2);   // nums = [1, 2, 5]
numArray.sumRange(0, 2); // return 1 + 2 + 5 = 8


Constraints:

1 <= nums.length <= 3 * 104
-100 <= nums[i] <= 100
0 <= index < nums.length
-100 <= val <= 100
0 <= left <= right < nums.length
At most 3 * 104 calls will be made to update and sumRange.

*/

/**
 * @param {number[]} nums
 */
/**
 * @param {number[]} nums
 */
const NumArray = function (nums) {
  this.nums = nums;
  // Create a prefix sum array
  // The prefix sum for an element at index i is the sum of all elements from index 0 to i in the original array.
  // If nums = [2, 1, 3], then prefix = [0, 2, 3, 6]
  this.prefix = [0];
  //iterate through nums and calculate the prefix sum for each element.
  for (let num of nums) {
    this.prefix.push(this.prefix[this.prefix.length - 1] + num);
  }
  this.n = this.prefix.length;
};

/**
 * @param {number} index
 * @param {number} val
 * @return {void}
 */
NumArray.prototype.update = function (index, val) {
  // calculate the difference diff between the new value 'val' and the old
  // value at the index
  const diff = val - this.nums[index];
  this.nums[index] = val;
  // maintain / adjust the integrity of the prefix sum array
  // iterates from the next index (index + 1) to the end of the prefix sum
  // array and adjusts the values by adding diff
  for (let i = index + 1; i < this.n; i++) {
    this.prefix[i] += diff;
  }
};

/**
 * @param {number} left
 * @param {number} right
 * @return {number}
 */
NumArray.prototype.sumRange = function (left, right) {
  //this.prefix[right]: sum of el from 0 to right index (excluding 'right')
  //to include it => this.prefix[right + 1]
  //this.prefix[left]: sum of el from 0 to left index (excluding 'left') which
  //is fine
  //sum of [left, right]: this.prefix[right + 1] - this.prefix[left];
  return this.prefix[right + 1] - this.prefix[left];
};

/**
 * Your NumArray object will be instantiated and called as such:
 * var obj = new NumArray(nums)
 * obj.update(index,val)
 * var param_2 = obj.sumRange(left,right)
 */

/**
 * @param {number} left
 * @param {number} right
 * @return {number}
 */

/*

Complexity Analysis:

The time complexity of the update method is O(n), where n is the length of the prefix sum array, as it iterates through a portion of the prefix sum array.
The time complexity of the sumRange method is O(1), as it performs a constant-time subtraction operation.
The space complexity is O(n), where n is the length of the prefix sum array, which stores cumulative sums.


*/
