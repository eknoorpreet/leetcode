/*

Given an array of integers heights representing the histogram's bar height where the width of each bar is 1, return the area of the largest rectangle in the histogram.



Example 1:


Input: heights = [2,1,5,6,2,3]
Output: 10
Explanation: The above is a histogram where width of each bar is 1.
The largest rectangle is shown in the red area, which has an area = 10 units.
Example 2:


Input: heights = [2,4]
Output: 4


Constraints:

1 <= heights.length <= 10^5
0 <= heights[i] <= 10^4


*/

/**
 * @param {number[]} heights
 * @return {number}
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

//TC: O(n)
//SC: O(n)
const largestRectangleArea0 = function (heights) {
  //observation: to extend heights, they need to be in increasing order
  //When you encounter a smaller height, pop! (same as next smaller)
  //(2 can't be extended further; this is as far as it could go. Pop
  //and compute the area so far)
  let maxArea = 0;
  const stack = new Stack();
  heights.forEach((h, i) => {
    //the index we start computing the rectangle's area from
    let startInd = i;
    //When you encounter a smaller height than the last height, pop!
    while (stack.length && stack.peek().value[1] > h) {
      let [index, height] = stack.pop();
      //compute the accumulated area so far with the popped height
      maxArea = Math.max(maxArea, height * (i - index));
      //extending back/left
      //(since curr height is smaller, that it must mean it can be extended
      //back. How far? As long as it's smaller than the last height in stack)
      startInd = index;
    }
    //we encounter a greater height than the last height
    //hence, it can't be extended back => its start index will be its curr
    //index
    //the curr height will be added to stack for processing area
    stack.push([startInd, h]);
  });
  //remaining stack elements could be extended all the way to the end
  for (let [key, value] of Object.entries(stack)) {
    if (key !== 'length') {
      //compute and compare
      let [i, h] = value.value;
      maxArea = Math.max(maxArea, h * (heights.length - i));
    }
  }
  return maxArea;
};

//TC: O(n)
//SC: O(n)
const largestRectangleArea = function (heights) {
  //observation: to extend heights, they need to be in increasing order
  //When you encounter a smaller height, pop! (same as next smaller)
  //(2 can't be extended further; this is as far as it could go. Pop
  //and compute the area so far)
  let maxArea = 0;
  const stack = [];
  heights.forEach((h, i) => {
    //the index we start computing the rectangle's area from
    let startInd = i;
    //When you encounter a smaller height than the last height, pop!
    while (stack.length && stack[stack.length - 1][1] > h) {
      //compute the accumulated area so far with the popped height
      let [index, height] = stack.pop();
      const width = i - index;
      maxArea = Math.max(maxArea, height * width);
      //extending back/left
      //(since curr height is smaller, then it must mean it can be
      //extended back. How far? As long as it's smaller than the last
      //height in stack, i.e. to the index of the rectangle we just
      //popped
      startInd = index;
    }
    //we encounter a greater height than the last height
    //=> current height can't be extended back => its start index will be
    //its curr index (via 'startInd = i')
    stack.push([startInd, h]);
  });
  //remaining stack elements could be extended all the way to the end
  for (let [i, h] of stack) {
    //compute and compare
    const w = heights.length - i;
    maxArea = Math.max(maxArea, h * w);
  }
  return maxArea;
};
