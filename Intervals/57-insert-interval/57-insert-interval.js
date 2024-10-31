/*

You are given an array of non-overlapping intervals intervals where intervals[i] = [starti, endi] represent the start and the end of the ith interval and intervals is sorted in ascending order by starti. You are also given an interval newInterval = [start, end] that represents the start and end of another interval.

Insert newInterval into intervals such that intervals is still sorted in ascending order by starti and intervals still does not have any overlapping intervals (merge overlapping intervals if necessary).

Return intervals after the insertion.

Note that you don't need to modify intervals in-place. You can make a new array and return it.



Example 1:

Input: intervals = [[1,3],[6,9]], newInterval = [2,5]
Output: [[1,5],[6,9]]
Example 2:

Input: intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
Output: [[1,2],[3,10],[12,16]]
Explanation: Because the new interval [4,8] overlaps with [3,5],[6,7],[8,10].


Constraints:

0 <= intervals.length <= 10^4
intervals[i].length == 2
0 <= starti <= endi <= 10^5
intervals is sorted by starti in ascending order.
newInterval.length == 2
0 <= start <= end <= 10^5

*/

/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */

/*

Idea: Iterate through the sorted intervals and handles three possible cases:

No overlap, new interval comes before current
No overlap, current interval comes before new
Overlap exists, need to merge the current and new interval (build up the latter like this and
compare to the next intervals)

*/

const insert = function (intervals, newInterval) {
  // Intervals already sorted
  const result = [];
  for (let i = 0; i < intervals.length; i++) {
    const currInterval = intervals[i];
    // If the new interval ends before curr interval starts
    // Does it belong after the curr interval (No overlap)
    // (new's end < curr's start)
    if (newInterval[1] < currInterval[0]) {
      //the new interval comes first
      result.push(newInterval);
      // Add the remaining intervals after i to result
      // Why? Because it doesn't overlap with the curr interval
      // => won't overlap with upcoming ones either (sorted!)
      return result.concat(intervals.slice(i));
    }
    // If the new interval starts after curr interval ends
    // Does it belong after the curr interval (No overlap)
    // (new's start > curr's end)
    else if (newInterval[0] > currInterval[1]) {
      // the curr interval comes first
      result.push(currInterval);
      // Don't add the new interval to output just yet
      // We know that it comes after the current interval
      // but it might overlap with other intervals
    } else {
      // new interval overlaps with curr interval - merge intervals
      // [1, 3], [2, 5]
      // Min(1, 2) = 1
      // Max(3, 5) = 5
      // Merged interval = [1, 5]
      const newIntervalStart = Math.min(newInterval[0], currInterval[0]);
      const newIntervalEnd = Math.max(newInterval[1], currInterval[1]);
      newInterval = [newIntervalStart, newIntervalEnd];
      // Don't add it to output just yet
      // Because it might overlap with other intervals
      // Now on to the next iteration, to compare new interval vs next one
    }
  }
  // What if the 1st condition never executes? We'd never be vable to add new
  // interval to result. Do it here
  result.push(newInterval);
  return result;
};

/*

Time Complexity: O(n)

We make a single pass through the intervals array of length n
The slice operation in intervals.slice(i) might look expensive, but it's only executed once when we return

Space Complexity: O(n)

We create a new result array that will contain all intervals after merging
In the worst case, the result array will have the same length as the input array (when no merging occurs)
The slice() operation creates a new array, but again this is bounded by O(n)


*/
