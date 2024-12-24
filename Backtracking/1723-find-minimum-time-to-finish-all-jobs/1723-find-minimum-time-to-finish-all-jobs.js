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

What Happens in the Recursive Calls?

At Each Level:
You’re assigning the current job (jobs[i]) to one of the workers (j).
After assigning the job, you recursively move to the next job (i + 1) using backtrack(i + 1).

Exploration of Assignments:
The loop iterates over all workers (j = 0 to k - 1).
Each worker tries taking the current job, updating their workload (workers[j] += jobs[i]).
After exploring this possibility, you undo the assignment (workers[j] -= jobs[i]) to backtrack and try other combinations.

Base Case:
When all jobs are assigned (i === jobs.length), we calculate the maximum workload (Math.max(...workers)) and update the result if this workload is better (smaller).

Gives TLE
*/

const minimumTimeRequired0 = function (jobs, k) {
  let minMaxWorkTime = Number.MAX_VALUE;
  // Represents the total time assigned to each worker at a given point.
  const workers = Array(k).fill(0);
  const backtrack = (i) => {
    // Base case: All jobs have been assigned
    if (i === jobs.length) {
      // Find maximum working time among all workers
      const maxWorkTime = Math.max(...workers);
      // Update the minimum maximum working time
      minMaxWorkTime = Math.min(minMaxWorkTime, maxWorkTime);
      return;
    }

    // Try assigning current job to each worker
    for (let j = 0; j < k; j++) {
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
  return minMaxWorkTime;
};

/*

Optimization Techniques

Pruning Technique 1 - Avoiding Redundant Explorations:

seen.has(workers[j]) prevents duplicate assignments to workers with the same workload.
This reduces unnecessary recursive calls.

Without seen:
Imagine two workers have the same workload (e.g., both 0). Assigning a job to one worker and then to the other results in identical states. This creates redundant calculations, which wastes time.

With seen:
Before assigning a job to a worker (j), you check:
if (seen.has(workers[j])) continue
This ensures you only assign the job to one of the workers with the same workload during the current recursive step.
The set seen keeps track of workloads you've already tried for this job.


Pruning Technique 2 - Early Termination:

workers[j] + jobs[i] >= result stops exploring paths that won't improve the solution.
This significantly reduces the search space.

*/

const minimumTimeRequired1 = function (jobs, k) {
  let minMaxWorkTime = Number.MAX_VALUE;
  // Represents the total time assigned to each worker at a given point.
  const workers = Array(k).fill(0);
  const backtrack = (i) => {
    // Base case: All jobs have been assigned
    if (i === jobs.length) {
      // Find maximum working time among all workers
      const maxWorkTime = Math.max(...workers);
      // Update the minimum maximum working time
      minMaxWorkTime = Math.min(minMaxWorkTime, maxWorkTime);
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
      if (workers[j] + jobs[i] >= minMaxWorkTime) continue;
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
  return minMaxWorkTime;
};

/*

Time Complexity: O(k^n)

n is the number of jobs
k is the number of workers
At each step, we try to assign the current job to any of k workers
The recursive tree explores all possible job assignments
For each job, we have k choices
Total number of recursive calls ≈ k.k.k. ... n times => k^n

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
left (minimum bound): The largest single job. No worker can take on less than this because at least one worker must handle the largest job.
right (maximum bound): The sum of all jobs. This is the worst case where one worker does all the jobs.

We use binary search to narrow down the range between left and right to find the minimum possible maximum working time.


Greedy Distribution with Backtracking

Sort jobs in descending order to optimize initial distribution. Why? Assigning the largest jobs first reduces the likelihood of exceeding the maximum working time. This optimization improves the performance of the backtracking step

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

    // Check if it's possible to distribute jobs with max working 'mid' (candidate maximum time)
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
    // If jobs[i] couldn't be assigned when worker j (the current worker) is empty, then assigning
    // jobs[i] to any subsequent worker j+1,j+2,… will also fail.
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
