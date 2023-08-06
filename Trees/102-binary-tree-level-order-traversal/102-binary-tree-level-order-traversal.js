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

const levelOrder = function (root) {
  const result = [];
  //handle edge case (root empty)
  if (!root) return result;
  const queue = new MyQueue();
  //question demands the concept of breadth-first search,
  //except that we do it one level at a time
  //start with root
  queue.enqueue(root);
  while (queue.length) {
    //in the beginning of any iteration, queue will have total nodes at that level = size of that level
    //we remember that size
    const levelSize = queue.length;
    const currentLevel = [];
    //to iterate over that level to build it
    for (let i = 0; i < levelSize; i++) {
      let dequeued = queue.dequeue();
      if (dequeued) {
        //push the current node
        currentLevel.push(dequeued.val);
        //and put its children (from left to right) on the queue to add later
        if (dequeued.left) queue.enqueue(dequeued.left);
        if (dequeued.right) queue.enqueue(dequeued.right);
      }
    }
    result.push(currentLevel);
  }
  return result;
};

/*Time complexity
The time complexity of the above algorithm is O(n), where n is the total number of nodes in the tree. This is due to the fact that we traverse each node once.

Space complexity
Apart from the list being returned (O(n)), the space complexity of the above algorithm will be O(n) as we will need O(n) space for the queue.
Since we can have a maximum of n/2 nodes at any level (this could happen only at the lowest level), therefore we will need O(n) space to store them in the queue. */
