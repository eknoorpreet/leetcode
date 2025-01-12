/*

You are given an array nums of non-negative integers. nums is considered special if there exists a number x such that there are exactly x numbers in nums that are greater than or equal to x.

Notice that x does not have to be an element in nums.

Return x if the array is special, otherwise, return -1. It can be proven that if nums is special, the value for x is unique.



Example 1:

Input: nums = [3,5]
Output: 2
Explanation: There are 2 values (3 and 5) that are greater than or equal to 2.
Example 2:

Input: nums = [0,0]
Output: -1
Explanation: No numbers fit the criteria for x.
If x = 0, there should be 0 numbers >= x, but there are 2.
If x = 1, there should be 1 number >= x, but there are 0.
If x = 2, there should be 2 numbers >= x, but there are 0.
x cannot be greater since there are only 2 numbers in nums.
Example 3:

Input: nums = [0,4,3,0,4]
Output: 3
Explanation: There are 3 values that are greater than or equal to 3.


Constraints:

1 <= nums.length <= 100
0 <= nums[i] <= 1000

*/

/**
 * @param {number[]} nums
 * @return {number}
 */

/*

Why we set x to the length of the array by thinking through why this is a logical upper bound.

Consider the definition: we want to find a number x where exactly x numbers in the array are greater than or equal to x.

Let's think about why array length is the maximum possible value for x:

Let's say array length is 5:
ynums = [1, 2, 3, 4, 5]  // length = 5

The maximum possible value for x cannot be more than 5 because:

Even if ALL numbers in the array are huge (like [100,100,100,100,100])
You can't have more than 5 numbers that are ≥ x (since there are only 5 numbers total)
So if x were 6, it would be impossible to have 6 numbers ≥ 6 in an array of length 5

*/

const specialArray = function (nums) {
  const x = nums.length;
  // Create counting array of size x + 1
  // At 0, store count of numbers >= 0
  // At 1, store count of numbers >= 1
  // We need index 2 to store numbers ≥ 2, so the array needs to be size 3 (indices 0, 1, 2).

  // In general:

  // To count numbers that are ≥ x, we need index x in our array
  // To have index x available, we need array size of x + 1
  let counts = Array(x + 1).fill(0);

  for (const num of nums) {
    // All numbers ≥ x get counted in x bucket
    if (num >= x) {
      counts[x]++;
    } else {
      // Other numbers go in their own bucket
      counts[num]++;
    }
  }

  // Keeps track of how many numbers are ≥ current index i
  let result = 0;

  for (let i = counts.length - 1; i > 0; i--) {
    // Accumulate count of numbers ≥ i
    result += counts[i];
    // Exactly i numbers are ≥ i => found our special number
    if (result === i) return i;
  }

  return -1;
};

/*

TC: O(n)
SC: O(n)

*/
