/*

Given an array of n integers nums, a 132 pattern is a subsequence of three integers nums[i], nums[j] and nums[k] such that i < j < k and nums[i] < nums[k] < nums[j].

Return true if there is a 132 pattern in nums, otherwise, return false.



Example 1:

Input: nums = [1,2,3,4]
Output: false
Explanation: There is no 132 pattern in the sequence.
Example 2:

Input: nums = [3,1,4,2]
Output: true
Explanation: There is a 132 pattern in the sequence: [1, 4, 2].
Example 3:

Input: nums = [-1,3,2,0]
Output: true
Explanation: There are three 132 patterns in the sequence: [-1, 3, 2], [-1, 3, 0] and [-1, 2, 0].


Constraints:

n == nums.length
1 <= n <= 2 * 10^5
-10^9 <= nums[i] <= 10^9

*/

function find132pattern(nums) {
  let minimums = new Array(nums.length).fill(0);
  let min = nums[0];
  let stack = []; //will also contain the min value for entire array for k
  //stack = [n, min]
  //nums = [3, 1, 4, 2]
  //n   3 1 4
  //min 3 3 1

  // for k, we want to find a value greater but in a previosu index => find k's previous greater!
  for (let k = 1; k < nums.length; k++) {
    //find previous greater element for nums[k] (nums[j])
    while (stack.length && stack.at(-1)[0] <= nums[k]) {
      let stackTop = stack.pop();
    }

    // Here, if stack is not empty, we have found previous greater element for nums[k] (nums[j])
    // Also, check if nums[k] > min (nums[i]) => true!
    if (stack.length && nums[k] > stack.at(-1)[1]) {
      return true;
    }

    // push curr element and curr min to stack
    stack.push([nums[k], min]);
    min = Math.min(min, nums[k]);
  }
  return false;
}

//TC: O(n)
//SC: O(n)
