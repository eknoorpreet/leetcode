/*Determine if a 9 x 9 Sudoku board is valid. Only the filled cells need to be validated according to the following rules:

Each row must contain the digits 1-9 without repetition.
Each column must contain the digits 1-9 without repetition.
Each of the nine 3 x 3 sub-boxes of the grid must contain the digits 1-9 without repetition.
Note:

A Sudoku board (partially filled) could be valid but is not necessarily solvable.
Only the filled cells need to be validated according to the mentioned rules. */

//TC: O(9^2)
//SC: O(9^2)
/**
 * @param {character[][]} board
 * @return {boolean}
 */

//TC: O(9^2)
//SC: O(9^2)
const isValidSudoku = function (board) {
  const rows = {}; // Track numbers in each row
  const columns = {}; // Track numbers in each column
  const squares = {}; // Track numbers in each 3x3 sub-box

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const num = board[row][col];
      //'.' => empty values (only check filled values )
      if (num === '.') continue;
      // We can go through the entire 9x9 board via the nested loops
      // But how to traverse the 3x3 boxes (in order to check for
      // repetition in those boxes)?
      // (How to create a division)
      // Ex: There's a number 5 at (1,1) and at (4,4). How can we determine
      // that they are in different sub-boxes?
      // [0-2]/3 = 0, [3-5]/3 = 1, [6-8]/3 = 2
      // This creates a unique key for each 3x3 sub-box:
      // For positions (0-2, 0-2): "00"
      // For positions (0-2, 3-5): "01"
      const grid = `${Math.floor(row / 3)}${Math.floor(col / 3)}`;
      console.log('grid', grid);
      // A hash set for every row
      if (!rows[row]) rows[row] = new Set();
      // A hash set for every col
      if (!columns[col]) columns[col] = new Set();
      // A hash set for every 3x3 grid
      // Squares: {'00': set()}
      if (!squares[grid]) squares[grid] = new Set();

      // Is there a repetition in row/col/3x3 sub-box
      if (
        rows[row].has(num) ||
        columns[col].has(num) ||
        squares[grid].has(num)
      ) {
        return false;
      }

      // Add curr num to row
      rows[row].add(num);
      // Add curr num to col
      columns[col].add(num);
      // Add curr num to 3x3 sub-box
      squares[grid].add(num);
    }
  }
  return true;
};
