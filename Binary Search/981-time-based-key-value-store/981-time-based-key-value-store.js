/*

Design a time-based key-value data structure that can store multiple values for the same key at different time stamps and retrieve the key's value at a certain timestamp.

Implement the TimeMap class:

TimeMap() Initializes the object of the data structure.
void set(String key, String value, int timestamp) Stores the key key with the value value at the given time timestamp.
String get(String key, int timestamp) Returns a value such that set was called previously, with timestamp_prev <= timestamp. If there are multiple such values, it returns the value associated with the largest timestamp_prev. If there are no values, it returns "".


Example 1:

Input
["TimeMap", "set", "get", "get", "set", "get", "get"]
[[], ["foo", "bar", 1], ["foo", 1], ["foo", 3], ["foo", "bar2", 4], ["foo", 4], ["foo", 5]]
Output
[null, null, "bar", "bar", null, "bar2", "bar2"]

Explanation
TimeMap timeMap = new TimeMap();
timeMap.set("foo", "bar", 1);  // store the key "foo" and value "bar" along with timestamp = 1.
timeMap.get("foo", 1);         // return "bar"
timeMap.get("foo", 3);         // return "bar", since there is no value corresponding to foo at timestamp 3 and timestamp 2, then the only value is at timestamp 1 is "bar".
timeMap.set("foo", "bar2", 4); // store the key "foo" and value "bar2" along with timestamp = 4.
timeMap.get("foo", 4);         // return "bar2"
timeMap.get("foo", 5);         // return "bar2"


Constraints:

1 <= key.length, value.length <= 100
key and value consist of lowercase English letters and digits.
1 <= timestamp <= 10^7
All the timestamps timestamp of set are strictly increasing.
At most 2 * 10^5 calls will be made to set and get.

*/

/*

/*

Intuition
If we read the problem statement carefully, it is mentioned
that "All the timestamps of set are strictly increasing", thus even if we use an array
to store the timestamps, they will be pushed in sorted order. But we also need to
store values with each timestamp, so we will store (timestamp, value) pairs
in the key's bucket which will be an array.

So now our data structure keyTimeMap will look like this:
HashMap(key, Array(Pair(timestamp, value))).

*/

const TimeMap = function () {
  // {key => [[value, timestamp]]}
  this.store = new Map();
};

/**
 * @param {string} key
 * @param {string} value
 * @param {number} timestamp
 * @return {void}
 */

/*

Intuition:

If the key doesn't exist, create an empty array
Append the [value, timestamp] pair to the key's array
Important: We don't manually sort the array
New entries are added in order, maintaining timestamp sorting

*/

TimeMap.prototype.set = function (key, value, timestamp) {
  if (!this.store.has(key)) {
    this.store.set(key, []);
  }
  this.store.get(key).push([value, timestamp]);
};

/**
 * @param {string} key
 * @param {number} timestamp
 * @return {string}
 */

/*

Intuition: Binary Search

Goal: Find the largest timestamp <= input timestamp
If multiple values exist for timestamps <= input, return the most recent one

Same logic as: https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/description/

*/

TimeMap.prototype.get = function (key, timestamp) {
  let result = '';
  const values = this.store.get(key) ?? [];

  let left = 0;
  let right = values.length - 1;
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (values[mid][1] <= timestamp) {
      result = values[mid][0];
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return result;
};

/**
 * Your TimeMap object will be instantiated and called as such:
 * var obj = new TimeMap()
 * obj.set(key,value,timestamp)
 * var param_2 = obj.get(key,timestamp)
 */

/*

Time and Space Complexity

If M is the number of set function calls, N is the number of get function calls, and
L is average length of key and value strings.

set(): in each call, we push a (timestamp, value) pair in the key bucket, which takes
O(L) time to hash the string. Thus, for M calls overall it will take, O(M⋅L) time.

get(): we use binary search on the key's bucket which can have at most M elements and to
hash the string it takes O(L) time, thus overall it will take O(L⋅logM) time for binary search.

And, for N calls overall it will take, O(N⋅L⋅logM) time.

Space:

In the set() function, in each call we store one value string of length L, which takes O(L) space.
Thus, for M calls we may store M unique values, so overall it may take O(M⋅L) space.

In the get() function, we are not using any additional space.
Thus, for all N calls it is a constant space operation.

*/
