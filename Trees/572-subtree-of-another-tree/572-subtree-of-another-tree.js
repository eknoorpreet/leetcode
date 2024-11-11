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

/*

We need to check if subRoot appears anywhere within root
A match means:

Same structure
Same values
Can start at any node in root

A tree is considered a subtree of itself

At each node in root, we:

Check if the current subtree matches subRoot
If not, check the left subtree
If not, check the right subtree

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

/*

Time and Space Complexity:

Time: O(m * n) where:

m is number of nodes in root
n is number of nodes in subRoot
At each node in root, we might need to check entire subRoot

Space: O(h) where h is height of root

Space used by recursion stack
In worst case (skewed tree): O(n)
In balanced tree: O(log n)

*/
