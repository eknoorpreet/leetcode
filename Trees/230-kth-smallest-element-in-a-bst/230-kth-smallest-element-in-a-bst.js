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
 * @param {number} k
 * @return {number}
 */
// const kthSmallest = function(root, k) {
//     let sorted = []
//     //DFS in-order returns sorted list
//     const traverse = (node) => {
//         if(node.left) traverse(node.left)
//         sorted.push(node.val)
//         if(node.right) traverse(node.right)
//         return sorted
//     }
//     traverse(root)
//     //since it's 1-indexed, 1st smallest element is at 0th index
//     return sorted[k - 1];
// };

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

// const kthSmallest = function(root, k) {
//     if(!root) return true;
//     const stack = new Stack();
//     let currentNode;
//     let pre = null;
//     const pushAllLeft = (node) => {
//         while(node) {
//             stack.push(node);
//             node = node.left;
//         }
//     }
//     pushAllLeft(root);
//     while(stack.length) {
//         currentNode = stack.pop();
//         if(--k == 0) break;
//         pushAllLeft(currentNode.right);
//     }
//     return currentNode.val
// }

// const kthSmallest = function(root, k) {
//    const stack = new Stack()
//    const result = []
//    let curr = root
//    while(curr || stack.length) {
//        while(curr) {
//            stack.push(curr)
//            curr = curr.left
//        }
//        curr = stack.pop()
//        if(--k === 0) return curr.val
//        curr = curr.right
//    }
//    return result[k - 1]
// }

//inorder traversal => traverse in a sorted manner. Simulataneously, we also decrement k, when k becomes 0, curr node is the k-th smallest element!
const kthSmallest = function (root, k) {
  const stack = new Stack();
  let curr = root;
  while (curr || stack.length) {
    while (curr) {
      stack.push(curr);
      curr = curr.left;
    }
    curr = stack.pop();
    if (--k === 0) return curr.val;
    curr = curr.right;
  }
};

//TC: O(n)
//SC: O(h)
