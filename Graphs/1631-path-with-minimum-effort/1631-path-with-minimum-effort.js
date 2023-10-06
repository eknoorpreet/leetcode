/**
 * @param {number[][]} heights
 * @return {number}
 */

class Node {
  constructor(value, priority) {
    this.value = value;
    this.priority = priority;
  }
}

//Min BH because elements with low number => higher priority

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

/*

  A route's effort = maximum absolute difference in heights between two consecutive cells of the route. Basically, when we move to an adjacent cell, we calculate the maximum absolute height difference b/w them.

  min effort = more priority

  */

class PriorityQueue1 {
  constructor() {
    this.values = [];
  }

  enqueue(val) {
    this.values.push(val);
    this.bubbleUp();
  }

  dequeue() {
    const max = this.values[0];
    const end = this.values.pop();
    if (this.values.length > 0) {
      this.values[0] = end;
      this.sinkDown();
    }
    return max;
  }

  bubbleUp() {
    let idx = this.values.length - 1;
    const element = this.values[idx];
    while (idx > 0) {
      const parentIdx = Math.floor((idx - 1) / 2);
      const parent = this.values[parentIdx];
      if (element[0] >= parent[0]) break;
      this.values[parentIdx] = element;
      this.values[idx] = parent;
      idx = parentIdx;
    }
  }

  sinkDown() {
    let idx = 0;
    const length = this.values.length;
    const element = this.values[0];
    while (true) {
      const leftChildIdx = 2 * idx + 1;
      const rightChildIdx = 2 * idx + 2;
      let leftChild, rightChild;
      let swap = null;

      if (leftChildIdx < length) {
        leftChild = this.values[leftChildIdx];
        if (leftChild[0] < element[0]) {
          swap = leftChildIdx;
        }
      }

      if (rightChildIdx < length) {
        rightChild = this.values[rightChildIdx];
        if (
          (swap === null && rightChild[0] < element[0]) ||
          (swap !== null && rightChild[0] < leftChild[0])
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

  isEmpty() {
    return this.values.length === 0;
  }
}

function minimumEffortPath0(heights) {
  const n = heights.length;
  const m = heights[0].length;

  // Min-heap (implemented as a priority queue)
  const pq = new PriorityQueue1();

  // To store distances from (0,0)
  const dis = new Array(n)
    .fill()
    .map(() => new Array(m).fill(Number.MAX_SAFE_INTEGER));
  dis[0][0] = 0;

  pq.enqueue([0, [0, 0]]);

  // Directions (top, right, bottom, left)
  const d4x = [-1, 0, 1, 0];
  const d4y = [0, 1, 0, -1];

  // Dijkstra's algorithm
  while (!pq.isEmpty()) {
    const curr = pq.dequeue();
    const d = curr[0];
    const r = curr[1][0];
    const c = curr[1][1];

    // Bottom-right position
    if (r === n - 1 && c === m - 1) return d;

    for (let i = 0; i < 4; ++i) {
      const nx = r + d4x[i];
      const ny = c + d4y[i];

      // Check if the new position is invalid
      if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;

      // New distance (nd) is the maximum of distance till now (d) and current distance (difference between heights of current cells)
      const nd = Math.max(d, Math.abs(heights[nx][ny] - heights[r][c]));

      if (nd < dis[nx][ny]) {
        dis[nx][ny] = nd;
        pq.enqueue([nd, [nx, ny]]);
      }
    }
  }
  return 0;
}

const minimumEffortPath = function (heights) {
  const rows = heights.length;
  const cols = heights[0].length;
  const visited = new Set();
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  const pq = new MyPriorityQueue();
  //[effort, r, c] (it doesn't take us any effort to get to (0, 0) => diff = 0)
  pq.enqueue([0, 0, 0], 0); // Initial cell at (0, 0) with effort 0

  while (pq.values.length) {
    const [effort, row, col] = pq.dequeue()?.value;
    if (row === rows - 1 && col === cols - 1) return effort;

    //make sure to mark the cell as visited AFTER popping fromm queue
    //(since it's possible to push to the queue twice as the same node can
    //appear in multiple paths)
    visited.add(`${row}-${col}`);

    for (const [dr, dc] of directions) {
      const newRow = row + dr;
      const newCol = col + dc;

      if (
        newRow < 0 ||
        newRow >= rows ||
        newCol < 0 ||
        newCol >= cols ||
        visited.has(`${newRow}-${newCol}`)
      )
        continue;

      //max(existing effort, diff b/w heights of curr and neighbor cell)
      const maxAbsDiffYet = Math.max(
        effort,
        Math.abs(heights[row][col] - heights[newRow][newCol])
      );
      pq.enqueue([maxAbsDiffYet, newRow, newCol], maxAbsDiffYet);
    }
  }
  return 0;
};
