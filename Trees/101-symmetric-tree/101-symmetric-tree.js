/*

Given the root of a binary tree, check whether it is a mirror of itself (i.e., symmetric around its center).



Example 1:


Input: root = [1,2,2,3,4,4,3]
Output: true
Example 2:


Input: root = [1,2,2,null,3,null,3]
Output: false


Constraints:

The number of nodes in the tree is in the range [1, 1000].
-100 <= Node.val <= 100

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
 * @return {boolean}
 */

// A helper function to check if 2 trees are the same (here, we check if left and right subtrees are the same)
const isSameTree = function (p, q) {
  // If both are null => same tree!
  if (!p && !q) return true;
  // If (strictly) only 1 exists (situation of both not existing would have been caught above) => not
  // same tree
  if (!p || !q) return false;
  // Check current node's value of both trees and recursively check their left and right subtrees
  return (
    p.val === q.val &&
    isSameTree(p.left, q.right) &&
    isSameTree(p.right, q.left)
  );
};

const isSymmetric = function (root) {
  if (!root) return true;
  // For a tree to be symmetrical, its 2 subtrees need to be symmetrical
  return isSameTree(root.left, root.right);
};

//TC: O(n)
//SC: O(h)
