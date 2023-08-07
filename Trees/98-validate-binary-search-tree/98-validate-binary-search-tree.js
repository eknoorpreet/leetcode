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
 * @return {boolean}
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

/*in order traversal => left node being popped off (processed) first
  is pre (previosuly processed / left child) > node => false
  otherwise, pre moves to curr adn curr moves to the right child
  if the curr node is smaler or equal to the left node is
   if(pre && curr.val <= pre.val) return false

  basically, in inorder traversal, we go left -> node -> right. If it's a BST,
  we end up traversing in a sorted manner. So, all we need to do is to compare
  the curr node with the prev one
  */

const isValidBST = function (root) {
  if (!root) return true;
  const stack = new Stack();
  let curr = root;
  let prev = null;
  while (curr || stack.length) {
    while (curr) {
      stack.push(curr);
      curr = curr.left;
    }
    curr = stack.pop();
    if (prev && prev.val >= curr.val) return false;
    prev = curr;
    curr = curr.right;
  }
  return true;
};

//TC: O(n)
//SC: O(h)

const isValidBSTRecursive = function (root) {
  const valid = (node, lowerBound, upperBound) => {
    if (!node) return true;
    if (node.val >= upperBound || node.val <= lowerBound) return false;
    //curr node's left child should be greater than the curr node's left boundary
    //and lesser than the curr node
    //curr node's right child should be greater than the curr node
    //and lesser than the curr node's right boundary
    return (
      valid(node.left, lowerBound, node.val) &&
      valid(node.right, node.val, upperBound)
    );
  };
  return valid(root, Number.NEGAITIVE_INFINITY, Number.POSITIVE_INFINITY);
};

//TC: O(n)
//SC: O(h)
