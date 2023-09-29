/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number[][]}
 */

/*

A node u is an ancestor of another node v if u can reach v via a set of edges.

*/

const getAncestors = function (n, edges) {
  // [ancestorsOfNode0, ancestorsOfNode1...] [{}, {}, {}...]
  const sets = new Array(n).fill().map(() => new Set());
  const parentToKids = new Map(); // {parent => [kids]}
  const inDegree = new Array(n).fill(0); // {kid => countOfAncestors}

  for (const [parent, kid] of edges) {
    // Add parent to the total ancestors of kid
    sets[kid].add(parent);
    // Add parent as an ancestor of the kid.
    if (!parentToKids.has(parent)) {
      // parentToKids.set(parent, new Set());
      parentToKids.set(parent, []);
    }
    parentToKids.set(parent, [...parentToKids.get(parent), kid]);
    // increment ancestor count of kid
    inDegree[kid]++;
  }

  // Topological sort on nodes with 0 incoming edges (no ancestors)
  const queue = [];
  for (let i = 0; i < n; i++) {
    if (inDegree[i] === 0) queue.push(i);
  }

  while (queue.length) {
    const parent = queue.shift();

    //go through all kids (in the set or array) of the parent
    for (const kid of parentToKids.get(parent) ?? []) {
      // Update the ancestors of the kid by taking the union of the ancestors of the kid and the ancestors of the parent.
      sets[kid] = new Set([...sets[kid], ...sets[parent]]);
      // Decrement the in-degree of the kid because it has been processed.
      inDegree[kid]--;
      // in-degree of kid = zero => all its ancestors have been processed
      if (inDegree[kid] === 0) queue.push(kid);
    }
  }

  // Sort ancestors and put into return list.
  const result = [];
  for (const set of sets) {
    //convert each set to an array and sort in ascending order
    result.push(Array.from(set).sort((a, b) => a - b));
  }
  return result;
};

/*

Time Complexity:

Building the Graph: The code iterates through the given edges array once to build the graph
(constructing ans, inDegree, and parentToKids). This takes O(E) time, where E is the number of edges in the graph.

Topological Sorting: In the worst case, all nodes are enqueued and dequeued from the queue,
which takes O(V) time, where V is the number of nodes in the graph. For each node,
the code processes its children (neighbors) by updating ancestors.
The total time spent in this step is O(E) because each edge is processed once.

Sorting and Result Building: After processing all nodes, the code converts Sets to arrays and
sorts them. Sorting a Set of ancestors for each node takes O(V*log(V)) time.

Overall, the time complexity of the code is dominated by the topological sorting step, making it O(E + V*log(V)).

Space Complexity:

The code uses several data structures to represent the graph:
1. ans: An array of Sets to store ancestors for each node, which takes O(V) space.
2. inDegree: An array to store in-degrees for each node, which takes O(V) space.
3. parentToKids: A map to store parent-child relationships, which can take up to O(E) space in the worst case.

Overall, the space complexity of the code is O(V + E) due to the graph data structures and additional space.

*/
