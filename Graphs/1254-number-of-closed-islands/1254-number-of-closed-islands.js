/**
 * @param {number[][]} grid
 * @return {number}
 */

const closedIsland = function (grid) {
  if (!grid.length) return 0;
  const rows = grid.length;
  const cols = grid[0].length;
  const visited = new Set();
  const dfs = (r, c) => {
    //out of bounds (i.e., it's not a valid cell) => false
    if (r < 0 || r === rows || c < 0 || c === cols) return false;
    //contains water or has already been visited => true
    if (grid[r][c] === 1 || visited.has(`${r}-${c}`)) return true;
    //else, contains land and has not been visited => mark it as visited
    visited.add(`${r}-${c}`);
    let result = 1;
    /* IMPORTANT NOTE:
       WHY I CANNOT USE `return dfs(g, i+1, j) && dfs(g, i, j+1) && dfs(g, i-1, j) && dfs(g, i, j-1);`???
       BECAUSE IF ANY OF THE FIRST DFS() RETURNS FALSE, FOLLOWING ONES WILL NOT EXECUTE!!! THEN WE DON'T HAVE THE CHANCE TO MARK THOSE VISITED!!!
       */
    const right = dfs(r, c + 1);
    const left = dfs(r, c - 1);
    const bottom = dfs(r + 1, c);
    const top = dfs(r - 1, c);
    return right && left && bottom && top;
  };
  let result = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      //If a cell contains land and has not been visited
      //optimization: no need to check the boundary
      //(since they'll never be closed by water)
      if (
        grid[r][c] === 0 &&
        !visited.has(`${r}-${c}`) &&
        r !== 0 &&
        r !== rows - 1 &&
        c !== 0 &&
        c !== cols - 1
      ) {
        result += dfs(r, c) ? 1 : 0;
      }
    }
  }
  return result;
};

/*

Time Complexity:

The code uses depth-first search (DFS) to explore the grid, visiting each cell at most once.
In the worst case, it explores all cells in the grid.
Therefore, the time complexity of the code is O(m * n), where m is the number of rows in the grid, and n is the number of columns in the grid.


Space Complexity:

The space complexity is determined by the additional data structures used during the DFS traversal:

The visited set is used to keep track of visited cells. In the worst case, it can contain all the land cells in the grid.
The DFS function itself is recursive, and the call stack maintains information about function calls and their parameters.
In the worst case, the call stack depth can be as large as the number of land cells in the grid.
Therefore, the space complexity is O(m * n) in the worst case.

In summary, the time complexity is O(m * n), and the space complexity is also O(m * n) in the worst case.

*/
