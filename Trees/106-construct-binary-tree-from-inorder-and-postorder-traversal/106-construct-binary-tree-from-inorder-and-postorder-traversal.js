/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */

//postorder:last node is always the root,
//inorder: get the left and right subtree information

//build the right subtree first. Why? Because the second last node in postorder is going to be the right child if it exists

// const buildTree = function(inorder, postorder) {
//     if(!inorder.length || !postorder.length) return null
//     //always get the last node in postorder
//     const root = new TreeNode(postorder.pop())
//     const index = inorder.indexOf(root.val)
//     ////in inorder, all nodes from the right of the current node => right subtree
//     root.right = buildTree(inorder.slice(index + 1), postorder)
//     //in inorder, all nodes from the left of the current node => left subtree
//     root.left = buildTree(inorder.slice(0, index), postorder)
//     return root
// };

//TC: O(n^2), can be optimized to O(n) by using hashing.

const buildTree = function (inorder, postorder) {
  const inorderIndex = {};
  for (let i = 0; i < inorder.length; i++) {
    inorderIndex[inorder[i]] = i;
  }

  const helper = (left, right) => {
    if (left > right) return null;

    //always get the last node in postorder
    const root = new TreeNode(postorder.pop());
    const index = inorderIndex[root.val];
    ////in inorder, all nodes from the right of the current node => right subtree
    root.right = helper(index + 1, right);
    //in inorder, all nodes from the left of the current node => left subtree
    root.left = helper(left, index - 1);
    return root;
  };
  return helper(0, inorder.length - 1);
};
