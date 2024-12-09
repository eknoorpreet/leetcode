/*

You are given an m x n grid where each cell can have one of three values:

0 representing an empty cell,
1 representing a fresh orange, or
2 representing a rotten orange.
Every minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten.

Return the minimum number of minutes that must elapse until no cell has a fresh orange. If this is impossible, return -1.



Example 1:


Input: grid = [[2,1,1],[1,1,0],[0,1,1]]
Output: 4
Example 2:

Input: grid = [[2,1,1],[0,1,1],[1,0,1]]
Output: -1
Explanation: The orange in the bottom left corner (row 2, column 0) is never rotten, because rotting only happens 4-directionally.
Example 3:

Input: grid = [[0,2]]
Output: 0
Explanation: Since there are already no fresh oranges at minute 0, the answer is just 0.


Constraints:

m == grid.length
n == grid[i].length
1 <= m, n <= 10
grid[i][j] is 0, 1, or 2.

*/

/**
 * @param {number[][]} grid
 * @return {number}
 */

/*

We can try DFS but it won't work. Why? Well, in DFS, we'll start from the first orange until all oranges become rotten. Time = 5 mins but the answer is 4. How? Well, if we have 2 rotten oranges (let's say, at the first and last col of the 1st row), they'll start spreading the rotten value to their respective adjacent oranges together (in the same minute). This calls for (level-size) BFS! We don't have to wait for DFS to finish on 1 cell to move on to the next; we can run a mult-source BFS at the same time!

This is a "spreading" problem where changes happen simultaneously in multiple directions, making it perfect for BFS (Breadth-First Search) rather than DFS.
It's specifically a "multi-source" BFS because we can have multiple rotten oranges at the start.

Why BFS instead of DFS?

DFS would process one path completely before moving to another
In reality, rotting happens simultaneously from all rotten oranges
BFS processes all rotten oranges at the same "level" (time step) together

Key Points:

Level-by-level processing ensures all oranges at the same distance become rotten simultaneously
We keep track of fresh oranges to know when to stop
We process the queue in "levels" using the size variable - this represents one minute of time
We only increment time after processing all oranges at the current level

How to perform a multi-source BFS? Add all rotten oranges to the queue first

*/

const orangesRotting = function (grid) {
  const rows = grid.length;
  if (rows === 0) return 0;
  let time = 0;
  // There could still be an orange distant from rotten oranges => will never be rotten
  // Therefore, keep track of fresh oranges
  let fresh = 0;
  const queue = []; // Store coordinates of rotten oranges
  const cols = grid[0].length;

  // By adding all rotten oranges to the queue first (and processing their adjacent
  // fresh oranges to rotten), we perform a multi-source BFS
  // (oranges being rotten from different sources)

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      // Count fresh oranges
      if (grid[row][col] === 1) fresh++;
      // Queue rotten oranges
      if (grid[row][col] === 2) queue.push([row, col]);
    }
  }
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  while (queue.length && fresh > 0) {
    // Current level size
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      // Process the current rotten orange
      const [row, col] = queue.shift();
      // Visit all adjacent directions of the current (rotten) orange
      for (let [dr, dc] of directions) {
        const newRow = row + dr;
        const newCol = col + dc;
        // If the new position is in bounds
        // AND it's a fresh orange
        if (
          newRow >= 0 &&
          newCol >= 0 &&
          newRow < rows &&
          newCol < cols &&
          grid[newRow][newCol] === 1
        ) {
          // Mark it "rotten" (so we don't visit it again since we only want to visit the
          // (yet) fresh oranges about to become rotten)
          grid[newRow][newCol] = 2;
          // Add the rotten orange to the queue to process later
          queue.push([newRow, newCol]);
          //decrement fresh oranges
          fresh--;
        }
      }
    }
    time++;
  }
  // If there's still fresh oranges left => return -1 else return the time
  return fresh === 0 ? time : -1;
};

/*

Time Complexity: O(m × n) where m and n are the dimensions of the grid
Space Complexity: O(m × n) for the queue

*/
