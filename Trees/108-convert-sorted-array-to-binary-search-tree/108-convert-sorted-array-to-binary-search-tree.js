/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} nums
 * @return {TreeNode}
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
 * @param {number[]} nums
 * @return {TreeNode}
 */

/*

Problem Understanding:
Convert a sorted array to a height-balanced Binary Search Tree (BST)
Height-balanced means the depths of left and right subtrees differ by no more than 1
Input is a sorted array in ascending order

Intuition:
Choose the middle element as the root
Recursively construct left and right subtrees
Ensures balanced tree structure

*/

const sortedArrayToBST = function (nums) {
  // Base case: empty array returns null
  if (!nums.length) return null;
  const binarySearch = (left, right) => {
    // Stop condition when indices cross
    if (left > right) return null;
    // Find middle index
    const mid = left + Math.floor((right - left) / 2);
    // Create root node with middle element
    const root = new TreeNode(nums[mid]);
    // Recursively build left subtree
    // Use elements from left to mid - 1
    root.left = binarySearch(left, mid - 1);
    // Recursively build right subtree
    // Use elements from mid + 1 to right
    root.right = binarySearch(mid + 1, right);
    return root;
  };
  return binarySearch(0, nums.length - 1);
};

/*

TC: O(n) since we go through all the elements in the array

SC: O(log n), which will be the height of the tree since we know, for sure,
that the tree is height-balanced

*/
