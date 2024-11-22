/*

You are given a 0-indexed binary string s and two integers minJump and maxJump. In the beginning, you are standing at index 0, which is equal to '0'. You can move from index i to index j if the following conditions are fulfilled:

i + minJump <= j <= min(i + maxJump, s.length - 1), and
s[j] == '0'.
Return true if you can reach index s.length - 1 in s, or false otherwise.



Example 1:

Input: s = "011010", minJump = 2, maxJump = 3
Output: true
Explanation:
In the first step, move from index 0 to index 3.
In the second step, move from index 3 to index 5.

Example 2:

Input: s = "01101110", minJump = 2, maxJump = 3
Output: false

Constraints:

2 <= s.length <= 10^5
s[i] is either '0' or '1'.
s[0] == '0'
1 <= minJump <= maxJump < s.length

*/

/**
 * @param {string} s
 * @param {number} minJump
 * @param {number} maxJump
 * @return {boolean}
 */

/*

Constraints:

Our jump should be within bounds
We should land at '0'

Core Intuition:

Use BFS to explore all possible jumps from each reachable position
For each position, explore jumps within [minJump, maxJump] range

Approach Without Optimization:
From current index i, we can jump to any index in range [i + minJump, i + maxJump]
Without optimization, we'd check every possible index in this range

Why It's Inefficient:
For each position i:
    Checks all positions from i + minJump to i + maxJump
    Range could be as large as n
    Same positions get added to queue multiple times
    Results in O(n²) time complexity

Example:
Let's say minJump = 2, maxJump = 4

At index 3:

Reachable range: [5, 7] (3+2 to 3+4)
All these indices get queued

At index 4:

Reachable range: [6, 8] (4+2 to 4+4)
Problem: Indices 6,7 were already checked from index 3!

Why BFS over DFS?

BFS explores positions level by level
Better for finding shortest path
More efficient for this problem as we want to reach the end with minimum jumps

*/

// Conceptual code of brute force
const canReach0 = function (s, minJump, maxJump) {
  const queue = [0];
  while (queue.length > 0) {
    const i = queue.shift();
    for (let j = i + minJump; j <= i + maxJump; j++) {
      if (s[j] === '0') queue.push(j);
      if (j === s.length - 1) return true;
    }
  }
  return false;
};

// TC: O(n^2)
// SC: O(n)

/*

The Optimization:

Keep track of farthestReach
When processing index 4:

Instead of checking from [4+2, 4+4]
Check from [max(4+2, farthestReach+1), 4+4] (Actually, in the end boundary, ensure you don't go out of bounds). Therefore, [max(4+2, farthestReach+1), min(4+4, s.length)]
This skips already processed indices

*/

const canReach = function (s, minJump, maxJump) {
  let farthestReach = 0; // Tracks the farthest index we've checked to avoid redundant checks

  // Use a queue to store indices where we have jumped from some other position
  // We will jump from these indices after some time (layer by layer)
  const queue = [0]; // Start BFS from index 0

  while (queue.length > 0) {
    let i = queue.shift(); // Current position
    // Start from max of (required min jump or next unchecked position)
    // Avoids checking same positions multiple times
    // Ensures we only look at new positions
    const start = Math.max(i + minJump, farthestReach + 1);
    // We do: i + maxJump + 1 because we don't want to cover this index
    // i.e. we stop the loop when j === end
    const end = Math.min(i + maxJump + 1, s.length);
    // Check all possible jumps within maxJump range
    for (let j = start; j < end; j++) {
      if (s[j] === '0') {
        queue.push(j);
        console.log(queue);
        if (j === s.length - 1) {
          return true;
        }
      }
    }
    farthestReach = i + maxJump;
  }
  return false;
};

/*

Time & Space Complexity:

Time: O(n), where n is string length
Space: O(n) for the queue

*/
