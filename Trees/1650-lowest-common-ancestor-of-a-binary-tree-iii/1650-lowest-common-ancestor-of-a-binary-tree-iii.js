/*

Given two nodes of a binary tree p and q, return their lowest common ancestor (LCA).

Each node will have a reference to its parent node. The definition for Node is below:

class Node {
    public int val;
    public Node left;
    public Node right;
    public Node parent;
}
According to the definition of LCA on Wikipedia: "The lowest common ancestor of two nodes p and q in a tree T is the lowest node that has both p and q as descendants (where we allow a node to be a descendant of itself)."



Example 1:


Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
Output: 3
Explanation: The LCA of nodes 5 and 1 is 3.
Example 2:


Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
Output: 5
Explanation: The LCA of nodes 5 and 4 is 5 since a node can be a descendant of itself according to the LCA definition.
Example 3:

Input: root = [1,2], p = 1, q = 2
Output: 1


Constraints:

The number of nodes in the tree is in the range [2, 10^5].
-10^9 <= Node.val <= 10^9
All Node.val are unique.
p != q
p and q exist in the tree.

*/

/**
 * // Definition for a _Node.
 * function _Node(val) {
 *    this.val = val;
 *    this.left = null;
 *    this.right = null;
 *    this.parent = null;
 * };
 */

/**
 * @param {_Node} p
 * @param {_Node} q
 * @return {_Node}
 */
const lowestCommonAncestor0 = function (p, q) {
  // Create a Set to store all ancestors of p
  const ancestors = new Set();

  // Traverse from p to root, adding all nodes to the set
  let current = p;
  while (current !== null) {
    ancestors.add(current);
    current = current.parent;
  }

  // Start from q and traverse up until we find first common ancestor
  current = q;
  while (current !== null) {
    if (ancestors.has(current)) {
      return current;
    }
    current = current.parent;
  }

  return null; // Should never reach here if p and q are in the same tree
};

/*

Time Complexity: O(h)
Space Complexity: O(h)

*/

/*

Key Observations
Using Parent Pointers to Move Up the Tree: Since each node has a reference to its parent, we can "climb" from each node (p and q) up to the root. By moving up the tree from both nodes, we can eventually reach their common ancestor.

Path-Length Equalization: If p and q are at different depths (i.e., they have different distances to the root), we need to make sure that both nodes travel an equal "effective distance" to meet at the LCA.

The trick here is to let each pointer "switch" to the other node’s starting point once it reaches the root.
For example, if p reaches the root before q, p will then start from q's initial position, effectively extending its path.
Similarly, if q reaches the root before p, it will switch to p’s starting position.
Guaranteed Convergence: By switching starting points when each pointer reaches the root, we ensure that both p and q traverse an equal "effective path length." Thus, they will either meet at the LCA or at the root if the LCA is the root.

Why It Works
Equalized Paths: When one pointer reaches the end of its path, switching it to the other node’s starting point balances the distances, making both pointers traverse the same length overall.
Meeting Point: The pointers will either converge at the LCA, where both paths intersect, or if one is a direct ancestor of the other, it will naturally return itself as the LCA.

*/

// Same as https://leetcode.com/problems/intersection-of-two-linked-lists/
const lowestCommonAncestor = function (p, q) {
  let p1 = p,
    p2 = q;

  while (p1 !== p2) {
    // Move each pointer to its parent; if it reaches the root, switch to the other node
    p1 = p1 ? p1.parent : q;
    p2 = p2 ? p2.parent : p;
  }
  return p1;
};

/**

Time Complexity: O(h), where h is the height of the tree
Space Complexity: O(1)

*/
