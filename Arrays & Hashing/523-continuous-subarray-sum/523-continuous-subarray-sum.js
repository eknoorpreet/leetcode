/*

Given an integer array nums and an integer k, return true if nums has a good subarray or false otherwise.

A good subarray is a subarray where:

its length is at least two, and
the sum of the elements of the subarray is a multiple of k.
Note that:

A subarray is a contiguous part of the array.
An integer x is a multiple of k if there exists an integer n such that x = n * k. 0 is always a multiple of k.


Example 1:

Input: nums = [23,2,4,6,7], k = 6
Output: true
Explanation: [2, 4] is a continuous subarray of size 2 whose elements sum up to 6.
Example 2:

Input: nums = [23,2,6,4,7], k = 6
Output: true
Explanation: [23, 2, 6, 4, 7] is an continuous subarray of size 5 whose elements sum up to 42.
42 is a multiple of 6 because 42 = 7 * 6 and 7 is an integer.
Example 3:

Input: nums = [23,2,6,4,7], k = 13
Output: false


Constraints:

1 <= nums.length <= 10^5
0 <= nums[i] <= 10^9
0 <= sum(nums[i]) <= 2^31 - 1
1 <= k <= 2^31 - 1

*/

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */

/*

Brute-force: Check every subarray (n subarrays starting from n elements) and check if the sum is a multiple of k => O(n^2)

Optimized: 23 % 6 = 5, basically, we need a 1. If we add more, the next time, if we happen to
get a remainder of 5, it'd only be because we added a multiple of k!

A hashmap to store remainder (key) and index (so we can check length) of start of subarray (value)
remainder at 0th index and 2nd index = 5
=> only possible because we added values that are multiple of k
make sure that subarray is of length 2 (difference of indices >= 2)

Therefore, key intuition:

1. If two running sums have the same remainder when divided by k,
then the subarray between those points must sum to a multiple of k.
2. We just need to track remainders and their indices,
looking for matching remainders at least 2 positions apart.

*/

const checkSubarraySum = function (nums, k) {
  /*

  The initial remainder[0] = -1 handles cases where the subarray starts from index 0:
  Consider the start of the subarray (before index 0)
  [2, 4, 3], k = 6
  2 + 4 = 6 % 6 = 0. If map = {0: 0}, i(1) - rem[0] = 1 - 0 = 1 => false => wrong!
  Hence, 2 + 4 = 6 % 6 = 0. map = {0: -1}, i(1) - rem[0] = 1 - (-1) = 2 => true => correct!
  */
  const remainder = {};
  remainder[0] = -1;
  let total = 0;

  for (let i = 0; i < nums.length; i++) {
    total += nums[i];
    const rem = total % k;
    if (!(rem in remainder)) {
      remainder[rem] = i;
    } else if (i - remainder[rem] >= 2) {
      //just check if subarray length is atleast 2
      return true;
    }
  }
  return false;
};

//TC: O(n)
//SC: O(n)

//TC: O(n)
//SC: O(n)

// const checkSubarraySum = function(nums, k) {
//     const rems = new Map()
//     rems.set(0, -1)
//     let total = 0;
//     for(let i = 0; i < nums.length; i++) {
//         total += nums[i]
//         const rem = total % k
//         if(!(rems.has(rem))) rems.set(rem, i)
//         else if(i - rems.get(rem) > 1) return true
//     }
//     return false
// };
