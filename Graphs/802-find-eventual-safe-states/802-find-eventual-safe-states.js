/**
 * @param {number[][]} graph
 * @return {number[]}
 */

/*

Basically, we have to find the nodes from where all paths lead to a terminal node. A node has to direct its edge somewhere, if no outgoing edges, it's a terminal (and hence, safe) node. Therefore, a node that doesn't lead to a terminal node (with no outgoing edges) will end up in a cycle. We have to find the nodes which are not in a cycle. We try to figure out if 0 is a safe node or not, we follow its neighbors, say 1. 0 -> 1 -> 3 -> 0. Therefore, we  not only found out that 0 is not a safe node, we also found out that 3, 1 are not safe nodes either. All other paths from 0 don't matter since we found 1 path that will end up in a cycle and hence, makes 0 not a safe node.

Use a hashmap to map each node to its status (safe/not)
When you visit a node, just assume that it's not a safe node so when you get back to it (because of a cycle), you see its value in the hashmap (false) and you know that you have already visited it (and its neighbours) before and you don't want to visit it again (otherwise, infinite loop!)
every terminal node is a safe node
*/

const eventualSafeNodes = function (graph) {
  const result = [];
  const n = graph.length;
  const safe = new Map(); //hashmap to map each node to its status (safe/not)

  const dfs = (node) => {
    //if node is visited and we already determined its status before => return the answer
    if (safe.has(node)) return safe.get(node);
    //assume that it's not a safe node to detect cycles (and prevent infinite loop)
    safe.set(node, false);
    for (let neighbors of graph[node]) {
      //if one of its neighbors is not a safe node, i is not as well
      if (!dfs(neighbors)) return false; //return safe.get(node)
      //otherwise, check other neighbors as well
    }
    safe.set(node, true);
    return true; //return safe.get(node)
  };

  for (let i = 0; i < n; i++) {
    //if node is a safe node => push to result
    //it's fine since we're iterating in ascending order
    //(we don't push to result in the dfs function but after dfs(i))
    if (dfs(i)) result.push(i);
  }
  return result;
};

/*

Time Complexity:

The code uses depth-first search (DFS) to traverse the graph. In the worst case, it may visit each node and edge once.

For each node, when we call the dfs function, we explore its neighbors.
The number of neighbors is determined by the size of the adjacency list for that node.

In the worst case, where all nodes are part of a single cycle (making none of them safe), the DFS function may visit every edge in the graph exactly once.

Therefore, the time complexity of the DFS traversal is O(E + V), where N is the number of nodes, and E is the number of edges in the graph.

Additionally, we iterate through all nodes (0 to n-1) to check if each node is safe or not. This loop has a time complexity of O(N).

Combining the DFS traversal and the iteration through all nodes, the overall time complexity is O(E + V) + O(N), which simplifies to O(E + V).

Space Complexity:

The primary data structure used for space in this code is the safe map, which stores the safety status of each node. In the worst case, this map can contain entries for all nodes, so its space complexity is O(N).

The recursive DFS function consumes space on the call stack for each recursive call. In the worst case, when there are long chains of nodes, this can lead to a space complexity of O(N).

Overall, the space complexity is dominated by the safe map and the call stack space, both of which can be O(N) in the worst case.

*/
