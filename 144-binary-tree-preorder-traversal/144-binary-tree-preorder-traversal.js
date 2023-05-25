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

// const preorderTraversal = function(root) {
//     const result = []
//     if(!root) return sorted;
//     const traverse = (node) => {
//         result.push(node.val)
//         if(node.left) traverse(node.left)
//         if(node.right) traverse(node.right)
//         return result
//     }
//     return traverse(root)
// };

/*
           4
         /   \
        2     6
       / \   / \
      1   3 5   7
  
  Preorder: [4,2,1,3,6,5,7]
  
  */

const preorderTraversal = function (root) {
  const result = [];
  if (!root) return result;
  const stack = new Stack();
  let currentNode = root;
  while (currentNode || stack.length) {
    while (currentNode) {
      //the node being processed first
      result.push(currentNode.val);
      stack.push(currentNode);
      currentNode = currentNode.left;
    }
    currentNode = stack.pop();
    currentNode = currentNode.right;
  }
  return result;
};

//TC: O(n)
//SC: O(n)
