/*

We are given an array asteroids of integers representing asteroids in a row.

For each asteroid, the absolute value represents its size, and the sign represents its direction (positive meaning right, negative meaning left). Each asteroid moves at the same speed.

Find out the state of the asteroids after all collisions. If two asteroids meet, the smaller one will explode. If both are the same size, both will explode. Two asteroids moving in the same direction will never meet.



Example 1:

Input: asteroids = [5,10,-5]
Output: [5,10]
Explanation: The 10 and -5 collide resulting in 10. The 5 and 10 never collide.
Example 2:

Input: asteroids = [8,-8]
Output: []
Explanation: The 8 and -8 collide exploding each other.
Example 3:

Input: asteroids = [10,2,-5]
Output: [10]
Explanation: The 2 and -5 collide resulting in -5. The 10 and -5 collide resulting in 10.


Constraints:

2 <= asteroids.length <= 10^4
-1000 <= asteroids[i] <= 1000
asteroids[i] != 0

*/

/**
 * @param {number[]} asteroids
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

const asteroidCollision = function (asteroids) {
  const stack = [];
  for (let asteroid of asteroids) {
    /* We only need to resolve collisions under the following conditions:
              - if this isn't the first asteroid (stack is non-empty)
              - current asteroid is -ve (going left)
              - previous asteroid (top of the stack) was +ve (going right)*/
    while (stack.length && asteroid < 0 && stack.at(-1) > 0) {
      // -5 - 10 = -15 (WRONG!)
      // 10 - (-5) = 15 (WRONG!)
      // -5 + 10 = 5 (correct diff)
      // Basically, diff = asteroid + stack.at(- 1)
      // diff is -ve => -ve / curr asteroid wins, destroy prev
      // diff is +ve => +ve / prev asteroid wins, destroy curr

      // But we can also just do this:
      const diff = stack.at(-1) - asteroid * -1;
      // diff is -ve => curr asteriod bigger in size => wins
      // curr asteriod wins
      if (diff < 0) {
        // curr asteroid wins
        stack.pop(); // destroy previous (remove from stack)
      } else if (diff > 0) {
        // diff is +ve => previous asteriod bigger in size => wins
        // previous asteriod wins
        asteroid = 0; // destroy current (set to 0)
        // won't be pushed to stack
      } else {
        // diff = 0 => both equal in size => both destroyed
        asteroid = 0; // curr destroyed
        stack.pop(); // prev destroyed
      }
    }
    //make sure the destroyed asteroid (set to 0) is not pushed to stack
    if (asteroid !== 0) stack.push(asteroid);
  }
  return stack;
};
