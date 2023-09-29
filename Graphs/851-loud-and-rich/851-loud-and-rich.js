/**
 * @param {number[][]} richer
 * @param {number[]} quiet
 * @return {number[]}
 */

/*

richer[i] = [ai, bi]: a has directed edge from a to b if a has more money than b

answer[x] = y: y is the least quiet person among people with >= x
*/

const loudAndRich = function (richer, quiet) {
  const graph = new Map(); // {personA => [richerThanWhichPeople]}
  const inDegree = new Map(); // {personB => countOfRicherProple}
  //richer array might not have all relationships => not all n elements
  //use quiet array for all n people
  const n = quiet.length;

  for (let i = 0; i < n; i++) {
    graph.set(i, []);
    inDegree.set(i, 0);
  }

  for (let [a, b] of richer) {
    //a is riicher than b
    graph.set(a, [...graph.get(a), b]);
    //b has 1 more person (a) richer than him/her
    inDegree.set(b, (inDegree.get(b) || 0) + 1);
  }

  const queue = [];
  const answer = [];

  for (let i = 0; i < n; i++) {
    // initially, each person is its own answer
    // (for each person i, they are the least quiet person among those with
    // equal or greater wealth, essentially treating each person as their own
    // answer candidate.)
    // essentially, every individual starts as a candidate for being the
    // least quiet person among those with equal or greater wealth
    answer[i] = i;
    if (inDegree.get(i) === 0) queue.push(i);
  }

  while (queue.length) {
    const current = queue.shift();
    //current is richer than all its neighbors
    for (let neighbor of graph.get(current)) {
      //is current richer than its neighbor and also has lesser quite value
      //here, neighbor = x and answer[neighbor] = y
      //according to question, answer[x] = y if y has lesser quiet value
      //among all people richer than x
      //that's why, go through all neighbors and check for least quiet value
      if (quiet[answer[neighbor]] > quiet[answer[current]]) {
        answer[neighbor] = answer[current];
      }
      inDegree.set(neighbor, inDegree.get(neighbor) - 1);
      if (inDegree.get(neighbor) === 0) queue.push(neighbor);
    }
  }

  return answer;
};

/*

Time Complexity:

The overall time complexity of the code is O(E) because the most time-consuming part is building
the graph and performing the modified topological sort. In the worst case, E is proportional
to n (the number of people), so we can say the time complexity is O(n).

Space Complexity:

The overall space complexity of the code is O(n) because it uses several arrays and data structures,
but their sizes are all proportional to the number of people in the input.

*/
