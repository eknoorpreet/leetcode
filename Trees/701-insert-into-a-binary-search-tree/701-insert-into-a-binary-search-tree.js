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
 * @param {number} val
 * @return {TreeNode}
 */

const insertIntoBST = function (root, val) {
  //base case: if root is empty (initially or in a recursive call) => insert there
  if (!root) return new TreeNode(val);
  //if value to be inserted is less than current node => go left
  if (val < root.val) {
    // TreeNode(val) creates the new node but returning it and adding it to the its parent is important => root.left = insertNode(root.left, val)
    root.left = insertIntoBST(root.left, val);
    //if value to be inserted is greater than current node => go right
    //(it can never be equal as per the question)
    //so the otnly other case is the base case which is already taken care of!
  } else {
    root.right = insertIntoBST(root.right, val);
  }
  return root;
};

//TC: O(h) or O(log n): At every step, we're going left or right
//SC: O(h) or O(log n): The call stack!

const insertIntoBSTIterative = function (root, val) {
  const newNode = new TreeNode(val);
  if (!root) return newNode;
  let curr = root;
  while (true) {
    if (val < curr.val) {
      if (!curr.left) {
        curr.left = newNode;
        return root;
      }
      curr = curr.left;
    } else {
      if (!curr.right) {
        curr.right = newNode;
        return root;
      }
      curr = curr.right;
    }
  }
};
//TC: O(h) or O(log n): At every step, we're going left or right
//SC: O(1): Just the 'current' pointer
