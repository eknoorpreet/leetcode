/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number[]} succProb
 * @param {number} start_node
 * @param {number} end_node
 * @return {number}
 */

class Node {
  constructor(value, priority) {
    this.value = value;
    this.priority = priority;
  }
}

/*

  Brute-force: calculate all paths and among all of them, pick the one with max prob and return it. Every time we visit a node, we have E (edges) choices. The height/length of the path = V (nodes) => E^V

  Optimized: weights are always b/w 0 - 1. The total prob will only increase: 0.5 * 0.5 = 0.25. Try the one with higher probability first (greedy): Djikstra's! Instead of minimize the distance, we maximize the probability!

  The multiplication of probabilities:

  When you traverse an edge in the graph, you want to calculate the probability of successfully reaching the destination node. In an undirected graph, each edge has an associated probability of success (given in the succProb array). To find the overall probability of successfully traversing a path from the starting node to the ending node, you need to consider the probabilities of all the individual edges along that path.

  The probability of successfully traversing a path is calculated by multiplying the probabilities of the edges along that path. This is based on the fundamental principle of probability that states that the probability of two independent events occurring in sequence is the product of their individual probabilities.

  For example, if you have two edges with probabilities of success 0.5 and 0.6 along a path, the probability of successfully traversing that path is 0.5 * 0.6 = 0.3.

  In the provided solution, when exploring the graph and moving from one node to another, the algorithm keeps track of the probability of reaching the current node and updates it by multiplying it with the probability of the edge being traversed. This way, it accumulates the probability of success along the path as it traverses the graph.

  Max Heap or Priority Queue because elements with higher number => higher priority

  */

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
      if (element.priority <= parent.priority) break;
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
        if (leftChild.priority > element.priority) {
          swap = leftChildIdx;
        }
      }

      if (rightChildIdx < length) {
        //make sure it's in bounds
        rightChild = this.values[rightChildIdx];
        if (
          (swap === null && rightChild.priority > element.priority) ||
          (swap !== null && rightChild.priority > leftChild.priority)
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

// const maxProbability = function(n, edges, succProb, start_node, end_node) {
//     const graph = new Map();
//     for (let i = 0; i < n; i++) {
//         graph.set(i, []);
//     }

//     for (let i = 0; i < edges.length; i++) {
//         const [src, dest] = edges[i]
//         graph.get(src).push([dest, succProb[i]]);
//         graph.get(dest).push([src, succProb[i]]);
//     }

//     // Initialize a priority queue to keep track of nodes to be explored.
//     const pq = new MyPriorityQueue();

//     // Enqueue the starting node with an initial probability of 1.
//     // Distance will be the priority (higher probability = higher priority).
//     pq.enqueue([start_node, 1], 1);

//     // Initialize a set to keep track of visited nodes.
//     const visited = new Set();

//     // As long as all nodes are not processed
//     while (pq.values.length) {
//         // Dequeue a node from the priority queue
//         // (where w1 is the time taken to reach node n1 from the source node k).
//         const [curr, prob] = pq.dequeue()?.value;

//         // mark node n1 as visited
//         visited.add(curr);

//         if(curr === end_node) return prob

//         // Iterate through the neighbors of node n1 in the graph.
//         for (let [nei, edgeProb] of graph.get(curr) ?? []) {
//             // Check if node n2 has not been visited yet.
//             if (!visited.has(nei)) {
//                 pq.enqueue([nei, prob * edgeProb], prob * edgeProb);
//             }
//         }
//     }
//     //no path exists => 0 prob
//     return 0
// };

const maxProbability = function (n, edges, succProb, start_node, end_node) {
  const graph = new Map();
  const visited = new Set();

  for (let i = 0; i < n; i++) {
    graph.set(i, []);
  }

  for (let i = 0; i < edges.length; i++) {
    const [src, dest] = edges[i];
    graph.get(src).push([dest, succProb[i]]);
    graph.get(dest).push([src, succProb[i]]);
  }

  // Initialize a priority queue to keep track of nodes to be explored.
  const pq = new MyPriorityQueue();

  pq.enqueue([start_node, 1], 1);
  while (pq.values.length) {
    const [curr, prob] = pq.dequeue()?.value;
    //make sure to visit the nodes AFTER popping from the queue
    visited.add(curr);
    if (curr === end_node) return prob;
    for (let [nei, edgeProb] of graph.get(curr) ?? []) {
      console.log(curr, nei);
      if (!visited.has(nei)) {
        pq.enqueue([nei, prob * edgeProb], prob * edgeProb);
        //if we mark the node as visited here, the same node won't be added to the queue or visited in a different path => WRONG!
      }
    }
  }
  return 0;
};

/*

Time Complexity:

Building the graph: Constructing the adjacency lists based on the input edges and success probabilities takes O(E) time,
where E is the number of edges.

Dijkstra's Algorithm: The while loop in the Dijkstra's algorithm runs until all nodes are visited, and in the worst case, it can iterate through all edges once. In each iteration, you perform operations with the priority queue. The time complexity of Dijkstra's algorithm with a binary heap-based priority queue is O((E + V) * log(V)), where E is the number of edges, and V is the number of vertices (nodes). In your case, V is equal to n, the number of nodes.

In total, the time complexity of the code is dominated by Dijkstra's algorithm,
which is O((E + V) * log(V^2)) => O((E + V) * 2log(V)) => O((E + V) * log(V))

Space Complexity:

Creating the graph using adjacency lists requires O(E) space for storing the edges and their corresponding probabilities.

The priority queue implemented using the MyPriorityQueue class stores nodes, and in the worst case,
it can store all nodes twice. Therefore, it consumes O(V^2) space for the priority queue.

The visited set also consumes O(V) space.

In total, the space complexity of the code is O(E + V), where E is the number of edges, and V is the number of nodes.

*/
