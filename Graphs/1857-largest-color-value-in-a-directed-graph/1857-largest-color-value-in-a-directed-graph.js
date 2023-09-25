/**
 * @param {string} colors
 * @param {number[][]} edges
 * @return {number}
 */

/*

Each color is a lowercase character (limted to 26)

find the path that maximizes the most freq color and return the freq

cycle (no valid path) => -1

*/

const largestPathValue = function (colors, edges) {
  const graph = new Map();
  const inDegree = new Map();
  let result = 0;
  //colors is an array where each i is the color of the ith node
  //length of colors = number of nodes
  const n = colors.length;
  //maxColorCount is a 2D array (of size n x 26) to keep track of color counts for each node
  //Basically, there can be 26 colors. For each node i, what's the mmost dominant color (the index j) and its frequency (the value at j, i.e. maxColorCount[i][j])
  const maxColorCount = new Array(n).fill().map(() => new Array(26).fill(0));
  // console.log(maxColorCount, maxColorCount.length)

  for (let i = 0; i < n; i++) {
    graph.set(i, []);
    inDegree.set(i, 0);
  }

  for (let [node, neighbor] of edges) {
    graph.set(node, [...graph.get(node), neighbor]);
    inDegree.set(neighbor, (inDegree.get(neighbor) || 0) + 1);
  }

  const queue = [];
  //keep track of the number of visited nodes.
  let visitedCount = 0;

  //nodes with no incoming edges are added to the queue since they can be considered starting points for traversals.
  for (let n = 0; n < colors.length; n++) {
    if (inDegree.get(n) === 0) queue.push(n);
  }

  while (queue.length) {
    const node = queue.shift();
    visitedCount++;
    //update the maxColorCount for the current node.
    //The color count is incremented for the color corresponding to the current node's color.
    //colors.charCodeAt(node) is used to get the Unicode code point of the character (color) at the node index.
    //'a'.charCodeAt(0) is used to get the Unicode code point of this character. This is done to normalize the color indexing to start from 0. In essence, it converts the color 'a' to index 0, 'b' to index 1, 'c' to index 2, and so on. We're able to "index" the colors (letters) a - z b/w 0 - 25.
    //colors.charCodeAt(node) - 'a'.charCodeAt(0) computes the color index for the current node. (node => color => colorIndex)
    const colorIndex = colors.charCodeAt(node) - 'a'.charCodeAt(0);
    //increment the count of the color for the current node in the maxColorCount array
    //(increments the count for the color index corresponding to the color of
    //the current node. This is done to keep track of the maximum color count
    //for each node in the graph as the traversal progresses.)
    //for ex: node 0. Since colors[0] is 'a', it corresponds to color index 0. So, we increment maxColorCount[0][0] by 1.
    maxColorCount[node][colorIndex]++;
    result = Math.max(result, maxColorCount[node][colorIndex]);
    for (let neighbor of graph.get(node)) {
      inDegree.set(neighbor, inDegree.get(neighbor) - 1);
      if (inDegree.get(neighbor) === 0) queue.push(neighbor);
      //in all 26 colors
      for (let i = 0; i < 26; i++) {
        //Update the maxColorCount for each neighbor by taking the maximum value from the current node's maxColorCount.
        maxColorCount[neighbor][i] = Math.max(
          maxColorCount[node][i],
          maxColorCount[neighbor][i]
        );
      }
    }
  }
  //after traversal, node 0 has 1 red ('a')
  //node 0 has 1 red ('a')
  //node 1 has 1 red ('a') and 1 purple ('c')
  //node 2 has 2 red ('a')
  //node 3 has 2 red ('a') and 1 blue ('c')
  //node 3 has 3 red ('a') and 1 blue ('c')

  //if the visited nodes count does not match the total number of nodes n => cycle in the graph!
  if (visitedCount !== n) return -1;
  return result;
};

/*

Note 1: In the code, when processing a node's neighbors, we need to update the maxColorCount for those neighbors. We do this by taking the maximum values from the maxColorCount of the current node (node 0 in this case) and the maxColorCount of the neighbors.

Here's a step-by-step explanation of this process:

When processing a node (let's say node X), we already have the maxColorCount for that node, which represents the color counts for each color (from 'a' to 'z') up to that point in the traversal.

Now, we want to update the maxColorCount for its neighbors (let's say node Y) based on what we have seen in node X.

To do this, we iterate over all possible colors (from 'a' to 'z') and, for each color, we take the maximum value between two sources:

The count of that color in node X's maxColorCount (i.e., maxColorCount[X][colorIndex]).
The count of that color in node Y's current maxColorCount (i.e., maxColorCount[Y][colorIndex]).
By taking the maximum value for each color, we ensure that the maxColorCount for node Y is updated to include the maximum count of each color seen in both node X and node Y.

This process ensures that as we traverse the graph, the maxColorCount for each node reflects the maximum color counts seen up to that node in the graph traversal. It's a way of "propagating" the color counts from one node to its neighbors, making sure that we capture the most dominant color counts along the valid paths in the graph.


Time Complexity:

Building the graph and inDegree maps takes O(m) time, where m is the number of edges in the graph.

Initializing the queue with nodes having an indegree of 0 takes O(n) time, where n is the number of nodes.

The main BFS loop runs in O(n + m) time because, in the worst case, we visit each node once (O(n)) and each edge once (O(m)).

Inside the BFS loop, we have a loop that iterates over 26 colors (constant time) and updates the maxColorCount array, which is O(26) or O(1).

The overall time complexity is O(n + m) because the BFS traversal dominates the time complexity.

Space Complexity:

The graph map and the inDegree map both require O(n) space, where n is the number of nodes.

The maxColorCount 2D array requires O(n * 26) space, where n is the number of nodes, and 26 represents the number of possible colors.

The queue can potentially store all n nodes in the worst case, so it requires O(n) space.

The overall space complexity is O(n + n*26), which simplifies to O(n) since the constant term is dominated by the linear term.

In summary:

Time Complexity: O(n + m)
Space Complexity: O(n)



*/
