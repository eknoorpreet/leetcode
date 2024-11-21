/*

You are given an integer array nums. You are initially positioned at the array's first index, and each element in the array represents your maximum jump length at that position.

Return true if you can reach the last index, or false otherwise.



Example 1:

Input: nums = [2,3,1,1,4]
Output: true
Explanation: Jump 1 step from index 0 to 1, then 3 steps to the last index.
Example 2:

Input: nums = [3,2,1,0,4]
Output: false
Explanation: You will always arrive at index 3 no matter what. Its maximum jump length is 0, which makes it impossible to reach the last index.


Constraints:

1 <= nums.length <= 10^4
0 <= nums[i] <= 10^5

*/

/**
 * @param {number[]} nums
 * @return {boolean}
 */

const canJump0 = function (nums) {
  // Our goal is the last_index
  let goal = nums.length - 1;
  // Let's start from second_last_index (because last_index can obviously reach itself)
  for (let i = nums.length - 2; i >= 0; i--) {
    // All we need to know is if we can reach the last_index from second_last_index
    // If we can, second_last_index becomes our new goal
    if (i + nums[i] >= goal) goal = i;
  }

  // At the end, were we able to reach the 1st index from 0th index?
  // (Were we able to make 0th index as goal)
  return goal === 0;
};

/*

Let's get "greedy" and try to jump the farthest
(Why farthest jumps every time? Because (let's say length = 5) at the end of iteration, farthest
should be last_index + nums[last_index] (i jumped nums[i]))
If we can reach a point beyond the last index, we've successfully solved the problem
This means that even though farthest can jump at most nums[i] times,
we'll be taking the jump of nums[i]

Intuition: If:
At i = 0, we make farthest jump of 2 and land at i = 2, now, we won't make jump of
max(nums[i] + i, farthest) = max(1 + 2, 2) = 3.
Why? Because it's not the farthest. We skipped 3 at index 1 which would have given us a jump
of 3 + 1 = 4 (which is a greater jump)
Remember, we're trying to reach as far as we can so that we can reach (or even exceed) the last
index

Therefore, include all jumps and update farthest accordingly

Also, farthest should never be less than i
(the previous jump should always be able to reach curr index)

At i = 0, farthest (max jump) = 2
At i = 1, farthest (max jump) = i + nums[i] = 1 + 3 = 4
At i = 2, farthest (max jump) = i + nums[i] = 2 + 1 = 3 vs 4 = 4
At i = 3, farthest (max jump) = i + nums[i] = 3 + 1 = 4 vs 4 = 4
At i = 4, farthest (max jump) = i + nums[i] = 4 + 4 = 8 vs 8 = 8

Greedy Characteristics:

At each step, the algorithm makes a locally optimal choice about the maximum reachable distance
It makes an irrevocable decision about the farthest possible jump
It continuously updates the maximum reach based on the current index

Key Greedy Principles:

The algorithm always tries to maximize the jump distance at each step
It makes a decision about the farthest reachable point without backtracking
It prunes impossible paths immediately by checking if the current index is reachable

*/

const canJump = function (nums) {
  let farthestReach = 0; // Initially, we can only reach index 0, hence farthestReach = 0
  for (let i = 0; i < nums.length; i++) {
    if (farthestReach >= nums.length - 1) return true; // or break
    // At every index, check if farthestReach was atleast able to reach that particular index.
    // In previous iteration, we made a jump. Were we able to reach the curr index?
    // farthestReach >= i -> great, carry on. If not => false
    if (farthestReach < i) return false;
    // As you can reach this index (because farthestReach >= i)
    // => time to update your reach as at every index, you're getting a new jump length.
    const currJump = i + nums[i];
    farthestReach = Math.max(currJump, farthestReach);
  }
  // We reached the end of the array (where you jumped i + nums[i] = 8)
  // Optional
  return true;
};

/*

Time Complexity: O(n)

Space Complexity: O(1)

*/
