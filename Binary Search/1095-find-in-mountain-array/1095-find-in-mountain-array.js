/*

You may recall that an array arr is a mountain array if and only if:

arr.length >= 3
There exists some i with 0 < i < arr.length - 1 such that:
arr[0] < arr[1] < ... < arr[i - 1] < arr[i]
arr[i] > arr[i + 1] > ... > arr[arr.length - 1]
Given a mountain array mountainArr, return the minimum index such that mountainArr.get(index) == target. If such an index does not exist, return -1.

You cannot access the mountain array directly. You may only access the array using a MountainArray interface:

MountainArray.get(k) returns the element of the array at index k (0-indexed).
MountainArray.length() returns the length of the array.
Submissions making more than 100 calls to MountainArray.get will be judged Wrong Answer. Also, any solutions that attempt to circumvent the judge will result in disqualification.



Example 1:

Input: array = [1,2,3,4,5,3,1], target = 3
Output: 2
Explanation: 3 exists in the array, at index=2 and index=5. Return the minimum index, which is 2.
Example 2:

Input: array = [0,1,2,4,2,1], target = 3
Output: -1
Explanation: 3 does not exist in the array, so we return -1.


Constraints:

3 <= mountain_arr.length() <= 10^4
0 <= target <= 10^9
0 <= mountain_arr.get(index) <= 10^9

*/

/**
 * // This is the MountainArray's API interface.
 * // You should not implement it, or speculate about its implementation
 * function MountainArray() {
 *     @param {number} index
 *     @return {number}
 *     this.get = function(index) {
 *         ...
 *     };
 *
 *     @return {number}
 *     this.length = function() {
 *         ...
 *     };
 * };
 */

/**
 * @param {number} target
 * @param {MountainArray} mountainArr
 * @return {number}
 */

/*

We're searching in a "mountain array" with limited access to the elements. Let me break down the key points:

Problem Understanding:

A mountain array is one that strictly increases up to a peak, then strictly decreases
We can only access the array through two methods:

MountainArray.get(k) to get element at index k
MountainArray.length() to get array length

We need to find the minimum index where target appears

Solution Strategy:
The solution uses three binary searches:

a) First Binary Search - Find Peak:

We find the peak by comparing adjacent elements
If arr[mid + 1] > arr[mid], peak is to the right
Otherwise, peak is at mid or to the left

b) Second Binary Search - Search Left Side:

Standard binary search on ascending part
From index 0 to peak
If found, this will be our minimum index

c) Third Binary Search - Search Right Side:

Modified binary search on descending part
From peak+1 to end
Only checked if target not found on left side

Why This Works:


The array is essentially split into two sorted subarrays at the peak
Left side is ascending: [1,2,3,4,5]
Right side is descending: [5,3,1]
We can use binary search on both sides efficiently
We search left side first because we want minimum index

*/

const findInMountainArray = function (target, mountainArr) {
  //find the peak of the array
  const findPeak = (mountainArr) => {
    let left = 0;
    let right = mountainArr.length() - 1;
    while (left < right) {
      let mid = left + Math.floor((right - left) / 2);
      if (mountainArr.get(mid + 1) > mountainArr.get(mid)) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }
    return left;
  };

  const leftBinarySearch = (mountainArr, target, left, right) => {
    while (left <= right) {
      let mid = left + Math.floor((right - left) / 2);
      const midVal = mountainArr.get(mid);
      if (target === midVal) {
        return mid;
      } else if (target < midVal) {
        right = mid - 1;
      } else if (target > midVal) {
        left = mid + 1;
      }
    }
    return -1;
  };

  const rightBinarySearch = (mountainArr, target, left, right) => {
    while (left <= right) {
      let mid = left + Math.floor((right - left) / 2);
      const midVal = mountainArr.get(mid);
      if (target === midVal) {
        return mid;
      } else if (target < midVal) {
        left = mid + 1;
      } else if (target > midVal) {
        right = mid - 1;
      }
    }
    return -1;
  };

  const peakInd = findPeak(mountainArr);

  //do a left BS for target in [0...peakInd]
  let leftSearch = leftBinarySearch(mountainArr, target, 0, peakInd);
  //target found?
  if (leftSearch !== -1) {
    return leftSearch;
  }
  //else, do a right BS for target in [peakInd...length - 1]
  return rightBinarySearch(
    mountainArr,
    target,
    peakInd + 1,
    mountainArr.length() - 1
  );
};

/*

Time and Space Complexity:

Time: O(log n) for each binary search = O(log n) total
Space: O(1) as we only use a constant amount of extra space

*/
