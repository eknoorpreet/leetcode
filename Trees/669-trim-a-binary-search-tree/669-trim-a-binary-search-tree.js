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
 * @param {number} low
 * @param {number} high
 * @return {TreeNode}
 */
// var trimBST = function(root, low, high) {
//     if(!root) return null;
//     if(root.val > high) return trimBST(root.left, low, high)
//     if(root.val < low) return trimBST(root.right, low, high)
//     root.left = trimBST(root.left, low, high)
//     root.right = trimBST(root.right, low, high)
//     return root
// };

//if a node does not fulfill the criteria
//node < low => remove node and its entire left subtree
//node > high => removenode and its entire right subtree

const trimBST = function (root, low, high) {
  if (!root) return null;
  //node < low => trim the entire left subtree (just return the right subtree)
  if (root.val < low) return trimBST(root.right, low, high);
  //node > high => trim the entire right subtree (just return the left subtree)
  if (root.val > high) return trimBST(root.left, low, high);
  //otherwise, node fits the criteria, check its left and right subtrees
  root.left = trimBST(root.left, low, high);
  root.right = trimBST(root.right, low, high);
  return root;
};

//TC: O(n)
//SC: O(h)
