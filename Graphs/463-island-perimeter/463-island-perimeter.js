/**
 * @param {number[][]} grid
 * @return {number}
 */

/*

The main intuition behind this solution is that we can find the perimeter by counting how many sides of each land cell are adjacent to either water or the grid boundary. Each land cell (1) contributes to the perimeter when it meets water (0) or the grid boundary

We use DFS to traverse the island and count these boundaries

*/

const islandPerimeter = function (grid) {
  if (!grid.length) return 0;
  const rows = grid.length;
  const cols = grid[0].length;
  const visited = new Set(); // Will contain coordinates that we already visited
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  const dfs = (r, c) => {
    // Base case: wherever the cell hits a boundary or water (which are adjacent to an island since
    // that's what we're targeting), add to perimeter
    // (Here, we don't need to check if the island has not been visited before since the cell
    // is either 1) out of bounds 2) water and these cells will never be marked visited by our
    // algorithm)
    if (r < 0 || r === rows || c < 0 || c === cols || grid[r][c] === 0) {
      // perimeter++;
      return 1;
    }
    // Else, it's an island and is in bounds

    // If we've already visited the island => don't add (just add 0)
    if (visited.has(`${r}-${c}`)) {
      return 0;
    }
    // Else, the island is unvisited => mark it as visited
    visited.add(`${r}-${c}`);
    // And visit its neighbours

    // let perimeter = dfs(r, c + 1) //top
    // perimeter += dfs(r + 1, c) //right
    // perimeter += dfs(r, c - 1) //bottom
    // perimeter += dfs(r - 1, c) //left

    // Instead of manually doing it, loop through all directions
    let perimeter = 0;
    for (let [dr, dc] of directions) {
      const newRow = r + dr;
      const newCol = c + dc;
      perimeter += dfs(newRow, newCol);
    }
    return perimeter;
  };

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      // Only target the islands
      // Once the DFS is over and has calculated the perimeter,
      // we just return the result of the function.
      // We don't move on to the next island since there is only 1 island in the grid.
      // See Note 1
      if (grid[r][c] === 1) return dfs(r, c);
    }
  }
};

/*

Note 1:
Basically, in the other problem, we wanted to add the calculate the number of islands
So, if a land had already been visited, we know that it must be a part of an island
that has already been counted.

But here, we want to go through all the land cells to see if they are adjacent to water or grid boundary
This is why we don't check if the cell has not been visited before already, via: !visited.has(`${r}-${c}}`)

*/

// Via global counter
const islandPerimeterGlobal = function (grid) {
  if (!grid.length) return 0;
  const rows = grid.length;
  const cols = grid[0].length;
  const visited = new Set(); //will contain coordinates that we already visited
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  let perimeter = 0;

  const dfs = (r, c) => {
    //base case: wherever the cell hits a boundary or water, add to perimeter
    if (r < 0 || r === rows || c < 0 || c === cols || grid[r][c] === 0) {
      perimeter++;
      return;
    }
    //if we've already visited the cell => return
    if (visited.has(`${r}-${c}`)) return;
    visited.add(`${r}-${c}`);
    for (let [dr, dc] of directions) {
      const newRow = r + dr;
      const newCol = c + dc;
      dfs(newRow, newCol);
    }
  };

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 1) dfs(r, c);
    }
  }
  return perimeter;
};

/*

Time Complexity:

In the worst case, the DFS algorithm visits each cell in the grid once and performs a constant amount of work for each cell.
The main loop iterates through all rows and columns of the grid, which results in a total of O(m * n) iterations,
where 'm' is the number of rows, and 'n' is the number of columns.
Within each cell, the DFS function may recursively visit neighboring cells, but each cell is visited at most once.
This leads to a constant-time operation for each cell.
Therefore, the overall time complexity of this DFS solution is O(m * n),
where 'm' and 'n' are the dimensions of the grid.

Space Complexity:

The space complexity primarily depends on the space used by the 'visited' set,
which keeps track of visited cells to avoid revisiting them.
In the worst case, all cells in the grid are considered part of a single island, and thus,
all cell coordinates are stored in the 'visited' set.
The 'visited' set can potentially contain all 'm * n' cell coordinates,
leading to a space complexity of O(m * n).
Additionally, the DFS function's call stack also contributes to space usage.
In the worst case, the call stack depth could be 'm * n' for a grid with a single large island.
Therefore, the overall space complexity of this DFS solution is O(m * n).

*/
