/*

Consider all the leaves of a binary tree, from left to right order, the values of those leaves form a leaf value sequence.



For example, in the given tree above, the leaf value sequence is (6, 7, 4, 9, 8).

Two binary trees are considered leaf-similar if their leaf value sequence is the same.

Return true if and only if the two given trees with head nodes root1 and root2 are leaf-similar.



Example 1:


Input: root1 = [3,5,1,6,2,9,8,null,null,7,4], root2 = [3,5,1,6,7,4,2,null,null,null,null,null,null,9,8]
Output: true
Example 2:


Input: root1 = [1,2,3], root2 = [1,3,2]
Output: false


Constraints:

The number of nodes in each tree will be in the range [1, 200].
Both of the given trees will have values in the range [0, 200].

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
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {boolean}
 */

// Collect all leaf nodes. Is the result from both roots same?
const leafSimilar = function (root1, root2) {
  const leaves1 = [];
  const leaves2 = [];

  const dfs = (root, leaves) => {
    if (!root) return;
    if (!root.left && !root.right) {
      leaves.push(root.val);
      return;
    }
    dfs(root.left, leaves);
    dfs(root.right, leaves);
  };
  dfs(root1, leaves1);
  dfs(root2, leaves2);

  console.log(leaves1.join(''));

  // If leaves1 = [ 6, 7, 14, 9, 8 ], leaves2 = [ 6, 71, 4, 9, 8 ]
  // => leaves1.join("") = 671498, leaves2.join("") = 671498
  // Use: .join(" ")
  return leaves1.join(' ') === leaves2.join(' ');
};

/*

Time Complexity: O(n1 + n2)

n1 is the number of nodes in the first tree
n2 is the number of nodes in the second tree
The DFS visits each node exactly once in each tree
The join operation at the end is O(L) where L is the number of leaves, but since L ≤ n (leaves can't be more than total nodes), it's bounded by O(n1 + n2)

Space Complexity: O(h1 + h2 + L1 + L2)

h1 and h2 are the heights of the trees (for recursion stack)
L1 and L2 are the number of leaves in each tree (for leaves arrays)
In worst case (skewed tree), height could be O(n), making it O(n1 + n2)
In best case (balanced tree), height would be O(log n)
The space for storing leaves is O(L1 + L2)

*/
