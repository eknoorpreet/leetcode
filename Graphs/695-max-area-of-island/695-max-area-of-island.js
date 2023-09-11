/**
 * @param {number[][]} grid
 * @return {number}
 */

//go through all islands and caluclate the area for each
//keep track of the maxArea (update it accordingly)

const maxAreaOfIsland = function (grid) {
  if (!grid.length) return 0;
  const rows = grid.length;
  const cols = grid[0].length;
  const visited = new Set();
  let maxArea = 0;
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  const dfs = (r, c) => {
    //initially, the nested for loops make sure that the cell would be
    //1) in bounds 2) island 3) unvisited
    //but we need to check all 3 conditions for the neighbours as well

    //this is the base case: if the cell is out of bounds, contains water, or has already been visited (island exhausted) => don't add more to area (just add 0)
    if (
      r < 0 ||
      r === rows ||
      c < 0 ||
      c === cols ||
      grid[r][c] === 0 ||
      visited.has(`${r}-${c}`)
    )
      return 0;
    //otherwise, keep on adding to the island
    visited.add(`${r}-${c}`);
    let localArea = 1;
    for (let [dr, dc] of directions) {
      const newRow = r + dr;
      const newCol = c + dc;
      localArea += dfs(newRow, newCol);
    }
    return localArea;
  };

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      //only visit the 1) islands 2) that are unvisited yet
      //See Note 1.
      if (grid[r][c] === 1 && !visited.has(`${r}-${c}`)) {
        maxArea = Math.max(maxArea, dfs(r, c));
      }
    }
  }
  return maxArea;
};

/*
Note 1: It's not necessary to check the above conditions since the DFS function already checks them and returns 0 if they're not fulfiled.
But you can skip the DFS call entirely for cells that are not part of an island or have already been visited.
Without these checks, the code would still work correctly,
but it would perform redundant DFS traversals on cells that are not part of an island or
have already been visited. These traversals would return 0, but they consume time and resources.
By avoiding unnecessary DFS calls, you reduce the amount of redundant work.

*/

/*

Time Complexity:

The code uses depth-first search (DFS) to explore each cell in the grid exactly once.
In the worst case, it visits each cell of the grid, making it O(m * n), where 'm' is the number of rows and 'n' is the number of columns in the grid.
Within the DFS, for each cell that belongs to an island, it may explore up to four neighboring cells (up, down, left, right).
Therefore, the time complexity of the DFS part is O(4 * m * n), which simplifies to O(m * n).
Overall, the time complexity of the code is O(m * n) because the DFS traversal is the dominant factor.

Space Complexity:

The code uses a visited set to keep track of visited cells.
In the worst case, it may store all cells in the grid, which is O(m * n) space complexity.
The recursive DFS calls also consume space on the call stack. In the worst case, the maximum depth of the call stack is equal to the number of cells in the grid.
Therefore, the space complexity for the call stack is also O(m * n).
Overall, the space complexity of the code is O(m * n) due to both the visited set and the call stack for recursive DFS calls.
*/
