/*

Given the root of a binary tree and an array of TreeNode objects nodes, return the lowest common ancestor (LCA) of all the nodes in nodes. All the nodes will exist in the tree, and all values of the tree's nodes are unique.

Extending the definition of LCA on Wikipedia: "The lowest common ancestor of n nodes p1, p2, ..., pn in a binary tree T is the lowest node that has every pi as a descendant (where we allow a node to be a descendant of itself) for every valid i". A descendant of a node x is a node y that is on the path from node x to some leaf node.



Example 1:


Input: root = [3,5,1,6,2,0,8,null,null,7,4], nodes = [4,7]
Output: 2
Explanation: The lowest common ancestor of nodes 4 and 7 is node 2.
Example 2:


Input: root = [3,5,1,6,2,0,8,null,null,7,4], nodes = [1]
Output: 1
Explanation: The lowest common ancestor of a single node is the node itself.

Example 3:


Input: root = [3,5,1,6,2,0,8,null,null,7,4], nodes = [7,6,2,4]
Output: 5
Explanation: The lowest common ancestor of the nodes 7, 6, 2, and 4 is node 5.


Constraints:

The number of nodes in the tree is in the range [1, 10^4].
-10^9 <= Node.val <= 10^9
All Node.val are unique.
All nodes[i] will exist in the tree.
All nodes[i] are distinct.

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
 * @param {TreeNode[]} nodes
 * @return {TreeNode}
 */

/*

          3
       /     \
      5       1
     / \     / \
    6   2   0   8
       / \
      7   4

nodes = [7,6,2,4]

LCA = 5

The key idea is that once we encounter a node that is present in the nodesSet, we can stop searching the subtree below that node. This is because the problem requires us to find the "lowest common ancestor" of all the nodes in the nodes array. If we find any node that is already in the nodesSet, it means that node is one of the target nodes, and we don't need to search any further down that path.

*/

const lowestCommonAncestor = function (root, nodes) {
  const nodesSet = new Set(nodes);

  const dfs = (node) => {
    if (!node) return null;

    if (nodesSet.has(node)) return node;

    const left = dfs(node.left);
    const right = dfs(node.right);

    if (left && right) return node;
    return left || right;
  };
  return dfs(root);
};

/*

Time and Space Complexity:

Time Complexity: O(N), where N is the number of nodes in the binary tree. We visit each node exactly once during the DFS traversal.
Space Complexity: O(H), where H is the height of the binary tree. The space is used by the recursive call stack, which can be up to the height of the tree in the worst case (a skewed tree, O(n)).

*/
