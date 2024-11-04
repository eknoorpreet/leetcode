/*

You are given two 0-indexed integer arrays servers and tasks of lengths n​​​​​​ and m​​​​​​ respectively. servers[i] is the weight of the i​​​​​​th​​​​ server, and tasks[j] is the time needed to process the j​​​​​​th​​​​ task in seconds.

Tasks are assigned to the servers using a task queue. Initially, all servers are free, and the queue is empty.

At second j, the jth task is inserted into the queue (starting with the 0th task being inserted at second 0). As long as there are free servers and the queue is not empty, the task in the front of the queue will be assigned to a free server with the smallest weight, and in case of a tie, it is assigned to a free server with the smallest index.

If there are no free servers and the queue is not empty, we wait until a server becomes free and immediately assign the next task. If multiple servers become free at the same time, then multiple tasks from the queue will be assigned in order of insertion following the weight and index priorities above.

A server that is assigned task j at second t will be free again at second t + tasks[j].

Build an array ans​​​​ of length m, where ans[j] is the index of the server the j​​​​​​th task will be assigned to.

Return the array ans​​​​.



Example 1:

Input: servers = [3,3,2], tasks = [1,2,3,2,1,2]
Output: [2,2,0,2,1,2]
Explanation: Events in chronological order go as follows:
- At second 0, task 0 is added and processed using server 2 until second 1.
- At second 1, server 2 becomes free. Task 1 is added and processed using server 2 until second 3.
- At second 2, task 2 is added and processed using server 0 until second 5.
- At second 3, server 2 becomes free. Task 3 is added and processed using server 2 until second 5.
- At second 4, task 4 is added and processed using server 1 until second 5.
- At second 5, all servers become free. Task 5 is added and processed using server 2 until second 7.
Example 2:

Input: servers = [5,1,4,3,2], tasks = [2,1,2,4,5,2,1]
Output: [1,4,1,4,1,3,2]
Explanation: Events in chronological order go as follows:
- At second 0, task 0 is added and processed using server 1 until second 2.
- At second 1, task 1 is added and processed using server 4 until second 2.
- At second 2, servers 1 and 4 become free. Task 2 is added and processed using server 1 until second 4.
- At second 3, task 3 is added and processed using server 4 until second 7.
- At second 4, server 1 becomes free. Task 4 is added and processed using server 1 until second 9.
- At second 5, task 5 is added and processed using server 3 until second 7.
- At second 6, task 6 is added and processed using server 2 until second 7.


Constraints:

servers.length == n
tasks.length == m
1 <= n, m <= 2 * 10^5
1 <= servers[i], tasks[j] <= 2 * 10^5

*/

class Node {
  constructor(val, priority) {
    this.val = val;
    this.priority = priority;
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

Key Intuition:

We need to track two sets of servers:

Available servers (ready to take tasks)
Unavailable servers (currently processing tasks)

For each set, we need to efficiently find:

Available servers: The server with lowest weight (and lowest index if tied)
Unavailable servers: The server that will become available next

1. Data Structures:

  Two priority queues (implemented as min-heaps):

  availableServers: Orders servers by weight (and index for ties)
  unavailableServers: Orders servers by when they'll become available

2. Time Management:

  time tracks the current moment
  Time advances in two ways:

  Natural progression with task arrivals (time = Math.max(time, i))
  Jumping forward when no servers are available

*/

const assignTasks = function (servers, tasks) {
  const result = Array(tasks.length).fill(0);
  // weight will be the key
  // (many available => choose one with the smallest weight, if tie, go for index)
  const availableServers = new MyPriorityQueue();
  // timeItWillBeAvailableOn will be the key
  const unavailableServers = new MyPriorityQueue();

  // In the beginning, all servers are available
  // Add all of them to the availableServers heap
  for (let i = 0; i < servers.length; i++) {
    availableServers.enqueue(i, servers[i]); // O(logn)
  }

  // track the time
  let time = 0;

  // Iterate over the tasks
  for (let i = 0; i < tasks.length; i++) {
    // If we ever advanced the time, it will probably be greater than the index
    time = Math.max(time, i);

    // If no servers are available
    if (availableServers.values.length === 0) {
      // Advance the current time to the time the next server is going to be available
      time = unavailableServers.peek().priority;
    }

    // Make all unavailable servers (that were to become available at current 'time') available
    while (
      // O(logn).
      unavailableServers.values.length &&
      time >= unavailableServers.peek().priority
    ) {
      // Remove from unavailable
      let { val: server, priority: timeFree } = unavailableServers.dequeue();
      // Add to available
      availableServers.enqueue(server.index, server.weight);
    }

    // Assign the task to the available server
    let { val: index, priority: weight } = availableServers.dequeue(); // O(logn)
    result[i] = index;
    unavailableServers.enqueue({ index, weight }, time + tasks[i]); // O(logn)
  }
  return result;
};

/*

Time complexity: O(nlogn+mlogn)=O((n+m)logn)

Space Complexity: O(n+m)

*/
