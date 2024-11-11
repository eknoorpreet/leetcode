/*

Given the root of a binary tree and an integer targetSum, return the number of paths where the sum of the values along the path equals targetSum.

The path does not need to start or end at the root or a leaf, but it must go downwards (i.e., traveling only from parent nodes to child nodes).



Example 1:


Input: root = [10,5,-3,3,2,null,11,3,-2,null,1], targetSum = 8
Output: 3
Explanation: The paths that sum to 8 are shown.
Example 2:

Input: root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22
Output: 3


Constraints:

The number of nodes in the tree is in the range [0, 1000].
-10^9 <= Node.val <= 10^9
-1000 <= targetSum <= 1000

*/

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {number}
 */

const pathSum0 = function (root, targetSum) {
  let count = 0;
  const isPathValid = (root, targetSum) => {
    if (!root) return;
    if (root.val === targetSum) {
      console.log(root.val, targetSum);
    }
    isPathValid(root.left, targetSum - root.val);
    isPathValid(root.right, targetSum - root.val);
  };
  const dfs = (root, targetSum) => {
    if (!root) return;
    isPathValid(root, targetSum);
    dfs(root.left, targetSum);
    dfs(root.right, targetSum);
  };
  dfs(root, targetSum);
  return count;
};

/*

Time: O(n²) in worst case

n nodes as starting points
Up to n nodes checked for each start


Space: O(h) for recursion stack

*/

/*

Requirements:

Find all paths that sum to targetSum
Paths can start and end anywhere
Must go downwards (parent to child)
Path values must exactly sum to targetSum

Backwards Traversal is the clever part:
Starts from current node
Works backwards up the path
Finds all valid sums ending at current node

Why This Works:


Maintains complete path to current node
Checks all possible sub-paths ending at current node
Uses backtracking to explore all paths
Accumulates counts from all subtrees

*/

const pathSum = function (root, targetSum) {
  const findPaths = (root, currentPath) => {
    if (!root) return 0;

    // Add current node to path
    currentPath.push(root.val);

    // Check all possible sums ending at current node
    let pathCount = 0;
    let pathSum = 0;
    for (let i = currentPath.length - 1; i >= 0; i--) {
      pathSum += currentPath[i];
      if (pathSum === targetSum) pathCount++;
    }
    pathCount += findPaths(root.left, currentPath);
    pathCount += findPaths(root.right, currentPath);
    currentPath.pop();
    return pathCount;
  };
  return findPaths(root, []);
};

/*

Time and Space Complexity:

Time: O(n * h) where:
n is number of nodes
h is height of tree
For each node, we might check h nodes above it

Space: O(h) where h is height of tree:
currentPath array stores path to current node
Recursion stack depth is height of tree

*/
