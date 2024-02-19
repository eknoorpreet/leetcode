/*

Given a 0-indexed integer array nums, return the number of distinct quadruplets (a, b, c, d) such that:

nums[a] + nums[b] + nums[c] == nums[d], and
a < b < c < d


Example 1:

Input: nums = [1,2,3,6]
Output: 1
Explanation: The only quadruplet that satisfies the requirement is (0, 1, 2, 3) because 1 + 2 + 3 == 6.
Example 2:

Input: nums = [3,3,6,4,5]
Output: 0
Explanation: There are no such quadruplets in [3,3,6,4,5].
Example 3:

Input: nums = [1,1,1,3,5]
Output: 4
Explanation: The 4 quadruplets that satisfy the requirement are:
- (0, 1, 2, 3): 1 + 1 + 1 == 3
- (0, 1, 3, 4): 1 + 1 + 3 == 5
- (0, 2, 3, 4): 1 + 1 + 3 == 5
- (1, 2, 3, 4): 1 + 1 + 3 == 5


Constraints:

4 <= nums.length <= 50
1 <= nums[i] <= 100

/**
 * @param {number[]} nums
 * @return {number}
 */

const countQuadruplets = (nums) => {
  const n = nums.length;
  const freq = new Map(); // {sum => frequency}

  // Use the last element to check if it's a sum of the previous elements
  freq.set(nums[n - 1], 1);
  let result = 0;
  for (let i = n - 2; i > 1; --i) {
    for (let j = i - 1; j > 0; --j) {
      for (let k = j - 1; k >= 0; --k) {
        const currSum = nums[i] + nums[j] + nums[k];
        // If the sum exists
        if (freq.has(currSum)) {
          // increment result by the frequency of that sum stored in the map.
          result += freq.get(currSum);
        }
      }
    }
    // After processing all possible quadruplets for the current nums[i],
    // update the frequency of current nums[i] in the freq map by incrementing by 1
    freq.set(nums[i], (freq.get(nums[i]) || 0) + 1);
  }
  return result;
};

/*

The time complexity of the solution is O(n^3),
and the space complexity is O(n), where n is the length of the input array nums.

*/
