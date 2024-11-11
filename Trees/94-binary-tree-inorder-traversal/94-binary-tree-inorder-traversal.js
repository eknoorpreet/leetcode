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

/*

In inorder traversal, we visit nodes in this order: LEFT -> ROOT -> RIGHT
For the tree [1,null,2,3]:

    1
      \
       2
      /
    3

We first visit the leftmost node, then its parent, then the right subtree. So: 1 -> 3 -> 2

       4
     /   \
    2     6
   / \   / \
  1   3 5   7

The Stack's Purpose:

Similar to preorder, but now we don't process a node until we've finished its left subtree
Stack helps us remember nodes while we explore their left children
When we pop a node, we know its entire left subtree has been processed

It processes the most recently added value first.
If we keep pushing root's all left values to the stack, we'll have the leftmost values at the top
When we pop off, we're processing leftmost values first. How far are we processing? As long as the node exists, we reach to its left. This way, a node being popped off must have had its left child already processed. How? We've added leftmost values to the stack until there are no more left. Popped node/node at end ("currentNode") has its left child dealt with (or doesn't exist), so we add it to result and work on its right child (add to stack to be processed later). Again, with the right child, we keep on pushing leftmost values to the stack until there are no more left and pop them off the stack one by one.

If currentNode is null but stack is not empty, process/pop the element in stack and move to right (left (currentNode) already processed!)

The intuition behind this:
By pushing nodes to stack before processing them, we "delay" processing until we've hit the leftmost node
When we pop a node, we know:
    Its left subtree is completely processed (because we've gone as far left as possible)
    It's now this node's turn (the "root" part of left->root->right)
    After processing it, we move to its right child

*/

const inorderTraversal0 = function (root) {
  const result = [];
  const traverse = (node) => {
    if (!node) return;
    if (node.left) traverse(node.left);
    result.push(node.val);
    if (node.right) traverse(node.right);
  };
  traverse(root);
  return result;
};

const inorderTraversal = function (root) {
  const result = [];
  if (!root) return result;
  const stack = new Stack();
  let currentNode = root;
  while (currentNode || stack.length) {
    while (currentNode) {
      stack.push(currentNode);
      currentNode = currentNode.left;
    }
    // currentNode has its left child dealt with
    // Get the parent node
    currentNode = stack.pop();
    // push node to result (NOW we process it)
    result.push(currentNode.val);
    // Move to the right child
    currentNode = currentNode.right;
  }
  return result;
};

/*

Time complexity: O(n) where n is number of nodes
Space complexity: O(h) where h is tree height (maximum stack size)

*/
