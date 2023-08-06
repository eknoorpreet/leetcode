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
 * @return {number[][]}
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

// const zigzagLevelOrder = function(root) {
//     const result = []
//     if(!root) return result
//     const queue = new MyQueue()
//     queue.enqueue(root)
//     let levelNum = 0;
//     while(queue.length) {
//         const size = queue.length
//         const currLevel = []
//         for(let i = 0; i < size; i++) {
//             const dequeued = queue.dequeue()
//             if(levelNum % 2 === 0) currLevel.push(dequeued.val)
//             else currLevel.unshift(dequeued.val)
//             if(dequeued) {
//                 if(dequeued.left) queue.enqueue(dequeued.left)
//                 if(dequeued.right) queue.enqueue(dequeued.right)
//             }
//         }
//         levelNum++
//         result.push(currLevel)
//     }
//     return result
// };

const zigzagLevelOrder = function (root) {
  const result = [];
  if (!root) return result;
  const queue = new MyQueue();
  queue.enqueue(root);
  let leftToRight = true;
  while (queue.length) {
    const levelSize = queue.length;
    const currentLevel = []; //a dequeue (so it'd be O(1) time to push a node to front instead of O(n))
    for (let i = 0; i < levelSize; i++) {
      const currentNode = queue.dequeue();
      if (currentNode) {
        if (leftToRight) {
          currentLevel.push(currentNode.val);
        } else {
          currentLevel.unshift(currentNode.val);
        }
        if (currentNode.left) queue.enqueue(currentNode.left);
        if (currentNode.right) queue.enqueue(currentNode.right);
      }
    }
    //after each level, flip the order
    leftToRight = !leftToRight;
    result.push(currentLevel);
  }
  return result;
};

/*Time complexity
The time complexity of the above algorithm is O(n), where n is the total number of nodes in the tree. This is due to the fact that we traverse each node once.

Space complexity
Apart from the list being returned (O(n)), the space complexity of the above algorithm will be O(N) as we will need O(n) space for the queue.
Since we can have a maximum of n/2 nodes at any level (this could happen only at the lowest level), therefore we will need O(n) space to store them in the queue. */
