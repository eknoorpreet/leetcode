/**
 * @param {string[]} deadends
 * @param {string} target
 * @return {number}
 */

const openLock = function (deadends, target) {
  const startingPoint = '0000';
  //the lock cannot be opened if it starts at a deadend.
  if (deadends.includes(startingPoint)) return -1;
  const queue = [];
  //O(1) lookup to check the decision is a deadend AND if it has been visited before
  const visited = new Set(deadends);
  let turns = 0;
  queue.push([startingPoint, turns]); //[lock, turns]

  //generates all (8) possible combinations that can be obtained from the current lock combination by either increasing or decreasing one digit at a time
  //"0000" => ["1000", "9000", "0100", "0900", "0010", "0090", "0001", "0009"]
  const generateChildren = (lock) => {
    const result = [];
    //iterate through each of the four digits of the lock
    for (let i = 0; i < lock.length; i++) {
      //(9 + 1) % 10 = 0 (moding by 10 will always give value b/w 0 - 9)
      let digit = `${(Number(lock[i]) + 1) % 10}`;
      result.push(lock.slice(0, i) + digit + lock.slice(i + 1));
      //(0 - 1 + 10) % 10 = 9
      digit = `${(Number(lock[i]) - 1 + 10) % 10}`;
      result.push(lock.slice(0, i) + digit + lock.slice(i + 1));
    }
    return result;
  };

  while (queue.length) {
    const [lock, turns] = queue.shift();
    if (lock === target) return turns;
    //generate all 8 children of the current lock
    for (let child of generateChildren(lock)) {
      //if the lock has already been visited, we don't want to generate the same combinations again
      if (!visited.has(child)) {
        visited.add(child);
        queue.push([child, turns + 1]);
      }
    }
  }
  //if queue becomes empty, we have tried all possible paths to reach target and failed => -1
  return -1;
};

/*

The BFS algorithm explores combinations in a level-by-level manner.
It first explores all combinations that can be reached with 1 turn, then all combinations that can be reached with 2 turns, and so on.
This guarantees that when the target combination is reached, it is done so with the fewest possible turns
because any alternative path with more turns would have been explored later. If the target combination is found, the algorithm immediately returns the turns count at that point.
Since the BFS explores combinations in order of increasing turns, this means that the algorithm
returns the minimum number of turns as soon as it finds a path to the target.

Time Complexity:
The time complexity of the code primarily depends on the size of the search space and the number of operations performed during the BFS traversal.
Search Space Size: In the worst case, the search space consists of all possible combinations of the lock, which is 10^4 (since each wheel has 10 slots). Therefore, the code may need to explore up to 10,000 different combinations.
BFS Traversal: During the BFS traversal, each combination is dequeued once, and its children (up to 8) are generated and enqueued if they have not been visited before. In the worst case, you might enqueue and dequeue each combination once, and this happens for each level of the BFS.

Level 1: 1 combination
Level 2: up to 8 combinations
Level 3: up to 64 combinations
...
So, in the worst case, the code explores a significant portion of the search space. The time complexity can be approximated as O(N), where N is the size of the search space, which is O(10^4) in this case.

Therefore, the overall time complexity is O(N), which is a reasonable time complexity given the constraints of the problem.

Space Complexity:
The space complexity of the code is determined by the additional data structures used for the BFS traversal:
Queue (queue): In the worst case, the queue can contain all combinations of the lock, which is O(N), where N is the size of the search space (O(10^4) in this case).
Set (visited): The visited set stores combinations that have been visited to avoid revisiting them. In the worst case, it can contain all combinations of the lock, which is also O(N).

*/
