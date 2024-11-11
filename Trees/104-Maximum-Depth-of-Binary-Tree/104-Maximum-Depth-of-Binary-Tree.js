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

// Maximum depth of a tree = max depth of the 2 paths (left, right)
// max depth of a path = number of nodes
// Hence, max depth of a null node = 0 (base case)
// Hence, max depth of a leaf node = max(0, 0) + 1 (the node itself) (MAIN LOGIC)

const maxDepth = function (root) {
  if (!root) return 0;
  const maxDepthLeft = maxDepth(root.left);
  const maxDepthRight = maxDepth(root.right);
  return Math.max(maxDepthLeft, maxDepthRight) + 1;
};

const maxDepthIterative = function (root) {
  const stack = [];
  if (root) stack.push([root, 1]);

  let depth = 0;
  while (stack.length > 0) {
    const [currNode, currDepth] = stack.pop();
    if (currNode) {
      depth = Math.max(depth, currDepth);
      if (currNode.left) {
        stack.push([currNode.left, currDepth + 1]);
      }
      if (currNode.right) {
        stack.push([currNode.right, currDepth + 1]);
      }
    }
  }
  return depth;
};

/*

Complexity analysis

Time complexity: we visit each node exactly once, thus the time complexity is O(N),
where N is the number of nodes.

Space complexity: in the worst case, the tree is completely unbalanced, e.g.
each node has only left child node, the recursion call would occur N times (the height of the tree), therefore the storage to keep the call stack would be O(N). But in the best case (the tree is completely balanced), the height of the tree would be log(N). Therefore, the space complexity in this case would be O(log(N)).

*/
