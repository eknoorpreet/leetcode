/*

You are given a 0-indexed array of integers nums of length n. You are initially positioned at nums[0].

Each element nums[i] represents the maximum length of a forward jump from index i. In other words, if you are at nums[i], you can jump to any nums[i + j] where:

0 <= j <= nums[i] and
i + j < n
Return the minimum number of jumps to reach nums[n - 1]. The test cases are generated such that you can reach nums[n - 1].



Example 1:

Input: nums = [2,3,1,1,4]
Output: 2
Explanation: The minimum number of jumps to reach the last index is 2. Jump 1 step from index 0 to 1, then 3 steps to the last index.
Example 2:

Input: nums = [2,3,0,1,4]
Output: 2


Constraints:

1 <= nums.length <= 10^4
0 <= nums[i] <= 1000
It's guaranteed that you can reach nums[n - 1].

*/

/**
 * @param {number[]} nums
 * @return {number}
 */

/*

Core Intuition:

The algorithm uses a greedy approach with a sliding window technique
It aims to minimize the number of jumps to reach the last index
At each step, it finds the farthest reachable point within the current window

Greedy Choice Explanation:

Instead of trying every possible jump combination
At each step, we explore all possible jumps within the current window
We choose the jump that allows us to reach the farthest point
This ensures the minimum number of jumps

Why This Works:

By always choosing the farthest reachable point
We ensure we're making the most efficient jumps
The algorithm greedily minimizes the jump count

*/

const jump = function (nums) {
  let jumpCount = 0; // Number of jumps taken
  // The window: [0, 0], [1, 2], [3, 4]
  let left = 0; // Left boundary of current window
  let right = 0; // Right boundary of current window

  // Until the right boundary reaches the last element
  while (right < nums.length - 1) {
    let farthestReach = 0;
    // Explore all possible jumps within current window
    for (let i = left; i <= right; i++) {
      // Get the farthest jump from the window
      farthestReach = Math.max(farthestReach, i + nums[i]);
    }
    // Window iterated => form new window
    // left boundary would be the next element after curr right boundary
    left = right + 1;
    // right boundary would be the farthestReach we can reach from the curr window
    right = farthestReach;
    jumpCount++;
  }
  return jumpCount;
};

/*

Time Complexity: O(n)

Space Complexity: O(1)

*/
