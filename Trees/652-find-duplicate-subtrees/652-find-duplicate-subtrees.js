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
 * @return {TreeNode[]}
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
 * @return {TreeNode[]}
 */

/*

Duplicate Detection Mechanism

Convert each subtree to a string key (Serialize)
Use a hash map (using the hashed string as a key) to count occurrences (all subtrees matching that string will be mapped to that string)
Add to result ONLY when count reaches 2

Prevents adding multiple times
Ensures only one representative is returned

*/

const findDuplicateSubtrees0 = function (root) {
  // const subtrees = new Map()
  const subtrees = {};
  const result = [];
  const dfs = (node) => {
    // Base case: null nodes serialized as 'null'
    if (!node) return 'null';
    // Create a unique key representing the subtree
    const key = [`${node.val}`, dfs(node.left), dfs(node.right)].join(',');
    // if(subtrees.get(key)?.length === 1) result.push(node)
    // if(subtrees[key]?.length === 1) result.push(node)

    // Track subtree occurrences

    // NOTE: simply checking that the string already exists in the hashmap is NOT enough
    // Why? Because we could be adding more than 1 duplicate occurences to the result
    // Example: if '4,null,null' exists in the hashmap and we are encountering the 3rd duplicate
    // occurence, we don't want to add it to the result!
    // We only want to add it to the result when the count was 2
    if (key in subtrees) {
      // Increase its count and if the count has reached 2 => duplicate!
      // Only add the node once when we find a duplicate (when count = 2)
      // since we don't need to find all duplicate occurences
      subtrees[key] += 1;
      if (subtrees[key] === 2) result.push(node);
    } else {
      // Otherwise, initiate the count for the string
      subtrees[key] = 1;
    }
    return key;
    // subtrees.set(key, (subtrees.get(key) || []).push(node))
    // subtrees[key] ? subtrees[key].push(node) : subtrees[key] = [node];
  };
  dfs(root);
  return result;
};

/*

Time and Space Complexity

Stores serialization for each subtree
Recursion stack depth equals tree height

Length of the serialization: possibly n
The concatenation takes O(n) time in each recursive call taking overall complexity to O(n^2): https://stackoverflow.com/questions/15400508/string-concatenation-complexity-in-c-and-java

Time Complexity Analysis:

String Concatenation:

[node.val, dfs(node.left), dfs(node.right)].join(',')
Creates a new string for each node
String concatenation is O(n)
Happens for each node in the tree

Hashing Complexity:

Creating a hash key requires traversing the entire subtree
Each node requires O(n) time to generate its subtree's hash
Repeated for every node in the tree

Overall Complexity: O(n²)

O(n) for tree traversal
O(n) for each subtree serialization
O(n) for hashing

Space Complexity: O(n)

Stores serialization for each subtree
Recursion stack depth equals tree height

*/
