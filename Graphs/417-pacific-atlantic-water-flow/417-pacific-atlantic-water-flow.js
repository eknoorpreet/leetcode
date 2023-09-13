/**
 * @param {number[][]} heights
 * @return {number[][]}
 */

/*

Instead of checking if every cell can reach pacific and atlantic, we start from pacific and check the border cells.

A cell can flow to an adjacent smaller or equal height cell

Going in the opposite direction (from the ocean to grid), it can flow to an adjacent greater or equal height cell

*/
const pacificAtlantic = function (heights) {
  //edge case: empty grid => 0
  if (!heights.length) return 0;
  const rows = heights.length;
  const cols = heights[0].length;
  //cells that can reach pacific
  const canReachPacific = new Set();
  //cells that can reach atlantic
  const canReachAtlantic = new Set();
  const result = [];
  const dfs = (r, c, visited, prevHeight) => {
    //if the cell has already been visited or out of bounds (we're going FROM the ocean so if we reach the ocean => return) or current height is smaller => return
    if (
      visited.has(`${r}-${c}`) ||
      r < 0 ||
      c < 0 ||
      r === rows ||
      c === cols ||
      heights[r][c] < prevHeight
    )
      return;
    visited.add(`${r}-${c}`);
    dfs(r + 1, c, visited, heights[r][c]);
    dfs(r - 1, c, visited, heights[r][c]);
    dfs(r, c + 1, visited, heights[r][c]);
    dfs(r, c - 1, visited, heights[r][c]);
  };

  //Explore Borders (top and bottom)

  for (let c = 0; c < cols; c++) {
    //go through every cell in 1st row (row = 0, all columns) (pacific)
    //we can go to greater or equal height cells
    dfs(0, c, canReachPacific, heights[0][c]);
    //go through every cell in last row (last row, all columns) (atlantic)
    dfs(rows - 1, c, canReachAtlantic, heights[rows - 1][c]);
  }

  //Explore Borders (left and right)

  for (let r = 0; r < rows; r++) {
    //go through every cell in 1st col ( all rows, col = 0) (pacific)
    dfs(r, 0, canReachPacific, heights[r][0]);
    //go through every cell in last col (all rows, last col) (atlantic)
    dfs(r, cols - 1, canReachAtlantic, heights[r][cols - 1]);
  }

  //Iterate through all cells in the grid
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      //If a cell exists in both the sets => add to result
      if (canReachPacific.has(`${r}-${c}`) && canReachAtlantic.has(`${r}-${c}`))
        result.push([r, c]);
    }
  }
  return result;
};

/*

Time Complexity:

The code performs a Depth-First Search (DFS) traversal on the grid.
In the worst case, the DFS function is called for each cell in the grid, and each cell is visited at most once.
The grid has m rows and n columns, so there are a total of m * n cells.
Therefore, the time complexity of the DFS traversal is O(m * n).

Space Complexity:

The space used by the sets and arrays depends on the number of cells that can be reached from either ocean and the number of cells that need to be visited.
In the worst case, all cells can be reached from both oceans (i.e., they can all flow to both oceans), so both canReachPacific and canReachAtlantic sets could contain all m * n cells.
Therefore, the worst-case space complexity is O(m * n) for the sets and O(m * n) for the visited set.
The result array stores the coordinates of cells that meet the conditions, and in the worst case, it can also contain all m * n cells.
Overall, the space complexity is O(m * n) due to the sets and the result array.

*/
