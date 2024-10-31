/*

Given an array of intervals intervals where intervals[i] = [starti, endi], return the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.

Note that intervals which only touch at a point are non-overlapping. For example, [1, 2] and [2, 3] are non-overlapping.



Example 1:

Input: intervals = [[1,2],[2,3],[3,4],[1,3]]
Output: 1
Explanation: [1,3] can be removed and the rest of the intervals are non-overlapping.
Example 2:

Input: intervals = [[1,2],[1,2],[1,2]]
Output: 2
Explanation: You need to remove two [1,2] to make the rest of the intervals non-overlapping.
Example 3:

Input: intervals = [[1,2],[2,3]]
Output: 0
Explanation: You don't need to remove any of the intervals since they're already non-overlapping.


Constraints:

1 <= intervals.length <= 10^5
intervals[i].length == 2
-5 * 10^4 <= starti < endi <= 5 * 10^4

*/

/**
 * @param {number[][]} intervals
 * @return {number}
 */

/*

Greedy approach: Sort intervals by end time first. This is key because choosing intervals with earlier end times maximizes our opportunities to fit future non-overlapping intervals (because, lesser overlaps).

Case 1: [1,11] vs [2,12]
               [1,11]
                [2,12]
Keep [1,11] because:
- It frees up more space after 11 for future intervals
- If we kept [2,12], we'd block out time until 12 unnecessarily

We don't actually remove intervals - we just count how many need removal

*/

/**
 * @param {number[][]} intervals
 * @return {number}
 */

/*

Greedy approach: Sort intervals by end time first. This is key because choosing intervals with earlier end times maximizes our opportunities to fit future non-overlapping intervals (because, lesser overlaps).

Case 1: [1,11] vs [2,12]
               [1,11]
                [2,12]
Keep [1,11] because:
- It frees up more space after 11 for future intervals
- If we kept [2,12], we'd block out time until 12 unnecessarily

We don't actually remove intervals - we just count how many need removal

*/

const eraseOverlapIntervals = function (intervals) {
  // Sort intervals by finished time
  intervals.sort((a, b) => a[1] - b[1]);
  // [[1, 2], [2, 3], [1, 3], [3, 4]]
  let count = 0;
  // end time of the earliest interval (because sorted by finish)
  // represents the end time of the last interval we're keeping in our non-overlapping sequence.
  // (In 56. Merge Intervals, we used a result array to help us track this)
  let lastEnd = intervals[0][1];
  // Loop through all intervals
  for (let i = 1; i < intervals.length; i++) {
    //n - 1 interations
    const currInterval = intervals[i];

    // curr interval starts after (or at the same time) the previous interval's ends? => No overlap
    if (currInterval[0] >= lastEnd) {
      // This interval becomes our new "last kept interval"
      lastEnd = currInterval[1];
    } else {
      // Otherwise => overlap, will need to remove this
      count++;
      // When we find an overlap, we always keep the interval that ends earlier
      // This maximizes the space available for remaining intervals
      lastEnd = Math.min(currInterval[1], lastEnd);
    }
  }
  return count;
};

/*

Time Complexity: O(n log n)
Space Complexity: O(1)

*/
