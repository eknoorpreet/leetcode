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

const minDepth = function (root) {
  let minDepth = 0;
  if (!root) return minDepth;
  const queue = new MyQueue();
  queue.enqueue(root);
  while (queue.length) {
    const size = queue.length;
    minDepth++;
    for (let i = 0; i < size; i++) {
      const dequeued = queue.dequeue();
      if (dequeued) {
        //both children should be null => the curr node should be a leaf node
        if (!dequeued.left && !dequeued.right) return minDepth;
        if (dequeued.left) queue.enqueue(dequeued.left);
        if (dequeued.right) queue.enqueue(dequeued.right);
      }
    }
  }
  return minDepth;
};

/*Time complexity
The time complexity of the above algorithm is O(n), where n is the total number of nodes in the tree. This is due to the fact that we traverse each node once.

Space complexity
Apart from the list (O(h)), the space complexity of the above algorithm will be O(N) as we will need O(n) space for the queue.
Since we can have a maximum of n/2 nodes at any level (this could happen only at the lowest level), therefore we will need O(n) space to store them in the queue. */
