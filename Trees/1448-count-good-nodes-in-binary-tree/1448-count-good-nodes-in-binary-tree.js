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

// const goodNodes = function(root) {
//     let count = 0;
//     if(!root) return 0
//     const dfs = (node, currPath) => {
//         if(!node) return
//         currPath.push(node.val)
//         //is the curr node the max in the path?
//         if(Math.max(...currPath) === node.val) count++
//         dfs(node.left, currPath)
//         dfs(node.right, currPath)
//         currPath.pop()
//     }
//     dfs(root, [])
//     return count
// }

/*In the worst case, the currPath array can store all the nodes in the longest path from the root to a leaf.
Therefore, the space complexity for the currPath array can also be considered O(n). */

//instead of the curr path, keep track of the curr max value in the path
const goodNodes = function (root) {
  let count = 0;
  if (!root) return count;
  const dfs = (node, max) => {
    if (!node) return;
    //is the curr node the max in the path?
    if (node.val >= max) {
      //increment the count
      count++;
      //update the max
      max = node.val;
    }
    dfs(node.left, max);
    dfs(node.right, max);
  };
  dfs(root, root.val);
  return count;
};

/*The time complexity of the function is O(n), where n is the number of nodes in the binary tree because it needs to visit all the nodes in the tree.

The space complexity is O(h), where h is the height of the binary tree.
The function uses recursion to perform DFS, and at any given point,
the maximum number of elements stored in the call stack is determined by the height of the tree.
In the best-case scenario, when the binary tree is balanced, the height of the tree is logarithmic (h = log(n)),
resulting in a space complexity of O(log n). In the worst-case scenario, when the binary tree is skewed (essentially a linked list),
the height of the tree becomes linear (h = n), leading to a space complexity of O(n).
 */
