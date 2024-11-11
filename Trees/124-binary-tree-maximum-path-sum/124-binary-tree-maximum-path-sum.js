/*

A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. A node can only appear in the sequence at most once. Note that the path does not need to pass through the root.

The path sum of a path is the sum of the node's values in the path.

Given the root of a binary tree, return the maximum path sum of any non-empty path.



Example 1:


Input: root = [1,2,3]
Output: 6
Explanation: The optimal path is 2 -> 1 -> 3 with a path sum of 2 + 1 + 3 = 6.
Example 2:


Input: root = [-10,9,20,null,null,15,7]
Output: 42
Explanation: The optimal path is 15 -> 20 -> 7 with a path sum of 15 + 20 + 7 = 42.


Constraints:

The number of nodes in the tree is in the range [1, 3 * 10^4].
-1000 <= Node.val <= 1000

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
 * @return {number}
 */

/*

Requirements:
The path doesn't need to go through the root
A path can start and end at any nodes
Each node can only be visited once
The path must be continuous (connected by edges)

The key insight is that the function getMaxSum serves two purposes:

1. Return Value: Returns the maximum sum of a path that:

Starts at current node
Goes down to either left OR right child (not both)
// return currentNode.val + Math.max(left, right)

2. Side Effect: Updates global maxPath with the maximum sum of ANY path that:
Includes current node
Can include BOTH left and right children
// maxPath = Math.max(currentPath, maxPath)

Why this dual purpose?

When returning to a parent node, we can only use ONE path down (left OR right)
But for calculating the overall maximum, we can use BOTH paths at any node

The Math.max(sum, 0) is crucial because:
If a path sum is negative, we're better off not including it
This handles cases where we should just take a single node rather than a negative path

*/

const maxPathSum = function (root) {
  if (root && !root.left && !root.right) return root.val;
  let maxPath = -Infinity; // Should be -Infinity, not 0, to handle negative values

  const getMaxSum = (currentNode) => {
    // Base case: null node returns 0
    if (!currentNode) return 0;

    // Get max path sums from left and right subtrees
    // Use Math.max with 0 to handle negative values
    let left = Math.max(getMaxSum(currentNode.left), 0);
    let right = Math.max(getMaxSum(currentNode.right), 0);

    // Calculate path including current node and both children
    let currentPath = currentNode.val + left + right;

    // Update global maximum
    maxPath = Math.max(currentPath, maxPath);

    // Return maximum path that can be used by parent
    return currentNode.val + Math.max(left, right);
  };

  getMaxSum(root);
  return maxPath;
};

/*

Time Complexity: O(n) where n is number of nodes
Space Complexity: O(h) where h is height of tree (due to recursion stack)

*/
