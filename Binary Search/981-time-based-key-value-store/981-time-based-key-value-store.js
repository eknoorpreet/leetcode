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

The core idea is to use a hash map (Map) where:

Each key maps to an array of [value, timestamp] pairs
The array is sorted by timestamp
This allows efficient storage and retrieval of time-based values

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
    // if(values[mid] < timestamp)
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

set(): O(1) amortized time
get(): O(log n) time complexity due to binary search
Space: O(m), where m is total number of set operations

*/
