/*

Given a list of non-negative integers nums, arrange them such that they form the largest number and return it.

Since the result may be very large, so you need to return a string instead of an integer.



Example 1:

Input: nums = [10,2]
Output: "210"
Example 2:

Input: nums = [3,30,34,5,9]
Output: "9534330"


Constraints:

1 <= nums.length <= 100
0 <= nums[i] <= 10^9

*/

/**
 * @param {number[]} nums
 * @return {string}
 */

/*

The intuition behind this solution is that we want to make sure that the most significant
digits come first in the final number. To achieve this, we define a custom comparison function
that compares two numbers as strings based on their concatenated values. Sorting the numbers
with this comparison function ensures that they are arranged to form the largest number.

*/
const largestNumber = function (nums) {
  for (let i = 0; i < nums.length; i++) {
    nums[i] = `${nums[i]}`;
  }
  //if we have n1 = "30" and n2 = "3", the comparison n1 + n2 is "303," and n2 + n1 is "330."
  //Since "330" is greater than "303," we return 1, indicating that n2 should come before n1 in
  //the sorted order.
  const compare = (n1, n2) => {
    if (n1 + n2 > n2 + n1) return -1;
    else 1;
  };
  nums.sort(compare);
  return `${BigInt(nums.join(''))}`;
};

/*

The time complexity of this solution is O(n log n), where n is the number of integers in the nums
array. This is due to the sorting operation.

The space complexity is O(1) since they're modifying the input array and not using any
additional data structures.

*/
