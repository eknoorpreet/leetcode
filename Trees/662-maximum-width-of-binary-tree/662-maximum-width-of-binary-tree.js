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
 * @return {number}
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

// const widthOfBinaryTree = function(root) {
//   let maxWidth = 0n;
//   //handle edge case (root empty)
//   if (!root) return maxWidth;
//   const queue = new MyQueue();
//   let prevLevel = 0n
//   let prevVal = 1n
//   //question demands the concept of breadth-first search,
//   //start with root
//   queue.enqueue([root, 1n, 0n]);
//   while (queue.length) {
//     let dequeued = queue.dequeue();
//     let [node, currVal, level] = dequeued
//     if(level > prevLevel) {
//         prevLevel = level
//         prevVal = currVal
//     }
//     maxWidth = maxWidth > currVal - prevVal + 1n ? maxWidth : currVal - prevVal + 1n
//     if(node) {
//       if (node.left) {
//         queue.enqueue([node.left, 2n * currVal, level + 1n]);
//       }
//       if (node.right) {
//         queue.enqueue([node.right, 2n * currVal + 1n, level + 1n]);
//       }
//     }
//   }
//   return maxWidth;
// };

//assign a value to each node corresponding to its decision
//node: 1
//  left: 2i = 2
//  right: 2i + 1 = 3
//Since values are assigned according to the position of the node, it will take into account the null left nodes as well
//the width of a level = difference b/w values of leftmost and rightmost nodes + 1
//check max width at every level

const widthOfBinaryTree = function (root) {
  let maxWidth = 0n; //BigInt literal for the integer 0.
  if (!root) return maxWidth;
  const queue = new MyQueue();
  let prevLevel = 0n; //keeping track of previous level so we know when new level starts
  //keeping track of previous val so we can calculate the width (currVal - prevVal + 1)
  let prevVal = 1n; //value of the first node's value in the level

  //[node, number assigned to the node, level for the node]
  //level will help us in distinguishing when we move to a new level
  queue.enqueue([root, prevVal, prevLevel]);
  while (queue.length) {
    const dequeued = queue.dequeue();
    let [node, val, level] = dequeued;
    //if the level changed
    if (level > prevLevel) {
      //update the previous level (so we can determine the value of the first node in the level)
      prevLevel = level;
      //update the previous value
      prevVal = val;
    }
    //the width of level = curr val - value of the first node's value in the level
    const currWidth = val - prevVal + 1n;
    maxWidth = maxWidth > currWidth ? maxWidth : currWidth;
    if (node) {
      if (node.left) queue.enqueue([node.left, 2n * val, level + 1n]);
      if (node.right) queue.enqueue([node.right, 2n * val + 1n, level + 1n]);
    }
  }
  return maxWidth;
};

/*Time complexity
  The time complexity of the above algorithm is O(n), where n is the total number of nodes in the tree. This is due to the fact that we traverse each node once.

  Space complexity
  Apart from the list being returned (O(n)), the space complexity of the above algorithm will be O(n) as we will need O(n) space for the queue.
  Since we can have a maximum of n/2 nodes at any level (this could happen only at the lowest level), therefore we will need O(n) space to store them in the queue. */

/*In JavaScript, 0n and 1n are examples of BigInt literals. BigInt is a relatively new numeric data type in JavaScript that allows you to represent integers with arbitrary precision, overcoming the limitations of the standard Number type, which is a 64-bit floating-point representation.*/
