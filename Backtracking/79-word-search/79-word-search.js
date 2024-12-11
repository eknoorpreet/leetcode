/*

Given an m x n grid of characters board and a string word, return true if word exists in the grid.

The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.

Example 1:

Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
Output: true

*/

/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */

/*

Explore every cell as a potential starting point for the word, and recursively check neighboring cells to see if the next letters of the word can be formed. DFS function that tries to match the word character by character.

Use a set to track visited cells during the current visited of the DFS to ensure no cell is used more than once in a single word search. When exploring a path, add the current cell to the set. If the path doesn't lead to a solution, backtrack by removing the cell from the path.

Note: The core idea is backtracking (not just simple DFS). As the general idea for the solution, we would walk around the 2D grid, and at each step, we mark our choice before jumping into the next step. And at the end of each step, we would also revert our mark so that we will have a clean slate to try another direction. In addition, the exploration is done via the DFS strategy, where we go as far as possible before we try the next direction.

*/

const exist = function (board, word) {
  const rows = board.length;
  const cols = board[0].length;
  const visited = new Set();
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  const backtrack = (row, col, i) => {
    // i = current chatracter of the word
    // Base case: successfully found the entire word
    if (i === word.length) return true;
    // Invalid conditions:
    // 1. Out of board boundaries
    // 2. Current cell doesn't match current word character
    // 3. Cell already visited
    if (
      row < 0 ||
      col < 0 ||
      row >= rows ||
      col >= cols ||
      word[i] !== board[row][col] ||
      visited.has(`${row}-${col}`)
    ) {
      return false;
    }
    // Mark current cell as visited
    visited.add(`${row}-${col}`);

    // Explore all four directions
    for (const [dr, dc] of directions) {
      const newRow = dr + row;
      const newCol = dc + col;

      // Recursively search next character in the word
      if (backtrack(newRow, newCol, i + 1)) return true;
    }

    // Backtrack: remove current cell from path if no solution found
    visited.delete(`${row}-${col}`);
    return false;
  };

  // Try starting the search from every cell in the grid
  for (let row = 0; row <= rows; row++) {
    for (let col = 0; col <= cols; col++) {
      if (backtrack(row, col, 0)) return true;
    }
  }
  return false;
};

/*

Complexity Analysis
Time Complexity: O(M * N * 3 L), where N is the number of cells in the board and L is the length of the word to be matched.

For the backtracking function, initially we could have at most 4 directions to explore, but further the choices are reduced into 3 (since we won't go back to where we come from).
As a result, the execution trace after the first step could be visualized as a 3-nary tree, each of the branches represent a potential exploration in the corresponding direction. Therefore, in the worst case, the total number of invocation would be the number of nodes in a full 3-nary tree, which is about 3
L
 .

We iterate through the board for backtracking, i.e. there could be N times invocation for the backtracking function in the worst case.

As a result, overall the time complexity of the algorithm would be O(M * N * 3 L).

Space Complexity: O(L) where L is the length of the word to be matched.

The main consumption of the memory lies in the recursion call of the backtracking function. The maximum length of the call stack would be the length of the word. Therefore, the space complexity of the algorithm is O(L).

*/
