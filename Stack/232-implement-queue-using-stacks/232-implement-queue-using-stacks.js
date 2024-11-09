/*

Implement a first in first out (FIFO) queue using only two stacks. The implemented queue should support all the functions of a normal queue (push, peek, pop, and empty).

Implement the MyQueue class:

void push(int x) Pushes element x to the back of the queue.
int pop() Removes the element from the front of the queue and returns it.
int peek() Returns the element at the front of the queue.
boolean empty() Returns true if the queue is empty, false otherwise.
Notes:

You must use only standard operations of a stack, which means only push to top, peek/pop from top, size, and is empty operations are valid.
Depending on your language, the stack may not be supported natively. You may simulate a stack using a list or deque (double-ended queue) as long as you use only a stack's standard operations.


Example 1:

Input
["MyQueue", "push", "push", "peek", "pop", "empty"]
[[], [1], [2], [], [], []]
Output
[null, null, null, 1, 1, false]

Explanation
MyQueue myQueue = new MyQueue();
myQueue.push(1); // queue is: [1]
myQueue.push(2); // queue is: [1, 2] (leftmost is front of the queue)
myQueue.peek(); // return 1
myQueue.pop(); // return 1, queue is [2]
myQueue.empty(); // return false


Constraints:

1 <= x <= 9
At most 100 calls will be made to push, pop, peek, and empty.
All the calls to pop and peek are valid.

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

  peek() {
    return this.first;
  }
}

/*

  Key Insights:

  Two Stacks Role:

  stack1: Input stack (for pushing)
  stack2: Output stack (for popping/peeking)

  How Queue Order is Maintained:
  Push 1,2,3:
  stack1: [1,2,3] (3 on top)

  Pop:
  Transfer to stack2:
  stack2: [3,2,1] (1 on top)

  When elements are transferred from stack1 to stack2, their order is reversed
  This reversal is key because it puts elements in FIFO order

  Why this works:
  Initial state:
  stack1: [4,5,6] (6 on top)
  stack2: [3,2,1] (1 on top)

  Pop operation:
  - Returns 1 from stack2
  - Now stack2: [3,2]

  New push(7):
  - Goes to stack1: [4,5,6,7]
  - stack2 unchanged: [3,2]

  The Clever Part:
  Don't transfer elements back and forth
  Only transfer from stack1 to stack2 when needed
  Keep elements in stack2 until they're all popped
  New elements go to stack1 without disturbing stack2

  */

const MyQueue = function () {
  // Primary stack for pushing
  this.stack = new Stack();
  // Helper stack for popping/peeking
  this.stack2 = new Stack();
};

/**
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function (x) {
  // Transfer all elements from stack 2 to stack 1.
  // Elements will land in stack 1 in FIFO (original) order
  // So, the curr element will be pushed to the stack in the correct order
  while (this.stack2.length) {
    this.stack.push(this.stack2.pop());
  }
  this.stack.push(x);
};

/**
 * @return {number}
 */
MyQueue.prototype.pop = function () {
  // Transfer elements from Stack 1 to 2 in reverse order (FIFO)
  // Now, the first element (that needed to be popped) is at the last in stack2 => Pop!
  while (this.stack.length) {
    this.stack2.push(this.stack.pop());
  }
  return this.stack2.pop();
};

/**
 * @return {number}
 */
MyQueue.prototype.peek = function () {
  while (this.stack.length) {
    this.stack2.push(this.stack.pop());
  }
  return this.stack2.peek().value;
};

/**
 * @return {boolean}
 */
MyQueue.prototype.empty = function () {
  return this.stack.length === 0 && this.stack2.length === 0;
};

/*

  Time Complexity:

  Push: O(1)
  Pop: Amortized O(1)
  Peek: Amortized O(1)
  Empty: O(1)

  Space Complexity: O(n)

  Uses extra stack
  Total space equals number of elements

  */

/**
 * Your MyQueue object will be instantiated and called as such:
 * var obj = new MyQueue()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.peek()
 * var param_4 = obj.empty()
 */
