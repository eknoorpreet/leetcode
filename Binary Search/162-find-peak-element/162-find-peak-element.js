/*

A peak element is an element that is strictly greater than its neighbors.

Given a 0-indexed integer array nums, find a peak element, and return its index. If the array contains multiple peaks, return the index to any of the peaks.

You may imagine that nums[-1] = nums[n] = -∞. In other words, an element is always considered to be strictly greater than a neighbor that is outside the array.

You must write an algorithm that runs in O(log n) time.



Example 1:

Input: nums = [1,2,3,1]
Output: 2
Explanation: 3 is a peak element and your function should return the index number 2.
Example 2:

Input: nums = [1,2,1,3,5,6,4]
Output: 5
Explanation: Your function can return either index number 1 where the peak element is 2, or index number 5 where the peak element is 6.


Constraints:

1 <= nums.length <= 1000
-2^31 <= nums[i] <= 2^31 - 1
nums[i] != nums[i + 1] for all valid i.

*/

/**
 * @param {number[]} nums
 * @return {number}
 */

/*

We compare the middle element with its right neighbor
If the right neighbor is greater, we know a peak must exist on the right side
If the right neighbor is smaller, we know a peak must exist on the left side (including the current middle element)

Why Compare with Right Neighbor?

Understand the Boundary Condition:
nums[-1] = nums[n] = -∞ means that:

The first element is considered a peak if it's greater than the second element
The last element is considered a peak if it's greater than the second last element
Any other element is a peak if it's greater than BOTH its neighbors

Comparison Strategy:
By comparing with the right neighbor, we can make a decisive choice about which half of the array to search:

If nums[mid+1] > nums[mid]:

We know a peak MUST exist on the right side
Why? Because the sequence is increasing
Even if not the final peak, we're guaranteed to find a peak by moving right

If nums[mid] > nums[mid+1]:

We know a peak MUST exist on the left side (including mid)
This could be the peak itself
Or the peak is somewhere to the left

Key Points:

Always move towards the "higher" side
Guaranteed to find a peak because of the boundary conditions
Works even with multiple peak elements

*/

const findPeakElement = function (nums) {
  let left = 0;
  let right = nums.length - 1;
  while (left < right) {
    let mid = left + Math.floor((right - left) / 2);
    // If the right neighbor is greater, we know a peak must exist on the right side
    if (nums[mid + 1] > nums[mid]) {
      // Move 'left' forward
      left = mid + 1;
    } else {
      // If the right neighbor is smaller,
      // we know a peak must exist on the left side (including the current middle element)
      right = mid;
    }
  }
  //left and right (via the checks) are both working towards finding the max element
  //only 1 element left => max ('peak') element
  return left;
};

/*

Time Complexity: O(log n)

Space Complexity: O(1)

*/
