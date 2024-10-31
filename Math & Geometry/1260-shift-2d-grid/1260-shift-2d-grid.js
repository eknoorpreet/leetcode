/*

Given a 2D grid of size m x n and an integer k. You need to shift the grid k times.

In one shift operation:

Element at grid[i][j] moves to grid[i][j + 1].
Element at grid[i][n - 1] moves to grid[i + 1][0].
Element at grid[m - 1][n - 1] moves to grid[0][0].
Return the 2D grid after applying shift operation k times.



Example 1:


Input: grid = [[1,2,3],[4,5,6],[7,8,9]], k = 1
Output: [[9,1,2],[3,4,5],[6,7,8]]
Example 2:


Input: grid = [[3,8,1,9],[19,7,2,5],[4,6,11,10],[12,0,21,13]], k = 4
Output: [[12,0,21,13],[3,8,1,9],[19,7,2,5],[4,6,11,10]]
Example 3:

Input: grid = [[1,2,3],[4,5,6],[7,8,9]], k = 9
Output: [[1,2,3],[4,5,6],[7,8,9]]


Constraints:

m == grid.length
n == grid[i].length
1 <= m <= 50
1 <= n <= 50
-1000 <= grid[i][j] <= 1000
0 <= k <= 100

*/

/**
 * @param {number[][]} grid
 * @param {number} k
 * @return {number[][]}
 */

const shiftGrid0 = function (grid, k) {
  const rows = grid.length;
  const cols = grid[0].length;

  // Perform k shifts
  for (let shift = 0; shift < k; shift++) {
    // Create new empty grid to store shifted values
    const newGrid = Array.from({ length: rows }, () => Array(cols).fill(0));

    // Case 1: Move everything not in last column
    // Element at grid[i][j] moves to grid[i][j + 1].
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols - 1; col++) {
        newGrid[row][col + 1] = grid[row][col];
      }
    }

    // Case 2: Move last column elements (except last row)
    // Element at grid[i][n - 1] moves to grid[i + 1][0].
    for (let row = 0; row < rows - 1; row++) {
      newGrid[row + 1][0] = grid[row][cols - 1];
    }

    // Case 3: Move bottom-right element to top-left
    // Element at grid[m - 1][n - 1] moves to grid[0][0].
    newGrid[0][0] = grid[rows - 1][cols - 1];

    // Update grid for next iteration
    grid = newGrid;
  }

  return grid;
};

/*

Time Complexity: O(k * m * n)

k shifts
Each shift processes m * n elements

Space Complexity: O(m * n * k)

New grid created for each shift
Old grid can be garbage collected

*/

/*

Optimal:

It would be much easier to do this on a 1-D array.
Let's say, we have an array with the same number of elements (m * n)

Algorithm:

1. We convert current position to 1D index
2. Add the shift amount k
3. Use modulo to wrap around
4. Convert back to 2D position

How will convert the grid positions to 1D indices?

[[ 0,  1,  2,  3],
 [ 4,  5,  6,  7],
 [ 8,  9, 10, 11]]
Examples:

Position (0,0) → 0 * 4 + 0 = 0
Position (0,3) → 0 * 4 + 3 = 3
Position (1,0) → 1 * 4 + 0 = 4
Position (2,1) → 2 * 4 + 1 = 9

How do we complete 'row' rows: row * cols (each row contains cols elements and to get to row r, we need to skip r complete rows)
How do we reach a specific column (just add the column number): row * cols + col (formula)

But we also need to convert a 1D index back into a [row, col] position.

Gets the row: Math.floor(index / cols) (tells us how many complete rows we've passed)
Gets the column: index % cols (tells us how many columns we've moved in current row)

Formula: [row, col] = [Math.floor(index / cols), index % cols]

Advantages of Optimized Solution:

1. Eliminates Repeated Work

Brute Force: If k = 100 in a 3×3 grid, it performs 100 shifts even though the pattern repeats every 9 shifts.
Optimized: Uses modulo % (rows * cols) to directly calculate final position

2. Direct Position Calculation

Brute Force: Must physically move each element k times
Optimized: Mathematically calculates final position in one step

*/

const shiftGrid = function (grid, k) {
  const rows = grid.length;
  const cols = grid[0].length;

  // Converts a 2D position (row, col) into a 1D index
  // For example, in a 3×3 grid, position (1,1) would be: 1 * 3 + 1 = 4
  const convertTo1DIndex = (row, col) => row * cols + col;

  // Converts a 1D index back to a 2D position
  // For example, value 4 would return [1,1] in a 3×3 grid
  const convertTo2DPosition = (index) => [
    Math.floor(index / cols),
    index % cols,
  ];

  const result = Array.from({ length: rows }, () => Array(cols).fill(0));

  // For each position (row,col) in the grid
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      // Convert it to a 1D index
      // Use modulo % (rows * cols) to wrap around when we exceed grid size
      const newIndex = (convertTo1DIndex(row, col) + k) % (rows * cols);
      // Convert back to 2D position
      const [newRow, newCol] = convertTo2DPosition(newIndex);
      // Place the original value in its new position
      result[newRow][newCol] = grid[row][col];
    }
  }
  return result;
};

/*

Time Complexity:

Brute Force: O(m * n * k) - depends on number of shifts
Optimized: O(m * n) - independent of k

*/
