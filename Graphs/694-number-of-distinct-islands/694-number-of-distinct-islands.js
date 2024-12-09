/*

You are given an m x n binary matrix grid. An island is a group of 1's (representing land) connected 4-directionally (horizontal or vertical.) You may assume all four edges of the grid are surrounded by water.

An island is considered to be the same as another if and only if one island can be translated (and not rotated or reflected) to equal the other.

Return the number of distinct islands.



Example 1:


Input: grid = [[1,1,0,0,0],[1,1,0,0,0],[0,0,0,1,1],[0,0,0,1,1]]
Output: 1
Example 2:


Input: grid = [[1,1,0,1,1],[1,0,0,0,0],[0,0,0,0,1],[1,1,0,1,1]]
Output: 3


Constraints:

m == grid.length
n == grid[i].length
1 <= m, n <= 50
grid[i][j] is either 0 or 1.

*/

/**
 * @param {number[][]} grid
 * @return {number}
 */

/*

Same as 200. Number of Islands, except, here, we need to account for island shape equivalence
rather than simply counting connected components.

Two islands are considered the same if one can be translated to match the other.
Translation means shifting the entire island to align it to a common reference point,
such as (0, 0).

Keep track of unique shapes (as strings) using a set. If two islands have the same relative
positions, their encoded strings will be identical, and only one will be stored.

*/

const numDistinctIslands = function (grid) {
  if (!grid.length) return 0;
  const rows = grid.length;
  const cols = grid[0].length;
  const visited = new Set();
  const islands = new Set();
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ]; // Down, Up, Right, Left

  const bfs = (r, c) => {
    const queue = [[r, c]];
    visited.add(`${r}-${c}`);
    let island = '';

    while (queue.length) {
      const [row, col] = queue.shift();

      for (let [dr, dc] of directions) {
        const newRow = row + dr;
        const newCol = col + dc;

        if (
          newRow >= 0 &&
          newCol >= 0 &&
          newRow < rows &&
          newCol < cols &&
          grid[newRow][newCol] === 1 &&
          !visited.has(`${newRow}-${newCol}`)
        ) {
          queue.push([newRow, newCol]);
          visited.add(`${newRow}-${newCol}`);

          // Add relative position when exploring valid neighbors
          island += `${newRow - r},${newCol - c}`;
        }
      }
    }

    islands.add(island);
  };

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 1 && !visited.has(`${r}-${c}`)) {
        bfs(r, c);
      }
    }
  }
  return islands.size;
};

/*

The time complexity is O(m * n), where m and n are the dimensions of the grid,
and the space complexity is also O(m * n) due to the visited set and the BFS queue.

*/
