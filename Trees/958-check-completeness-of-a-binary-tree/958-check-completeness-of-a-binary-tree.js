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

//when we reach our first null node, we expect all subsequent nodes to be null
const isCompleteTree = function (root) {
  const queue = new MyQueue();
  queue.enqueue(root);
  while (queue.length) {
    const dequeued = queue.dequeue();
    if (dequeued) {
      queue.enqueue(dequeued.left);
      queue.enqueue(dequeued.right);
    } else {
      //if the current node is null
      while (queue.length) {
        //check all subsequent nodes
        //if we found a node that is non-null AFTER finding a null node => false
        if (queue.dequeue()) return false;
      }
    }
  }
  //else, it's a complete binary tree
  return true;
};

/*Time complexity
  The time complexity of the above algorithm is O(n), where n is the total number of nodes in the tree. This is due to the fact that we traverse each node once.

Space complexity
  Apart from the list being returned (O(n)), the space complexity of the above algorithm will be O(n) as we will need O(n) space for the queue.
  Since we can have a maximum of n/2 nodes at any level (this could happen only at the lowest level), therefore we will need O(n) space to store them in the queue. */
