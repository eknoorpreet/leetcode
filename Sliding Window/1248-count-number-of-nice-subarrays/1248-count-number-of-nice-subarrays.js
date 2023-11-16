/*

Given an array of integers nums and an integer k. A continuous subarray is called nice if there are k odd numbers on it.

Return the number of nice sub-arrays.



Example 1:

Input: nums = [1,1,2,1,1], k = 3
Output: 2
Explanation: The only sub-arrays with 3 odd numbers are [1,1,2,1] and [1,2,1,1].
Example 2:

Input: nums = [2,4,6], k = 1
Output: 0
Explanation: There is no odd numbers in the array.
Example 3:

Input: nums = [2,2,2,1,2,2,1,2,2,2], k = 2
Output: 16


Constraints:

1 <= nums.length <= 50000
1 <= nums[i] <= 10^5
1 <= k <= nums.length

*/

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */

const numberOfSubarrays0 = function (nums, k) {
  let start = 0;
  let result = 0;
  let oddCount = 0;
  let count = 0; //count of nice subarrays (subarrays we can produce when oddCount == k)
  for (let end = 0; end < nums.length; end++) {
    //if curr element is odd, increment oddCount
    if (nums[end] % 2) {
      oddCount++;
      // if oddCount reached k, analyse the left part and count how many subarrays
      // with odd == k we can produce.
      if (oddCount >= k) {
        //since, there are >= k odd elements, we can produce at least 1 nice subarray
        count = 1;
        // For each even number encountered, the count variable is incremented. This is
        //because each even number contributes to count of nice subarrays(k odd numbers)
        //is element in beginning of window even => count this subarray
        while (nums[start++] % 2 === 0) {
          count++;
        }
        //count the nice subarrays for the current subarray.
        result += count;
      }
      //if curr element is even AND atleast k odd numbers, add nice subarrays count to result
    } else if (oddCount >= k) {
      result += count;
    }
  }
  return result;
};

const numberOfSubarrays = function (nums, k) {
  let result = 0;
  let oddCount = 0;
  let start = 0;
  let count = 0;
  for (let end = 0; end < nums.length; end++) {
    if (nums[end] % 2) {
      oddCount++;
      if (oddCount >= k) {
        count = 1;
        while (nums[start++] % 2 === 0) {
          count++;
        }
        result += count;
      }
    } else if (oddCount >= k) result += count;
  }
  return result;
};

//TC: O(n)
//SC: O(1)
