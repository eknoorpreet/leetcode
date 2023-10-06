/**
 * @param {number[][]} grid
 * @return {number}
 */

class Node {
  constructor(value, priority) {
    this.value = value;
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
    return this;
  }

  bubbleUp() {
    let idx = this.values.length - 1;
    const element = this.values[idx];

    while (idx > 0) {
      let parentIdx = Math.floor((idx - 1) / 2);
      let parent = this.values[parentIdx];
      if (element.priority >= parent.priority) break;
      this.values[parentIdx] = element;
      this.values[idx] = parent;
      idx = parentIdx;
    }
    return this;
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
        //make sure it's in bounds
        leftChild = this.values[leftChildIdx];
        if (leftChild.priority < element.priority) {
          swap = leftChildIdx;
        }
      }

      if (rightChildIdx < length) {
        //make sure it's in bounds
        rightChild = this.values[rightChildIdx];
        if (
          (swap === null && rightChild.priority < element.priority) ||
          (swap !== null && rightChild.priority < leftChild.priority)
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
}

/**

  What's the path from top-left to bottom-right such that the max height in the path is minimized. How? Well, if the maxiumum height in the path = 4, no matter what we do, we'll have to wait for t <= 4. Path for us to take to minimze t and return it.

  Brute-force: Consider every single path and in each, get the maximum height and return the minimum of the maximum heights of all paths.

  Optimized: modified version of Djikstra's algorithm

  Why Djikstra's? In every path, you would want the path which gets you the min height. It's possible that if we choose the next min height, we might be able to find the path where the max heigh in the entire height is that min height. So, we'll try the min-height path first. So, when we pop a cell from the priority queue, it's going to be the one with min height.

  */

const swimInWater = function (grid) {
  const n = grid.length;
  // Initialize a set to keep track of visited nodes.
  const visited = new Set();
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  // Initialize a priority queue to keep track of nodes to be explored.
  //
  const pq = new MyPriorityQueue();

  // [time/max-height, r, c]
  // the pq will contain the node with its ma-height till that node (and not the node's height)
  // "To get to this node, the max height was x"
  // starting at the top-left
  pq.enqueue([grid[0][0], 0, 0], grid[0][0]);
  visited.add(`0-0`);

  // As long as all nodes are not processed
  while (pq.values.length) {
    // Dequeue the smaller-height node from the priority queue
    const [t, r, c] = pq.dequeue()?.value;
    //if the curr cell the bottom-right => return the max-height in path
    if (r === n - 1 && c === n - 1) return t;
    for (let [dr, dc] of directions) {
      const newRow = r + dr;
      const newCol = c + dc;
      if (
        newRow < 0 ||
        newRow === n ||
        newCol < 0 ||
        newCol === n ||
        visited.has(`${newRow}-${newCol}`)
      )
        continue;
      const maxHeightYet = Math.max(t, grid[newRow][newCol]);
      //add the max of the neighbor and the one before it (curr cell (t))
      pq.enqueue([maxHeightYet, newRow, newCol], maxHeightYet);
      visited.add(`${newRow}-${newCol}`);
    }
  }
};

/*

Time Complexity:

The time complexity of this code can be analyzed in terms of the number of iterations in the main loop and the operations performed within each iteration.

Main Loop: The main loop runs until the priority queue is empty, and in each iteration, it dequeues a cell. In the worst case, every cell in the grid might be processed, so the main loop can run up to O(n^2) times.

Enqueue and Dequeue Operations: Within each iteration, there are enqueue and dequeue operations on the priority queue. Each of these operations takes O(log N) time, where N is the number of elements in the priority queue at that moment.

Neighboring Cells: For each cell, the code explores its four neighboring cells. Since there are a constant number of neighbors (four) for each cell, this does not contribute to the overall time complexity.

Therefore, the overall time complexity of the code is O(n^2 * log(N)), where N is the maximum number of elements in the priority queue at any given time.

Space Complexity:

Priority Queue: The priority queue stores cells along with their maximum height values. In the worst case, it can hold all cells, so the space complexity for the priority queue is O(n^2).

Visited Set: The visited set keeps track of visited cells. In the worst case, all cells are visited, so the space complexity for the visited set is also O(n^2).

Therefore, the overall space complexity of the code is O(n^2) due to the priority queue and visited set.








*/
