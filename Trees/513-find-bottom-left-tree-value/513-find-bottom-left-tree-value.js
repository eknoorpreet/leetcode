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

/*e can't just keep going left (dfs) (look at example 2) because we need to find the leftmost BOTTOM node, not just the leftmost node! So, we need to reach the last level and then get its leftmost node.
  1. BFS: Left to right: Keep track of each level and at the end of every level, get the value of the first node
  2. BFS: Right to left: just keep traversing via BFS and the last node would be the leftmost bottom node => better!

  */

//BFS: Left to right
// const findBottomLeftValue = function(root) {
//     if(!root) return null
//     let leftBottomVal
//     const queue = new MyQueue()
//     queue.enqueue(root)
//     while(queue.length) {
//         const levelSize = queue.length
//         const currentLevel = []
//         for(let i = 0; i < levelSize; i++) {
//             const dequeued = queue.dequeue()
//             currentLevel.push(dequeued.val)
//             if(dequeued.left) queue.enqueue(dequeued.left)
//             if(dequeued.right) queue.enqueue(dequeued.right)
//         }
//         leftBottomVal =  currentLevel[0]
//     }
//     return leftBottomVal
// };

//BFS: Right to left
const findBottomLeftValue = function (root) {
  if (!root) return null;
  let leftBottomVal;
  const queue = new MyQueue();
  queue.enqueue(root);
  while (queue.length) {
    const dequeued = queue.dequeue();
    if (dequeued.right) queue.enqueue(dequeued.right);
    if (dequeued.left) queue.enqueue(dequeued.left);
    leftBottomVal = dequeued.val;
  }
  return leftBottomVal;
};

/*Time complexity
  The time complexity of the above algorithm is O(n), where n is the total number of nodes in the tree. This is due to the fact that we traverse each node once.

  Space complexity
  Apart from the list being returned (O(n)), the space complexity of the above algorithm will be O(n) as we will need O(n) space for the queue.
  Since we can have a maximum of n/2 nodes at any level (this could happen only at the lowest level), therefore we will need O(n) space to store them in the queue. */
