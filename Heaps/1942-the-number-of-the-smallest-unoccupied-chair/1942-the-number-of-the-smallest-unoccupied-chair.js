/*

There is a party where n friends numbered from 0 to n - 1 are attending. There is an infinite number of chairs in this party that are numbered from 0 to infinity. When a friend arrives at the party, they sit on the unoccupied chair with the smallest number.

For example, if chairs 0, 1, and 5 are occupied when a friend comes, they will sit on chair number 2.
When a friend leaves the party, their chair becomes unoccupied at the moment they leave. If another friend arrives at that same moment, they can sit in that chair.

You are given a 0-indexed 2D integer array times where times[i] = [arrivali, leavingi], indicating the arrival and leaving times of the ith friend respectively, and an integer targetFriend. All arrival times are distinct.

Return the chair number that the friend numbered targetFriend will sit on.



Example 1:

Input: times = [[1,4],[2,3],[4,6]], targetFriend = 1
Output: 1
Explanation:
- Friend 0 arrives at time 1 and sits on chair 0.
- Friend 1 arrives at time 2 and sits on chair 1.
- Friend 1 leaves at time 3 and chair 1 becomes empty.
- Friend 0 leaves at time 4 and chair 0 becomes empty.
- Friend 2 arrives at time 4 and sits on chair 0.
Since friend 1 sat on chair 1, we return 1.
Example 2:

Input: times = [[3,10],[1,5],[2,6]], targetFriend = 0
Output: 2
Explanation:
- Friend 1 arrives at time 1 and sits on chair 0.
- Friend 2 arrives at time 2 and sits on chair 1.
- Friend 0 arrives at time 3 and sits on chair 2.
- Friend 1 leaves at time 5 and chair 0 becomes empty.
- Friend 2 leaves at time 6 and chair 1 becomes empty.
- Friend 0 leaves at time 10 and chair 2 becomes empty.
Since friend 0 sat on chair 2, we return 2.


Constraints:

n == times.length
2 <= n <= 10^4
times[i].length == 2
1 <= arrivali < leavingi <= 10^5
0 <= targetFriend <= n - 1
Each arrivali time is distinct.

*/

/**
 * @param {number[][]} times
 * @param {number} targetFriend
 * @return {number}
 */

class Node {
  constructor(val, priority) {
    this.val = val;
    this.priority = priority;
  }
}

class MinHeap {
  constructor() {
    this.values = []; //an array that will hold heap data
  }

  insert(element) {
    this.values.push(element);
    this.bubbleUp();
    return this;
  }

  bubbleUp() {
    let currentIdx = this.values.length - 1;
    const element = this.values[currentIdx];

    while (currentIdx > 0) {
      let parentIdx = Math.floor((currentIdx - 1) / 2);
      let parent = this.values[parentIdx];
      //in min heap, parent should be lesser than element
      //as long as the opposite is the case => keep swapping
      if (element < parent) {
        this.values[parentIdx] = element;
        this.values[currentIdx] = parent;
        // [this.values[parentIdx], this.values[currentIdx]] = [element, parent]
        currentIdx = parentIdx;
      } else {
        break;
      }
    }
    return this;
  }

  extractMin() {
    const max = this.values[0];
    const end = this.values.pop();
    if (this.values.length > 0) {
      this.values[0] = end;
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
        //make sure it's in bounds
        leftChild = this.values[leftChildIdx];
        if (leftChild < element) {
          swap = leftChildIdx;
        }
      }

      if (rightChildIdx < length) {
        //make sure it's in bounds
        rightChild = this.values[rightChildIdx];
        if (
          (swap === null && rightChild < element) ||
          (swap !== null && rightChild < leftChild)
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
    return this.values[0];
  }
}

class MyPriorityQueue {
  constructor() {
    this.values = [];
  }

  enqueue(val, priority) {
    const newNode = new Node(val, priority);
    this.values.push(newNode);
    this.bubbleUp();
  }

  bubbleUp() {
    let idx = this.values.length - 1;
    const element = this.values[idx];

    while (idx > 0) {
      let parentIdx = Math.floor((idx - 1) / 2);
      let parent = this.values[parentIdx];
      // lower priority number = higher priority
      if (
        element.priority < parent.priority ||
        (element.priority === parent.priority && element.val < parent.val)
      ) {
        this.values[parentIdx] = element;
        this.values[idx] = parent;
        idx = parentIdx;
      } else {
        break;
      }
    }
  }

  dequeue() {
    const min = this.values[0];
    const end = this.values.pop();
    if (this.values.length > 0) {
      this.values[0] = end;
      this.sinkDown();
    }
    return min;
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
          leftChild.priority < element.priority ||
          (leftChild.priority === element.priority &&
            leftChild.val < element.val)
        ) {
          swap = leftChildIdx;
        }
      }

      if (rightChildIdx < length) {
        rightChild = this.values[rightChildIdx];
        if (
          (swap === null &&
            (rightChild.priority < element.priority ||
              (rightChild.priority === element.priority &&
                rightChild.val < element.val))) ||
          (swap !== null &&
            (rightChild.priority < leftChild.priority ||
              (rightChild.priority === leftChild.priority &&
                rightChild.val < leftChild.val)))
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
    return this.values[0];
  }
}

/*

  Are the time entries sorted? No! We should sort them in ascending order because currently, friend 1's times might be at index 0 and so on.

  Use min heap to track available chairs. Pop the chair with the shortest number!
  Chairs can be infinite? But, max chairs occupied at any time = n

  Use priority queue to track unavailable chairs [chairIndex, timeAtWhichItWillBeAvailableOn]

  Track time.

  */

const smallestChair = function (times, targetFriend) {
  // Add original index to each entry so we have access to them after sorting
  for (let i = 0; i < times.length; i++) {
    times[i].push(i);
  }
  // Sort by arrival times
  times.sort((a, b) => a[0] - b[0]);
  const availableChairs = new MinHeap();
  const unavailableChairs = new MyPriorityQueue();
  for (let i = 0; i < times.length; i++) {
    availableChairs.insert(i);
  }

  let time = 0;
  for (let i = 0; i < times.length; i++) {
    time = times[i][0];
    const arrivalTime = times[i][0];
    const leavingTime = times[i][1];

    // Check if it's time for some unavailable chairs to become available
    // If yes, remove all of them from unavailableChairs queue and to availableChair heap
    while (
      unavailableChairs.values.length &&
      time >= unavailableChairs.peek().priority
    ) {
      const availableChair = unavailableChairs.dequeue().val;
      availableChairs.insert(availableChair);
    }

    // Occupy the smallest-numbered available chair
    const smallestAvailableChair = availableChairs.extractMin();
    // Is the current (original) index for targetFriend, return the chair he'll use!
    if (times[i][2] === targetFriend) return smallestAvailableChair;
    // Else, make it unavailable
    unavailableChairs.enqueue(smallestAvailableChair, leavingTime);
  }
};

/*

  The dominant operations are:

  Initial sort: O(n log n)
  Initial heap filling: O(n log n)
  Main loop with heap operations: O(n log n)

  Therefore, overall time complexity is O(n log n)

  Space Complexity: O(n)

  times array: O(n)
  availableChairs heap: O(n)
  unavailableChairs queue: O(n)

  */
