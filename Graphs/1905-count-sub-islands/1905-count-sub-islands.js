/**
 * @param {number[][]} grid1
 * @param {number[][]} grid2
 * @return {number}
 */

/*

island: group of 1's connected 4-directionally (horizontal or vertical)

sub-island: an island in grid2 is considered a sub-island if there is an island in grid1 that contains all the cells that make up this island in grid2. Basically, every single island in grid2 has a corresponding island in grid1

Also, 2 sub-islands in grid2 can contribute to the same island in grid1

Simultaneous DFS: DFS on grid 2 and check the simultaneous position

*/
const countSubIslands = function (grid1, grid2) {
  const visited = new Set(); //keep track of visited cells
  const rows = grid1.length;
  const cols = grid1[0].length;
  let subIslands = 0;

  const dfs = (r, c) => {
    //if the current cell is out of bounds or has already been visited => we were able to exhaust the entire island, return true (indicating it's still a part of a sub-island).
    //just because we found water in grid 2 doesn't mean it's not a sub-island
    if (
      r === rows ||
      c === cols ||
      r < 0 ||
      c < 0 ||
      grid2[r][c] === 0 ||
      visited.has(`(${r}, ${c})`)
    )
      return true;
    //else, the current cell in grid2 is land
    //mark the current cell as visited
    visited.add(`(${r}, ${c})`);
    let result = true;
    //if the current cell in grid2 is land and in grid1 is water => false
    //don't return false immediately (it could still be a sub-island so run all 4 directions for the land)
    if (grid1[r][c] === 0) result = false;
    //if any of the 4 directions returns false
    //till now, we were able to determine the specific cell in grid1, check
    //all 4 neighbours now
    const right = dfs(r, c + 1);
    const bottom = dfs(r + 1, c);
    const left = dfs(r, c - 1);
    const top = dfs(r - 1, c);
    return result && right && bottom && left && top;
  };
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      //sub-islands are islands in grid2 so...
      //if the current position in grid2 is a land and unvisited
      if (grid2[r][c] === 1 && !visited.has(`(${r}, ${c})`)) {
        //if it's a sub-island, increment the counter
        if (dfs(r, c)) subIslands++;
      }
    }
  }
  return subIslands;
};

//Approach 2:

const countSubIslands2 = function (grid1, grid2) {
  const visited = new Set(); //keep track of visited cells
  const rows = grid1.length;
  const cols = grid1[0].length;
  let subIslands = 0;

  const dfs = (r, c) => {
    if (
      r === rows ||
      c === cols ||
      r < 0 ||
      c < 0 ||
      grid2[r][c] === 0 ||
      visited.has(`(${r}, ${c})`)
    )
      return;
    visited.add(`(${r}, ${c})`);
    dfs(r, c + 1);
    dfs(r + 1, c);
    dfs(r, c - 1);
    dfs(r - 1, c);
  };

  //first remove all the non-common lands (mark them visited so we don't visit them when counting sub-islands)
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid2[r][c] === 1 && grid1[r][c] === 0) {
        if (dfs(r, c)) subIslands++;
      }
    }
  }

  //counting sub-islands
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      //sub-islands are islands in grid2 so...
      //if the current position in grid2 is a land and unvisited
      if (grid2[r][c] === 1 && !visited.has(`(${r}, ${c})`)) {
        //if it's a sub-island, increment the counter
        dfs(r, c);
        subIslands++;
      }
    }
  }
  return subIslands;
};

/*

  Time Complexity:
  The code uses depth-first search (DFS) to traverse both grid1 and grid2. In the worst case, it visits each cell once in both grids. Therefore, the time complexity is O(m * n), where:

  'm' is the number of rows in the grids.
  'n' is the number of columns in the grids.

  Space Complexity:

  The primary space usage comes from the visited set, which can potentially store the coordinates of all cells in both grids that are visited during the DFS traversal. In the worst case, this set can have a size of O(m * n). Therefore, the space complexity for the visited set is O(m * n).

  The recursive call stack during the DFS traversal can go as deep as the maximum island size. In the worst case, the maximum island size is also O(m * n) if the entire grid consists of a single island. Therefore, the space complexity for the call stack is O(m * n).

  Overall, the space complexity of the code is O(m * n) due to the visited set and the call stack.

  */
