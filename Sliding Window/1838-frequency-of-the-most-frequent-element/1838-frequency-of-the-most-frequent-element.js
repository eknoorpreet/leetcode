/*

The frequency of an element is the number of times it occurs in an array.

You are given an integer array nums and an integer k. In one operation, you can choose an index of nums and increment the element at that index by 1.

Return the maximum possible frequency of an element after performing at most k operations.



Example 1:

Input: nums = [1,2,4], k = 5
Output: 3
Explanation: Increment the first element three times and the second element two times to make nums = [4,4,4].
4 has a frequency of 3.
Example 2:

Input: nums = [1,4,8,13], k = 5
Output: 2
Explanation: There are multiple optimal solutions:
- Increment the first element three times to make nums = [4,4,8,13]. 4 has a frequency of 2.
- Increment the second element four times to make nums = [1,8,8,13]. 8 has a frequency of 2.
- Increment the third element five times to make nums = [1,4,13,13]. 13 has a frequency of 2.
Example 3:

Input: nums = [3,9,6], k = 2
Output: 1


Constraints:

1 <= nums.length <= 10^5
1 <= nums[i] <= 10^5
1 <= k <= 10^5

*/

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */

/*

"operation": increment the element by 1

Create a window and in that window, try to make all elements equal to the curr element!

By sorting the array, we create a situation where, if we have an element nums[end] and
all elements less than nums[end] are to its left, and all elements greater than
nums[end] are to its right, we can easily determine the operations needed to make all elements within a window equal to nums[end].

Then, instead of looking at an element as an individual, we can check the window sum! For current
element 8 to appear 3 times, the window sum should be 8 * 3 = 24. But the current window sum
might be 13. A total of 11 operations are required to reach 24! This logic works because we can
operate on more than 1 element to increase the frequency!
*/

const maxFrequency = function (nums, k) {
  nums.sort((a, b) => a - b);
  let start = 0;
  let result = 1;
  let windowSum = 0;
  for (let end = 0; end < nums.length; end++) {
    windowSum += nums[end];
    // We want to increase all the numbers in the window to equal nums[end]
    // Ex: [4,4,4], sum = 12. Basically, sum = windowSize * currElement
    // Therefore, number of operations = (end - start + 1) * nums[end] - windowSum, which
    //should be <= k. The goal is to make this value less than or equal to k.

    // If below condition is false => fine! you can perform <= k oprations
    // But if the calculated number of operations exceeds k, increment the start pointer and
    // subtract the element at start from the windowSum. This effectively shrinks the window and
    // tries to reduce the number of operations.
    while ((end - start + 1) * nums[end] - windowSum > k) {
      windowSum -= nums[start];
      start++;
    }
    //when we performed <= k operations, result is max result so far or size of the window!
    result = Math.max(result, end - start + 1);
  }
  return result;
};

//TC: O(nlogn)
//SC: O(1)
