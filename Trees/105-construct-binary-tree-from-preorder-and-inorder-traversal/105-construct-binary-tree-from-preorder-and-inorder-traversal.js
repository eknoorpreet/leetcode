/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */

//preorder: always starts with root,
//inorder: get the left and right subtree information

const buildTree = function (preorder, inorder) {
  //one of the given arrays exhausted => return null
  if (!preorder.length || !inorder.length) return null;
  //preorder: the first node is always the root
  let root = new TreeNode(preorder[0]);
  console.log(preorder[0]);
  let inorderIndex = inorder.indexOf(preorder[0]);
  console.log('inorderIndex', inorderIndex);
  //in preorder, we want the left subtree of the current node, which is the 1st node + inorderIndex number of nodes after it
  //in inorder, all nodes from the left of the current node => left subtree
  root.left = buildTree(
    preorder.slice(1, inorderIndex + 1),
    inorder.slice(0, inorderIndex)
  );
  //in preorder, we want the right subtree of the current node, which is the node at (inorderIndex + 1) till the end
  //in inorder, all nodes from the right of the current node => right subtree
  root.right = buildTree(
    preorder.slice(inorderIndex + 1),
    inorder.slice(inorderIndex + 1)
  );
  return root;
};
