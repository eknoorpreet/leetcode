/*

Given a 2D integer array matrix, return the transpose of matrix.

The transpose of a matrix is the matrix flipped over its main diagonal, switching the matrix's row and column indices.





Example 1:

Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
Output: [[1,4,7],[2,5,8],[3,6,9]]
Example 2:

Input: matrix = [[1,2,3],[4,5,6]]
Output: [[1,4],[2,5],[3,6]]


Constraints:

m == matrix.length
n == matrix[i].length
1 <= m, n <= 1000
1 <= m * n <= 10^5
-10^9 <= matrix[i][j] <= 10^9

*/

/**
 * @param {number[][]} matrix
 * @return {number[][]}
 */

const transpose = function (matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const result = Array.from({ length: cols }, () => Array(rows));

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      // In a transpose, row becomes col and col becomes row
      // Hence, Flip the indices
      result[col][row] = matrix[row][col];
    }
  }
  return result;
};

// TC: O(m * n)
// SC: O(1)
