/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @param {number[][]} queries
 * @return {boolean[]}
 */

const checkIfPrerequisite = function (numCourses, prerequisites, queries) {
  //course mapped to its prerequisites
  //(adjacency list: node mapped to its edges)
  const adjacencyList = new Map();
  for (let n = 0; n < numCourses; n++) {
    adjacencyList.set(n, []);
  }
  for (let [prerequisite, course] of prerequisites) {
    // adjacencyList.set(course, adjacencyList.get(course) ? [...adjacencyList.get(course), prerequisite] : [prerequisite])
    adjacencyList.set(course, [...adjacencyList.get(course), prerequisite]);
  }

  const allPrerequisiteMap = {};
  //purpose of dfs is to populate the prerequisiteMap
  const dfs = (course) => {
    //if the course has not been visited yet
    if (!(course in allPrerequisiteMap)) {
      //map the course to all (direct/indirect) prereqs (denoted by a set)
      allPrerequisiteMap[course] = new Set();
      //let's say course = 0, go through all (direct) prereqs of 0: [1, 2]
      for (let prereq of adjacencyList.get(course)) {
        //for each prereq, run dfs to find their (direct/indirect) prereqs
        //basically, map the course to its prereq's prereqs (course's
        //indirect prereqs)
        for (let item of dfs(prereq)) {
          allPrerequisiteMap[course].add(item);
        }
        // allPrerequisiteMap[course] = new Set(...allPrerequisiteMap[course], ...dfs(prereq))
      }
      allPrerequisiteMap[course].add(course);
    }
    return allPrerequisiteMap[course];
  };

  for (let course = 0; course < numCourses; course++) {
    dfs(course);
  }

  const result = [];
  for (let [u, v] of queries) {
    result.push(allPrerequisiteMap[v].has(u));
  }
  return result;
};

//TC: O(queries * (nodes + prereqs))
//Optimized: O(N(E + N)) (visit each edge and node only once) + Q (first populate, then answer the queries)
