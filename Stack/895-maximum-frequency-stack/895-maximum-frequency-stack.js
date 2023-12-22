/*

Design a stack-like data structure to push elements to the stack and pop the most frequent element from the stack.

Implement the FreqStack class:

FreqStack() constructs an empty frequency stack.
void push(int val) pushes an integer val onto the top of the stack.
int pop() removes and returns the most frequent element in the stack.
If there is a tie for the most frequent element, the element closest to the stack's top is removed and returned.


Example 1:

Input
["FreqStack", "push", "push", "push", "push", "push", "push", "pop", "pop", "pop", "pop"]
[[], [5], [7], [5], [7], [4], [5], [], [], [], []]
Output
[null, null, null, null, null, null, null, 5, 7, 5, 4]

Explanation
FreqStack freqStack = new FreqStack();
freqStack.push(5); // The stack is [5]
freqStack.push(7); // The stack is [5,7]
freqStack.push(5); // The stack is [5,7,5]
freqStack.push(7); // The stack is [5,7,5,7]
freqStack.push(4); // The stack is [5,7,5,7,4]
freqStack.push(5); // The stack is [5,7,5,7,4,5]
freqStack.pop();   // return 5, as 5 is the most frequent. The stack becomes [5,7,5,7,4].
freqStack.pop();   // return 7, as 5 and 7 is the most frequent, but 7 is closest to the top. The stack becomes [5,7,5,4].
freqStack.pop();   // return 5, as 5 is the most frequent. The stack becomes [5,7,4].
freqStack.pop();   // return 4, as 4, 5 and 7 is the most frequent, but 4 is closest to the top. The stack becomes [5,7].


Constraints:

0 <= val <= 10^9
At most 2 * 10^4 calls will be made to push and pop.
It is guaranteed that there will be at least one element in the stack before calling pop.

*/

/*

We need to know the count of the most frequent element (maxCount).
Have a hashmap of the count of each value and update it and the maxCount on each push and pop.

*/

const FreqStack = function () {
  // A hashmap {values => count}.
  this.count = new Map();
  this.maxCount = 0;
  // A hashmap {count => values}.
  // Push each value to the correct group.
  // For instance: If it's the first 5, add to group of frequency 1. If it's the
  // 2nd time, add to group 2.

  // When popping, pop the latest value from the most freq element (via
  // maxCount) group. If, after the pop, that group is empty => no other
  // elements have that frequency => reduce maxCount!

  // After all pushes => Map(0) { '1': [ 5, 7, 4 ], '2': [ 5, 7 ], '3': [ 5 ] }
  this.stacks = new Map();
};

/**
 * @param {number} val
 * @return {void}
 */
FreqStack.prototype.push = function (val) {
  // update maxCount if necessary
  this.count.set(val, (this.count.get(val) || 0) + 1);
  if (this.count.get(val) > this.maxCount) {
    this.maxCount = this.count.get(val);
    // create a new group since we have a new maxCount
    this.stacks[this.count.get(val)] = [];
  }
  this.stacks[this.count.get(val)].push(val);
};

/**
 * @return {number}
 */
FreqStack.prototype.pop = function () {
  // Pop the element with the latest, most frequent count
  const result = this.stacks[this.maxCount].pop();
  this.count.set(result, this.count.get(result) - 1);
  // The popped element was the only one with the maxCount (say 3)
  // So now, maxCount decreases!
  if (!this.stacks[this.maxCount].length) this.maxCount--;
  return result;
};

/**
 * Your FreqStack object will be instantiated and called as such:
 * var obj = new FreqStack()
 * obj.push(val)
 * var param_2 = obj.pop()
 */
