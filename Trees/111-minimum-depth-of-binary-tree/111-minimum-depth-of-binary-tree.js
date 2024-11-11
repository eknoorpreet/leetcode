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

/*

We will use a queue to store all the nodes that are there at the same level. Starting with the root node, we will store the root node in the queue. Then we will iterate over all the current nodes in the queue and for each node we will add its left and right child to the queue. The important point to note here is that since we are traversing nodes level-wise, the first node which is a leaf, i.e. both left and right children are null; We will know that this is the node with the minimum depth.

*/

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

/*

Time complexity: O(N)

We will be iterating over each node in the tree only once; therefore, the total time complexity would be O(N).

Space complexity: O(N)

The only space required is the queue; the maximum number of nodes in the queue would be N. Hence, the space complexity would equal O(N).

*/
