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
 * @return {boolean}
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
 * @return {boolean}
 */

/*

Key requirements:

Must start at root
Must end at a leaf (node with no children)
Sum of all nodes along path equals targetSum
Path must be continuous

Key Insights:

Instead of tracking running sum, we subtract from target
When we reach a leaf, remaining target should equal leaf's value
Using OR (||) to check both paths, only need one to work
Must check that node is leaf (!root.left && !root.right)

*/

const hasPathSum = function (root, targetSum) {
  // Base case 1: If the root doesn't exist initially or if we reach a node where the target has still not been met => false
  if (!root) return false;
  // // Base case 2: Found valid path to leaf => true
  if (root.val === targetSum && !root.left && !root.right) return true;

  // Recursive case: Try both subtrees with reduced target
  return (
    hasPathSum(root.left, targetSum - root.val) ||
    hasPathSum(root.right, targetSum - root.val)
  );
};

/*

Time and Space Complexity:

Time: O(n) where n is number of nodes

We might need to visit all nodes in worst case
Each node is visited exactly once

Space: O(h) where h is height of tree

Space used by recursion stack
In worst case (skewed tree): O(n)
In balanced tree: O(log n)

*/

/*

The JavaScript operator || is defined to return the left value if it evaluates to a truthy value, otherwise the right value instead of returning true itself. That's just how it's defined in the spec.

5 || 4 => 5

0 || 4 => 4

https://stackoverflow.com/questions/2966430/why-does-javascripts-or-return-a-value-other-than-true-false#:~:text=The%20JavaScript%20operator%20%7C%7C%20is,it's%20defined%20in%20the%20spec

*/
