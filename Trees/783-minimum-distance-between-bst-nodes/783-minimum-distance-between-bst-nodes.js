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

//BST => inorder => sorted => compare node next to each other (nodes with min diff next to each other)
const minDiffInBST = function (root) {
  let minDiff = Number.POSITIVE_INFINITY;
  let prev = null;
  const inorder = (node) => {
    if (!node) return;
    inorder(node.left);
    //if we have a previous node to compare current node with
    if (prev) {
      const currDiff = Math.abs(node.val - prev.val);
      minDiff = Math.min(minDiff, currDiff);
    }
    prev = node;
    inorder(node.right);
  };
  inorder(root);
  return minDiff;
};

/*TC: O(n) since we go through all the elements in the array
SC: O(h), where h is the height of the tree */
