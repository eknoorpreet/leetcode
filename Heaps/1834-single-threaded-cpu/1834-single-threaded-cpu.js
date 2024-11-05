/*

You are given n​​​​​​ tasks labeled from 0 to n - 1 represented by a 2D integer array tasks, where tasks[i] = [enqueueTimei, processingTimei] means that the i​​​​​​th​​​​ task will be available to process at enqueueTimei and will take processingTimei to finish processing.

You have a single-threaded CPU that can process at most one task at a time and will act in the following way:

If the CPU is idle and there are no available tasks to process, the CPU remains idle.
If the CPU is idle and there are available tasks, the CPU will choose the one with the shortest processing time. If multiple tasks have the same shortest processing time, it will choose the task with the smallest index.
Once a task is started, the CPU will process the entire task without stopping.
The CPU can finish a task then start a new one instantly.
Return the order in which the CPU will process the tasks.



Example 1:

Input: tasks = [[1,2],[2,4],[3,2],[4,1]]
Output: [0,2,3,1]
Explanation: The events go as follows:
- At time = 1, task 0 is available to process. Available tasks = {0}.
- Also at time = 1, the idle CPU starts processing task 0. Available tasks = {}.
- At time = 2, task 1 is available to process. Available tasks = {1}.
- At time = 3, task 2 is available to process. Available tasks = {1, 2}.
- Also at time = 3, the CPU finishes task 0 and starts processing task 2 as it is the shortest. Available tasks = {1}.
- At time = 4, task 3 is available to process. Available tasks = {1, 3}.
- At time = 5, the CPU finishes task 2 and starts processing task 3 as it is the shortest. Available tasks = {1}.
- At time = 6, the CPU finishes task 3 and starts processing task 1. Available tasks = {}.
- At time = 10, the CPU finishes task 1 and becomes idle.
Example 2:

Input: tasks = [[7,10],[7,12],[7,5],[7,4],[7,2]]
Output: [4,3,2,0,1]
Explanation: The events go as follows:
- At time = 7, all the tasks become available. Available tasks = {0,1,2,3,4}.
- Also at time = 7, the idle CPU starts processing task 4. Available tasks = {0,1,2,3}.
- At time = 9, the CPU finishes task 4 and starts processing task 3. Available tasks = {0,1,2}.
- At time = 13, the CPU finishes task 3 and starts processing task 2. Available tasks = {0,1}.
- At time = 18, the CPU finishes task 2 and starts processing task 0. Available tasks = {1}.
- At time = 28, the CPU finishes task 0 and starts processing task 1. Available tasks = {}.
- At time = 40, the CPU finishes task 1 and becomes idle.


Constraints:

tasks.length == n
1 <= n <= 10^5
1 <= enqueueTimei, processingTimei <= 10^9

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

  We can't just throw all of the tasks into the heap right away
  because we might have a very short task that doesn't start until very late.
  If this is at the front of the heap, the CPU will sit around doing nothing
  until this task is ready to start, when the CPU could have spent that time
  finishing longer tasks (credits: rowe1227).

  So before we start putting tasks in the heap, we must first sort the tasks
  according to start time.

  It's the same logic as https://leetcode.com/problems/car-pooling/ where we
  could not go east (right) so we had to sort based on the starting positions.

  */

const getOrder = function (tasks) {
  const result = [];
  // processingTime will be the key
  // (many available => choose one with the smallest processingTime, if tie, go for index)
  const availableTasks = new MyPriorityQueue();
  // We need to return the original index in the output array
  // Remember the original index by adding it to the input array
  for (let i = 0; i < tasks.length; i++) {
    tasks[i].push(i);
  }
  // Sort based on enqueue time
  tasks.sort((a, b) => a[0] - b[0]);
  // Start at the smallest (enqueue) time present in the tasks list (cuz sorted)
  let time = tasks[0][0];
  let i = 0;
  while (availableTasks.values.length || i < tasks.length) {
    // If there are tasks left to go through
    // AND the current time >= current tasks' enqueue (enqueue time is here)
    // => Add all of them to the heap (the processing time and original index)
    while (i < tasks.length && time >= tasks[i][0]) {
      availableTasks.enqueue(tasks[i][2], tasks[i][1]);
      i++;
    }
    // If no servers are available (CPU idle),
    // Advance the current time to the next task's enqueue time
    if (!availableTasks.values.length) {
      // Fast-forward
      time = tasks[i][0];
    } else {
      // Tasks are available => process them!
      const { val: index, priority: processingTime } = availableTasks.dequeue();
      time += processingTime;
      result.push(index);
    }
  }
  return result;
};

/*

Time Complexity: O(nlogn)
Space Complexity: O(n)

*/
