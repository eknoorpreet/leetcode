/*

Given an array of non-negative integers arr, you are initially positioned at start index of the array. When you are at index i, you can jump to i + arr[i] or i - arr[i], check if you can reach any index with value 0.

Notice that you can not jump outside of the array at any time.



Example 1:

Input: arr = [4,2,3,0,3,1,2], start = 5
Output: true
Explanation:
All possible ways to reach at index 3 with value 0 are:
index 5 -> index 4 -> index 1 -> index 3
index 5 -> index 6 -> index 4 -> index 1 -> index 3
Example 2:

Input: arr = [4,2,3,0,3,1,2], start = 0
Output: true
Explanation:
One possible way to reach at index 3 with value 0 is:
index 0 -> index 4 -> index 1 -> index 3
Example 3:

Input: arr = [3,0,2,1,2], start = 2
Output: false
Explanation: There is no way to reach at index 1 with value 0.


Constraints:

1 <= arr.length <= 5 * 10^4
0 <= arr[i] < arr.length
0 <= start < arr.length

*/

/**
 * @param {number[]} arr
 * @param {number} start
 * @return {boolean}
 */

/*

The intuition behind using Breadth-First Search (BFS) for this problem lies in its ability to
explore all possible paths level by level, ensuring that we systematically check every reachable
index.

*/

const canReach = function (arr, start) {
  const queue = [start];
  // Cycle detection by marking visited indices, preventing infinite loops.
  const visited = new Set();

  while (queue.length > 0) {
    const i = queue.shift();
    if (arr[i] === 0) return true;

    // Mark as visited
    visited.add(i);
    const left = i - arr[i];
    const right = i + arr[i];
    if (left === right) return false;

    // Skip visited nodes, don't return false
    // Just because we hit a visited node doesn't mean there's no solution
    // There might be other paths we haven't explored yet
    // We should skip visited nodes, not return false
    if (left >= 0 && !visited.has(left)) {
      queue.push(left);
    }
    if (right < arr.length && !visited.has(right)) {
      queue.push(right);
    }
  }
  return false;
};

// TC: O(n)
// SC: O(n)
