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

//if the root1 and root2 are same => true
//if root1 is flipped and then, the same as root2 => true

const flipEquiv = function (root1, root2) {
  //if root1 and root2 are the same => true
  //not just an edge case but also the base case since when we keep doing deeper and
  //reach null nodes but haven't returned false yet (hit the condition where they are not the same) => all corresponding values were the same from top to bottom
  if (!root1 && !root2) return true;
  //if only 1 exists =>> false
  if (!root1 || !root2) return false;
  //if root1 and root2 are not the same => false
  if (root1.val !== root2.val) return false;
  //if root1 and root2 are the same => check its left and right subtrees
  const isSame =
    flipEquiv(root1.left, root2.left) && flipEquiv(root1.right, root2.right);
  const isFlippedSame =
    flipEquiv(root1.left, root2.right) && flipEquiv(root1.right, root2.left);
  return isSame || isFlippedSame;
};

//TC: O(h)
//SC: O(h)
