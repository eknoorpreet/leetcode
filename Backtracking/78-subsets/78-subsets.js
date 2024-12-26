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

Space Complexity: O(n)

"Each iteration doubles the number of subsets"

Here’s the reasoning:

Initialization:
The process starts with result = [[]], which contains a single subset, the empty subset.
For Each Number n in nums:

The current subsets are iterated over.
For every existing subset, a new subset is created by copying the subset and adding the current number n.

Doubling Effect:
Before processing a number n, let the number of subsets in result be 'size'. For each of these 'size'
subsets, a new subset is created that includes n.
This means the number of subsets after processing n becomes size + size (original subsets + newly
created subsets), effectively doubling the total subsets.

Example Walkthrough:

Let nums = [1, 2, 3].
Iteration 1 (Add 1):

Start with result = [[]].
Add 1 to each existing subset:
New subsets: [1].
result = [[], [1]] (2 subsets).
Iteration 2 (Add 2):

Start with result = [[], [1]].
Add 2 to each existing subset:
New subsets: [2] (from []) and [1, 2] (from [1]).
result = [[], [1], [2], [1, 2]] (4 subsets).

*/
