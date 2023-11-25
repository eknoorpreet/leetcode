/*

Implement a last-in-first-out (LIFO) stack using only two queues. The implemented stack should support all the functions of a normal stack (push, top, pop, and empty).

Implement the MyStack class:

void push(int x) Pushes element x to the top of the stack.
int pop() Removes the element on the top of the stack and returns it.
int top() Returns the element on the top of the stack.
boolean empty() Returns true if the stack is empty, false otherwise.
Notes:

You must use only standard operations of a queue, which means that only push to back, peek/pop from front, size and is empty operations are valid.
Depending on your language, the queue may not be supported natively. You may simulate a queue using a list or deque (double-ended queue) as long as you use only a queue's standard operations.


Example 1:

Input
["MyStack", "push", "push", "top", "pop", "empty"]
[[], [1], [2], [], [], []]
Output
[null, null, null, 2, 2, false]

Explanation
MyStack myStack = new MyStack();
myStack.push(1);
myStack.push(2);
myStack.top(); // return 2
myStack.pop(); // return 2
myStack.empty(); // return False


Constraints:

1 <= x <= 9

At most 100 calls will be made to push, pop, top, and empty.
All the calls to pop and top are valid.


Follow-up: Can you implement the stack using only one queue?

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

const MyStack = function () {
  // const queue = new MyQueue()
  this.queue = new MyQueue();
};

/**
 * @param {number} x
 * @return {void}
 */
MyStack.prototype.push = function (x) {
  this.queue.enqueue(x);
};

/**
 * @return {number}
 */
MyStack.prototype.pop = function () {
  // stack pops the latest pushed element
  // To simulate stack's pop via a queue, make it so that the element to pop
  // comes out at the front. So, take the front element and move it to the end until the last
  // element is at the front! Then, remove it!

  // queue = [1, 2, 3, 4, 5]
  // i = 0, queue = [2, 3, 4, 5, 1]
  // i = 1, queue = [3, 4, 5, 1, 2]
  // i = 2, queue = [4, 5, 1, 2, 3]
  // i = 3, queue = [5, 1, 2, 3, 4]

  //loop ended => queue.dequeue() => remove 5

  //move front element to the back
  for (let i = 0; i < this.queue.length - 1; i++) {
    this.queue.enqueue(this.queue.dequeue());
  }
  return this.queue.dequeue();
};

/**
 * @return {number}
 */
MyStack.prototype.top = function () {
  return this.queue.last?.value;
};

/**
 * @return {boolean}
 */
MyStack.prototype.empty = function () {
  return this.queue.length === 0;
};

/**
 * Your MyStack object will be instantiated and called as such:
 * var obj = new MyStack()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.empty()
 */
