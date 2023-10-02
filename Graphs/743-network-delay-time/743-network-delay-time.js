/**
 * @param {number[][]} times
 * @param {number} n
 * @param {number} k
 * @return {number}
 */

/*

Directed weighted graph => Djikstra's algorithm

Not connected => can't reach => -1

BFS (layer by layer)

Go layer by layer and every node in the frontier, add them to the min heap (total_path, node). Visit the one with the shortest distance (min path; that's why, min heap).

*/

/**
 * @param {number} k
 * @param {number[]} nums
 */

class Node {
  constructor(value, priority) {
    this.value = value;
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

// function networkDelayTime(times, n, k) {
//         const edges = new Array(n).fill(null).map(() => []);
//         for (const [u, v, w] of times) {
//             edges[u - 1].push([v - 1, w]);
//         }

//         const minHeap = [[0, k - 1]];
//         const visit = new Set();
//         let t = 0;

//         while (minHeap.length > 0) {
//             const [w1, n1] = minHeap.shift();
//             if (visit.has(n1)) {
//                 continue;
//             }
//             visit.add(n1);
//             t = w1;

//             for (const [n2, w2] of edges[n1]) {
//                 if (!visit.has(n2)) {
//                     minHeap.push([w1 + w2, n2]);
//                 }
//             }
//             minHeap.sort((a, b) => a[0] - b[0]);
//         }

//         return visit.size === n ? t : -1;
//     }

const networkDelayTime = function (times, n, k) {
  // Create a graph to represent the network using a Map data structure.
  // {u => [[v, w]]}
  const graph = new Map();
  for (let [u, v, w] of times) {
    if (!graph.has(u)) {
      graph.set(u, []);
    }
    graph.get(u).push([v, w]);
  }

  // Initialize a priority queue to keep track of nodes to be explored.
  const pq = new MyPriorityQueue();

  // Enqueue the starting node k with an initial distance of 0.
  // Distance will be the priority (shorter distance = higher priority).
  pq.enqueue([k, 0], 0);

  // Initialize a set to keep track of visited nodes.
  const visited = new Set();

  let time = 0;

  // As long as all nodes are not processed
  while (pq.values.length) {
    // Dequeue a node from the priority queue
    // (where w1 is the time taken to reach node n1 from the source node k).
    const [n1, w1] = pq.dequeue()?.value;

    // If curr node has already been visited => skip it
    if (visited.has(n1)) continue;

    // Else, mark node n1 as visited
    visited.add(n1);
    // update the time to be the maximum of its current value and w1.
    time = Math.max(time, w1);

    // Iterate through the neighbors of node n1 in the graph.
    for (let [n2, w2] of graph.get(n1) ?? []) {
      // Check if node n2 has not been visited yet.
      if (!visited.has(n2)) {
        // Enqueue node n2 into the priority queue with an updated distance w1 (diatnce from source node k till now) + w2 (curr node distance).
        pq.enqueue([n2, w1 + w2], w1 + w2);
      }
    }
  }

  // After the loop exits, check if all nodes have been visited.
  // If so, return the time, which represents the minimum time it takes for the signal to reach all nodes. Otherwise, return -1.
  return visited.size === n ? time : -1;
};

/*

Time Complexity:

Constructing the Graph: The initial loop that constructs the graph from the times array has a
time complexity of O(E), where E is the number of edges in the graph.

Dijkstra's Algorithm: The main part of the code is the Dijkstra's algorithm implementation,
which iterates over the nodes and their neighbors. Maximum number of edges is proportional to V^2. Max size
of the heap could be V^2 (every node could be added multiple times; that's dependent on the total
numver of edges E ). Therefore, O(E log V^2) => O(E log V)

Space Complexity:

Graph Representation: The space complexity for representing the graph is O(E + V),
where E is the number of edges, and V is the number of vertices (nodes) in the graph. This space is used to store adjacency information.

Priority Queue: The space complexity for the priority queue is O(V^2), where V is the number of vertices (nodes) in the graph.
This is because, in the worst case, all nodes could be enqueued multiple times.

Overall, the space complexity of the code is O(E + V^2).

*/
