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

Prefix Sum Matrix: The key idea behind achieving O(1) time complexity for the sumRegion function is to precompute and store the prefix sum of the input matrix. A prefix sum matrix allows us to calculate the sum of elements within a rectangle using O(1) time.

*/
const NumMatrix = function (matrix) {
  this.rows = matrix.length;
  this.cols = matrix[0].length;
  this.prefixMatrix = Array(this.rows + 1)
    .fill()
    .map(() => Array(this.cols + 1).fill(0));
  for (let r = 0; r < this.rows; r++) {
    let prefixSum = 0;
    for (let c = 0; c < this.cols; c++) {
      prefixSum += matrix[r][c];
      const above = this.prefixMatrix[r][c + 1];
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
NumMatrix.prototype.sumRegion = function (row1, col1, row2, col2) {
  row1 = row1 + 1;
  col1 = col1 + 1;
  row2 = row2 + 1;
  col2 = col2 + 1;
  const bottomRight = this.prefixMatrix[row2][col2];
  const above = this.prefixMatrix[row1 - 1][col2];
  const left = this.prefixMatrix[row2][col1 - 1];
  const topLeft = this.prefixMatrix[row1 - 1][col1 - 1];
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
