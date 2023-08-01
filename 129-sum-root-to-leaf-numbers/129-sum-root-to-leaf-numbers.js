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

// const sumNumbers = function(root) {
//   const allPaths = []
//   let sum = 0
//    const findPaths = function (root, currentPath, allPaths) {
//        if (!root) return;
//        currentPath.push(root.val)
//        //if the leaf node => calcuate the number
//        if (!root.left && !root.right) {
//            allPaths.push(Number([...currentPath].join("")))
//        }
//        else {
//            findPaths(root.left, currentPath, allPaths)
//            findPaths(root.right, currentPath, allPaths)
//        }
//        currentPath.pop()
//     };
//     findPaths(root, [], allPaths)
//     for(let num of allPaths) {
//       sum += num
//     }
//     return sum
// };

const sumNumbers = function (root) {
  const dfs = (root, currSum) => {
    //if no root => sum = 0
    if (!root) return 0;
    currSum = currSum * 10 + root.val; //concatenating the digits
    //if the leaf node => path finished return the number (represented by the path)
    if (!root.left && !root.right) return currSum;
    const left = dfs(root.left, currSum);
    const right = dfs(root.right, currSum);
    return left + right;
  };
  return dfs(root, 0);
};

/*Time complexity: O(n)
  Space complexity: O(h)
  */
