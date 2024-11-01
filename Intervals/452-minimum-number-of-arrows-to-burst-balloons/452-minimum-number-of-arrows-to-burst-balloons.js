/*

There are some spherical balloons taped onto a flat wall that represents the XY-plane. The balloons are represented as a 2D integer array points where points[i] = [xstart, xend] denotes a balloon whose horizontal diameter stretches between xstart and xend. You do not know the exact y-coordinates of the balloons.

Arrows can be shot up directly vertically (in the positive y-direction) from different points along the x-axis. A balloon with xstart and xend is burst by an arrow shot at x if xstart <= x <= xend. There is no limit to the number of arrows that can be shot. A shot arrow keeps traveling up infinitely, bursting any balloons in its path.

Given the array points, return the minimum number of arrows that must be shot to burst all balloons.



Example 1:

Input: points = [[10,16],[2,8],[1,6],[7,12]]
Output: 2
Explanation: The balloons can be burst by 2 arrows:
- Shoot an arrow at x = 6, bursting the balloons [2,8] and [1,6].
- Shoot an arrow at x = 11, bursting the balloons [10,16] and [7,12].
Example 2:

Input: points = [[1,2],[3,4],[5,6],[7,8]]
Output: 4
Explanation: One arrow needs to be shot for each balloon for a total of 4 arrows.
Example 3:

Input: points = [[1,2],[2,3],[3,4],[4,5]]
Output: 2
Explanation: The balloons can be burst by 2 arrows:
- Shoot an arrow at x = 2, bursting the balloons [1,2] and [2,3].
- Shoot an arrow at x = 4, bursting the balloons [3,4] and [4,5].


Constraints:

1 <= points.length <= 10^5
points[i].length == 2
-2^31 <= xstart < xend <= 2^31 - 1

*/

/**
 * @param {number[][]} points
 * @return {number}
 */

/*

Input: [[1,10], [2,4], [3,6]]

After sorting by start:
      [1,10]
        [2,4]
          [3,6]

Step 1: lastEnd = 10 (from first balloon)

Step 2: [2,4] overlaps with [1,10]
- Can we use arrow at x=10? NO!
- Need to update lastEnd = min(10,4) = 4
- Why? Because arrow must be at a point that hits BOTH balloons
- Valid positions for arrow: x=2,3,4

Step 3: [3,6] overlaps with current lastEnd=4
- Can we use arrow at x=4? YES!
- Update lastEnd = min(4,6) = 4
- Valid positions for arrow: x=3,4

Final: One arrow at x=4 hits all three balloons

Why Both (sorting via start and end) Work:

Key Insight: We're looking for continuous chains of overlapping intervals
Sort by End:

Guarantees we always pick the earliest possible end point
Any interval that doesn't overlap needs a new arrow
Natural for greedy approach

Sort by Start:

Still works because we're tracking the minimum end point
end = Math.min(end, points[i][1]) is crucial
This ensures we don't miss any overlaps

*/

const findMinArrowShots = function (points) {
  points.sort((a, b) => a[0] - b[0]);

  let minArrows = 1; // 1 arrow will surely be needed for the first balloon

  let lastEnd = points[0][1];

  for (let i = 1; i < points.length; i++) {
    const currInterval = points[i];
    if (currInterval[0] > lastEnd) {
      lastEnd = currInterval[1];
      minArrows++;
    } else {
      // We need a point that can hit ALL overlapping balloons
      // Must be in the INTERSECTION of all overlapping intervals
      // Taking minimum ensures we don't miss any balloons
      lastEnd = Math.min(lastEnd, currInterval[1]);
    }
  }
  return minArrows;
};

/**

Time Complexity: O(n log n)
Space Complexity: O(1)

*/
