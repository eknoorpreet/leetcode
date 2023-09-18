/**
 * @param {character[][]} board
 * @param {number} rMove
 * @param {number} cMove
 * @param {character} color
 * @return {boolean}
 */

/*

legal move: after moving, the cell becomes the endpoint of a good line (horizontal, vertical, or diagonal)

//is the cell (after move) the endpoint of a good line? => legal move

"good line": >= 3 cells, endpoints are same color while all other cells are the opposite color (which means no empty cells)

*/

const checkMove = function (board, rMove, cMove, color) {
  const rows = board.length;
  const cols = board[0].length;
  //all 8 directions (horizontal, vertical, or diagonal)
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
    [1, 1],
    [-1, -1],
    [1, -1],
    [-1, 1],
  ];

  //make the move
  board[rMove][cMove] = color;
  const isLegal = (row, col, color, direction) => {
    const [dr, dc] = direction;
    //we just move to the next position (don't do anything with the position
    //we started at)
    row = row + dr;
    col = col + dc;
    //current length of our line = 1
    let length = 1;
    //while the current cell is in bounds
    while (row >= 0 && row < rows && col >= 0 && col < cols) {
      //position in bounds => increment the length
      length++;
      //we encounter an empty cell => false
      if (board[row][col] === '.') return false;
      //any time we get to the same color we started at
      //(it might be the 2nd endpoint of a good line) => check the length
      //length >= 3 => true (good line => legal) else false
      if (board[row][col] === color) return length >= 3;
      //still an opposite color, just move on to the next position
      row = row + dr;
      col = col + dc;
    }
    return false;
  };

  //go through all 8 directions
  for (let direction of directions) {
    //if any of the 8 directions return a legal move => true
    if (isLegal(rMove, cMove, color, direction)) return true;
  }
  return false;
};

/*

Time Complexity:

Calculating the number of rows and columns on the board takes constant time: O(1).

The code then iterates through all 8 directions and, for each direction, calls the isLegal function. In the worst case, the isLegal function will traverse the board from the starting position to either its edge or the endpoint of a good line. Since the board has dimensions 8x8, the maximum number of cells that can be traversed in one direction is 8. Therefore, the time complexity for checking one direction is O(8) = O(1).

Since there are 8 directions, the overall time complexity of the loop checking all directions is O(8) = O(1).

The isLegal function itself performs a linear traversal in one direction at most, and the length of the traversal is bounded by the board's dimensions (8 in the worst case). Therefore, the isLegal function's time complexity is O(8) = O(1).

Overall, the time complexity of the checkMove function is O(1).

Space Complexity:

The space complexity is primarily determined by the directions array, which always has a fixed size of 8 directions. Therefore, the space complexity of the directions array is O(8) = O(1).

The isLegal function uses a constant amount of space for variables like row, col, and length. It does not use any additional data structures that depend on the input size. Thus, the space complexity of the isLegal function is O(1).

*/
