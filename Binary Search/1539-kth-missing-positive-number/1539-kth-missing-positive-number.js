/*

Given an array arr of positive integers sorted in a strictly increasing order, and an integer k.

Return the kth positive integer that is missing from this array.



Example 1:

Input: arr = [2,3,4,7,11], k = 5
Output: 9
Explanation: The missing positive integers are [1,5,6,8,9,10,12,13,...]. The 5th missing positive integer is 9.
Example 2:

Input: arr = [1,2,3,4], k = 2
Output: 6
Explanation: The missing positive integers are [5,6,7,...]. The 2nd missing positive integer is 6.


Constraints:

1 <= arr.length <= 1000
1 <= arr[i] <= 1000
1 <= k <= 1000
arr[i] < arr[j] for 1 <= i < j <= arr.length

*/

/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number}
 */

/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number}
 */
var findKthPositive0 = function (arr, k) {
  let missingIndex = 0;
  let set = new Set(arr);

  for (let i = 1; ; i++) {
    if (!set.has(i)) {
      missingIndex++;
      if (missingIndex === k) {
        return i;
      }
    }
  }
};

const findKthPositive = function (arr, k) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    // In a perfectly sequential array, mid + 1 would be the expected number
    const expectedMidElement = mid + 1;
    // Calculate how many numbers are missing before this index
    const missingCount = arr[mid] - expectedMidElement;
    // If missing numbers are less than k, move right
    if (missingCount < k) {
      left = mid + 1;
    } else {
      // If missing numbers are more than or equal to k, move left
      right = mid - 1;
    }
  }
  return left + k;
};

/*

Time Complexity: O(log n)
Space Complexity: O(1)

*/
