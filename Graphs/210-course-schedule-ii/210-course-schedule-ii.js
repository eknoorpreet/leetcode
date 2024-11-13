/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */

/*

Key Insight:

Still a graph problem where we need to detect cycles
We need to track the order in which we complete courses
The order we add courses to result is important - it's a topological sort

*/

const findOrder = function (numCourses, prerequisites) {
  const result = [];
  // course mapped to its prerequisites
  // (adjacency list: node mapped to its edges)
  const prerequisiteMap = new Map();
  const visited = new Set(); // to track completed courses
  const cycle = new Set(); // to detect cycles
  for (let n = 0; n < numCourses; n++) {
    prerequisiteMap.set(n, []);
  }
  for (let [course, prerequisite] of prerequisites) {
    // prerequisiteMap.set(course, prerequisiteMap.get(course) ? [...prerequisiteMap.get(course), prerequisite] : [prerequisite])
    prerequisiteMap.set(course, [...prerequisiteMap.get(course), prerequisite]);
  }

  const dfs = (course) => {
    // Base case: course already in cycle => false => []
    if (cycle.has(course)) return false;
    // Base case: visiting a course already visited => true
    if (visited.has(course)) return true;
    // Here, we cannot rely on checking an empty [] for the prereqs of the
    // course like: if(!prerequisiteMap.get(course).length) return true
    // because the focus is on providing a valid ordering
    // The above length condition would prevent us from actually visiting a
    // course and so, we won't be able to push it to the result
    // Whereas, the visited set marks it as 'visited' and actually visits it
    // (goes through its (empty) prereqs) and then pushes it to the result

    cycle.add(course);
    for (let prereq of prerequisiteMap.get(course)) {
      // If one prereq cannot be completed => the course cannot be completed (cycle)
      if (!dfs(prereq)) return false;
    }
    // Already finished visiting the course
    cycle.delete(course);
    visited.add(course);
    result.push(course);
    // Course can be visited => set it to []
    return true;
  };
  for (let i = 0; i < numCourses; i++) {
    if (!dfs(i)) return [];
  }
  return result;
};

/*

Why This Works:

DFS ensures prerequisites are processed first
Adding to result after processing prerequisites ensures valid ordering
Cycle detection prevents invalid cases
Visited set prevents reprocessing and ensures each course appears once

*/

/*

Time Complexity:

The code uses a depth-first search (DFS) algorithm to traverse the graph and find the topological ordering of courses.
In the worst case, the DFS function visits each course once and each prerequisite once, leading to a time complexity of O(V + E), where V is the number of courses (vertices), and E is the number of prerequisites (edges) in the graph.
The initialization of prerequisiteMap and other data structures takes O(numCourses) time, but this is dominated by the DFS traversal.
So, the overall time complexity of the code is O(V + E), where V is numCourses, and E is the number of prerequisites.

Space Complexity:

The space complexity is determined by the additional data structures used during the DFS traversal:
prerequisiteMap: It stores the prerequisites for each course, which requires O(numCourses + E) space because, in the worst case, there can be E prerequisites in total.
visited and cycle sets: These sets store visited courses and courses being visited to detect cycles. In the worst case, they may store all the courses, leading to O(numCourses) space.
result array: It stores the topological ordering, which can have at most numCourses elements.
So, the overall space complexity of the code is O(numCourses + E).


*/
