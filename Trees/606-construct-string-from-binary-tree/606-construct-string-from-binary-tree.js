/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {string}
 */

//preorder: node -> left -> right
//we know that each node value is being wrapped in parentheses (except the root).
//we know that before the parentheses for the curr node is closed, its left and right children are processed
const tree2str = function (root) {
  const result = [];
  const dfs = (node) => {
    if (!node) return;
    result.push('(');
    result.push(node.val);
    if (!node.left && node.right) result.push('()');
    dfs(node.left);
    dfs(node.right);
    result.push(')');
  };
  dfs(root);
  //remove the opening and closing parens of the root node
  return result.slice(1, result.length - 1).join('');
};

//TC: O(n)
//SC: O(h)
