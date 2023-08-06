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
 * @return {TreeNode}
 */

class QueueNode {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}

class MyQueue {
  constructor() {
    this.first = null;
    this.last = null;
    this.length = 0;
  }

  enqueue(val) {
    const newNode = new QueueNode(val);
    if (!this.first) {
      this.first = newNode;
    } else {
      this.last.next = newNode;
    }
    this.last = newNode;
    return ++this.length;
  }

  dequeue() {
    if (!this.first) return null;
    let removedNode = this.first;
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

// const invertTree = function(root) {
//     if(!root) return null
//     const queue = new MyQueue()
//     queue.enqueue(root)
//     while(queue.length) {
//         const curr = queue.dequeue()
//         const currLeft = curr.left
//         curr.left = curr.right
//         curr.right = currLeft
//         if(curr.left) queue.enqueue(curr.left)
//         if(curr.right) queue.enqueue(curr.right)
//     }
//     return root
// };

// const invertTree = function(root) {
//     if(!root) return null
//     const left = invertTree(root.left)
//     const right = invertTree(root.right)
//     root.left = right
//     root.right = left
//     return root
// };

// const invertTree = function(root) {
//     if(!root) return root
// const left = invertTree(root.left)
// const right = invertTree(root.right)
// root.left = right
// root.right = left
//     return root
// };

/*the idea is to
  1. go as much left as possible
  2. go as much right as possible

  So, we can invert the bottom-most node/subtree first.
  root.left = right
  root.right = left

  This way, the leftmost subtree is inverted and then, we switch to the rightmost subtree to do the same and then, we keep going one elevel each time!
  */

// const invertTree = function(root) {
//     if(!root) return root
//     const temp = invertTree(root.right)
//     root.right = invertTree(root.left)
//     root.left = temp
//     return root
// };

const invertTree = function (root) {
  if (!root) return root;
  const left = invertTree(root.left);
  const right = invertTree(root.right);
  root.left = right;
  root.right = left;
  return root;
};

// const invertTree = function(root) {
//     if(!root) return root
//     const temp = root.right
//     root.right = root.left
//     root.left = temp
//     invertTree(root.right)
//     invertTree(root.left)
//     return root
// };

//TC: O(n)
//SC: O(n)
