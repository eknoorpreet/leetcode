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
 * @param {TreeNode} subRoot
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

const isSubtree = function (root, subRoot) {
  if (!root && !subRoot) return true;
  if (!root || !subRoot) return false;
  return (
    isSameTree(root, subRoot) ||
    isSubtree(root.left, subRoot) ||
    isSubtree(root.right, subRoot)
  );
};

/*If m is the number of nodes in the 1st tree and n is the number of nodes in the 2nd tree, then
Time complexity: O(m*n), worst case: for each node in the 1st tree, we need to check if isSameTree(Node s, Node t). Total m nodes, isSameTree(...) takes O(n) worst case
Space complexity: O(height of 1st tree)(Or you can say: O(m) for worst case, O(logm) for average case) */
