/*

Given a 2D matrix matrix, handle multiple queries of the following type:

Calculate the sum of the elements of matrix inside the rectangle defined by its upper left corner (row1, col1) and lower right corner (row2, col2).
Implement the NumMatrix class:

NumMatrix(int[][] matrix) Initializes the object with the integer matrix matrix.
int sumRegion(int row1, int col1, int row2, int col2) Returns the sum of the elements of matrix inside the rectangle defined by its upper left corner (row1, col1) and lower right corner (row2, col2).
You must design an algorithm where sumRegion works on O(1) time complexity.



Example 1:


Input
["NumMatrix", "sumRegion", "sumRegion", "sumRegion"]
[[[[3, 0, 1, 4, 2], [5, 6, 3, 2, 1], [1, 2, 0, 1, 5], [4, 1, 0, 1, 7], [1, 0, 3, 0, 5]]], [2, 1, 4, 3], [1, 1, 2, 2], [1, 2, 2, 4]]
Output
[null, 8, 11, 12]

Explanation
NumMatrix numMatrix = new NumMatrix([[3, 0, 1, 4, 2], [5, 6, 3, 2, 1], [1, 2, 0, 1, 5], [4, 1, 0, 1, 7], [1, 0, 3, 0, 5]]);
numMatrix.sumRegion(2, 1, 4, 3); // return 8 (i.e sum of the red rectangle)
numMatrix.sumRegion(1, 1, 2, 2); // return 11 (i.e sum of the green rectangle)
numMatrix.sumRegion(1, 2, 2, 4); // return 12 (i.e sum of the blue rectangle)


Constraints:

m == matrix.length
n == matrix[i].length
1 <= m, n <= 200
-10^4 <= matrix[i][j] <= 10^4
0 <= row1 <= row2 < m
0 <= col1 <= col2 < n
At most 10^4 calls will be made to sumRegion.

*/

/**
 * @param {number[][]} matrix
 */

/*

Prefix Sum Matrix: The key idea behind achieving O(1) time complexity for the sumRegion
function is to precompute and store the prefix sum of the input matrix.
A prefix sum matrix allows us to calculate the sum of elements within a rectangle using O(1) time.

*/
/**
 * @param {number[][]} matrix
 */
const NumMatrix = function (matrix) {
  // Store matrix dimensions
  this.rows = matrix.length;
  this.cols = matrix[0].length;

  // Create prefix matrix with an extra row and column of zeros
  this.prefixMatrix = Array(this.rows + 1)
    .fill()
    .map(() => Array(this.cols + 1).fill(0));

  // Compute 2D prefix sum
  for (let r = 0; r < this.rows; r++) {
    let prefixSum = 0;
    for (let c = 0; c < this.cols; c++) {
      // Calculate running sum for current row
      prefixSum += matrix[r][c];

      // Get the sum from the row above (but curr column)
      const above = this.prefixMatrix[r][c + 1];

      // Store cumulative sum in prefix matrix
      // Each cell prefixMatrix[r+1][c+1] contains the sum of all elements in the
      // rectangle from (0,0) to (r,c)

      this.prefixMatrix[r + 1][c + 1] = prefixSum + above;
    }
  }
};

/**
 * @param {number} row1
 * @param {number} col1
 * @param {number} row2
 * @param {number} col2
 * @return {number}
 */

/*

We create a prefix matrix that is one row and column larger than the original
Each cell prefixMatrix[r+1][c+1] contains the sum of all elements in the rectangle from (0,0) to (r,c)

Without the extra row/column:

You'd need separate logic to handle regions that touch the matrix boundaries
This would complicate the sumRegion method with additional conditional checks

This is why we store the sum of (0,0) to (r,c) in prefixMatrix[r+1][c+1]. If we use prefixMatrix[r][c],
we would require extra conditional logic for row = 0 and col = 0.

To get the sum of a specific region, we use the inclusion-exclusion principle:

Take the sum of the bottom-right corner
Subtract the area above the region
Subtract the area to the left of the region
Add back the top-left area (which was subtracted twice)

*/

NumMatrix.prototype.sumRegion = function (row1, col1, row2, col2) {
  // Adjust indices to match prefix matrix
  row1 = row1 + 1;
  col1 = col1 + 1;
  row2 = row2 + 1;
  col2 = col2 + 1;

  // Get sum of the complete rectangle from (0,0) to (row2, col2)
  const bottomRight = this.prefixMatrix[row2][col2];

  // Subtract the area above the region
  const above = this.prefixMatrix[row1 - 1][col2];

  // Subtract the area to the left of the region
  const left = this.prefixMatrix[row2][col1 - 1];

  // Add back the top-left area (which was subtracted twice)
  const topLeft = this.prefixMatrix[row1 - 1][col1 - 1];

  // Return the sum of the specific region
  return bottomRight - above - left + topLeft;
};

/**
 * Your NumMatrix object will be instantiated and called as such:
 * var obj = new NumMatrix(matrix)
 * var param_1 = obj.sumRegion(row1,col1,row2,col2)
 */

/*

The time complexity for initialization is O(rows x cols) since it requires a nested loop to
compute prefix sums. The space complexity is O(rows x cols) to store the prefixMatrix.
The time complexity for the sumRegion function is O(1), as the sum is computed directly
using precomputed values from the prefixMatrix.

*/
