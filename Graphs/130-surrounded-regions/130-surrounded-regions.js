/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */

/*

Understanding the problem:

["X","O","X","X"]
["O","O","X","X"]
["X","O","O","X"]
["X","O","X","X"]

Result:

["X","O","X","X"]
["O","O","X","X"]  // These O's stay because they're connected
["X","O","O","X"]  // to border O's through other O's
["X","O","X","X"]

Reverse thinking:

"Capture all regions that are 4-directionally surrounded by 'X'."
= "Don't capture anything on the border"" or "capture everything except unsurrrounded (on the border) regions""

Basically, core intuition:
Instead of trying to find surrounded regions (which is more complex), we:
    Find all unsurrounded regions (O's connected to border)
    Everything else must be surrounded

*/

const solve1 = function (board) {
  const rows = board.length;
  if (rows === 0) return board;
  const cols = board[0].length;
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  const dfs = (row, col) => {
    // Invalid (out of bounds) or not "O" => return
    if (
      row < 0 ||
      row === rows ||
      col < 0 ||
      col === cols ||
      board[row][col] !== 'O'
    )
      return;
    // Else, change to a temporary mark "T"
    board[row][col] = 'T';
    // We check for the neighbours since if they are "O" (even in 1 direction), they are also
    // unsurrounded (by "X")
    for (const [dr, dc] of directions) {
      const newRow = dr + row;
      const newCol = dc + col;
      dfs(newRow, newCol);
    }
  };

  // Find and capture the unsurrounded regions (connected to the border => mark them "T")
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (
        board[row][col] === 'O' &&
        (row === 0 || col === 0 || row === rows - 1 || col === cols - 1)
      ) {
        dfs(row, col);
      }
    }
  }

  // Here, any "O" is definitely surrounded (since unsurrounded were marked "T")
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      // surrounded "O" => flip to ""X
      if (board[row][col] === 'O') {
        board[row][col] = 'X';
      } else if (board[row][col] === 'T') {
        // unsurrounded "T" (prev "O")
        // flip all T's back to "O"
        board[row][col] = 'O';
      }
    }
  }
  return board;
};

/*

Time & Space Complexity:

Time: O(rows × cols) - visit each cell at most twice
Space: O(rows × cols) - for recursion stack in worst case

Key Insights:

Reverse thinking makes problem simpler
Using temporary mark 'T' avoids need for visited set
Only need to start DFS from border cells

*/
