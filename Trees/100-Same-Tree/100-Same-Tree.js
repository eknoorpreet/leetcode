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
/*

Trees are same if:

They have identical structure (same shape)
Each corresponding node has the same value

We need to check both the values and the structure recursively

*/

const isSameTree = function (p, q) {
  // Base Case 1: Both nodes are null => same tree!
  if (!p && !q) return true;
  // Base Case 2: If (strictly) only 1 exists (situation of both not existing would have been caught above) => not same tree
  if (!p || !q) return false;
  //check current node's value of both trees and recursively check their left and right subtrees
  return (
    p.val === q.val &&
    isSameTree(p.left, q.left) &&
    isSameTree(p.right, q.right)
  );
};

/*

Time and Space Complexity:

Time: O(min(p,q)) where p and q are the number of nodes

We stop as soon as we find a mismatch
In worst case, we visit all nodes in the smaller tree

Space: O(min(h1,h2)) where h1 and h2 are heights

Space used by recursion stack
In worst case (skewed tree), could be O(n)
In balanced tree, would be O(log n)

*/
