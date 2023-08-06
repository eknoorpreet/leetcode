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
 * @return {TreeNode}
 */

const mergeTrees = function (root1, root2) {
  //both nodes don't exist => resultant node = null
  if (!root1 && !root2) return null;
  //  if the nodes exist, we use their value, otherwise, we use 0
  //  final value will contain the sum of the 2 values
  const computedVal = (root1 ? root1.val : 0) + (root2 ? root2.val : 0);
  const root = new TreeNode(computedVal);
  root.left = mergeTrees(root1 ? root1.left : null, root2 ? root2.left : null);
  root.right = mergeTrees(
    root1 ? root1.right : null,
    root2 ? root2.right : null
  );
  return root;
};

//TC: O(m + n)
//SC: O(log m + log n) or more accurately, O(h + g) where h and g are the heights of the trees
