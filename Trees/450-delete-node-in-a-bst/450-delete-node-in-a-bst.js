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
 * @param {number} key
 * @return {TreeNode}
 */
/*find the node (log n or n, depending on the tree structure. Basically, depends on the height of the tree)
delete the node:
    what node should we replace it with? Every value in that subtree is smaller than the (deleted) node's parent. We want to find a replacement node that
        a. will be greater than the deleted node's left
        b. will be smaller than the deleted node's right
One node that can fulfill both conditions is the min value in the right subtree of the deleted node (can also be the max value in the left subtree)
*/

// const deleteNode = function(root, key) {
//     if(!root) return root //nothing to delete

//     if(key > root.val) {
//         root.right = deleteNode(root.right, key)
//     } else if(key < root.val) {
//         root.left = deleteNode(root.left, key)
//     } else {
//         //Case 1: No children (the parent points of the key to null now)
//       if(!root.left && !root.right) return null
//   if(!root.left) {
//       return root.right
//   } else if(!root.right) {
//       return root.left
//   }

//       if(!root.left || !root.right) {
//         return root.left ? root.left : root.right
//       }

//       let curr = root.right
//       while(curr.left) {
//           curr = curr.left
//       }
//       root.val = curr.val
//       root.right = deleteNode(root.right, curr.val)
//     }
//     return root
// };

/*
       5
     /   \
    3     6
   / \     \
  2   4     7

  After deleting 5 adn replacing it with the min value in the right subtree, the tree would look like:

  /*
       6
     /   \
    3     6 => delete this node.
              //Now we already know how to do that : deleteNode(root.right, curr.val)
   / \     \
  2   4     7
*/

const deleteNode = function (root, key) {
  if (!root) return root;
  //search the node to be deleted
  //if it's on the left, the return value (deleted node's parent's new child) will be assigned to root.left
  if (key < root.val) root.left = deleteNode(root.left, key);
  //if it's on the right, the return value (deleted node's parent's new child) will be assigned to root.right
  else if (key > root.val) root.right = deleteNode(root.right, key);
  else {
    //we found the deleted node
    //no children => we return null
    //which will be assigned
    if (!root.left && !root.right) return null;
    //no right child => return left child
    //no left child => return right child
    else if (!root.left || !root.right)
      return root.left ? root.left : root.right; //return root.left ?? root.right
    //in the tree's right subtree
    let curr = root.right;
    //find the min value => go as left as possible
    //we don't want to stop where curr.left is null but one level above
    while (curr.left) {
      curr = curr.left;
    }
    //in the tree's left subtree
    // let curr = root.left
    //Or find the max value => go as right as possible
    //we don't want to stop where curr.right is null but one level above
    // while(curr.right) {
    //     curr = curr.right
    // }
    //replace the deleted node with the min value in the right subtree
    //key = 3, 3 replaced with 6
    root.val = curr.val;
    //now replace 6 with the min value in its right subtree
    root.right = deleteNode(root.right, curr.val);
    // root.left = deleteNode(root.left, curr.val)
  }
  return root;
};

/*The time complexity of the deleteNode function to delete a node in a binary search tree is O(log n) on average. This complexity arises from the fact that the function searches for the node to be deleted by traversing the tree from the root to the target node, and at each step, it chooses to go either left or right based on the comparison of the key with the node's value.

In a balanced binary search tree, the height of the tree is log(n), where n is the number of nodes in the tree. Thus, the time complexity for finding the node to delete is logarithmic (O(log n)).

However, in the worst-case scenario, if the binary search tree is skewed (essentially a linked list), the height of the tree can be linear (O(n)). In such cases, the time complexity for finding the node to delete becomes linear (O(n)).

Regarding space complexity, the function uses the call stack for recursion, which could go as deep as the height of the tree. Therefore, the space complexity is also O(log n) on average (in a balanced tree) and O(n) in the worst-case scenario (skewed tree). */
