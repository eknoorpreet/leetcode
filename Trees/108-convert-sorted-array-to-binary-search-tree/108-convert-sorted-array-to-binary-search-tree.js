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

const sortedArrayToBST = function (nums) {
  if (!nums.length) return null;
  const helper = (left, right) => {
    if (left > right) return null;
    const mid = left + Math.floor((right - left) / 2);
    const root = new TreeNode(nums[mid]);
    root.left = helper(left, mid - 1);
    root.right = helper(mid + 1, right);
    return root;
  };
  return helper(0, nums.length - 1);
};

/*TC: O(n) since we go through all the elements in the array
SC: O(log n), which will be the height of the tree since we know, for sure, that the tree is height-balanced */
