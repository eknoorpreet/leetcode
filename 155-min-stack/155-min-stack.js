//https://leetcode.com/problems/min-stack/description/

/* Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.

Implement the MinStack class:

MinStack() initializes the stack object.
void push(int val) pushes the element val onto the stack.
void pop() removes the element on the top of the stack.
int top() gets the top element of the stack.
int getMin() retrieves the minimum element in the stack.
You must implement a solution with O(1) time complexity for each function. */

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

const MinStack = function () {
  //2 stacks (push/pop from both stacks)
  //1st stack
  this.stack = new Stack(); //responsibe for getting the top value
  //2nd stack
  this.minStack = new Stack(); //responsibe for getting the min value (getmin())
};

/**
 * @param {number} val
 * @return {void}
 */
MinStack.prototype.push = function (val) {
  //push val to 1st stack normally
  this.stack.push(val);
  //compare incoming val to current min
  let newVal = this.minStack.length
    ? Math.min(val, this.minStack.peek().value)
    : val;
  //push min value to minStack (on top)
  this.minStack.push(newVal);
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function () {
  //pop from both stacks

  //pushed: -2, 0, -3
  //stack = [-2], minStack = [-2]
  //stack = [-2, 0], minStack = [-2, 0]
  //stack = [-2, 0, -3], minStack = [-2, -2, -3]

  //pop()
  //stack = [-2, 0], minStack = [-2, -2]
  //when we pop top of stack from stack, we also pop the corresponding minimum
  //from minStack (the value that was min at that point)
  //now, stack's top = 0, minStack's top = -2
  this.stack.pop(); //will remove latest-added value
  this.minStack.pop(); //will remove min value
  //and now the top of min stack will have the new min value
};

/**
 * @return {number}
 */
MinStack.prototype.top = function () {
  return this.stack.peek().value;
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function () {
  //the top of min stack has the min value
  return this.minStack.peek().value;
};

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(val)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */

//TC: O(n)
//SC: O(n)
