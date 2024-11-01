/*

Given an array of integers nums, sort the array in ascending order and return it.

You must solve the problem without using any built-in functions in O(nlog(n)) time complexity and with the smallest space complexity possible.



Example 1:

Input: nums = [5,2,3,1]
Output: [1,2,3,5]
Explanation: After sorting the array, the positions of some numbers are not changed (for example, 2 and 3), while the positions of other numbers are changed (for example, 1 and 5).
Example 2:

Input: nums = [5,1,1,2,0,0]
Output: [0,0,1,1,2,5]
Explanation: Note that the values of nums are not necessairly unique.


Constraints:

1 <= nums.length <= 5 * 104
-5 * 104 <= nums[i] <= 5 * 104

*/

/**
 * @param {number[]} nums
 * @return {number[]}
 */

function merge(arr1, arr2) {
  let results = [];
  //for the first array
  let i = 0;
  //for the second array
  let j = 0;
  //as long as both arrays are not exhausted
  // (n comparisons at every level (of log))
  while (i < arr1.length && j < arr2.length) {
    //compare respective elements of both arrays
    //push the smaller element to the results array.
    //increment the pointer of the array from which the element was taken.
    if (arr1[i] <= arr2[j]) {
      results.push(arr1[i]);
      i++;
    } else {
      results.push(arr2[j]);
      j++;
    }
  }

  // If arr1 has remaining elements, then arr2 must have been exhausted
  // Handle remaining elements of arr1
  while (i < arr1.length) {
    results.push(arr1[i]);
    i++;
  }

  // If arr2 has remaining elements, then arr1 must have been exhausted
  // Handle remaining elements of arr2
  while (j < arr2.length) {
    results.push(arr2[j]);
    j++;
  }
  return results;
}

const sortArray = function (nums) {
  //If the length of the nums array is 1 or less, it's considered already sorted!
  if (nums.length <= 1) {
    return nums;
  }
  //calculate the midpoint (mid) of the array
  let mid = Math.floor(nums.length / 2);
  //recursively splits the array into two subarrays, left and right
  //sort the left and right subarrays
  let left = sortArray(nums.slice(0, mid));
  let right = sortArray(nums.slice(mid));
  //merge the left and right subarrays
  return merge(left, right);
};

/*

Time Complexity: O(n log n)

log n levels of recursion (splitting)
n comparisons at each level (merging)
Hence, n * log n total operations

Space Complexity: O(n)

Needs extra space for the merged arrays
Recursive call stack uses O(log n)
Total space is O(n)

*/
