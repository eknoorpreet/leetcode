/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
const isSameTree = function (p, q) {
  //if both are null => same tree!
  if (!p && !q) return true;
  //if (strictly) only 1 exists (situation of both not existing would have been caught above) => not same tree
  if (!p || !q) return false;
  //check current node's value of both trees and recursively check their left and right subtrees
  return (
    p.val === q.val &&
    isSameTree(p.left, q.left) &&
    isSameTree(p.right, q.right)
  );
};

//TC: O(n)
//SC: O(n)
