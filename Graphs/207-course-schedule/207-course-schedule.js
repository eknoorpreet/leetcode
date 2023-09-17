/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */

/*

course ---- (outgoing edge) ---> prerequisite
no outward edge => no prerequisites (can take the course)!

Basically, in order to take the course, check if you can take all its prerequisites. In order to take the prerequisites, check if you can take all their prerequisites => DFS

Check for all courses

Impossible:
course ---- (outgoing edge) ---> prerequisite
prerequisite ---- (outgoing edge) ---> course
(cycle)

*/
const canFinish = function (numCourses, prerequisites) {
  //course mapped to its prerequisites
  //(adjacency list: node mapped to its edges)
  const prerequisiteMap = new Map();
  const cycle = new Set(); //to detect cycles
  for (let n = 0; n < numCourses; n++) {
    prerequisiteMap.set(n, []);
  }
  for (let [course, prerequisite] of prerequisites) {
    // prerequisiteMap.set(course, prerequisiteMap.get(course) ? [...prerequisiteMap.get(course), prerequisite] : [prerequisite])
    prerequisiteMap.set(course, [...prerequisiteMap.get(course), prerequisite]);
  }
  const dfs = (course) => {
    //base case: visiting a course twice (loop/cycle) => false
    if (cycle.has(course)) return false;
    //base case: no prereqs => true (can be completed)
    //here, instead of this condition, we can optionally use another set to check if it's been visited before like: if(visited.has(course)) return true
    if (!prerequisiteMap.get(course).length) return true;
    cycle.add(course);
    for (let prereq of prerequisiteMap.get(course)) {
      //if one prereq cannot be completed => the course cannot be completed
      if (!dfs(prereq)) return false;
    }
    //already finished visiting the course
    //Why remove the course from the cycle set? After going through all
    //prereqs (and not returning false),
    //we know that the course can be completed. But if the course remains in
    //the cycle set, it can be a problem for checking a future course
    //(will say it's a cycle and return false) (See Note 1)
    cycle.delete(course);
    //course can be visited => set it to [] (denotes that no prereqs; can be completed)
    //If it's already determined that a prereq (for course 1) course, can be completed nd it's also a prereq for course 2, we wouldn't have to go through the prereq's prereqs again since it's an empty list
    //We're marking the course as 'visited'. We can also use another set to track visited courses and do visited.add(course) here instead of this condition
    prerequisiteMap.set(course, []);
    return true;
  };
  for (let i = 0; i < numCourses; i++) {
    if (!dfs(i)) return false;
  }
  return true;
};

/*

Note 1: The reason for removing the course from the cycle set after checking all its prerequisites is to ensure that we don't mistakenly consider it as part of a cycle when we move back up the recursive call stack.

In a depth-first search (DFS) traversal of a graph, when we visit a node (in this case, a course), we mark it as visited to prevent infinite loops (cycles) in the graph. However, once we have explored all the paths stemming from that course and its prerequisites, we should remove it from the visited set.

While recursively exploring the prerequisites of the course, if we encounter a course that is already in the cycle set, it means we have encountered a cycle. Removing the course from the cycle set allows us to backtrack properly and continue exploring other paths.

If we don't remove the course from the cycle set after exploring all its prerequisites, we might falsely detect a cycle when we encounter the same course later in a different traversal path. Removing it ensures that each course is only considered once in the current traversal path.


Time Complexity:

Building the prerequisiteMap from the prerequisites array takes O(E) time, where E is the number of prerequisites provided in the input.

The main work is done in the dfs function, which performs a depth-first search on the graph represented by prerequisiteMap. In the worst case, it visits all courses and prerequisites once, resulting in O(V + E) time complexity, where V is the number of courses.

The loop that calls dfs for each course runs O(V) times.

Combining these steps, the overall time complexity of the code is O(V + E), where V is the number of courses, and E is the number of prerequisites.

Space Complexity:

The prerequisiteMap stores the prerequisites for each course, taking O(V + E) space since it has V keys (courses) and E values (prerequisites).

The visited set can store up to V courses in the worst case, so it takes O(V) space.

The recursion stack for the DFS can also take up to O(V) space in the worst case (for an unbalanced graph).

Combining these space requirements, the overall space complexity of the code is O(V + E).
*/
