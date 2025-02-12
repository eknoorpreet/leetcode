/*

Given the root of a binary tree, return the postorder traversal of its nodes' values.



Example 1:

Input: root = [1,null,2,3]

Output: [3,2,1]

Explanation:



Example 2:

Input: root = [1,2,3,4,5,null,8,null,null,6,7,9]

Output: [4,6,7,5,2,9,8,3,1]

Explanation:



Example 3:

Input: root = []

Output: []

Example 4:

Input: root = [1]

Output: [1]

Constraints:

The number of the nodes in the tree is in the range [0, 100].
-100 <= Node.val <= 100

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

  isEmpty() {
    // No head? stack empty! Return true
    return !this.first;
  }

  peek() {
    //get value from the top/last added value (i.e head) and return it.
    //No head? => stack empty => null!
    if (this.isEmpty()) {
      return null;
    }
    //else return top/last added value (head)
    return this.first.value;
  }
}

/*
         4
       /   \
      2     6
     / \   / \
    1   3 5   7

left -> right -> node

Postorder: [1,3,2,5,7,6,4]


Only go to the right child after processing the entire left sub-tree.
Only go to the node after processing the entire right sub-tree.

We add to stack: [4 (node), 6 (right)]. Why? Because we pop from end of stack, right is popped/processed first before node.

We add to stack: [4 (node), 6 (right), 2 (left)]. Why? Because we pop from end of stack, left is popped/processed first before right.

null => processed

Imagine we just popped off / processed 2 (left) (after having processed its left and right subtrees), should we pop off 6 (right)? Well, no because we still have to go through 6's left and right subtree => Only pop off a node when we visit it the 2nd time (first time we visit, we go through its left and right subtree). The first time, we're just going through that node to reach and process its left and right subtrees. After they're done, we process the node on its 2nd visit.

This ensures the postorder sequence:

Left subtree is fully processed (due to pushing left child last)
Right subtree is fully processed next
Only then do we process the root node itself

*/

const postorderTraversal0 = function (root) {
  const sorted = [];
  if (!root) return sorted;
  const traverse = (node) => {
    if (node.left) traverse(node.left);
    if (node.right) traverse(node.right);
    sorted.push(node.val);
    return sorted;
  };
  return traverse(root);
};

const postorderTraversal = function (root) {
  const result = [];
  if (!root) return result;
  const stack = new Stack();
  // Push node twice to keep track of whether we have processed both its left and right subtrees
  // and then to process the node itself
  stack.push(root);
  stack.push(root);
  let curr;
  while (stack.length) {
    // Each time we pop a node out
    curr = stack.pop();
    // If we see that the top element is the same node as the one we just popped off, we know that we
    // have not done traversing yet (we're on first visit), and need to keep pushing the current
    // node's children onto the stack.
    if (stack.peek() === curr) {
      // Push right child twice (if exists)
      if (curr.right) {
        stack.push(curr.right);
        stack.push(curr.right);
      }
      // Push left child twice (if exists)
      if (curr.left) {
        stack.push(curr.left);
        stack.push(curr.left);
      }
    } else {
      // If the top element is not the same as the current element, we know that we're done
      // traversing with this node (its children), thus we can process this node to the result.
      result.push(curr.val);
    }
  }
  return result;
};

/*

Time complexity: O(n) where n is number of nodes
Space complexity: O(h) where h is tree height

*/
