/*

Given the root of a binary tree, return the lowest common ancestor (LCA) of two given nodes, p and q. If either node p or q does not exist in the tree, return null. All values of the nodes in the tree are unique.

According to the definition of LCA on Wikipedia: "The lowest common ancestor of two nodes p and q in a binary tree T is the lowest node that has both p and q as descendants (where we allow a node to be a descendant of itself)". A descendant of a node x is a node y that is on the path from node x to some leaf node.



Example 1:


Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
Output: 3
Explanation: The LCA of nodes 5 and 1 is 3.
Example 2:



Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
Output: 5
Explanation: The LCA of nodes 5 and 4 is 5. A node can be a descendant of itself according to the definition of LCA.
Example 3:



Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 10
Output: null
Explanation: Node 10 does not exist in the tree, so return null.


Constraints:

The number of nodes in the tree is in the range [1, 10^4].
-10^9 <= Node.val <= 10^9
All Node.val are unique.
p != q

*/

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

/*

The difference in this problem is that even if we find a value (say, p), we still keep on searching for q
in both the left and right subtrees. Therefore, when, in the 236. Lowest Common Ancestor of a Binary Tree, we were checking if current node = p or q, if yes, we return the node, and if not, then, we went looking in the left and right subtrees. But, here, we first traverse the left and right subtrees and on
our way back, we check if cur.rent node = p or q

*/

const lowestCommonAncestor = function (root, p, q) {
  // Keep track if we found either of them
  let foundP = false;
  let foundQ = false;
  const dfs = (node) => {
    if (!node) return null;

    const left = dfs(node.left);
    const right = dfs(node.right);

    if (node === p) {
      foundP = true;
      return node;
    }
    if (node === q) {
      foundQ = true;
      return node;
    }

    if (left && right) return node;
    return left || right;
  };
  const result = dfs(root);

  // Only return result if both nodes were found
  return foundP && foundQ ? result : null;
};

/*

Time Complexity: O(N)

Space Complexity: O(h), but could go as high as O(n) if the tree is skewed but the complexity is still O(h) regardless.

*/
