/*

Given an integer array nums, return the number of subarrays filled with 0.

A subarray is a contiguous non-empty sequence of elements within an array.



Example 1:

Input: nums = [1,3,0,0,2,0,0,4]
Output: 6
Explanation:
There are 4 occurrences of [0] as a subarray.
There are 2 occurrences of [0,0] as a subarray.
There is no occurrence of a subarray with a size more than 2 filled with 0. Therefore, we return 6.
Example 2:

Input: nums = [0,0,0,2,0,0]
Output: 9
Explanation:
There are 5 occurrences of [0] as a subarray.
There are 3 occurrences of [0,0] as a subarray.
There is 1 occurrence of [0,0,0] as a subarray.
There is no occurrence of a subarray with a size more than 3 filled with 0. Therefore, we return 9.
Example 3:

Input: nums = [2,10,2019]
Output: 0
Explanation: There is no subarray filled with 0. Therefore, we return 0.


Constraints:

1 <= nums.length <= 10^5
-10^9 <= nums[i] <= 10^9

*/

/**
 * @param {number[]} nums
 * @return {number}
 */

//Brute-force solution: Go through the array, if curr element is 0, increment the count and
//TC: O(n^2)
//SC: O(1)
const zeroFilledSubarray0 = function (nums) {
  let count = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === 0) {
      count++;
      for (let j = i + 1; j < nums.length; j++) {
        if (nums[j] === 0) count++;
        else break;
      }
    }
  }
  return count;
};

/*

0 => 1
00 => 3 (+ 2)
000 => 6 (+ 3)
0000 => 10 (+ 4)

Pattern: Every time the subarray size increases by 1, it brings in as many subarrays as the total 0s
in the new subarray!

If we add 1 0 to n 0s, number of subarrays being added = 1 new 0 in itself +  1 being added to n 0s

From 1 to 2 0s, it brought in 2 subarrays.
From 2 to 3 0s, it brought in 3 subarrays.
From 3 to 3 0s, it brought in 4 subarrays.
*/

const zeroFilledSubarray = function (nums) {
  let count = 0;
  let conseqLength = 0; //basically, new subarrays being added
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === 0) {
      conseqLength++;
      count += conseqLength;
    } else {
      conseqLength = 0;
    }
  }
  return count;
};

//TC: O(n)
//SC: O(1)
