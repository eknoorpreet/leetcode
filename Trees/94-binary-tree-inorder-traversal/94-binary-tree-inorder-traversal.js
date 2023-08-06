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

const inorderTraversal1 = function (root) {
  // const sorted = []
  // if(!root) return sorted;
  // const traverse = (node) => {
  //     if(node.left) traverse(node.left)
  //     sorted.push(node.val)
  //     if(node.right) traverse(node.right)
  //     return sorted
  // }
  // return traverse(root)

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

const inorderTraversal0 = function (root) {
  const result = [];
  if (!root) return result;
  const stack = new Stack();
  const pushAllLeft = (node) => {
    while (node) {
      stack.push(node);
      node = node.left;
    }
  };
  pushAllLeft(root);
  while (stack.length) {
    //currentNode has its left child dealt with
    const currentNode = stack.pop();
    //push node to result
    result.push(currentNode.val);
    //work on the right child
    pushAllLeft(currentNode.right);
  }
  return result;
};

//TC: O(n) (visit all nodes)
//SC: O(n) (function call stack in both approaches. In worst case, it could be like a linked list with all nodes on stack all at once)

/*
         4
       /   \
      2     6
     / \   / \
    1   3 5   7
  */

const inorderTraversal = function (root) {
  /* Here, we use a stack
      Purpose of stack: to process the most recently added value first
      If we keep pushing root's all left values to the stack, we'll have the leftmost values at the top
      When we pop off, we're processing leftmost values first. How far are we processing? As long as the node exists, we reach to its left. This way, a node being popped off must have had its left child already processed. How? We've added leftmost values to the stack until there are no more left. Popped node/node at end ("currentNode") has its left child dealt with (or doesn't exist), so we add it to result and work on its right child (add to stack to be processed later). Again, with the right child, we keep on pushing leftmost values to the stack until there are no more left and pop them off the stack one by one.  */

  //if currentNode is null but stack is not empty, process/pop the element in stack and move to right (left (currentNode) already processed!)
  const result = [];
  if (!root) return result;
  const stack = new Stack();
  let currentNode = root;
  while (currentNode || stack.length) {
    while (currentNode) {
      stack.push(currentNode);
      currentNode = currentNode.left;
    }
    //currentNode has its left child dealt with (null)
    currentNode = stack.pop();
    //push node to result
    result.push(currentNode.val);
    //work on the right child
    currentNode = currentNode.right;
  }
  return result;
};

//TC: O(n)
//SC: O(n)
