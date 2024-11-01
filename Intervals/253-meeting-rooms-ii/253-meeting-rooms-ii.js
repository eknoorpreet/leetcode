/*

Given an array of meeting time intervals intervals where intervals[i] = [starti, endi], return the minimum number of conference rooms required.



Example 1:

Input: intervals = [[0,30],[5,10],[15,20]]
Output: 2
Example 2:

Input: intervals = [[7,10],[2,4]]
Output: 1


Constraints:

1 <= intervals.length <= 10^4
0 <= starti < endi <= 10^6

*/

/**
 * @param {number[][]} intervals
 * @return {number}
 */

/*

Number of conference rooms = max rooms needed at any point

Key insight: We can handle starts and ends separately


Why This Works:

By sorting separately:

We can process events chronologically
We know which meetings end first (important for room reuse)


The comparison starts[s] < ends[e]:

If true: a new meeting starts before any current meeting ends
If false: we can reuse a room because a meeting ends


Updating maxRooms:

Tracks the maximum concurrent meetings
This is our answer because it represents peak demand

*/

const minMeetingRooms = function (intervals) {
  const starts = intervals.map((i) => i[0]).sort((a, b) => a - b);
  const ends = intervals.map((i) => i[1]).sort((a, b) => a - b);

  let rooms = 0; // current rooms in use
  let maxRooms = 0; // max rooms needed at any point (= minimum number of conference rooms)
  let start = 0; // pointer for starts array
  let end = 0; // pointer for ends array

  while (start < starts.length) {
    // New meeting starts before current earliest end => we need a new room
    if (starts[start] < ends[end]) {
      rooms++;
      start++;
    } else {
      // New meeting starts after current ends => we free up a room
      rooms--;
      end++;
    }
    maxRooms = Math.max(maxRooms, rooms);
  }

  return maxRooms;
};

/*

Time & Space Complexity:

Time: O(n log n) due to sorting
Space: O(n) to store sorted arrays

*/
