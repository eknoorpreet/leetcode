/**
 * @param {number[][]} wall
 * @return {number}
 */

const leastBricks = function (wall) {
  //every row has the exam same (total) width (sum of bricks in a row) = 6
  //how to get the position/edge?
  //where brick of edge 1 ends => edge 1,
  //where brick of edge 2 ends => edge 2, and so on...
  //Brute-force: for every position, check the cuts: 1 -> 3 cuts, 2 -> 5 cuts, 3 -> 3, 4 -> 2 (answer)
  //Optimization: Instead of going through every position, go through just the gaps
  //count gaps in every row (hashmap) with key (position/edge) and gaps
  const countGaps = new Map(); //store rows as keys and gaps as values
  countGaps.set(0, 0); //initial value (0 gaps at position 0) (if hashmap is empty at the end, return this)
  for (let row of wall) {
    let total = 0;
    //don't include the last one
    for (let i = 0; i < row.length - 1; i++) {
      const brick = row[i];
      total += brick;
      //row 0: countGaps = {1: 1, 3: 1, 5: 1}
      //row 1: countGaps = {1: 1, 3: 2, 5: 1, 4: 1} (updating)
      //row 2: countGaps = {1: 2, 3: 2, 5: 1, 2: 2, 4: 2} (updating)
      //row 3: countGaps = {1: 2, 3: 2, 5: 1, 2: 1, 4: 2} (updating)
      //row 4: countGaps = {1: 2, 3: 3, 5: 1, 2: 1, 4: 3} (updating)
      //row 5: countGaps = {1: 3, 3: 3, 5: 2, 2: 1, 4: 4} (updating)
      countGaps.set(total, (countGaps.get(total) || 0) + 1);
    }
  }
  //look for max gaps => min bricks to cuts
  let maxGaps = -1;
  for (let gaps of countGaps.values()) {
    maxGaps = Math.max(maxGaps, gaps);
  }
  //total rows - max gaps
  return wall.length - maxGaps;
};

//TC: O(n*k), n = no. of rows, k = no. of bricks
//SC: O(n*k)
