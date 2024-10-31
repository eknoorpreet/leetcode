/*

Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.



Example 1:

Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
Output: [[1,6],[8,10],[15,18]]
Explanation: Since intervals [1,3] and [2,6] overlap, merge them into [1,6].
Example 2:

Input: intervals = [[1,4],[4,5]]
Output: [[1,5]]
Explanation: Intervals [1,4] and [4,5] are considered overlapping.


Constraints:

1 <= intervals.length <= 10^4
intervals[i].length == 2
0 <= starti <= endi <= 10^4

*/

/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */

const merge = function (intervals) {
  // Sort by their start times
  intervals.sort((a, b) => a[0] - b[0]);

  // Make sure that there is the first interval in the result
  // with which we can compare the current interval
  const result = [intervals[0]];

  for (let i = 0; i < intervals.length; i++) {
    const currInterval = intervals[i];
    const lastIntervalEnd = result[result.length - 1][1];
    // If curr interval starts before previous interval ends => overlap
    if (currInterval[0] <= lastIntervalEnd) {
      const newEnd = Math.max(lastIntervalEnd, currInterval[1]);
      // Merged
      result[result.length - 1][1] = newEnd;
    } else {
      // Else, the curr interval starts after previous interval ends => No overlap
      result.push(currInterval);
    }
  }
  return result;
};

/*

Time Complexity

Sorting the Intervals: The function first sorts the intervals based on their start times. Sorting takes
O(nlogn), where n is the number of intervals.
Merging Intervals: After sorting, the function iterates through the intervals in a single pass. Each interval is either merged with the last interval in the result list (if there is an overlap), or added to the result list as a new interval. This takes n is the number of intervals.
Since sorting O(nlogn) dominates the linear pass O(n), the overall time complexity is O(nlogn).

Space Complexity:
Output Array (result): In the worst case, none of the intervals overlap, so all
n intervals will be added to the result array. This results in O(n) space complexity for the result array.

*/
