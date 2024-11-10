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

/*

Key Intuition:

For a 132 pattern, we need three numbers where:

nums[i] (first number) < nums[k] (third number) < nums[j] (second number)

We can keep track of minimum values seen so far (potential nums[i])
Use a stack to track potential middle values (nums[j]) along with their corresponding minimum values

*/

function find132pattern(nums) {
  let min = nums[0]; // Keep track of minimum value seen so far
  let stack = []; // Stack stores [number, minSeen] pairs
  // nums = [3, 1, 4, 2]
  // num   1 4
  // min   3 1

  for (let k = 1; k < nums.length; k++) {
    // Find previous greater element for nums[k] (nums[j])
    while (stack.length && stack.at(-1)[0] <= nums[k]) {
      let stackTop = stack.pop();
    }

    // If there is a previous greater element, stack will not be empty
    // If we found a nums[j] such that nums[j] > nums[k], check if nums[k] is greater than nums[i]
    if (stack.length && nums[k] > stack.at(-1)[1]) {
      return true;
    }
    stack.push([nums[k], min]);
    min = Math.min(min, nums[k]);
  }
  return false;
}

//TC: O(n)
//SC: O(n)
