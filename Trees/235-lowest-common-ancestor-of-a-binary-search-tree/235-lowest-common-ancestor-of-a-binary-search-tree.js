/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */

/*Cases:
1. Both p and q lie on left side
2. Both p and q lie on right side
3. p lies on left and q lies on right (or vice-versa) => curr node = LCA (since paths diverged here)
4. curr node is equal to p or q  => curr node = LCA
*/

/*Cases:
1. Both p and q lie on left side
2. Both p and q lie on right side
3. p lies on left and q lies on right (or vice-versa) => curr node = LCA (since paths diverged here)
4. curr node is equal to p or q  => curr node = LCA
*/

const lowestCommonAncestor0 = function (root, p, q) {
  // Base case: If the root is null, return null
  if (!root) return root;

  // If p and q are on different sides of the root, the root is the LCA
  // Or the root is equal to p or q, the root is the LCA
  if (
    (root.val > p.val && root.val < q.val) ||
    root.val === p.val ||
    root.val === q.val
  ) {
    return root;
  }
  // If both p and q are less than the root (both on the left subtree),
  // the LCA is in the left subtree
  else if (root.val > p.val && root.val > q.val) {
    return lowestCommonAncestor(root.left, p, q);
  }
  // If both p and q are greater than the root (both on the right subtree),
  // the LCA is in the right subtree
  else if (root.val < p.val && root.val < q.val) {
    return lowestCommonAncestor(root.right, p, q);
  }
};

// Cleaner
const lowestCommonAncestor = function (root, p, q) {
  if (!root) return root;
  //both p and q lie on left side
  if (root.val > p.val && root.val > q.val) {
    return lowestCommonAncestor(root.left, p, q);
  }
  //both p and q lie on right side
  if (root.val < p.val && root.val < q.val) {
    return lowestCommonAncestor(root.right, p, q);
  }
  //either the curr node is equal to p or q => that node is LCA
  //or p lies on left and q lies on right (or vice-versa) (where the "split"" occurs)
  return root;
};

/*

TC: O(h) or O(log n), where n is the number of nodes in the BST, as we are
essentially performing a binary search to find the LCA

SC: O(h) or O(log n)

*/
