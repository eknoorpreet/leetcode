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

//The JavaScript operator || is defined to return the left value if it evaluates to a truthy value, otherwise the right value instead of returning true itself. That's just how it's defined in the spec.
//5 || 4 => 5
//0 || 4 => 4

const hasPathSum = function (root, targetSum) {
  //if the root doesn't exist initially or if we reach a node where the target has still not been met => false
  if (!root) return false;
  //if the target has been met AND it's the leaf node => true
  if (root.val === targetSum && !root.left && !root.right) return true;
  return (
    hasPathSum(root.left, targetSum - root.val) ||
    hasPathSum(root.right, targetSum - root.val)
  );
};

//TC: O(n)
//SC: O(h)

//https://stackoverflow.com/questions/2966430/why-does-javascripts-or-return-a-value-other-than-true-false#:~:text=The%20JavaScript%20operator%20%7C%7C%20is,it's%20defined%20in%20the%20spec.
