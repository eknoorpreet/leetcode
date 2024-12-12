/*

You are given an integer array jobs, where jobs[i] is the amount of time it takes to complete the ith job.

There are k workers that you can assign jobs to. Each job should be assigned to exactly one worker. The working time of a worker is the sum of the time it takes to complete all jobs assigned to them. Your goal is to devise an optimal assignment such that the maximum working time of any worker is minimized.

Return the minimum possible maximum working time of any assignment.



Example 1:

Input: jobs = [3,2,3], k = 3
Output: 3
Explanation: By assigning each person one job, the maximum time is 3.
Example 2:

Input: jobs = [1,2,4,7,8], k = 2
Output: 11
Explanation: Assign the jobs the following way:
Worker 1: 1, 2, 8 (working time = 1 + 2 + 8 = 11)
Worker 2: 4, 7 (working time = 4 + 7 = 11)
The maximum working time is 11.


Constraints:

1 <= k <= jobs.length <= 12
1 <= jobs[i] <= 10^7

*/

/**
 * @param {number[]} jobs
 * @param {number} k
 * @return {number}
 */

/*

Intuition:

Use a depth-first search to explore all possible job assignments.
Try to assign each job to different workers.
After exploring a particular assignment, it backtracks to try other possibilities.
This ensures all possible distributions are considered.

Optimization Techniques

Pruning Technique 1 - Avoiding Redundant Explorations:

seen.has(workers[j]) prevents exploring identical worker load configurations.
This reduces unnecessary recursive calls.


Pruning Technique 2 - Early Termination:

workers[j] + jobs[i] >= result stops exploring paths that won't improve the solution.
This significantly reduces the search space.

*/

const minimumTimeRequired0 = function (jobs, k) {
  let result = Number.MAX_VALUE;
  const workers = Array(k).fill(0);
  const backtrack = (i) => {
    // Base case: All jobs have been assigned
    if (i === jobs.length) {
      // Update the minimum maximum working time
      result = Math.min(result, Math.max(...workers));
      return;
    }
    // Optimization: Track seen worker loads to avoid redundant assignments
    const seen = new Set();

    // Try assigning current job to each worker
    for (let j = 0; j < k; j++) {
      // Pruning technique 1: Skip if worker load is already seen
      if (seen.has(workers[j])) continue;

      // Pruning technique 2: Avoid unnecessary explorations
      // If adding this job would exceed current best result
      if (workers[j] + jobs[i] >= result) continue;
      // Mark this worker load as seen
      seen.add(workers[j]);
      // Assign job to current worker
      workers[j] += jobs[i];
      // Recursively assign next job
      backtrack(i + 1);
      // Backtrack: Remove job assignment
      workers[j] -= jobs[i];
    }
  };
  // Start DFS from first job
  backtrack(0);
  return result;
};

/*

Time Complexity: O(k^n)

n is the number of jobs
k is the number of workers
At each step, we try to assign the current job to any of k workers
The recursive tree explores all possible job assignments
For each job, we have k choices
Total number of recursive calls ≈ k^n

Space Complexity: O(n)

Recursive call stack depth is equal to the number of jobs
Additional space for the workers array: O(k)
Additional space for seen set: O(k)
Overall space complexity is O(n) due to the recursive call stack

*/

/*

Optimizations:

Binary search can be applied to optimization problems with a clear search space

Instead of exhaustively trying all distributions, we use binary search to find the minimum possible maximum working time.
The search range is between the maximum single job time and the total job time.

Greedy Distribution with Backtracking

Sort jobs in descending order to optimize initial distribution
Use a backtracking method to check if jobs can be distributed within a given limit


Pruning Techniques

Early termination if worker load exceeds limit
Break early if a worker is left empty after backtracking

*/

const minimumTimeRequired = function (jobs, k) {
  // Sort jobs in descending order to optimize distribution
  jobs.sort((a, b) => b - a);

  // Binary search to find the minimum possible maximum working time
  // Minimum possible maximum time = Largest single job
  // Maximum possible maximum time = Sum of all jobs (worst case: one worker does all jobs)
  let left = Math.max(...jobs); // 3 (max single job)
  let right = jobs.reduce((sum, job) => sum + job, 0); // 8 (sum of all jobs)

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    // console.log(left, right, mid)

    // Check if it's possible to distribute jobs with max working 'mid'
    if (canDistribute(jobs, k, mid)) {
      // If possible, try to reduce max time
      right = mid;
    } else {
      // If not possible, increase max time (search right)
      left = mid + 1;
    }
  }

  return left;
};

// Check if jobs can be distributed among k workers with max working time <= limit
const canDistribute = (jobs, k, limit) => {
  // Use an array to track worker loads
  const workers = new Array(k).fill(0);

  // Greedy approach to distribute jobs
  return backtrack(jobs, 0, workers, limit);
};

const backtrack = (jobs, i, workers, limit) => {
  // Base case: all jobs assigned
  if (i === jobs.length) return true;

  // Try to assign current job to each worker
  for (let j = 0; j < workers.length; j++) {
    // Skip if adding this job would exceed the limit
    if (workers[j] + jobs[i] > limit) continue;

    // Assign job to worker
    workers[j] += jobs[i];

    // Recursively try to assign remaining jobs
    if (backtrack(jobs, i + 1, workers, limit)) return true;

    // Backtrack
    workers[j] -= jobs[i];

    // Optimization: if worker is empty after backtracking, no need to try further
    if (workers[j] === 0) break;
  }

  return false;
};

/*

Time Complexity: O(n * log(sum) * k)

Sorting Jobs: O(n log n)

Binary Search Range:
Search space is from max(jobs) to sum(jobs)
Number of binary search iterations: log(sum of jobs)

Backtracking Distribution Check:

For each binary search iteration, we do a backtracking distribution check
Backtracking takes O(k^n) in worst case
But with pruning, practically it's much more efficient, closer to O(n * k)

So the overall time complexity becomes:
O(n log n) for sorting
Multiplied by O(log(sum)) for binary search
Multiplied by O(n * k) for distribution check

Final Time Complexity: O(n * log(sum) * k)

Space Complexity: O(n)

Recursive call stack depth is number of jobs: O(n)
Workers array: O(k)
Additional space for backtracking: O(n)

*/
