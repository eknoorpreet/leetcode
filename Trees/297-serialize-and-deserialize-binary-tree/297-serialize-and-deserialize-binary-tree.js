/*

Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network connection link to be reconstructed later in the same or another computer environment.

Design an algorithm to serialize and deserialize a binary tree. There is no restriction on how your serialization/deserialization algorithm should work. You just need to ensure that a binary tree can be serialized to a string and this string can be deserialized to the original tree structure.

Clarification: The input/output format is the same as how LeetCode serializes a binary tree. You do not necessarily need to follow this format, so please be creative and come up with different approaches yourself.



Example 1:


Input: root = [1,2,3,null,null,4,5]
Output: [1,2,3,null,null,4,5]
Example 2:

Input: root = []
Output: []


Constraints:

The number of nodes in the tree is in the range [0, 10^4].
-1000 <= Node.val <= 1000

*/

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */

/*

The key idea here is using DFS (Depth-First Search) preorder traversal (root -> left -> right) to both serialize and deserialize the binary tree.

Serialization Intuition:

We use an array result to store the serialized values
For each node:
    If it's null, we push 'null' to maintain structure information
    If it's not null, we push its value
    Then recursively process left and right children
Finally join the array with commas to create a string

*/

const serialize = function (root) {
  const result = [];
  const dfs = (node) => {
    if (!node) {
      // Base case: if node is null
      result.push('null');
      // Add 'null' to represent empty node
      return;
    }
    result.push(`${node.val}`); // Add current node's value
    dfs(node.left); // Recurse on left subtree
    dfs(node.right); // Recurse on right subtree
  };
  dfs(root);
  return result.join();
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */

/*

Deserialization Intuition:

Split the string back into an array
Use a global index i to keep track of current position in array
For each value:
If it's "null", increment i and return null
    Otherwise:
        Create a new node with the current value
        Increment i
        Recursively build left and right subtrees
        Return the completed node
*/

const deserialize = function (data) {
  const values = data.split(','); // Split string back into array
  let i = 0; // Global index to track position
  const dfs = () => {
    // Base case: if value is "null"
    if (values[i] === 'null') {
      // Move to next value
      i++;
      return null;
    }
    // Create new node
    const node = new TreeNode(Number(values[i]));
    // Move to next value
    i++;
    // Recursively build left subtree
    node.left = dfs();
    // Recursively build right subtree
    node.right = dfs();
    // Return completed node
    return node;
  };
  return dfs();
};

/*

Time Complexity: O(n) for both operations, where n is number of nodes
Space Complexity: O(n) for both operations (O(h) recursive stack space where h is height of tree)

*/

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */
