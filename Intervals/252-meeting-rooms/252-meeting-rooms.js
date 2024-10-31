/*

Given an array of meeting time intervals where intervals[i] = [starti, endi], determine if a person could attend all meetings.



Example 1:

Input: intervals = [[0,30],[5,10],[15,20]]
Output: false
Example 2:

Input: intervals = [[7,10],[2,4]]
Output: true


Constraints:

0 <= intervals.length <= 10^4
intervals[i].length == 2
0 <= starti < endi <= 10^6

*/

/**
 * @param {number[][]} intervals
 * @return {boolean}
 */

const canAttendMeetings = function (intervals) {
  if (intervals.length === 0) return true;
  intervals.sort((a, b) => a[0] - b[0]);
  let lastEnd = intervals[0][1];

  for (let i = 1; i < intervals.length; i++) {
    const currInterval = intervals[i];
    if (currInterval[0] >= lastEnd) {
      lastEnd = currInterval[1];
    } else {
      return false;
    }
  }
  return true;
};

/**

Time Complexity: O(n log n)
Space Complexity: O(1)

*/
