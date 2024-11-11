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
 * @return {number[]}
 */

class Node {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}

class Stack {
  constructor() {
    this.first = null;
    this.last = null;
    this.length = 0;
  }

  //prepend (at head)
  push(val) {
    const newNode = new Node(val);
    if (!this.first) {
      this.last = newNode;
    } else {
      newNode.next = this.first;
    }
    this.first = newNode;
    return ++this.length;
  }

  toArray() {
    const nodes = [];
    let currentNode = this.first;
    while (currentNode) {
      nodes.push(currentNode);
      currentNode = currentNode.next;
    }
    return nodes;
  }

  pop() {
    const removedNode = this.first;
    if (this.first === this.last) {
      this.first = null;
      this.last = null;
    } else {
      this.first = this.first.next;
    }
    this.length--;
    return removedNode.value;
  }
}

/*

In preorder traversal, we visit nodes in this order: ROOT -> LEFT -> RIGHT
For example, in the tree [1,null,2,3]:

     1
      \
       2
      /
     3

We visit 1 first (root), then traverse to the right since there's no left child (getting 2), then to 2's left child (getting 3).

         4
       /   \
      2     6
     / \   / \
    1   3 5   7

Preorder: [4,2,1,3,6,5,7]

*/

/*

Iterative:

The Stack's Purpose:

The stack helps us keep track of nodes we need to revisit later (Remember where we came from (our path))
Backtrack when we reach a null node
When we go left, we store the parent node so we can come back to check its right subtree. Basically,
it helps us keep track of nodes whose right subtrees we still need to explore

*/

const preorderTraversal0 = function (root) {
  const result = [];
  if (!root) return result;
  const traverse = (node) => {
    result.push(node.val);
    if (node.left) traverse(node.left);
    if (node.right) traverse(node.right);
    return result;
  };
  return traverse(root);
};

/*

Time complexity: O(n) where n is the number of nodes
Space complexity: O(h) where h is the height of the tree (maximum stack size)

*/
