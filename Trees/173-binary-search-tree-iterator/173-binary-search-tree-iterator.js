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

  peek() {
    return this.first;
  }
}

const BSTIterator = function (root) {
  //initialize the stack
  this.stack = new Stack();
  //keep going left and adding to the stack
  while (root) {
    this.stack.push(root);
    root = root.left;
  }
};

// /**
//  * @return {number}
//  */
BSTIterator.prototype.next = function () {
  let result = this.stack.pop();
  //when you've processed the node, add its right child to the stack
  let current = result.right;
  while (current) {
    this.stack.push(current);
    //and keep going left, adding them to the stack
    current = current.left;
  }
  return result.val;
};

/**
 * @return {boolean}
 */
BSTIterator.prototype.hasNext = function () {
  return !!this.stack.length; //stack is non-empty
};

/**
 * Your BSTIterator object will be instantiated and called as such:
 * var obj = new BSTIterator(root)
 * var param_1 = obj.next()
 * var param_2 = obj.hasNext()
 */

/*TC: https://leetcode.com/problems/binary-search-tree-iterator/solutions/52525/my-solutions-in-3-languages-with-stack/ */
