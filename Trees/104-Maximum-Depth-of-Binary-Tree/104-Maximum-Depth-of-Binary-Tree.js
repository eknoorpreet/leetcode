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

// const maxDepth = function(root) {
//     let maxDepth = 0;
//     const queue = []
//     if(!root) return maxDepth
//     queue.push(root)
//     while(queue.length) {
//         let levelSize = queue.length
//         maxDepth++
//         for(let i = 0; i < levelSize; i++) {
//             let dequeued = queue.shift()
//             if(dequeued.left) queue.push(dequeued.left)
//             if(dequeued.right) queue.push(dequeued.right)
//         }
//     }
//     return maxDepth
// };

//maximum depth of a tree = max depth of the 2 paths (left, right)
//max depth of a path = number of node
//Hence, max depth of a null node = 0 (base case)
//Hence, max depth of a leaf node = max(0, 0) + 1 (the node itself) (MAIN LOGIC)

const maxDepth = function (root) {
  if (!root) return 0;
  const maxDepthLeft = maxDepth(root.left);
  const maxDepthRight = maxDepth(root.right);
  return Math.max(maxDepthLeft, maxDepthRight) + 1;
};

//TC: O(n)
//SC: O(n)
