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
          3
       /     \
      5       1
     / \     / \
    6   2   0   8
       / \
      7   4

Say p = 5, q = 1
If both left and right children returned a node (5 and 1), means both p and q found so parent (curr node) is LCA
Otherwise, if we only found p (5) and no q in the right subtree, that must mean it will be found under p => p is ancestor of q. And vice-versa.
*/

const lowestCommonAncestor = function (root, p, q) {
  //recursion: always focus on a single node
  /*LCA: 
        1. We can reach/find both p and q via the LCA node
        2. it should be at the deepest level (first one since recursion goes bottom-top)

    3 cases:
        1. Both p and q are on opposite sides
        2. q is a descendant of p
        3. p is a descendant of q
    Does the curr node equal to p or q? If it does, then either the other one is on the other side of the tree or it's a descendant of the first
    receive a non-null node from both side => LCA*/

  //we try to find both p or q
  //either it's the curr node (or its at deeper levels)
  if (!root || root === p || root === q) return root;
  let left;
  let right;
  //else, look in its left and right subtrees
  if (root.left) {
    left = lowestCommonAncestor(root.left, p, q);
  }
  if (root.right) {
    right = lowestCommonAncestor(root.right, p, q);
  }
  //what was the base case? curr node equal to p or q
  //therefore, if both left and right children returned a node (which they return only if they're equal to p and q), means
  //both p and q found so parent is LCA
  if (left && right) return root;
  //if we found only or only q => that is the LCA (since it's given that both exist)
  //(if they're not equal to p or q, they're implicitly returning null)
  else return left || right;
};

//TC: O(n)
//SC: O(h). O(h) could become as high as O(n) if the tree is skewed but the complexity is still O(h) regardless.
