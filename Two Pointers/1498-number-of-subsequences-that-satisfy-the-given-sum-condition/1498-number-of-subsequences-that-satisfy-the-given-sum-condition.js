/*

You are given an array of integers nums and an integer target.

Return the number of non-empty subsequences of nums such that the sum of the minimum and maximum element on it is less or equal to target. Since the answer may be too large, return it modulo 109 + 7.



Example 1:

Input: nums = [3,5,6,7], target = 9
Output: 4
Explanation: There are 4 subsequences that satisfy the condition.
[3] -> Min value + max value <= target (3 + 3 <= 9)
[3,5] -> (3 + 5 <= 9)
[3,5,6] -> (3 + 6 <= 9)
[3,6] -> (3 + 6 <= 9)
Example 2:

Input: nums = [3,3,6,8], target = 10
Output: 6
Explanation: There are 6 subsequences that satisfy the condition. (nums can have repeated numbers).
[3] , [3] , [3,3], [3,6] , [3,6] , [3,3,6]
Example 3:

Input: nums = [2,3,3,4,6,7], target = 12
Output: 61
Explanation: There are 63 non-empty subsequences, two of them do not satisfy the condition ([6,7], [7]).
Number of valid subsequences (63 - 2 = 61).


Constraints:

1 <= nums.length <= 10^5
1 <= nums[i] <= 10^6
1 <= target <= 10^6

*/

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */

/*

Insights:

For any subsequence, only the minimum and maximum values matter for the target condition
Sorting the array doesn't affect the answer since we only care about min/max
After sorting, the first element in any subsequence is the minimum, and the last is the maximum

For any valid range [left, right], all elements between them can either be included or not
Each element between left and right has 2 choices (in/out)
So for a range with k elements between left and right, there are 2^k valid subsequences
We precompute these powers with modulo to avoid overflow

*/

const numSubseq0 = (nums, target) => {
  nums.sort((a, b) => a - b);
  let result = 0;
  let left = 0;
  let right = nums.length - 1;
  const mod = 1e9 + 7;
  const powersOfTwo = new Array(nums.length);

  // Precompute Powers of 2
  powersOfTwo[0] = 1;

  for (let i = 1; i < nums.length; ++i) {
    powersOfTwo[i] = (powersOfTwo[i - 1] * 2) % mod;
  }

  while (left <= right) {
    // Range is too large, need to decrease maximum
    if (nums[left] + nums[right] > target) {
      right--;
    } else {
      // All subsequences using nums[left] as min and any number up to nums[right] as max are valid
      // Number of such subsequences = 2^(right-left)
      result = (result + powersOfTwo[right - left]) % mod;
      left++;
    }
  }

  return result;
};

/*

Time Complexity: O(n log n) for sorting + O(n) for two pointer = O(n log n)
Space Complexity: O(n) for the powers array

*/
