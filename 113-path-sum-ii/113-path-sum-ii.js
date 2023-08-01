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
 * @param {number} targetSum
 * @return {number[][]}
 */

const pathSum = function (root, targetSum) {
  const allPaths = [];
  const findPaths = function (root, targetSum, currentPath, allPaths) {
    //if the root doesn't exist initially or if we reach a node where the target has still not been met => false
    if (!root) return;
    currentPath.push(root.val);
    //if the target has been met AND it's the leaf node => true
    if (root.val === targetSum && !root.left && !root.right) {
      //since the curr node is a leaf, no need to go left or right, just go back
      //=> currentPath.pop()
      //currentPath is going to be different in different calls => use a copy!
      allPaths.push([...currentPath]);
    } else {
      findPaths(root.left, targetSum - root.val, currentPath, allPaths);
      findPaths(root.right, targetSum - root.val, currentPath, allPaths);
    }
    //the above calls finished => we're at a leaf node => we go back
    currentPath.pop();
  };
  findPaths(root, targetSum, [], allPaths);
  return allPaths;
};

/*
To analyze the time and space complexity of the given code, let's break it down step by step:

Time Complexity:
The time complexity of the code is mainly determined by the number of operations performed, particularly the number of recursive calls made to the findPaths function. In each recursive call, the code explores the left and right subtrees of the current node until it reaches the leaf nodes. In the worst case, the code will visit all the nodes in the binary tree once.
Let's assume there are 'N' nodes in the binary tree. In the worst case, every node could be part of a valid path that sums up to the targetSum, and the algorithm needs to explore each of those paths.

The time complexity of the code is O(N) because the algorithm visits each node in the binary tree once.

Space Complexity:
The space complexity of the code is determined by the space used in the call stack due to recursive calls, and also by the additional data structures used to store the paths.
In the worst case, the algorithm needs to explore all possible paths from the root to leaf nodes. If the binary tree is unbalanced and resembles a linked list, the maximum number of recursive calls could be equal to the number of nodes, resulting in a stack space of O(N).

Additionally, the allPaths array is used to store all valid paths found in the binary tree. In the worst case, it can hold O(N) elements, considering all nodes are part of valid paths.

So the space complexity of the code is O(N) due to the call stack and the allPaths array.

In summary:

Time Complexity: O(N)
Space Complexity: O(N)

In the case of a perfect binary tree, where all levels are completely filled except possibly the last level, the number of nodes 'N' can be expressed as a power of 2, where N = 2^h - 1, and 'h' is the height of the tree.

The space complexity of the code in the case of a perfect binary tree can be analyzed as follows:

Call Stack Space:
The maximum depth of the call stack in this case would be equal to the height of the perfect binary
tree, which is 'h'. Each recursive call takes constant space, as it only stores the current node and the current path, resulting in a space complexity of O(h).

Additional Data Structures:
The allPaths array is used to store all valid paths found in the binary tree. In this case, the maximum number of valid paths would be equal to the number of leaf nodes, which is half of the total number of nodes (N/2).

Thus, the space complexity due to the allPaths array is O(N).

Overall Space Complexity:
The space complexity is determined by the maximum of the two components, which is O(h) for the call stack space and O(N) for the additional data structures (i.e., allPaths array). In this case of a perfect binary tree, the dominant term is O(N) due to the allPaths array.

So, in the case of a perfect binary tree, the space complexity of the code is O(N), where N is the number of nodes in the tree.


Further explanation: Time: O(N^2), where N <= 5000 is the number of elements in the binary tree.

First, we think the time complexity is O(N) because we only visit each node once.
But we forgot to calculate the cost to copy the current path when we found a valid path, which in the worst case can cost O(N^2).

Ref: https://leetcode.com/problems/path-sum-ii/solutions/1382332/c-python-dfs-clean-concise-time-complexity-explained/

Extra Space (without counting output as space): O(H), where H is height of the binary tree. This is the space for stack recursion or keeping path so far.
*/
