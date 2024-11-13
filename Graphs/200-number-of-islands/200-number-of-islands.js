/**
 * @param {character[][]} grid
 * @return {number}
 */

/*This problem can be viewed as a graph problem because the grid can be modeled as a graph where each cell represents a node,
and edges are formed between adjacent land cells (horizontally and vertically).
In this graph, an island is essentially a connected component, which is a subset of nodes that are
connected to each other through edges, and these nodes cannot be reached from the rest of the graph.

Here's why it can be considered a graph problem:

Nodes: Each cell in the grid can be considered a node in the graph.

Edges: Edges are formed between adjacent land cells (cells containing '1'). If two land cells are horizontally or vertically adjacent, there is an edge between them.

Connected Components: An island in the grid corresponds to a connected component in the graph. In a connected component, every node can be reached from any other node within the same component by following the edges.

Traversal: To find the number of islands, you can perform graph traversal techniques like Depth-First Search (DFS) or Breadth-First Search (BFS). You start from an unvisited land cell ('1') and explore all the connected land cells within the same island using DFS or BFS.
After visiting all nodes in an island, you move on to the next unvisited land cell to find the next island.

Counting Islands: The number of connected components (islands) you find during traversal corresponds to the number of islands in the grid.

*/

const numIslands = function (grid) {
  // Edge case: empty grid => 0 islands
  if (!grid.length) return 0;
  const rows = grid.length;
  const cols = grid[0].length;
  const visited = new Set();
  let islands = 0;
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ]; // Down, Up, Right, Left

  const bfs = (r, c) => {
    // Store cells to be processed.
    const queue = [];
    // Add the first cell to queue
    queue.push([r, c]);
    // And mark it as visited
    visited.add(`${r}-${c}`);
    while (queue.length) {
      // Process the cell (island)
      const [row, col] = queue.shift();
      // Visit all adjacent direcions (neighbors) of the current island
      for (let [dr, dc] of directions) {
        // [0, 0]:
        // dr = 1, r = 0 + 1 = 1      | dc = 0, c = 0 + 0 = 0 => [1, 0] (go down)
        // dr = -1, r = 0 + (-1) = -1 | dc = 0, c = 0 + 0 = 0 => [-1, 0] (go above)
        // dr = 0, r = 0 + 0 = 0      | dc = 1, c = 0 + 1 = 1 => [0, 1] (go right)
        // dr = 0, r = 0 + 0 = 0      | dc = -1, c = -1 + 0 = -1 => [0, -1] (go left)
        const newRow = row + dr;
        const newCol = col + dc;
        // If the new position is in bounds (both rows, cols) AND it's a land
        // AND unvisited
        if (
          newRow >= 0 &&
          newCol >= 0 &&
          newRow < rows &&
          newCol < cols &&
          grid[newRow][newCol] === '1' &&
          !visited.has(`${newRow}-${newCol}`)
        ) {
          // Add the cell to the queue to process later
          queue.push([newRow, newCol]);
          // Mark visited
          visited.add(`${newRow}-${newCol}`);
        }
      }
    }
  };

  // Go through every row
  for (let r = 0; r < rows; r++) {
    // Go through every column of every row
    for (let c = 0; c < cols; c++) {
      // If we encounter a land AND it has not been visited before, visit it
      if (grid[r][c] === '1' && !visited.has(`${r}-${c}`)) {
        // Run bfs on the island
        // Explores the entire island connected to the current cell
        bfs(r, c);
        // Increment the island count after visiting all adjacent cells
        islands++;
      }
    }
  }
  return islands;
};

/*This BFS approach ensures that all cells of each island are visited and counted
while avoiding revisiting cells that are part of previously explored islands.
The time complexity is O(m * n), where m and n are the dimensions of the grid,
and the space complexity is also O(m * n) due to the visited set and the BFS queue. */

const numIslandsDFS = function (grid) {
  if (!grid.length) return 0;
  let islands = 0;
  const rows = grid.length;
  const cols = grid[0].length;
  const visited = new Set();
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
    if (
      r >= 0 &&
      r < rows &&
      c >= 0 &&
      c < cols &&
      grid[r][c] === '1' &&
      !visited.has(`${r}-${c}}`)
    ) {
      visited.add(`${r}-${c}}`);
      for (let [dr, dc] of directions) {
        const newRow = r + dr;
        const newCol = c + dc;
        dfs(newRow, newCol);
      }
    }
  };

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++)
      //only check the cells that are islands and have not been visited before
      if (grid[r][c] === '1' && !visited.has(`${r}-${c}}`)) {
        dfs(r, c);
        islands++;
      }
  }
  return islands;
};

/*Time Complexity:

In the worst case, the DFS algorithm visits each cell in the grid once and performs a constant amount of work for each cell.
The main loop iterates through all rows and columns of the grid, which results in a total of O(m * n) iterations, where 'm' is the number of rows, and 'n' is the number of columns.
Within each cell, the DFS function may recursively visit neighboring cells, but each cell is visited at most once. This leads to a constant-time operation for each cell.
Therefore, the overall time complexity of this DFS solution is O(m * n), where 'm' and 'n' are the dimensions of the grid.

Space Complexity:

The space complexity primarily depends on the space used by the 'visited' set, which keeps track of visited cells to avoid revisiting them.
In the worst case, all cells in the grid are considered part of a single island, and thus, all cell coordinates are stored in the 'visited' set.
The 'visited' set can potentially contain all 'm * n' cell coordinates, leading to a space complexity of O(m * n).
Additionally, the DFS function's call stack also contributes to space usage.
In the worst case, the call stack depth could be 'm * n' for a grid with a single large island.
Therefore, the overall space complexity of this DFS solution is O(m * n).

*/
