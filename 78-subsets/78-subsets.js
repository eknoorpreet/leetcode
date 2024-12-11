/*

Given an integer array nums of unique elements, return all possible
subsets
 (the power set).

The solution set must not contain duplicate subsets. Return the solution in any order.



Example 1:

Input: nums = [1,2,3]
Output: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
Example 2:

Input: nums = [0]
Output: [[],[0]]

Constraints:

1 <= nums.length <= 10
-10 <= nums[i] <= 10
All the numbers of nums are unique.

*/

/**
 * @param {number[]} nums
 * @return {number[][]}
 */

/*

Use backtracking to generate all possible subsets by making two key decisions for each element:

Include the current element in the subset
Exclude the current element from the subset

*/

const subsets0 = (nums) => {
  const result = [];
  // processed: Current subset being constructed
  // i: Current index in the original array
  const backtrack = (processed, index) => {
    // Base case: reached end of array
    if (index >= nums.length) {
      result.push([...processed]);
      return;
    }
    // Decision 1: Include the current element in the subset
    backtrack([...processed, nums[index]], index + 1);
    // Exclude the current element from the subset
    backtrack(processed, index + 1);
  };
  backtrack([], 0);
  return result;
};

const subsets = (nums) => {
  const result = [];
  // processed: Current subset being constructed
  // i: Current index in the original array
  const backtrack = (processed, index) => {
    // Base case: reached end of array
    if (index >= nums.length) {
      result.push([...processed]);
      return;
    }
    processed.push(nums[index]);
    // Decision 1: Include the current element in the subset (and explore further possibilities)
    backtrack(processed, index + 1);
    // When you come back here, ignore it (remove from path for next recursive call) (Backtrack)
    processed.pop();
    // Decision 2: Exclude the current element from the subset (and exploring alternative paths)
    backtrack(processed, index + 1);
  };
  backtrack([], 0);
  return result;
};

/*

Time Complexity: O(2^n)

Each element has two choices (include/exclude)
Total combinations: 2^n
Generates all possible subsets

Space Complexity: O(n)

Recursion depth: n
Temporary storage for current subset
Excludes result array space

*/

const subsetsIterative = (nums) => {
  const result = [[]]; // Start with empty subset
  for (let n of nums) {
    // Iterate through each number
    const size = result.length; // Current number of existing subsets
    for (let i = 0; i < size; i++) {
      // Process existing subsets
      const subset = [...result[i]]; // Copy existing subset
      subset.push(n); // Add current number
      result.push(subset); // Add new subset
    }
  }
  return result;
};

/*

Time Complexity: O(2^n)

Each iteration doubles the number of subsets
Total subsets: 2^n

Space Complexity: O(2^n)

Stores all possible subsets
Grows exponentially with input size

*/
