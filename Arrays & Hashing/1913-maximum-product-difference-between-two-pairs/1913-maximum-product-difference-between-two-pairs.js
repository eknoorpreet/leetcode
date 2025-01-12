/*

The product difference between two pairs (a, b) and (c, d) is defined as (a * b) - (c * d).

For example, the product difference between (5, 6) and (2, 7) is (5 * 6) - (2 * 7) = 16.
Given an integer array nums, choose four distinct indices w, x, y, and z such that the product difference between pairs (nums[w], nums[x]) and (nums[y], nums[z]) is maximized.

Return the maximum such product difference.



Example 1:

Input: nums = [5,6,2,7,4]
Output: 34
Explanation: We can choose indices 1 and 3 for the first pair (6, 7) and indices 2 and 4 for the second pair (2, 4).
The product difference is (6 * 7) - (2 * 4) = 34.
Example 2:

Input: nums = [4,2,5,9,7,4,8]
Output: 64
Explanation: We can choose indices 3 and 6 for the first pair (9, 8) and indices 1 and 5 for the second pair (2, 4).
The product difference is (9 * 8) - (2 * 4) = 64.


Constraints:

4 <= nums.length <= 10^4
1 <= nums[i] <= 10^4


*/

/**
 * @param {number[]} nums
 * @return {number}
 */

const maxProductDifference0 = function (nums) {
  nums.sort((a, b) => a - b);

  const num1 = nums[0];
  const num2 = nums[1];
  const smallestProduct = num1 * num2;

  const num3 = nums[nums.length - 1];
  const num4 = nums[nums.length - 2];
  const largestProduct = num3 * num4;

  return largestProduct - smallestProduct;
};

/*

TC: O(n log n)
SC: O(1)

*/

const maxProductDifference = function (nums) {
  let smallest = Infinity;
  let secondSmallest = Infinity;
  let largest = -Infinity;
  let secondLargest = -Infinity;

  for (const num of nums) {
    if (num > largest) {
      secondLargest = largest;
      largest = num;
    } else {
      secondLargest = Math.max(num, secondLargest);
    }

    if (num < smallest) {
      secondSmallest = smallest;
      smallest = num;
    } else {
      secondSmallest = Math.min(num, secondSmallest);
    }
  }

  const smallestProduct = smallest * secondSmallest;
  const largestProduct = largest * secondLargest;

  return largestProduct - smallestProduct;
};

/*

TC: O(n)
SC: O(1)

*/
