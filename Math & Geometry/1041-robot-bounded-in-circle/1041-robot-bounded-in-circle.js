/*

On an infinite plane, a robot initially stands at (0, 0) and faces north. Note that:

The north direction is the positive direction of the y-axis.
The south direction is the negative direction of the y-axis.
The east direction is the positive direction of the x-axis.
The west direction is the negative direction of the x-axis.
The robot can receive one of three instructions:

"G": go straight 1 unit.
"L": turn 90 degrees to the left (i.e., anti-clockwise direction).
"R": turn 90 degrees to the right (i.e., clockwise direction).
The robot performs the instructions given in order, and repeats them forever.

Return true if and only if there exists a circle in the plane such that the robot never leaves the circle.



Example 1:

Input: instructions = "GGLLGG"
Output: true
Explanation: The robot is initially at (0, 0) facing the north direction.
"G": move one step. Position: (0, 1). Direction: North.
"G": move one step. Position: (0, 2). Direction: North.
"L": turn 90 degrees anti-clockwise. Position: (0, 2). Direction: West.
"L": turn 90 degrees anti-clockwise. Position: (0, 2). Direction: South.
"G": move one step. Position: (0, 1). Direction: South.
"G": move one step. Position: (0, 0). Direction: South.
Repeating the instructions, the robot goes into the cycle: (0, 0) --> (0, 1) --> (0, 2) --> (0, 1) --> (0, 0).
Based on that, we return true.
Example 2:

Input: instructions = "GG"
Output: false
Explanation: The robot is initially at (0, 0) facing the north direction.
"G": move one step. Position: (0, 1). Direction: North.
"G": move one step. Position: (0, 2). Direction: North.
Repeating the instructions, keeps advancing in the north direction and does not go into cycles.
Based on that, we return false.
Example 3:

Input: instructions = "GL"
Output: true
Explanation: The robot is initially at (0, 0) facing the north direction.
"G": move one step. Position: (0, 1). Direction: North.
"L": turn 90 degrees anti-clockwise. Position: (0, 1). Direction: West.
"G": move one step. Position: (-1, 1). Direction: West.
"L": turn 90 degrees anti-clockwise. Position: (-1, 1). Direction: South.
"G": move one step. Position: (-1, 0). Direction: South.
"L": turn 90 degrees anti-clockwise. Position: (-1, 0). Direction: East.
"G": move one step. Position: (0, 0). Direction: East.
"L": turn 90 degrees anti-clockwise. Position: (0, 0). Direction: North.
Repeating the instructions, the robot goes into the cycle: (0, 0) --> (0, 1) --> (-1, 1) --> (-1, 0) --> (0, 0).
Based on that, we return true.


Constraints:

1 <= instructions.length <= 100
instructions[i] is 'G', 'L' or, 'R'.

*/

/**
 * @param {string} instructions
 * @return {boolean}
 */

/**
 * @param {string} instructions
 * @return {boolean}
 */

/*

Key insight: that a robot's movement will be bounded in a circle if after executing the full sequence of instructions once, either:

The robot returns to the origin (0,0), OR
The robot is NOT facing north

Let me explain why these conditions work:

If the robot returns to (0,0):

Obviously, repeating the same sequence will keep bringing it back to (0,0)
Therefore, it will stay within a bounded circle

If the robot is not facing north after one sequence:

This means that after 4 sequences, the robot will complete a 360° rotation
For example:

If facing east after one sequence (90° turn), it will face:

South after two sequences (180°)
West after three sequences (270°)
North after four sequences (360°)

This rotation combined with the movement creates a pattern that repeats every 4 sequences
Therefore, the robot's path must be bounded

*/

const isRobotBounded0 = function (instructions) {
  let x = 0,
    y = 0;
  let direction = 'north';

  const possibleMoves = {
    north: [0, 1],
    east: [1, 0],
    south: [0, -1],
    west: [-1, 0],
  };

  const leftTurns = {
    north: 'west',
    west: 'south',
    south: 'east',
    east: 'north',
  };

  const rightTurns = {
    north: 'east',
    east: 'south',
    south: 'west',
    west: 'north',
  };

  for (let instruction of instructions) {
    if (instruction === 'L') {
      direction = leftTurns[direction];
    } else if (instruction === 'R') {
      direction = rightTurns[direction];
    } else {
      x += possibleMoves[direction][0];
      y += possibleMoves[direction][1];
    }
  }

  return (x === 0 && y === 0) || direction !== 'north';
};

// Using integers for directions (0, 1, 2, 3) instead of strings ('north', 'east', 'south', 'west') offers several advantages
const isRobotBounded = function (instructions) {
  // Initial position (0,0) facing north
  let x = 0;
  let y = 0;
  let direction = 0;

  // Define possible moves for each direction
  // Each direction maps to [dx, dy] for one unit movement
  const possibleMoves = {
    0: [0, 1], // north: y increases
    1: [1, 0], // east:  x increases
    2: [0, -1], // south: y decreases
    3: [-1, 0], // west:  x decreases
  };

  // Process each instruction
  for (let instruction of instructions) {
    if (instruction === 'L') {
      // Turn left is same as turning right 3 times
      // Turn left = add 3 and mod 4 (since 4 directions)
      // (same as subtracting 1 but avoiding negatives)
      direction = (direction + 3) % 4;
    } else if (instruction === 'R') {
      // Turn right moves to next direction
      // Turn right = add 1 and mod 4
      direction = (direction + 1) % 4;
    } else {
      // instruction === 'G'
      // Move one unit in current direction
      x += possibleMoves[direction][0];
      y += possibleMoves[direction][1];
    }
  }

  // Robot is bounded in a circle if either:
  // 1. It returns to origin (0,0), or
  // 2. It's not facing north (direction !== 0)
  return (x === 0 && y === 0) || direction !== 0;
};

/*

Time complexity: O(N), where N is a number of instructions
to parse.

Space complexity: O(1) because the array directions contains
only 4 elements.

*/
