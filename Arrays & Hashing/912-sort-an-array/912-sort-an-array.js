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

  //push remaining elements from arr1 to the results array.
  while (i < arr1.length) {
    results.push(arr1[i]);
    i++;
  }

  //push remaining elements from arr2 to the results array.
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

Time Complexity (TC): O(n log n)

The code uses the merge sort algorithm, which has a time complexity of O(n log n) in the worst case.
 This is because the array is divided into smaller subarrays recursively until single-element subarrays are reached (log n levels), and then those subarrays are merged together (n comparisons at each level).

 Space Complexity (SC): O(n)

The space complexity is determined by the additional memory required for the recursive function
calls and the merging process. Each recursive call creates a new set of subarrays
(for the left and right halves), and this can consume space. Additionally, the merge function
creates a new results array to store the merged values. In total, the space complexity is O(n),
as it grows linearly with the size of the input array.

*/
