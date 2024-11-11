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

/*

Requirements:

Like the previous problem, but now we need ALL valid paths
Each path must:
    Start at root
    End at a leaf
    Sum to targetSum
We need to return the actual values in the paths.

The key to this solution is backtracking.

// Going down the path
currentPath.push(root.val)

// After exploring all possibilities
currentPath.pop()  // Remove this node as we backtrack

5
     / \
    4   8
   /
  11
 /  \
7    2

Target = 22
Start: currentPath = []
1. Push 5: [5]
2. Push 4: [5,4]
3. Push 11: [5,4,11]
4. Push 7: [5,4,11,7]  // Not valid
5. Pop 7: [5,4,11]     // Backtrack
6. Push 2: [5,4,11,2]  // Valid!
7. Pop 2: [5,4,11]     // Backtrack
8. Pop 11: [5,4]       // Backtrack


Why We Need [... currentPath]:

allPaths.push([...currentPath])  // Creates a copy

currentPath is modified as we explore
Without copy, all paths would reference same array
Spread operator (...) creates new array with current values
*/

const pathSum = function (root, targetSum) {
  const allPaths = [];
  const findPaths = function (root, targetSum, currentPath, allPaths) {
    // Base case If the root doesn't exist initially or if we reach a node where the target has
    // still not been met
    if (!root) return;
    // Add current node
    currentPath.push(root.val);
    // Found valid path to leaf => add to result
    if (root.val === targetSum && !root.left && !root.right) {
      // Since the curr node is a leaf, no need to go left or right,
      // Just add to result and go back => currentPath.pop()
      // currentPath is going to be different in different calls => use a copy!
      allPaths.push([...currentPath]);
    } else {
      // Recursive case: Try both subtrees with reduced target
      findPaths(root.left, targetSum - root.val, currentPath, allPaths);
      findPaths(root.right, targetSum - root.val, currentPath, allPaths);
    }
    // The above calls finished => We're at a leaf node => We go back
    // Backtrack!
    // Allows us to try different paths
    currentPath.pop();
  };
  findPaths(root, targetSum, [], allPaths);
  return allPaths;
};

/*

Time and Space Complexity:

Time: O(n²) in worst case

We visit each node
Creating path copies can take up to O(N)

Space: O(n) for for storing paths

*/
