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

LCA:
    1. We can reach/find both p and q via the LCA node
    2. It should be at the deepest level (first one since recursion goes bottom-top)

3 cases:
    1. Both p and q are on opposite sides
    2. q is a descendant of p (p is the ancestor of q)
    3. p is a descendant of q (q is the ancestor of p)

We can look for p and q in both the left and right sub-trees. If both left and right sub-trees returned the values of p and q (indicating, we found them), therefore, parent (curr node) is LCA

Otherwise, if we only found p (5) in the left subtree and no q in the right subtree, that must mean it will be found under p => p is ancestor of q. And vice-versa.

Why don't we just return true when we find p or q? Well, that would only work in the 1st case when both p and q are on opposite sides. It means, that if current node is 3, p = 5, q = 1, both return true => return the current node => Correct! But, if p = 5, q = 4 (q is a descendant of p), then the left subtree will return true on finding p but the right subtree will return false as it could not find p or q (since both are in the left subtree). Therefore, left || right => true || false will return true (indicating that we found one of them) but we need to return the actual value of the node we found as that's the LCA.

*/

const lowestCommonAncestor = function (root, p, q) {
  // Does the curr node equal to p or q? If it does, then either the other one is on the other side of
  // the tree or it's a descendant of the first

  // We try to find both p or q
  // Either it's the curr node (or its at deeper levels)
  if (root === p || root === q) return root;
  let left = null;
  let right = null;
  // else, look in its left and right subtrees
  if (root.left) {
    left = lowestCommonAncestor(root.left, p, q);
  }
  if (root.right) {
    right = lowestCommonAncestor(root.right, p, q);
  }
  // What was the base case? curr node equal to p or q
  // therefore, if both left and right children returned a node above to a specific node (which they return only if they're equal to p and q), means
  //both p and q found so that specific node (parent) is LCA

  if (left && right) return root;
  // If we found only p or only q => that is the LCA (since it's given that both exist)
  // (if they're not equal to p or q, they're implicitly returning null)
  else return left || right; //return left ?? right
};

//TC: O(n)
//SC: O(h). O(h) could become as high as O(n) if the tree is skewed but the complexity is still O(h) regardless.
