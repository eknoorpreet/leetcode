/*

There are n cars going to the same destination along a one-lane road. The destination is target miles away.

You are given two integer array position and speed, both of length n, where position[i] is the position of the ith car and speed[i] is the speed of the ith car (in miles per hour).

A car can never pass another car ahead of it, but it can catch up to it and drive bumper to bumper at the same speed. The faster car will slow down to match the slower car's speed. The distance between these two cars is ignored (i.e., they are assumed to have the same position).

A car fleet is some non-empty set of cars driving at the same position and same speed. Note that a single car is also a car fleet.

If a car catches up to a car fleet right at the destination point, it will still be considered as one car fleet.

Return the number of car fleets that will arrive at the destination.



Example 1:

Input: target = 12, position = [10,8,0,5,3], speed = [2,4,1,1,3]
Output: 3
Explanation:
The cars starting at 10 (speed 2) and 8 (speed 4) become a fleet, meeting each other at 12.
The car starting at 0 does not catch up to any other car, so it is a fleet by itself.
The cars starting at 5 (speed 1) and 3 (speed 3) become a fleet, meeting each other at 6. The fleet moves at speed 1 until it reaches target.
Note that no other cars meet these fleets before the destination, so the answer is 3.
Example 2:

Input: target = 10, position = [3], speed = [3]
Output: 1
Explanation: There is only one car, hence there is only one fleet.
Example 3:

Input: target = 100, position = [0,2,4], speed = [4,2,1]
Output: 1
Explanation:
The cars starting at 0 (speed 4) and 2 (speed 2) become a fleet, meeting each other at 4. The fleet moves at speed 2.
Then, the fleet (speed 2) and the car starting at 4 (speed 1) become one fleet, meeting each other at 6. The fleet moves at speed 1 until it reaches target.


Constraints:

n == position.length == speed.length
1 <= n <= 10^5
0 < target <= 10^6
0 <= position[i] < target
All the values of position are unique.
0 < speed[i] <= 10^6

*/

/**
 * @param {number} target
 * @param {number[]} position
 * @param {number[]} speed
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

const carFleet0 = function (target, position, speed) {
  const pair = [];
  const stack = new Stack();
  for (let i = 0; i < position.length; i++) {
    pair.push([position[i], speed[i]]);
  }
  // in reverse order (right to left)! Why?
  // Well, if we go left to right and want to determine if car1 clashes into car2, we have
  // no way of knowing car2's speed since it might be reduced ahead!
  pair.sort((b, a) => a[0] - b[0] || a[1] - b[1]);
  console.log('pair sorted: ', pair);
  for (const el of pair) {
    const position = el[0];
    const speed = el[1];
    //store the time to reach destination (distance remaining / speed) in the stack
    stack.push((target - position) / speed);
    //car fleet: when 2 cars intersect
    //How to determine when they'll intersect: calc when they reach the destination
    //if the 2nd last car reaches the destination before the last car => they intersect!
    if (stack.length >= 2 && stack.peek().value <= stack.peek().next.value) {
      //when cars collide, the 2nd last car will be reduced to speed of ahead/last car
      //so we'll keep that car for determining future intersections
      //basically, converting 2 cars into 1 fleet
      stack.pop();
    }
  }
  return stack.length;
};

const carFleet1 = function (target, position, speed) {
  const pairs = [];
  const stack = [];
  // store pairs of positions and speeds.
  for (let i = 0; i < position.length; i++) {
    pairs.push([position[i], speed[i]]);
  }
  // in reverse order (right to left)! Why?
  // Well, if we go left to right and want to determine if car1 clashes into car2, we have
  // no way of knowing car2's speed since it might be reduced ahead!
  pairs.sort((b, a) => a[0] - b[0] || a[1] - b[1]);
  for (const pair of pairs) {
    const [position, speed] = pair;
    // store the time to reach destination (distance remaining / speed) in the stack
    const timeToReachDestintion = (target - position) / speed;
    stack.push(timeToReachDestintion);
    // car fleet: when 2 cars intersect
    // How to determine when they'll intersect: calc when they reach the destination
    // if the 2nd last car reaches the destination before the last car => they intersect!

    // since we're going in reverse, we check if last car reaches before 2nd last car
    if (stack.length >= 2 && stack.at(-1) <= stack.at(-2)) {
      // when cars collide, the 2nd last car will be reduced to speed of ahead/last car
      // so we'll keep that car for determining future intersections
      // basically, converting 2 cars into 1 fleet
      stack.pop();
    }
  }
  return stack.length;
};

/**
 * @param {number} target
 * @param {number[]} position
 * @param {number[]} speed
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

/*

Key Intuition:

Cars can't pass each other, so their relative positions matter
We can calculate time to target for each car
Cars that catch up to slower cars ahead form a fleet moving at the slower car's speed
Sort by position to process cars from right to left (closest to target first)

Why sort in descending order?

target = 12
position = [0, 2, 4], speed = [4, 2, 1]
After sorting: [(4,1), (2,2), (0,4)]

If we processed left to right [0,2,4]:
- Hard to know if car at 0 will catch up to cars ahead
- Need complex calculations for intersection points

If we process right to left [4,2,0]:
- Car at 4 determines first fleet's minimum speed
- Can easily check if car at 2 catches up to this fleet
- Then check if car at 0 catches up to resulting fleet(s)
*/

const carFleet = function (target, position, speed) {
  // Pair each position with its speed
  const pairs = position.map((p, i) => [p, speed[i]]);

  // Sort by position in descending order (right to left)
  pairs.sort((a, b) => b[0] - a[0]);

  // Use a stack to track fleets
  const stack = [];

  // Calculate time to target for each car
  for (const [pos, spd] of pairs) {
    const timeToTarget = (target - pos) / spd;

    // New fleet forms if:
    // 1. First car
    // 2. Takes longer than car ahead (won't catch up)
    if (!stack.length || timeToTarget > stack[stack.length - 1]) {
      stack.push(timeToTarget);
    }
    // If it takes less time, it will catch up and
    // merge into the fleet ahead (don't push)
  }

  return stack.length;
};

/*

Time Complexity: O(n log n) due to sorting
Space Complexity: O(n) for the stack and pairs array

*/
