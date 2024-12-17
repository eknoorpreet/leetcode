/*

Design a max stack data structure that supports the stack operations and supports finding the stack's maximum element.

Implement the MaxStack class:

MaxStack() Initializes the stack object.
void push(int x) Pushes element x onto the stack.
int pop() Removes the element on top of the stack and returns it.
int top() Gets the element on the top of the stack without removing it.
int peekMax() Retrieves the maximum element in the stack without removing it.
int popMax() Retrieves the maximum element in the stack and removes it. If there is more than one maximum element, only remove the top-most one.
You must come up with a solution that supports O(1) for each top call and O(logn) for each other call.



Example 1:

Input
["MaxStack", "push", "push", "push", "top", "popMax", "top", "peekMax", "pop", "top"]
[[], [5], [1], [5], [], [], [], [], [], []]
Output
[null, null, null, null, 5, 5, 1, 5, 1, 5]

Explanation
MaxStack stk = new MaxStack();
stk.push(5);   // [5] the top of the stack and the maximum number is 5.
stk.push(1);   // [5, 1] the top of the stack is 1, but the maximum is 5.
stk.push(5);   // [5, 1, 5] the top of the stack is 5, which is also the maximum, because it is the top most one.
stk.top();     // return 5, [5, 1, 5] the stack did not change.
stk.popMax();  // return 5, [5, 1] the stack is changed now, and the top is different from the max.
stk.top();     // return 1, [5, 1] the stack did not change.
stk.peekMax(); // return 5, [5, 1] the stack did not change.
stk.pop();     // return 1, [5] the top of the stack and the max element is now 5.
stk.top();     // return 5, [5] the stack did not change.

*/

class MaxHeap {
  constructor() {
    this.values = [];
  }

  insert(element) {
    this.values.push(element); // Element is a tuple: [value, id]
    this.bubbleUp();
  }

  bubbleUp() {
    let idx = this.values.length - 1;
    const element = this.values[idx];

    while (idx > 0) {
      let parentIdx = Math.floor((idx - 1) / 2);
      let parent = this.values[parentIdx];

      // Compare by value, then by ID (higher ID in case of ties)
      if (
        element[0] > parent[0] || // Higher value has priority
        (element[0] === parent[0] && element[1] > parent[1]) // Tie-breaking: higher ID
      ) {
        this.values[parentIdx] = element;
        this.values[idx] = parent;
        idx = parentIdx;
      } else {
        break;
      }
    }
  }

  extractMax() {
    if (this.values.length === 0) return null;

    const max = this.values[0]; // Root element
    const end = this.values.pop(); // Remove last element

    if (this.values.length > 0) {
      this.values[0] = end; // Move last element to root
      this.sinkDown();
    }

    return max;
  }

  sinkDown() {
    let idx = 0;
    const length = this.values.length;
    const element = this.values[0];

    while (true) {
      let leftChildIdx = 2 * idx + 1;
      let rightChildIdx = 2 * idx + 2;
      let leftChild, rightChild;
      let swap = null;

      if (leftChildIdx < length) {
        leftChild = this.values[leftChildIdx];
        if (
          leftChild[0] > element[0] || // Higher value has priority
          (leftChild[0] === element[0] && leftChild[1] > element[1]) // Tie-breaking: higher ID
        ) {
          swap = leftChildIdx;
        }
      }

      if (rightChildIdx < length) {
        rightChild = this.values[rightChildIdx];
        if (
          (swap === null &&
            (rightChild[0] > element[0] ||
              (rightChild[0] === element[0] && rightChild[1] > element[1]))) ||
          (swap !== null &&
            (rightChild[0] > leftChild[0] ||
              (rightChild[0] === leftChild[0] && rightChild[1] > leftChild[1])))
        ) {
          swap = rightChildIdx;
        }
      }

      if (swap === null) break;

      this.values[idx] = this.values[swap];
      this.values[swap] = element;
      idx = swap;
    }
  }

  peek() {
    return this.values[0]; // Return the root element
  }
}

/*

  Soft Deletion Mechanism

  Instead of physically removing elements from stack or heap
  Use a set to mark elements to be ignored in future operations
  Clean up marked elements during subsequent operations
  Provides efficient tracking without expensive deletions
  Keeps the stack and heap synchronized without physically removing elements from the structures immediately. This helps avoid the complexity of modifying the heap and stack directly during removal operations.

  An identifier in softDeleted represents an item that has been popped from one data structure, but not yet located and removed in the other. This avoids doing linear searches to try and find items that need deleting

  Soft Delete = Temporary removal tag
  Unique ID = Special tracking number

  */

class MaxStack {
  constructor() {
    // A standard stack to maintain order
    this.stack = [];
    // A max heap to efficiently find the maximum element
    this.maxHeap = new MaxHeap();
    // A decreasing counter is used to assign unique IDs to each element
    // This solves the problem of duplicate values by making each insertion unique
    // Using a decreasing counter ensures that more recent items are prioritized in case of ties
    this.nextID = 0;
    // The set acts as a "marker" for elements that need to be removed from both the stack and heap
    this.softDeleted = new Set();
  }

  // Push element to the stack and heap
  push(x) {
    // Push to heap with [value, unique counter] for tracking
    this.maxHeap.insert([x, this.nextID]);

    // Push to stack
    this.stack.push([x, this.nextID]);
    this.nextID++;
  }

  // Pop the top element from the stack
  pop() {
    // Remove stale elements from top of stack
    while (
      this.stack.length &&
      this.softDeleted.has(this.stack[this.stack.length - 1][1])
    ) {
      this.stack.pop();
    }

    if (this.stack.length === 0) return null;

    const [num, id] = this.stack.pop();
    this.softDeleted.add(id);
    return num;
  }

  // Get the top element of the stack
  top() {
    // Remove stale elements from top of stack
    // Basically, were there any elements that were removed (soft-deleted) from the max heap
    // and need to be removed from the stack as well?
    // Or, did we delete a maximum (during popMax) from maxHeap but it's still in the stack
    while (
      this.stack.length &&
      this.softDeleted.has(this.stack[this.stack.length - 1][1])
    ) {
      this.stack.pop();
    }

    console.log(this.stack, this.maxHeap);
    return this.stack[this.stack.length - 1][0];
  }

  // Peek the maximum element
  peekMax() {
    // Remove stale elements from top of heap
    // Basically, were there any elements that were removed (soft-deleted) from the stack
    // and need to be removed from the maxHeap as well?
    // Or, did we delete a top element (during pop) from the stack but it's still in the maxHeap
    while (
      this.maxHeap.values.length &&
      this.softDeleted.has(this.maxHeap.peek()[1])
    ) {
      this.maxHeap.extractMax();
    }

    return this.maxHeap.peek()[0];
  }

  // Pop the maximum element
  popMax() {
    // Remove stale elements from top of heap
    // Basically, were there any elements that were removed (soft-deleted) from the stack
    // and need to be removed from the maxHeap as well?
    // Or, did we delete a top element (during pop) from the stack but it's still in the maxHeap
    while (
      this.maxHeap.values.length &&
      this.softDeleted.has(this.maxHeap.peek()[1])
    ) {
      this.maxHeap.extractMax();
    }

    if (this.maxHeap.values.length === 0) return null;

    const [num, id] = this.maxHeap.extractMax();
    this.softDeleted.add(id);
    return num;
  }
}

/**
 * Your MaxStack object will be instantiated and called as such:
 * var obj = new MaxStack()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.peekMax()
 * var param_5 = obj.popMax()
 */

/*

Complexity Analysis:

Let N be the number of elements to add to the stack.

Time Complexity:

push: O(logN), it costs O(logN) to add an element to heap and O(1) to add an it to stack.
The amortized time complexity of operations caused by a single pop/popMax call is O(logN).
For a pop call, we first remove the last element in stack and add its ID to removed in O(1),
and result in a deletion of the top element in heap in the future (when peekMax or popMax is
called), which has a time complexity of logN. Similarly, popMax needs O(logN) immediately
and O(1) in the operations later. Note that because we lazy-update the two data structures,
future operations might never happen in some cases. But even in the worst cases, the upper
bound of the amortized time complexity is still only O(logN).

top: O(1), excluding the time cost related to popMax calls we discussed above.
peekMax: O(logN), excluding the time cost related to pop calls we discussed above.

Space Complexity: O(N), the maximum size of the heap, stack, and removed.

*/
