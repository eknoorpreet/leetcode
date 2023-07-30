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

// a helper function to check if 2 trees are the same (here, we check if left and right subtrees are the same)
const dfs = function (p, q) {
  //if both are null => same tree!
  if (!p && !q) return true;
  //if (strictly) only 1 exists (situation of both not existing would have been caught above) => not same tree
  if (!p || !q) return false;
  //check current node's value of both trees and recursively check their left and right subtrees
  return p.val === q.val && dfs(p.left, q.right) && dfs(p.right, q.left);
};

const isSymmetric = function (root) {
  if (!root) return true;
  //for a tree to be symmetrical, its 2 subtrees need to be symmetrical
  return dfs(root.left, root.right);
};

//TC: O(n)
//SC: O(h)
