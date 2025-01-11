/*

Given a string path, where path[i] = 'N', 'S', 'E' or 'W', each representing moving one unit north, south, east, or west, respectively. You start at the origin (0, 0) on a 2D plane and walk on the path specified by path.

Return true if the path crosses itself at any point, that is, if at any time you are on a location you have previously visited. Return false otherwise.



Example 1:


Input: path = "NES"
Output: false
Explanation: Notice that the path doesn't cross any point more than once.
Example 2:


Input: path = "NESWW"
Output: true
Explanation: Notice that the path visits the origin twice.


Constraints:

1 <= path.length <= 10^4
path[i] is either 'N', 'S', 'E', or 'W'.

*/

/**
 * @param {string} path
 * @return {boolean}
 */

const isPathCrossing = function (path) {
  const visited = new Set();
  const directions = {
    N: [0, 1],
    S: [0, -1],
    E: [1, 0],
    W: [-1, 0],
  };

  // Starting at origin
  let x = 0;
  let y = 0;
  visited.add(`0-0`);

  for (let direction of path) {
    // Update the x and y coordinates
    x += directions[direction][0];
    y += directions[direction][1];

    if (visited.has(`${x}-${y}`)) {
      return true;
    } else {
      visited.add(`${x}-${y}`);
    }
  }
  return false;
};

/*

TC: O(n)
SC: O(n)

*/
