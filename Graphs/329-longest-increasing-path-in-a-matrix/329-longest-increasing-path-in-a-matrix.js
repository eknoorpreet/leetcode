/**
 * @param {number[][]} matrix
 * @return {number}
 */

const longestIncreasingPath = function (matrix) {
  // Get the number of rows in the matrix
  const rows = matrix.length;
  // If there are no rows (empty matrix), return 0
  if (rows === 0) {
    return 0;
  }

  // Get the number of columns in the matrix
  const cols = matrix[0].length;

  // Create an indegree array to store the indegree (the number of incoming edges) of each cell in the matrix
  //"a directed edge from node x to node y if x and y are adjacent and x's value < y's value": y will have a smaller neighbor x as its incoming edge (x can increasingly go to y)
  //if current cell y > neighbor, x -> y (directed edge, path from the neighbor to the current cell), increase indegree of y
  const indegree = new Array(rows).fill().map(() => new Array(cols).fill(0));

  // Define the four possible directions: left, right, up, and down
  const directions = [
    [0, -1],
    [0, 1],
    [1, 0],
    [-1, 0],
  ];

  // Calculate the indegree for each cell in the matrix
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      for (const direction of directions) {
        const [dr, dc] = direction;
        const newRow = row + dr;
        const newCol = col + dc;
        // Check if the neighbor is within the matrix boundaries
        if (newRow >= 0 && newCol >= 0 && newRow < rows && newCol < cols) {
          // If the neighbor's value is smaller
          //=> directed edge from neighbor -> curr cell
          if (matrix[newRow][newCol] < matrix[row][col]) {
            //increment indegree (incoming edges) of current cell
            indegree[row][col]++;
          }
        }
      }
    }
  }

  // Initialize a queue to hold cells with an indegree of 0 (starting points for paths)
  // Since these cells have 0 inDegree, as per our algo, it means that their 4 neighbors
  // are all greater than them so they can't (increasingly) flow into these. Hence,
  // these will the starting points
  const queue = [];
  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      if (indegree[x][y] === 0) {
        queue.push([x, y]);
      }
    }
  }

  // Initialize a variable to keep track of the length of the longest increasing path
  let pathLength = 0;

  // Perform a breadth-first search (BFS) to find the longest increasing path
  while (queue.length) {
    const size = queue.length; // The number of cells in the current level of BFS
    for (let i = 0; i < size; i++) {
      const [row, col] = queue.shift();
      for (const direction of directions) {
        const [dr, dc] = direction;
        const newRow = row + dr;
        const newCol = col + dc;
        // Check if the neighbor is within the matrix boundaries
        if (newRow >= 0 && newCol >= 0 && newRow < rows && newCol < cols) {
          // If the neighbor's value is greater, decrement its indegree
          if (matrix[newRow][newCol] > matrix[row][col]) {
            indegree[newRow][newCol]--;
            // If the indegree becomes 0, add the neighbor to the queue for the next level of BFS
            if (indegree[newRow][newCol] === 0) {
              queue.push([newRow, newCol]);
            }
          }
        }
      }
    }
    // Increment the path length after processing a level of BFS (See: Note 1)
    pathLength++;
  }
  // Return the length of the longest increasing path
  return pathLength;
};

/*

Note 1:

Why is pathLength incremented after processing a level of BFS?

In BFS, we explore nodes (cells) level by level.
In other words, we first explore all nodes at level 0, then all nodes at level 1, and so on.
To find the length of the longest increasing path, we need to count how many levels we have traversed during BFS.
Each level in BFS corresponds to a step in the path. By incrementing pathLength after processing all nodes in a level,
we effectively count the number of levels we have traversed, which directly corresponds to the
length of the path.

*/
