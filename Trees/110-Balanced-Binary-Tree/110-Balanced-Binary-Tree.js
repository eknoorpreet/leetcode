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
 * @return {boolean}
 */

// const maxDepth = function(root) {
//     if(!root) return 0
//     const maxDepthLeft = maxDepth(root.left)
//     const maxDepthRight = maxDepth(root.right)
//     return Math.max(maxDepthLeft, maxDepthRight) + 1
// };

// const isBalanced = function(root) {
//     if(!root) return true
//     const left = maxDepth(root.left)
//     const right = maxDepth(root.right)
//     return Math.abs(left - right) <= 1 && isBalanced(root.left) && isBalanced(root.right)
// };

//Top-down
// const maxDepth = function(root) {
//     if(!root) return 0
//     const maxDepthLeft = maxDepth(root.left)
//     const maxDepthRight = maxDepth(root.right)
//     return Math.max(maxDepthLeft, maxDepthRight) + 1
// };

// const isBalanced = function(root) {
//     if(!root) return true
//     //check if the current subtree is balanced: Math.abs(maxDepth(root.left) - maxDepth(root.right)) <= 1
//     //check whether the left and right subtrees are balanced: isBalanced(root.left) && isBalanced(root.right)
//     return Math.abs(maxDepth(root.left) - maxDepth(root.right)) <= 1 && isBalanced(root.left) && isBalanced(root.right)
// }

//TC: O(n^2): First, we check the current node if its left and right subtrees are balanced (recursive DFS to the bottom: O(n)). Then, we do the same for its check and check if they're balanced => O(n) x n times = O(n^2)
//SC: O(n)

//Bottom-up
/*Instead of asking if the entire tree is balanced from the root, we do bottom-up (if the bottom-most subtrees are balanced). While the maxDpeth is being calculated from the bottom, we can simulaneously also check if the subtrees in question are balanced*/
const maxDepth = function (root) {
  if (!root) return 0;
  const maxDepthLeft = maxDepth(root.left);
  if (maxDepthLeft === -1) return -1;
  const maxDepthRight = maxDepth(root.right);
  if (maxDepthRight === -1) return -1;
  //sub tree of the current node (inclusive) is NOT balanced => return -1
  if (Math.abs(maxDepthLeft - maxDepthRight) > 1) return -1;
  //sub tree of the current node (inclusive) is balanced => return maxDepth/height
  return Math.max(maxDepthLeft, maxDepthRight) + 1;
};

const isBalanced = function (root) {
  if (!root) return true;
  return maxDepth(root) !== -1;
};

//TC: O(n)
//SC: O(n)
