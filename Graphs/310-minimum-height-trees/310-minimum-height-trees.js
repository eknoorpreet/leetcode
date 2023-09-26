/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number[]}
 */

/*


The provided explanation for the problem is a clear and concise overview of the approach to finding the minimum height trees and determining their roots. Let's break down the key points of the explanation:

Problem Statement Overview:

The goal is to find the minimum height trees in a given graph and return the roots of those trees.
There can be at most 2 trees with minimum height.

Approach Summary:

The approach leverages the observation that for graphs with an odd number of nodes,
only the node in the middle of the graph, when made the root, results in a minimum height tree.
For graphs with an even number of nodes, both middle nodes, when made the root, give minimum height
trees. (See Note 1)
The strategy is to start from the leaf nodes and work towards the middle nodes, adding them to the
result vector.

Using Topological Sorting:

Topological sorting is used to efficiently identify and process nodes in the tree.
An array called indegree is used to keep track of the number of edges approaching each node in the tree.
The process involves starting with leaf nodes (indegree = 1), removing them (decrementing indegree of connected nodes), and continuing until reaching the middle nodes.
This process ensures that only one root or at most two roots are left for minimum height trees, depending on the tree structure.
Implementation Approach:

The implementation follows a BFS (Breadth-First Search)-like approach.
Initially, all leaf nodes are pushed into a queue.
Leaf nodes are removed from the tree by decrementing the indegree of nodes connected to them.
New leaf nodes are continually pushed into the queue, and this process continues until only 1 or 2 nodes remain in the tree, which represent the result (roots of minimum height trees).
Time and Space Complexity:

Note 1: For Graphs with an Odd Number of Nodes:

When you have a tree with an odd number of nodes (e.g., 3, 5, 7, etc.), there is exactly one node that can be considered the "middle" node.
Choosing the node in the middle of the graph as the root of the tree will result in a minimum height tree.
This is because when you select the middle node as the root, the distances from this root to all other nodes in the tree are balanced, and the tree's height is minimized.
For Graphs with an Even Number of Nodes:

When you have a tree with an even number of nodes (e.g., 2, 4, 6, etc.), there are two nodes that can be considered as the "middle" nodes.
Choosing either of these two middle nodes as the root of the tree will result in a minimum height tree.
This is because both of these middle nodes have the property that when selected as the root, the distances from each of them to all other nodes in the tree are balanced, resulting in a minimum height tree.

This understanding is based on the idea that balancing the distances from the root to other nodes minimizes the tree's height.

*/
const findMinHeightTrees = function (n, edges) {
  // Initialize the graph to represent the tree structure
  const graph = new Map();
  // Initialize the inDegree map to keep track of degrees (number of connections) of each node
  const inDegree = new Map();
  // Initialize the result array to store the root node(s) resulting in minimum height trees
  let result = [];

  // Populate the graph and inDegree maps
  for (let i = 0; i < n; i++) {
    graph.set(i, []);
    inDegree.set(i, 0);
  }

  for (let [node, neighbor] of edges) {
    // Add connections in both directions as it's an undirected graph
    graph.get(node).push(neighbor);
    graph.get(neighbor).push(node);
    // Increment inDegree for both nodes to represent the connection
    inDegree.set(node, (inDegree.get(node) || 0) + 1);
    inDegree.set(neighbor, (inDegree.get(neighbor) || 0) + 1);
  }

  // Initialize the queue with leaf nodes (inDegree = 1)
  const queue = [];
  for (let i = 0; i < n; i++) {
    if (inDegree.get(i) === 1) {
      queue.push(i);
      // Decrease inDegree of leaf nodes as they are processed
      inDegree.set(i, inDegree.get(i) - 1);
    }
  }

  // Iteratively remove leaves until central node(s) remain
  while (queue.length) {
    // Calculate the current level size (number of leaf nodes in this level)
    const size = queue.length;
    // Initialize an empty result array for nodes at the current level
    //Before starting to process nodes at the current level, we need to clear the result array
    //of any nodes from the previous level. This ensures that the result array only contains nodes
    //from the current level and doesn't mix them with nodes from previous levels.
    result = [];
    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      // Add the removed node to the result array (indicating it's at the current level)
      result.push(node);
      // Iterate through the neighbors of the removed node
      for (let neighbor of graph.get(node)) {
        // Decrease inDegree of neighbors, and if they become leaf nodes, add them to the queue
        inDegree.set(neighbor, inDegree.get(neighbor) - 1);
        if (inDegree.get(neighbor) === 1) {
          queue.push(neighbor);
        }
      }
    }
  }

  // Handle the edge case where there is only one node in the tree
  if (n === 1) result = [0];

  // Return the result, which contains the central node(s) of minimum height trees
  return result;
};

/*

Time Complexity: The approach has a time complexity of O(V + E), where V is the number of nodes (vertices) and E is the number of edges.
Space Complexity: The space complexity is O(V), primarily due to the indegree array.


*/
