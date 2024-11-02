/*

There is a rectangular brick wall in front of you with n rows of bricks. The ith row has some number of bricks each of the same height (i.e., one unit) but they can be of different widths. The total width of each row is the same.

Draw a vertical line from the top to the bottom and cross the least bricks. If your line goes through the edge of a brick, then the brick is not considered as crossed. You cannot draw a line just along one of the two vertical edges of the wall, in which case the line will obviously cross no bricks.

Given the 2D array wall that contains the information about the wall, return the minimum number of crossed bricks after drawing such a vertical line.



Example 1:


Input: wall = [[1,2,2,1],[3,1,2],[1,3,2],[2,4],[3,1,2],[1,3,1,1]]
Output: 2
Example 2:

Input: wall = [[1],[1],[1]]
Output: 3


Constraints:

n == wall.length
1 <= n <= 10^4
1 <= wall[i].length <= 10^4
1 <= sum(wall[i].length) <= 2 * 10^4
sum(wall[i]) is the same for each row i.
1 <= wall[i][j] <= 2^31 - 1

*/

/**
 * @param {number[][]} wall
 * @return {number}
 */

/*

Every row has the exact same (total) width (sum of bricks in a row) = 6
How to get the position/edge?
    where brick of edge 1 ends => edge 1,
    where brick of edge 2 ends => edge 2, and so on...

Brute-force: for every position, check the cuts: 1 -> 3 cuts, 2 -> 5 cuts, 3 -> 3, 4 -> 2 (answer)

Optimization:

When a line doesn't cross a brick, it must be going through a gap between bricks
The best place to draw the line is where we have the maximum number of gaps
Gaps occur at positions where bricks end

*/

const leastBricks = function (wall) {
  // Count gaps in every row (hashmap) with key (position/edge) and value (gaps)
  const countGaps = new Map(); //store rows as keys and gaps as values
  //initial value (0 gaps at position 0) (if hashmap is empty at the end, return this)
  countGaps.set(0, 0);

  for (let row of wall) {
    // tracks where gaps occur
    // Eg: [1, 3, 2] => Gaps occur at 1 and 4 (1 + 3)
    let edgePosition = 0;
    // Don't include the last one
    for (let i = 0; i < row.length - 1; i++) {
      const brick = row[i];
      edgePosition += brick;
      // row 0: countGaps = {1: 1, 3: 1, 5: 1}
      // row 1: countGaps = {1: 1, 3: 2, 5: 1, 4: 1} (updating)
      // row 2: countGaps = {1: 2, 3: 2, 5: 1, 2: 2, 4: 2} (updating)
      // row 3: countGaps = {1: 2, 3: 2, 5: 1, 2: 1, 4: 2} (updating)
      // row 4: countGaps = {1: 2, 3: 3, 5: 1, 2: 1, 4: 3} (updating)
      // row 5: countGaps = {1: 3, 3: 3, 5: 2, 2: 1, 4: 4} (updating)
      countGaps.set(edgePosition, (countGaps.get(edgePosition) || 0) + 1);
    }
  }
  //look for max gaps => min bricks to cuts
  let maxGaps = 0;
  for (let gaps of countGaps.values()) {
    maxGaps = Math.max(maxGaps, gaps);
  }
  //total rows - max gaps
  return wall.length - maxGaps;
};

/*

Time and Space Complexity:

Time: O(n×k) where n is number of rows and k is average number of bricks per row
Space: O(n×k) for storing the gaps in the hashmap

*/
