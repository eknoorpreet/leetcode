/*

Given an integer array nums which is sorted in ascending order and all of its elements are unique and given also an integer k, return the kth missing number starting from the leftmost number of the array.



Example 1:

Input: nums = [4,7,9,10], k = 1
Output: 5
Explanation: The first missing number is 5.
Example 2:

Input: nums = [4,7,9,10], k = 3
Output: 8
Explanation: The missing numbers are [5,6,8,...], hence the third missing number is 8.
Example 3:

Input: nums = [1,2,4], k = 3
Output: 6
Explanation: The missing numbers are [3,5,6,7,...], hence the third missing number is 6.


Constraints:

1 <= nums.length <= 5 * 10^4
1 <= nums[i] <= 10^7
nums is sorted in ascending order, and all the elements are unique.
1 <= k <= 10^8

*/

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */

const missingElement = function (nums, k) {
  let left = 0;
  let right = nums.length - 1;

  // Establish the baseline for counting missing numbers
  // (number just before the first element of the array)
  // (Establishing our range)
  let start = nums[left] - 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    // Calculate how many numbers are missing up to the current mid point
    // nums[mid]: The actual number at the mid index
    // mid + 1 + start: What the number should be if no numbers were missing
    const expectedMidElement = start + mid + 1;
    const missingCount = nums[mid] - expectedMidElement;
    console.log(missingCount);
    // If missing numbers are less than k, move right
    if (missingCount < k) {
      left = mid + 1;
    } else {
      // If missing numbers are more than or equal to k, move left
      right = mid - 1;
    }
  }
  // left: The index where we stop
  // k: The kth missing number
  // start: The baseline to adjust our final number
  return left + k + start;
};

/*

Time Complexity: O(log n)
Space Complexity: O(1)

*/
