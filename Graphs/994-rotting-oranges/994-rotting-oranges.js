/**
 * @param {number[][]} grid
 * @return {number}
 */

/*

We can try DFS but it won't work. Why? Well, in DFS, we'll start fromt eh first orange until all oranges become rotten. Time = 5 mins but the answer is 4. How? Well, if we have 2 rotten organges (let's say, at the first and last col of the 1st row), they'll start spreading the rotten value to their respective adjacent oranges together (in the same minute). This calls for (level-size) BFS! We don't have to wait for DFS to finish on 1 cell to move on to the next; we can run a mult-source BFS at the same time!

The key insight here is that BFS allows us to simulate the rotting process efficiently, with multiple rotten oranges contaminating adjacent fresh oranges simultaneously. This is why BFS is chosen over Depth-First Search (DFS), as it mimics the simultaneous spread of rotting.

*/

const orangesRotting = function (grid) {
  if (!grid.length) return 0;
  let time = 0;
  let fresh = 0; //count fresh organges
  const rows = grid.length;
  const cols = grid[0].length;
  const queue = []; //initalize queue to store rotten oranges
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 1) fresh++;
      //store cells to be processed.
      if (grid[r][c] === 2) queue.push([r, c]);
    }
  }
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  while (queue.length && fresh > 0) {
    //we do it level by level so in 1 unit of time, we can make adjacent fresh oranges rotten. At the end of the level, we increment the counter
    //size represents the number of rotten oranges at this minute level.
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      //process the current rotten orange
      const [row, col] = queue.shift();
      //visit all adjacent directions of the current (rotten) orange
      for (let [dr, dc] of directions) {
        const r = row + dr;
        const c = col + dc;
        //if the new position is in bounds AND it's an orange
        if (r >= 0 && c >= 0 && r < rows && c < cols && grid[r][c] === 1) {
          //mark it "rotten" (so we don't visit it again since we only want to visit the (yet) fresh oranges about to become rotten)
          grid[r][c] = 2;
          //add the rotten orange to the queue to process later
          queue.push([r, c]);
          //decrement fresh oranges
          fresh--;
        }
      }
    }
    time++;
  }
  //if there's still fresh oranges left => return -1 else return the time
  return fresh === 0 ? time : -1;
};

/*

Time Complexity:

The code uses a Breadth-First Search (BFS) approach to process the grid.
In the worst case, every cell in the grid is visited once.
Each cell can be enqueued and dequeued from the queue at most once.
The BFS runs until either all fresh oranges are rotten or it's clear that some oranges cannot be reached.
So, the time complexity is O(m * n) because we potentially visit all cells in the grid once.
Space Complexity:

The space complexity is determined by the space used for the queue and other variables.
The queue can potentially store all the fresh oranges at its maximum size.
In the worst case, if all fresh oranges are initially adjacent to rotten oranges, the queue can grow to contain all k fresh oranges.
The space complexity is therefore O(k), where k is the number of fresh oranges (initially).

*/
