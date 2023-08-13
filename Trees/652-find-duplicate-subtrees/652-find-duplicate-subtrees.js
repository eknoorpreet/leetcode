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

//serialize the tree (into a string)
//store the hashed string into a hashmap => all subtrees matching that string will be mapped to that string

const findDuplicateSubtrees = function (root) {
  // const subtrees = new Map()
  const subtrees = {};
  const result = [];
  const dfs = (node) => {
    if (!node) return 'null';
    //hashing the subtree
    const key = [`${node.val}`, dfs(node.left), dfs(node.right)].join(',');
    // if(subtrees.get(key)?.length === 1) result.push(node)
    // if(subtrees[key]?.length === 1) result.push(node)

    //if the string already exists in the hashmap
    //NOTE: simply checking that the string already exists in the hashmap is NOT enough
    //why? because we could be adding more than 1 duplicate occurences to the result
    //for example: if '4, null, null' exists in the hashmap and we are encountering the 3rd duplicate occurence,
    //we don't want to add it to the result!
    //we only want to add it to the result when the count was 2
    if (key in subtrees) {
      //increase its count and if the count has reached 2 => duplicate!
      //only add the node once when we find a duplicate.
      //since we don't need to find all duplicate occurences
      subtrees[key] += 1;
      if (subtrees[key] === 2) result.push(node);
    } else {
      //otherwise initiate the count for the string
      subtrees[key] = 1;
    }
    return key;
    // subtrees.set(key, (subtrees.get(key) || []).push(node))
    // subtrees[key] ? subtrees[key].push(node) : subtrees[key] = [node];
  };
  dfs(root);
  return result;
};

/*TC:
Length of the serialization: possibly n
/The concatenation takes O(n) time in each recursive call taking overall complexity to O(n2): https://stackoverflow.com/questions/15400508/string-concatenation-complexity-in-c-and-java
in order to check if the subtree exists in hashmap, we need to hash it: O(n)
Basically, hash subtree for each subtree: O(n^2)

SC: O(h)
*/
