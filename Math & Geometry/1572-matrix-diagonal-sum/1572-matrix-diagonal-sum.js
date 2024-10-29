/*

Given a square matrix mat, return the sum of the matrix diagonals.

Only include the sum of all the elements on the primary diagonal and all the elements on the secondary diagonal that are not part of the primary diagonal.



Example 1:


Input: mat = [[1,2,3],
              [4,5,6],
              [7,8,9]]
Output: 25
Explanation: Diagonals sum: 1 + 5 + 9 + 3 + 7 = 25
Notice that element mat[1][1] = 5 is counted only once.
Example 2:

Input: mat = [[1,1,1,1],
              [1,1,1,1],
              [1,1,1,1],
              [1,1,1,1]]
Output: 8
Example 3:

Input: mat = [[5]]
Output: 5


Constraints:

n == mat.length == mat[i].length
1 <= n <= 100
1 <= mat[i][j] <= 100

*/

/**
 * @param {number[][]} mat
 * @return {number}
 */

const diagonalSum = function (mat) {
  let sum = 0; // track sum
  // pointer to traverse from left to right diagonally
  // Gives us positions like [0][0], [1][1], [2][2]...
  let left = 0;
  // pointer to traverse from right to left diagonally
  // Gives us positions like [0][n], [1][n-1], [2][n-2]...
  let right = mat.length - 1;
  const rows = mat.length;
  for (let row = 0; row < rows; row++) {
    // Add the element from one diagonal
    sum += mat[row][left];
    // Add the element from one diagonal
    // Ensure you're not using the same element twice!
    if (left !== right) {
      sum += mat[row][right];
    }
    left++;
    right--;
  }
  return sum;
};

// TC: O(n): More efficient than the more obvious approach of traversing the matrix twice (once for each diagonal)
// SC: O(1)
