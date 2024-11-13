/*

You are given an m x n grid rooms initialized with these three possible values.

-1 A wall or an obstacle.
0 A gate.
INF Infinity means an empty room. We use the value 231 - 1 = 2147483647 to represent INF as you may assume that the distance to a gate is less than 2147483647.
Fill each empty room with the distance to its nearest gate. If it is impossible to reach a gate, it should be filled with INF.



Example 1:


Input: rooms = [[2147483647,-1,0,2147483647],[2147483647,2147483647,2147483647,-1],[2147483647,-1,2147483647,-1],[0,-1,2147483647,2147483647]]
Output: [[3,-1,0,1],[2,2,1,-1],[1,-1,2,-1],[0,-1,3,4]]
Example 2:

Input: rooms = [[-1]]
Output: [[-1]]


Constraints:

m == rooms.length
n == rooms[i].length
1 <= m, n <= 250
rooms[i][j] is -1, 0, or 2^31 - 1.

*/

/**
 * @param {number[][]} rooms
 * @return {void} Do not return anything, modify rooms in-place instead.
 */

/*

Reverse thinking (same as https://leetcode.com/problems/pacific-atlantic-water-flow/)

Key Insight:
Instead of starting from empty rooms and searching for gates (which would be inefficient), we:

Start from all gates simultaneously
Use multi-source BFS to spread outward (same as https://leetcode.com/problems/rotting-oranges/)
First time we reach an empty room is guaranteed to be shortest path
Process by levels (similar to level-order traversal)

The main advantage of starting from gates is that the first time we reach an empty room is guaranteed to be via the shortest path, since we're exploring all possibilities simultaneously and level by level.

*/

const wallsAndGates = function (rooms) {
  const rows = rooms.length;
  if (rows === 0) return 0;
  const cols = rooms[0].length;

  const queue = []; // Store coordinates of gates
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (rooms[row][col] === 0) queue.push([row, col]);
    }
  }

  let distance = 0;
  while (queue.length > 0) {
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      // Initially, a gate
      const [row, col] = queue.shift();
      // Whose distance to itself = 0
      // Set the distance of the current cell
      rooms[row][col] = distance;
      for (const [dr, dc] of directions) {
        const newRow = row + dr;
        const newCol = col + dc;
        // Check bounds of the neighbor and if it's an empty room
        if (
          newRow >= 0 &&
          newRow < rows &&
          newCol >= 0 &&
          newCol < cols &&
          rooms[newRow][newCol] === 2147483647 // means an empty room
        ) {
          // Increment the distance of neighbour the room by 1
          rooms[newRow][newCol] = rooms[row][col] + 1;
          // Process adjacent rooms
          queue.push([newRow, newCol]);
        }
      }
    }
    distance++;
  }
};

/*

Time Complexity: O(m × n) where m and n are dimensions of grid
Space Complexity: O(m × n) for the queue

*/
