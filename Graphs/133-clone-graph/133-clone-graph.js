/**
 * // Definition for a Node.
 * function Node(val, neighbors) {
 *    this.val = val === undefined ? 0 : val;
 *    this.neighbors = neighbors === undefined ? [] : neighbors;
 * };
 */

/**
 * @param {Node} node
 * @return {Node}
 */

const cloneGraph = function (node) {
  if (!node) return null;
  const oldToNew = new Map(); //map the old nodes to the new (copy) nodes
  const clone = (node) => {
    //if we already created a clone of the node, just return it
    if (oldToNew.has(node)) return oldToNew.get(node);
    //else, clone the node
    const copy = new Node(node.val);
    //and map the old node to the new (or copy) node
    oldToNew.set(node, copy);
    //but, before adding neighbors to the current node, create a copy of them first => deep copy (recursive)
    //go through node's neighbors and push them to the copy node's neighbors
    for (let i in node.neighbors) {
      copy.neighbors.push(clone(node.neighbors[i]));
    }
    return copy;
  };
  return clone(node);
};

/*

Time Complexity:

The time complexity of the code is determined by the DFS traversal of the entire graph. In the worst case, the algorithm visits each node and each edge exactly once.

Let's denote:

V as the number of nodes (vertices) in the graph.
E as the number of edges in the graph.
The DFS traversal has a time complexity of O(V + E). This is because it visits each node once (O(V)) and explores each edge once (O(E)).

Space Complexity:

The space complexity is determined by the additional data structures used during the DFS traversal:
oldToNew Map: The oldToNew map stores mappings from original nodes to their corresponding cloned nodes. In the worst case, it can contain entries for all nodes in the graph. Therefore, the space complexity due to the map is O(V).

DFS Call Stack: The DFS traversal is implemented recursively, which means there is a function call stack. In the worst case, the DFS stack depth can be as large as the number of nodes in the graph (O(V)).

Node Copies: The cloned nodes are stored in memory as the copy is made. In the worst case, there can be a copy for each node in the graph, which is O(V).

Combining these space complexities, the overall space complexity is O(V + V) = O(2V), which simplifies to O(V).
In summary, the time complexity of the code is O(V + E), and the space complexity is O(V). These complexities are based on the worst-case scenario where all nodes and edges are visited and cloned.

*/
