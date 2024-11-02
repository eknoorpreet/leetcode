/*

Given an array of integers nums and an integer k, return the total number of subarrays whose sum equals to k.

A subarray is a contiguous non-empty sequence of elements within an array.

Example 1:

Input: nums = [1,1,1], k = 2
Output: 2
Example 2:

Input: nums = [1,2,3], k = 3
Output: 2


Constraints:

1 <= nums.length <= 2 * 10^4
-1000 <= nums[i] <= 1000
-10^7 <= k <= 10^7

*/

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */

/*

Brute-force: go through every element and check every subarray from there if it adds
up to the target

Intuition:

The key idea here is to use a map to store the frequencies of prefix sums since
multiple subarrays might have the same sum. This allows us to efficiently check if there is a
subarray that sums to k and calculate the count of such subarrays.

Take: [1, 2, 3, 4, 5], k = 9

prefixSum at index 0 = 1, prefixSum at index 3 = 10 => sum of subarray b/w index 0 and 3 = 10 - 1 = 9 (= k)

Therefore, if currSum (10) - any prevSum (1) = k, we can say that the subarray b/w index 0 and 3
resulted in a sum equal to k

Hence, new definition for the problem: keep storing prefix sums (and their frequencies) in a
map and if currSum (sum till index i) - k (= a prevSum; sum till index j) exists in our map,
we can say that a subarray from index j + 1 till i exists, where the sum of elements is k
since currSum - prevSum = k. How many times? The frequency of prevSum!

*/

const subarraySum = function (nums, k) {
  let currSum = 0;
  let count = 0;
  //[prefixSum => count]
  // [0,1] initialization needed for cases where a single subarray sums exactly to k
  // For example, with nums = [7] and k = 7, we need 0 to be in the map
  const prefixSumFrequency = new Map([[0, 1]]);
  for (let i = 0; i < nums.length; i++) {
    currSum += nums[i];
    // If we have already seen a subarray with a sum of currSum - k, we can conclude that the
    // difference between the current currSum and a previous currSum
    // (i.e., currSum - (currSum - k))
    // is equal to k. In other words, there is a subarray whose elements sum to k.

    // currSum - prevSum (currSum - k) = k

    // Check if there is a subarray whose sum equals k by examining if currSum - k is
    // present as a prefix sum in the map. If it exists, it means that there are subarrays with
    // the desired sum.
    if (prefixSumFrequency.has(currSum - k)) {
      // Add the number of subarrays
      count += prefixSumFrequency.get(currSum - k);
    }
    prefixSumFrequency.set(currSum, (prefixSumFrequency.get(currSum) || 0) + 1);
  }
  return count;
};

/*

Time Complexity: The algorithm performs a single pass through the nums array of length n.
Therefore, the time complexity is O(n).

Space Complexity: The algorithm uses a Map to store prefix sum frequencies.
In the worst case, when all prefix sums are unique, the space complexity is O(n).

*/
