/**
 * @param {number} n
 * @param {number[][]} connections
 * @return {number}
 */

/*

Basically, start at city 0, go through its neighbors and check if the neighbor can reach the city (does the connection exist in the set). If not, we increment the counter and move to on call dfs on the neighbor. If yes, we directly call dfs on the neighbor ("Yes, city 1 can reach city 0 but can city 1's neighbor reach city 1 so we can say it can also reach city 0?")

Can 0's neighbors reach it? Ex: 4 can reach 0
Can their neighbors reach it? Ex: Can 5 (4's neighbor ) reach 4? If yes, then it can reach 0 => DFS

*/
const minReorder = function (n, connections) {
  //start at city 0
  //recursively check its neighbors
  //count outgoing edges

  const edges = new Set();
  //store the neighbors of each city
  //each city mapped to an array of its neighboring cities: 0 => [ 1, 4 ]...
  const neighbors = new Map();
  const visited = new Set();
  //{ '0,1', '1,3', '2,3', '4,0', '4,5' }
  for (let connection of connections) {
    edges.add(`${connection}`);
  }
  let changes = 0;
  for (let i = 0; i < n; i++) {
    neighbors.set(i, []);
  }
  //each connection [a, b], add b to the list of neighbors of a and a to the list of neighbors of b
  for (let [cityA, cityB] of connections) {
    neighbors.set(cityA, [...neighbors.get(cityA), cityB]);
    neighbors.set(cityB, [...neighbors.get(cityB), cityA]);
  }

  const dfs = (city) => {
    for (let neighbor of neighbors.get(city)) {
      //For each neighbor, check if it has been visited before. If it has, continue to the next neighbor to avoid stack overflow.
      //(in dfs(3), we check 3's neighbor: 2, so in dfs(2), we check 2's neighbor: 3 so we need to mark them visited!)
      if (visited.has(neighbor)) continue;
      //if the city can't reach 0 => increment counter
      if (!edges.has(`${neighbor},${city}`)) changes++;
      //mark the city as visited
      visited.add(neighbor);
      //check if the neighbor's neighbors can also reach city 0
      dfs(neighbor);
    }
  };

  //mark city 0 as visited
  visited.add(0);
  //check if city A can reach city 0
  dfs(0);
  return changes;
};

/*

Time Complexity:

Creating the edges Set: This step iterates through the connections array, which contains n - 1 roads, to create the edges set. Therefore, it has a time complexity of O(n).

Populating the neighbours Map: This step iterates through the connections array once, and for each connection, it adds two entries to the neighbours map. Therefore, it also has a time complexity of O(n).

DFS Traversal: The DFS traversal is called once for each city: O(n)

Overall, the dominant factor in terms of time complexity is the DFS traversal, which has a time complexity of O(n^2).

Space Complexity:

edges Set: The edges set stores the connections as strings. In the worst case, it may store all n - 1 connections, resulting in a space complexity of O(n).

neighbours Map: The neighbours map stores the neighbors of each city. Each city can have at most n - 1 neighbors, so the space complexity for this map is O(n).

visited Set: The visited set stores the visited cities during the DFS traversal. In the worst case, all cities are visited, resulting in a space complexity of O(n).

Recursive Call Stack: During the DFS traversal, the recursive call stack can have a depth of at most n. Therefore, the space complexity for the call stack is O(n).

Overall, a space complexity of O(n) due to data structures like sets and maps.
*/
