/*

You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees (clockwise).

You have to rotate the image in-place, which means you have to modify the input 2D matrix directly. DO NOT allocate another 2D matrix and do the rotation.



Example 1:


Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
Output: [[7,4,1],[8,5,2],[9,6,3]]
Example 2:


Input: matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]
Output: [[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]


Constraints:

n == matrix.length == matrix[i].length
1 <= n <= 20
-1000 <= matrix[i][j] <= 1000

*/

/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */

const rotate0 = function (matrix) {
  let left = 0;
  let right = matrix.length - 1; // num of cols = rows (matrix.leng = matrix[0].len)
  while (left < right) {
    //we do n - 1 rotations => [l, r) => r not inclusive
    //let i = l; i <= r - 1 => wrong
    //let i = 0; i < r - l; i++ => right (what's the difference?)

    //establish top and bottom pointers
    let top = left;
    let bottom = right; // num of cols = rows
    for (let i = 0; i < right - left; i++) {
      //save to temp (go right; starts from (0, 0), (0, 1)...)
      let topLeft = matrix[top][left + i];

      //move bottom left to top left
      //bottomLeft starts from (go up; 2, 0), (1, 0)...
      matrix[top][left + i] = matrix[bottom - i][left];

      //move bottom right to bottom left
      //bottomRight starts from (go left; 2, 2), (2, 1)...
      matrix[bottom - i][left] = matrix[bottom][right - i];

      //move top right to bottom right
      //topRight (go down; starts from (0, 2), (1, 0)...)
      matrix[bottom][right - i] = matrix[top + i][right];

      //move top left to top right
      matrix[top + i][right] = topLeft; //(temp)
    }
    //move inside (from left/right) (this will also update top/bottom)
    left++;
    right--;
  }
};

/*

To rotate a matrix 90 degrees clockwise in-place, we can break the process into two main steps:

Transpose the matrix.
Reverse each row.

Step 1: Transpose the Matrix
The transpose of a matrix involves swapping the rows and columns. For example, element at position (i, j) is swapped with the element at (j, i).

The process:

Iterate over the matrix with indices i and j.
Swap matrix[i][j] with matrix[j][i].


Step 2: Reverse Each Row
After transposing, the matrix is in a state where the rows are partially aligned for rotation. To complete the rotation:

Reverse the elements of each row.
This effectively shifts elements to their correct positions for a 90-degree clockwise rotation.

*/

const rotate = function (matrix) {
  const n = matrix.length;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
    }
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n / 2; j++) {
      [matrix[i][j], matrix[i][n - 1 - j]] = [
        matrix[i][n - 1 - j],
        matrix[i][j],
      ];
    }
  }
};

/*

Complexity:

Time Complexity:

Transposing: O(n^2) (each element is visited once).
Reversing rows: O(n^2) (each row has n elements to reverse).

Total: O(n^2)

Space Complexity: In-place operation, so O(1) additional space is used.

*/
