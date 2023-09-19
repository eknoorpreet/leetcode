/**
 * @param {number[]} edges
 * @param {number} node1
 * @param {number} node2
 * @return {number}
 */

/**

We want to know all the nodes we can reach starting from node1 and node2.
node1: we can reach 2 via 1 edge    node2: we can reach 2 via 1 edge  (max = 1)
       we can reach 3 via 2 edges          we can reach 3 via 2 edges (max = 2)

Minimize [1, 2] = 1. Return the node = 2

*/

const closestMeetingNode = function (edges, node1, node2) {
  const adjacencyList = new Map();
  for (let i = 0; i < edges.length; i++) {
    adjacencyList.set(
      i,
      adjacencyList.get(i) ? [...adjacencyList.get(i), edges[i]] : [edges[i]]
    );
  }

  console.log(adjacencyList);

  const bfs = (source, distanceMap) => {
    const queue = [];
    queue.push([source, 0]); //[sourceNode, distance]
    //the distance the source node is away from itself = 0
    //(because the return value can be one of the 2 nodes)
    distanceMap[source] = 0;
    while (queue.length) {
      //process the current node
      const [node, distance] = queue.shift();
      //adjacencyList.get(node) might be undefined
      //go through all neighbors of the current node
      for (let neighbor of adjacencyList.get(node) ?? []) {
        //if the node has not been visited (otherwise, infinite loop)
        //distanceMap not only maps the node to its distance from
        //neighbors, it also acts as a 'visited' data structure
        if (!(neighbor in distanceMap)) {
          //add the node to the queue to be processed later
          //the neighbor is away by only 1 edge => distance + 1
          queue.push([neighbor, distance + 1]);
          //add the distance of the node from its neighbor in the
          //distanceMap
          distanceMap[neighbor] = distance + 1;
        }
      }
    }
  };

  // map node -> distance from node1
  const node1Distance = {};
  // map node -> distance from node2
  const node2Distance = {};
  //start from node1 and its map
  bfs(node1, node1Distance);
  //node2 and its map
  bfs(node2, node2Distance);
  //the 2 input nodes can't reach the same node => -1
  let result = -1; //result node
  let resultDistance = Number.POSITIVE_INFINITY;
  //go through all nodes (nodes are basically indices in edges array)
  for (let i = 0; i < edges.length; i++) {
    //if the current node can be reached by both given nodes
    if (i in node1Distance && i in node2Distance) {
      //get its distance from both nodes and get the max of both
      const distance = Math.max(node1Distance[i], node2Distance[i]);
      //find the min (of the max) distance
      if (distance < resultDistance) {
        result = i;
        resultDistance = distance;
      }
    }
  }
  return result;
};

/*

Time Complexity:

Constructing the adjacency list: This involves iterating through the edges array, which has n elements, and updating the adjacency list. This step has a time complexity of O(n).

BFS from node1 and node2: The BFS algorithm explores each node and its neighbors once. In the worst case, it may visit all nodes and edges of the graph, resulting in a time complexity of O(n).

Iterating through all nodes to find the meeting node: This loop iterates through all nodes, which has a time complexity of O(n).

Overall, the dominant factor in terms of time complexity is the BFS algorithm, which has a complexity of O(n).


Space Complexity:

adjacencyList: This data structure stores the graph's adjacency list. In the worst case, where there are no cycles and each node has one outgoing edge, the adjacency list will have a size of O(n). Hence, the space complexity for adjacencyList is O(n).

node1Distance and node2Distance: These maps store the distances from node1 and node2 to all nodes in the graph. In the worst case, they will have a size of O(n), as each node's distance needs to be recorded. Therefore, the space complexity for these maps is O(n) as well.

In summary, the time complexity of the code is O(n), and the space complexity is O(n) due to the storage of the adjacency list and distance maps.







*/
