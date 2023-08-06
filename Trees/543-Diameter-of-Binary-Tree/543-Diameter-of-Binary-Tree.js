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
 * @return {number}
 */
// const diameterOfBinaryTree = function(root) {
//     //diameter of a binary tree = length of the longest path ("edges", not "total nodes") between any two nodes in a tree.
//   //Therefore, it's the max depth of any node's left + right subtree (and not Math.max(max, left + right + 1))
//     let diameter = 0;
//     //max
//     const maxDepth = (node) => {
//         if(!node) return 0; //no node => no path => 0
//         const maxDepthLeft = maxDepth(node.left)
//         const maxDepthRight = maxDepth(node.right)
//         //update the diameter accordingly (either already achieved or would be achieved later)
//         // diameter = Math.max(diameter, maxDepthLeft + maxDepthRight)
//         diameter = maxDepthLeft + maxDepthRight
//         //find the max depth
//         return Math.max(maxDepthLeft, maxDepthRight) + 1
//     }
//     maxDepth(root)
//     return diameter
// };

// const diameterOfBinaryTree = function(root) {
//    let diameter = 0
//    const maxDepth = (root) => {
//        if(!root) return 0
//        const maxDepthLeft = maxDepth(root.left)
//        const maxDepthRight = maxDepth(root.right)
//        diameter = Math.max(diameter, maxDepthLeft + maxDepthRight)
//        return Math.max(maxDepthLeft, maxDepthRight) + 1
//    }
//    maxDepth(root)
//    return diameter
// };

/*diameter of a binary tree is the length of the longest path between any two nodes
length of a path between two nodes is represented by the number of edges b/w them
If we calculate tha maximum depth of the left + maximum depth of the right => diamater?
Yes, but no. Diameter / longest path need not pass through the root

         4
       /   \
      2     6
           / \
          5   7
        /       \
       1        10
     /
    0
    Longest path = 0 -> 1 -> 5 -> 6 -> 7 -> 10 (no root here)
Hence, we cannot just add calculate the diamater at the end after calculating the max depth of the entire binary tree. We need to calculate the diameter at each node and find the maximum diameter!

Full explanation: https://leetcode.com/problems/diameter-of-binary-tree/solutions/1515564/python-easy-to-understand-solution-w-explanation/
*/

const diameterOfBinaryTree = function (root) {
  let diameter = 0;
  const maxDepth = (root) => {
    if (!root) return 0;
    const maxDepthLeft = maxDepth(root.left);
    const maxDepthRight = maxDepth(root.right);
    diameter = Math.max(diameter, maxDepthLeft + maxDepthRight);
    return Math.max(maxDepthLeft, maxDepthRight) + 1;
  };
  maxDepth(root);
  return diameter;
};

//TC: O(n)
//SC: O(n)
