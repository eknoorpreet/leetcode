/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */

/*

"capture all regions that are 4-directionally surrounded by 'X'."
= "Don't capture anything on the border"" or "capture everything except unsurrrounded (on the border) regions""

*/

const solve = function (board) {
  if (!board.length) return 0;
  const rows = board.length;
  const cols = board[0].length;
  const visited = new Set();
  const dfs = (r, c) => {
    //invalid (out of bounds) or not "O" => return
    if (r < 0 || c < 0 || r === rows || c === cols || board[r][c] !== 'O')
      return;
    //else, change to a temporary mark "T"
    board[r][c] = 'T';
    //mark it as visited
    // visited.add(`${r}-${c}`)
    //we check for the neighbours since if they are "O" (even in 1 direction), they are also unsurrounded (by "X")
    dfs(r + 1, c), dfs(r - 1, c), dfs(r, c + 1), dfs(r, c - 1);
  };

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      //connected to the border => mark them "T"
      if (
        board[r][c] === 'O' &&
        (r === 0 || r === rows - 1 || c === 0 || c === cols - 1)
      )
        dfs(r, c);
    }
  }

  //Here, any "O" is definitely surrounded (since unsurrounded were marked "T")
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      //surrounded "O" => flip to ""X
      if (board[r][c] === 'O') {
        board[r][c] = 'X';
      } else if (board[r][c] === 'T') {
        //unsurrounded "T" (prev "O")
        //flip back to "O"
        board[r][c] = 'O';
      }
    }
  }
  return board;
};

/*

Time Complexity:

The code consists of two main parts: the first part identifies and marks cells as 'T' if they are connected to the border,
and the second part captures surrounded regions by flipping 'O' to 'X' and 'T' back to 'O'.
The first part, where you mark cells as 'T', involves iterating through the entire board with nested loops (r and c).
For each cell, you check if it's on the border, and if so, you perform a DFS traversal.
The DFS traversal itself can visit each cell at most once.
The second part, where you capture surrounded regions and perform replacements,
also iterates through the entire board.
Therefore, the overall time complexity of the code is O(m * n), where m is the number of rows in the board, and n is the number of columns.

Space Complexity:

The recursive DFS function uses the call stack to store the recursion state.
In the worst case, if every cell on the board is part of a surrounded region,
the maximum depth of recursion would be the total number of cells, which is m * n.
Therefore, the overall space complexity of the code is O(m * n) due to the space used by the call stack during the DFS traversal.

*/
