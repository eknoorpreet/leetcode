/*

Given an array intervals where intervals[i] = [li, ri] represent the interval [li, ri), remove all intervals that are covered by another interval in the list.

The interval [a, b) is covered by the interval [c, d) if and only if c <= a and b <= d.

Return the number of remaining intervals.



Example 1:

Input: intervals = [[1,4],[3,6],[2,8]]
Output: 2
Explanation: Interval [3,6] is covered by [2,8], therefore it is removed.
Example 2:

Input: intervals = [[1,4],[2,3]]
Output: 1


Constraints:

1 <= intervals.length <= 1000
intervals[i].length == 2
0 <= li < ri <= 10^5
All the given intervals are unique.

*/

/**
 * @param {number[][]} intervals
 * @return {number}
 */

/*

Sort because we want to compare intervals systematically. We sort by:

Primary: Start time (ascending) a[0] - b[0]
Secondary: If start times are equal, sort by end time (descending) b[1] - a[1]

We sort by start times (ascending) because we want the earliest start times first. Why? Because the earliest starting interval won't be covered by any other interval (unless 2 or more start times are equal)

Why the secondary sorting? Consider intervals: [[1,4], [1,6], [1,3]]
After sorting: [[1,6], [1,4], [1,3]]
This helps us because when start times are equal, we want the longer interval first.


*/

const removeCoveredIntervals = function (intervals) {
  intervals.sort((a, b) => (a[0] === b[0] ? b[1] - a[1] : a[0] - b[0]));

  // Only contains non-covered intervals
  // However, these intervals might cover other intervals
  const nonCoveredIntervals = [intervals[0]];

  for (let i = 1; i < intervals.length; i++) {
    const currInterval = intervals[i];
    const lastStart = nonCoveredIntervals[nonCoveredIntervals.length - 1][0];
    const lastEnd = nonCoveredIntervals[nonCoveredIntervals.length - 1][1];

    // If the last interval covers the current interval => do nothing (don't add to result)
    if (lastStart <= currInterval[0] && lastEnd >= currInterval[1]) {
      continue;
    }
    // Else, add the non-covered interval
    // If an interval isn't covered, it becomes a new potential "covering interval"
    nonCoveredIntervals.push(currInterval);
  }
  return nonCoveredIntervals.length;
};

/*

Time and Space Complexity:

Time: O(n log n) due to sorting
Space: O(n) for storing the result array

*/
