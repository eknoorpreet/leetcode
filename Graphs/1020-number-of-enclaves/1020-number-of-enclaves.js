/**
 * @param {number[][]} grid
 * @return {number}
 */

/*
"Return the number of land cells in grid for which we cannot walk off the boundary of the grid in any number of moves."
In other words, you want to count the land cells that are not connected to the boundary of the grid. These are the areas of land that are not connected to the outer boundary and cannot be reached by walking from land cell to land cell (surrounded by water).
*/

const numEnclaves = function (grid) {
  if (!grid.length) return 0;
  const rows = grid.length;
  const cols = grid[0].length;
  const visited = new Set(); //will contain coordinates that we already visited

  //calculate land cells connected to boundary
  const dfs = (r, c) => {
    //invalid (out of bounds or already visited) or contains water => dont' add (or just add 0)
    if (
      r < 0 ||
      r === rows ||
      c < 0 ||
      c === cols ||
      grid[r][c] === 0 ||
      visited.has(`${r}-${c}`)
    )
      return 0;
    visited.add(`${r}-${c}`);
    let result = 1;
    const directions = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];
    for (let [dr, dc] of directions) {
      const newRow = r + dr;
      const newCol = c + dc;
      result += dfs(newRow, newCol);
    }
    return result;
  };

  let land = 0;
  let borderLand = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      //increment the land counter to keep track of the total number of land cells.
      //(will only add land since water is 0)
      land += grid[r][c];
      //if the cell is an island AND unvisited AND is on the boundary (top, bottom, left, or right), call the dfs function to explore the connected land cells.
      if (
        grid[r][c] === 1 &&
        !visited.has(`${r}-${c}`) &&
        (c === 0 || c === cols - 1 || r === 0 || r === rows - 1)
      ) {
        borderLand += dfs(r, c);
      }
    }
  }
  //difference between the total number of land cells (land) and the number of land cells connected to the boundary (borderLand). This gives the number of land cells that are completely enclosed and not connected to the boundary.
  return land - borderLand;
};

/*

Time Complexity:

The code uses Depth-First Search (DFS) to traverse the grid. In the worst case, it visits each land cell once. The DFS function traverses adjacent land cells in constant time.

The double nested loops iterate through each cell in the grid, which results in O(m * n) iterations, where:

'm' is the number of rows in the grid.
'n' is the number of columns in the grid.
Overall, the time complexity of the code is O(m * n), where 'm' and 'n' are the dimensions of the grid.

Space Complexity:

The visited set is used to keep track of visited cells. In the worst case, all land cells in the grid are visited, which results in O(m * n) space complexity for the visited set.

The depth of the call stack during the DFS traversal can go up to the maximum number of land cells in the grid. In the worst case, if all cells are land, this would also be O(m * n).

There are a few additional variables used, but their space usage is negligible compared to the visited set and the call stack.

Overall, the space complexity of the code is O(m * n) due to the visited set and the call stack.

In summary, the code has a time complexity of O(m * n) and a space complexity of O(m * n), where 'm' and 'n' are the dimensions of the grid.

*/
