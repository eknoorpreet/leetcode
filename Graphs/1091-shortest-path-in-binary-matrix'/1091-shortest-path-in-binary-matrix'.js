/**
 * @param {number[][]} grid
 * @return {number}
 */

/*

length of a clear path = number of visited cells of this path.

 */

// const shortestPathBinaryMatrix = function(grid) {
//     const n = grid.length
//     //all 8 directions (horizontal, vertical, or diagonal)
//     const directions = [[1, 0], [-1, 0], [0, 1], [0, -1],
//                        [1, 1], [-1, -1], [1, -1], [-1, 1]]

//     const queue = []
//     const visited = new Set()
//     //mark visited as we add to the queue
//     visited.add(`${0}-${0}`)
//     queue.push([0, 0, 1]) //[r, c, length to get here]
//     while(queue.length) {
//         const [r, c, length] = queue.shift()
//         //if the cell is out of bounds, or if it contains a 1 (an obstacle) => skip
//         //Math.min(r, c) < 0 | Math.max(r, c) >= n
//         if(r < 0 || c < 0 || r === n || c === n || grid[r][c] === 1) continue
//         // If the cell is the bottom-right cell => dest reached => return length
//         if(r === n - 1 && c === n - 1) return length
//         //otherwise, iterate through all eight possible directions
//         for(let [dr, dc] of directions) {
//             const newRow = r + dr
//             const newCol = c + dc
//             //if the new cell has not been visited yet
//             if(!visited.has(`${newRow}-${newCol}`)) {
//                 //push it into the queue with an incremented length
//                 queue.push([newRow, newCol, length + 1])
//                 //mark it as visited
//                 visited.add(`${newRow}-${newCol}`)
//             }
//         }
//     }
//     return -1
// };

const shortestPathBinaryMatrix = function (grid) {
  const n = grid.length;
  //all 8 directions (horizontal, vertical, or diagonal)
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
    [1, 1],
    [-1, -1],
    [1, -1],
    [-1, 1],
  ];

  const queue = [];
  const visited = new Set();
  queue.push([0, 0, 1]);
  visited.add(`${0}-${0}`);
  while (queue.length) {
    const [r, c, length] = queue.shift();
    //every time we add to queue, we mark it visited. The new cells we mark visited, if we check here that they are visited, we will end up not processing them! So, we do want to process the nodes even if they're already visited. The condition if(!visited.has(`${newRow}-${newCol}`)) makes sure that each node is processed / visited only once.
    // if(r < 0 || r === n || c < 0 || c === n || grid[r][c] || visited.has(`${r}-${c}`)) continue
    if (r < 0 || r === n || c < 0 || c === n || grid[r][c]) continue;
    if (r === n - 1 && c === n - 1) return length;
    for (let [dr, dc] of directions) {
      const newRow = r + dr;
      const newCol = c + dc;
      if (!visited.has(`${newRow}-${newCol}`)) {
        queue.push([newRow, newCol, length + 1]);
        visited.add(`${newRow}-${newCol}`);
      }
    }
  }
  return -1;
};

/*

Time Complexity:

The code uses a Breadth-First Search (BFS) algorithm to explore the grid.
In the worst case, it can visit all cells in the grid once.
So, the time complexity is O(n^2).

Space Complexity:

The space complexity is determined by the data structures used to store information during the BFS traversal.
The queue can contain up to n^2 cells in the worst case, as each cell can be visited once.
The visited set can also contain up to n^2 entries in the worst case, as each cell can be marked as visited.
Therefore, the space complexity is O(n^2) due to the queue and the visited set.

*/
