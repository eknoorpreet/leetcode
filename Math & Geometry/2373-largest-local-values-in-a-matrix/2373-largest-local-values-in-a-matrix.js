/*

You are given an n x n integer matrix grid.

Generate an integer matrix maxLocal of size (n - 2) x (n - 2) such that:

maxLocal[i][j] is equal to the largest value of the 3 x 3 matrix in grid centered around row i + 1 and column j + 1.
In other words, we want to find the largest value in every contiguous 3 x 3 matrix in grid.

Return the generated matrix.



Example 1:


Input: grid = [[9,9,8,1],[5,6,2,6],[8,2,6,4],[6,2,2,2]]
Output: [[9,9],[8,6]]
Explanation: The diagram above shows the original matrix and the generated matrix.
Notice that each value in the generated matrix corresponds to the largest value of a contiguous 3 x 3 matrix in grid.
Example 2:


Input: grid = [[1,1,1,1,1],[1,1,1,1,1],[1,1,2,1,1],[1,1,1,1,1],[1,1,1,1,1]]
Output: [[2,2,2],[2,2,2],[2,2,2]]
Explanation: Notice that the 2 is contained within every contiguous 3 x 3 matrix in grid.


Constraints:

n == grid.length == grid[i].length
3 <= n <= 100
1 <= grid[i][j] <= 100

*/

/**
 * @param {number[][]} grid
 * @return {number[][]}
 */

const largestLocal = function (grid) {
  const n = grid.length;
  // Generate the output matrix
  const maxLocal = Array.from({ length: n - 2 }, () => Array(n - 2).fill(0));

  // Iterate through each position where a 3x3 window can start
  for (let row = 0; row < n - 2; row++) {
    for (let col = 0; col < n - 2; col++) {
      // We know that for every cell in the outout matrix,
      // there's a guaranteed 3 x 3 matrix in grid centered around row i + 1 and column j + 1
      // (As the output matrix is (n - 2) x (n - 2))

      // For each 3x3 window:
      for (let i = row; i < row + 3; i++) {
        for (let j = col; j < col + 3; j++) {
          // Keep track of maximum value found in current 3x3 window
          maxLocal[row][col] = Math.max(maxLocal[row][col], grid[i][j]);
        }
      }
    }
  }
  return maxLocal;
};

/*

Time Complexity: O(n²) where n is the grid dimension
Space Complexity: O(n²) for the output matrix

*/
