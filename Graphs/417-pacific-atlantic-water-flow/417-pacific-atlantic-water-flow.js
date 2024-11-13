/**
 * @param {number[][]} heights
 * @return {number[][]}
 */

/*

The brute-force approach would be to check every cell to see if it can reach both oceans through DFS/BFS.
for(let r = 0; r < rows; r++) {
    for(let c = 0; c < cols; c++) {
        // Need two separate DFS - one for each ocean
        const visitedPacific = new Set();
        const visitedAtlantic = new Set();

        const reachesPacific = dfs(r, c, visitedPacific, heights[r][c]);
        const reachesAtlantic = dfs(r, c, visitedAtlantic, heights[r][c]);

        if(reachesPacific && reachesAtlantic) {
            result.push([r, c]);
        }
    }
}

Time Complexity: O(m×n×(m+n))

For each cell (m×n)
We do two DFS searches
Each DFS can visit O(m+n) cells in worst case

Think of a snake-like path to ocean

Optimal:

Key Intuition:
Instead of checking each cell to see if it can flow to both oceans (top-down), we:

Start from ocean borders and work inward (bottom-up)
Find cells that can be reached from each ocean
Find intersection of those cells

A cell can flow to an adjacent smaller or equal height cell

Going in the opposite direction (from the ocean to grid), it can flow to an adjacent greater or equal height cell

*/

const pacificAtlantic = function (heights) {
  // Edge case: empty grid => 0
  const rows = heights.length;
  if (rows === 0) return 0;
  const cols = heights[0].length;
  const result = [];
  // Cells reachable from Pacific
  const canReachPacific = new Set();
  // Cells reachable from Atlantic
  const canReachAtlantic = new Set();
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  const dfs = (row, col, visited, prevHeight) => {
    // Skip if:
    // - Already visited
    // - Out of bounds (we're going FROM the ocean so if we reach the ocean => return)
    // - Current height < Previous height (water can't flow up)
    if (
      row < 0 ||
      col < 0 ||
      row === rows ||
      col === cols ||
      visited.has(`${row}-${col}`) ||
      heights[row][col] < prevHeight
    )
      return;

    visited.add(`${row}-${col}`);

    // Check all neighbors
    for (const [dr, dc] of directions) {
      const newRow = dr + row;
      const newCol = dc + col;
      dfs(newRow, newCol, visited, heights[row][col]);
    }
  };

  // Explore Borders (top and bottom)
  for (let col = 0; col < cols; col++) {
    // Go through every cell in 1st row (row = 0, all columns) (pacific)
    // We can go to greater or equal height cells
    dfs(0, col, canReachPacific, heights[0][col]);
    // Go through every cell in last row (last row, all columns) (atlantic)
    dfs(rows - 1, col, canReachAtlantic, heights[rows - 1][col]);
  }

  // Explore Borders (left and right)
  for (let row = 0; row < rows; row++) {
    // Go through every cell in 1st col ( all rows, col = 0) (pacific)
    dfs(row, 0, canReachPacific, heights[row][0]);
    // Go through every cell in last col (all rows, last col) (atlantic)
    dfs(row, cols - 1, canReachAtlantic, heights[row][cols - 1]);
  }

  // Iterate through all cells in the grid
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      // If a cell exists in both the sets => add to result
      if (
        canReachPacific.has(`${row}-${col}`) &&
        canReachAtlantic.has(`${row}-${col}`)
      ) {
        result.push([row, col]);
      }
    }
  }
  return result;
};

/*

Time & Space:

Time: O(m×n) - visit each cell once from each ocean
Space: O(m×n) - for visited sets and recursion stack

Key Insights:

Reverse thinking simplifies problem
Starting from oceans eliminates need to find paths to ocean
Using sets for tracking makes intersection finding efficient

*/
