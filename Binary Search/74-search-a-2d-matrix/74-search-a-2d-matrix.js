/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */

/*

Starting from top-right gives us two possible moves:

If current > target: Move left (eliminates larger numbers)
If current < target: Move down (eliminates smaller numbers)

Why this works:

At each step, we can eliminate either:

An entire column (when moving left)
An entire row (when moving down)

We make at most m + n moves (rows + columns)
It's like playing a game where you can only move left or down

*/

const searchMatrix0 = (matrix, target) => {
  let row = 0;
  let col = matrix[0].length - 1;

  while (row < matrix.length && col >= 0) {
    if (matrix[row][col] === target) {
      return true;
    } else if (matrix[row][col] < target) {
      row++;
    } else {
      col--;
    }
  }
  return false;
};

/*

  TC: O(m + n)
  SC: O(1)

  */

/*

  Key Insight:

  The matrix has two important properties:

  Each row is sorted
  First element of each row is greater than last element of previous row

  This means the entire matrix can be treated as a single sorted array!

  So, the original matrix:

  1  3  5  7
  10 11 16 20
  23 30 34 60

  Can be seen as:

  [1,3,5,7,10,11,16,20,23,30,34,60]

  Why? Because:
  Each row is sorted
  First element of next row > last element of current row
  This means ALL elements follow a single sorted order!

  Implementation Details:

  We can "flatten" the matrix conceptually without actually creating a new array
  For any index i in the lattened array: range [0, m * n-1]:

  Row = Math.floor(i / numCols)
  Column = i % numCols

  Basic Concept:

  In a matrix with n columns, each row contains n elements
  To find which row an index i is in, divide by n
  To find which column, take remainder when dividing by n

  [
    [1, 2, 3],   // n (columns) = 3
    [4, 5, 6],
    [7, 8, 9]
  ]

  n = 3 (columns)
  index = 7

  row = Math.floor(7 / 3) = Math.floor(2.33) = 2
  col = 7 % 3 = 1

  So index 7 maps to matrix[2][1] which is 8

  Why This Works:

  Each row has n elements
  First row: indices 0 to (n-1)
  Second row: indices n to (2n-1)
  Third row: indices 2n to (3n-1)
  Pattern: row number = how many complete sets of n fit in the index

  Indices 0,1,2 → row 0 (0÷3 = 0)
  Indices 3,4,5 → row 1 (3÷3 = 1)
  Indices 6,7,8 → row 2 (6÷3 = 2)

  */

const searchMatrix = (matrix, target) => {
  const m = matrix.length;
  const n = matrix[0].length;
  if (m === 0 || n === 0) return false;

  let left = 0;
  let right = m * n - 1;
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    const row = Math.floor(mid / n);
    const col = mid % n;
    const midValue = matrix[row][col];

    if (midValue === target) {
      return true;
    } else if (midValue < target) {
      left = mid + 1;
    } else if (midValue > target) {
      right = mid - 1;
    }
  }
  return false;
};

/*

  Time Complexity Analysis: O(log(m*n))

  Space Complexity: O(1) space complexity

  Key Differences:

  Search Space Reduction:

  O(m + n) approach: Eliminates one row/column at a time
  O(log(m*n)) approach: Eliminates half of remaining elements at each step

  Movement Pattern:

  O(m + n): Restricted to left/down movements
  O(log(m*n)): Can "jump" to any position in matrix

*/
