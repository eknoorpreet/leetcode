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
  //or p lies on left and q lies on right (or vice-versa)
  return root;
};

//TC: O(h) or O(log n)
//SC: O(1)
