/**
 * @param {number} n
 * @param {number[][]} redEdges
 * @param {number[][]} blueEdges
 * @return {number[]}
 */

/*

shortest path => BFS
*/
const shortestAlternatingPaths = function (n, redEdges, blueEdges) {
  //represent source nodes, and the values are arrays of destination nodes.
  //{0 -> [1], 1 -> [2]}
  const redMap = new Map();
  const blueMap = new Map();

  for (let [source, destination] of redEdges) {
    redMap.set(
      source,
      redMap.get(source) ? [...redMap.get(source), destination] : [destination]
    );
  }
  for (let [source, destination] of blueEdges) {
    blueMap.set(
      source,
      blueMap.get(source)
        ? [...blueMap.get(source), destination]
        : [destination]
    );
  }

  console.log(redMap, blueMap);

  let answer = new Array(n).fill(-1);
  // answer[0] = 0 //shortest path length from node 0 = 0
  const queue = [];
  //[node, length, previous_edge_color]
  //node: current node
  //length: length of the path from node 0 to the current node
  //previous_edge_color: color of the edge leading to the current node
  queue.push([0, 0, null]);
  //keep track of visited nodes and their associated edge colors
  //helps prevent revisiting the same node with the same edge color.
  //mark each node twice (once for each incoming edge color)
  const visited = new Set();
  visited.add(`${0}-${null}`); //no previous_edge_color in the beginning
  while (queue.length) {
    const [node, length, edgeColor] = queue.shift();
    //is it out first time visiting the node
    //we found the shortest length yet => update
    if (answer[node] === -1) {
      answer[node] = length;
    }
    //Explore neighbors based on the alternating edge color requirement.

    //if the edge color is not red (is either blue or null)
    if (edgeColor !== 'RED') {
      //go through all red neighbors of the current node
      for (let neighbor of redMap.get(node) ?? []) {
        //if the neighbor has not been visited
        if (!visited.has(`${neighbor}-RED`)) {
          //mark it as visited (with the corresponding edge color)
          visited.add(`${neighbor}-RED`);
          //add to the queue (with an incremented path length)
          queue.push([neighbor, length + 1, 'RED']);
        }
      }
    }

    //if the edge color is not blue (is either red or null)
    if (edgeColor !== 'BLUE') {
      //go through all blue neighbors of the current node
      for (let neighbor of blueMap.get(node) ?? []) {
        //if the neighbor has not been visited
        if (!visited.has(`${neighbor}-BLUE`)) {
          //mark it as visited (with the corresponding edge color)
          visited.add(`${neighbor}-BLUE`);
          //add to queue (with an incremented path length)
          queue.push([neighbor, length + 1, 'BLUE']);
        }
      }
    }
  }
  return answer;
};

/*
Time Complexity: O(n) (The BFS traversal processes each node and edge once)

Space Complexity: The 'visited' set may contain entries for each node and each edge color.
In the worst case, this set can have up to n x 2 entries.
Therefore, the space complexity for the visited set is O(n).
*/
