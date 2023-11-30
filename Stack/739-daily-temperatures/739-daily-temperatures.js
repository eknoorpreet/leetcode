//https://leetcode.com/problems/daily-temperatures/

/*

Given an array of integers temperatures represents the daily temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature. If there is no future day for which this is possible, keep answer[i] == 0 instead.



Example 1:

Input: temperatures = [73,74,75,71,69,72,76,73]
Output: [1,1,4,2,1,1,0,0]
Example 2:

Input: temperatures = [30,40,50,60]
Output: [1,1,1,0]
Example 3:

Input: temperatures = [30,60,90]
Output: [1,1,0]


Constraints:

1 <= temperatures.length <= 10^5
30 <= temperatures[i] <= 100

*/

/**
 * @param {number[]} temperatures
 * @return {number[]}
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
//stack stores [temp, index]
const dailyTemperatures0 = function (temperatures) {
  const result = new Array(temperatures.length).fill(0, 0, temperatures.length);
  const stack = []; //stores [temp, index]
  for (let i = 0; i < temperatures.length; i++) {
    while (stack.length && temperatures[i] > stack[stack.length - 1][0]) {
      let ind = stack.pop()[1];
      result[ind] = i - ind;
    }
    stack.push([temperatures[i], i]);
  }
  return result;
};

//stack stores [index] (no need for storing temperature value!)
const dailyTemperatures = function (temperatures) {
  const result = new Array(temperatures.length).fill(0, 0, temperatures.length);
  // const stack = new Stack()
  const stack = []; //stores [index]
  for (let i = 0; i < temperatures.length; i++) {
    //did we find a warmer temperature than the previous?
    while (stack.length && temperatures[stack.at(-1)] < temperatures[i]) {
      let ind = stack.pop();
      //days to wait = i - ind
      //assign
      result[ind] = i - ind;
    }
    stack.push(i);
  }
  return result;
};

//TC: O(n)
//SC: O(n)
