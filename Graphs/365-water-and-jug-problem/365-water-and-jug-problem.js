/*

You are given two jugs with capacities x liters and y liters. You have an infinite water supply. Return whether the total amount of water in both jugs may reach target using the following operations:

Fill either jug completely with water.
Completely empty either jug.
Pour water from one jug into another until the receiving jug is full, or the transferring jug is empty.


Example 1:

Input: x = 3, y = 5, target = 4

Output: true

Explanation:

Follow these steps to reach a total of 4 liters:

Fill the 5-liter jug (0, 5).
Pour from the 5-liter jug into the 3-liter jug, leaving 2 liters (3, 2).
Empty the 3-liter jug (0, 2).
Transfer the 2 liters from the 5-liter jug to the 3-liter jug (2, 0).
Fill the 5-liter jug again (2, 5).
Pour from the 5-liter jug into the 3-liter jug until the 3-liter jug is full. This leaves 4 liters in the 5-liter jug (3, 4).
Empty the 3-liter jug. Now, you have exactly 4 liters in the 5-liter jug (0, 4).
Reference: The Die Hard example.

Example 2:

Input: x = 2, y = 6, target = 5

Output: false

Example 3:

Input: x = 1, y = 2, target = 3

Output: true

Explanation: Fill both jugs. The total amount of water in both jugs is equal to 3 now.



Constraints:

1 <= x, y, target <= 10^3

*/

/**
 * @param {number} x
 * @param {number} y
 * @param {number} target
 * @return {boolean}
 */

/*

Intuition:
Realize that the problem is about exploring different water configurations
Each state is defined by the amount of water in two jugs
Possible operations are limited (fill, empty, pour)

Perform an exhaustive search of all possible water configurations.
By exploring every possible way to move water between the two jugs, we can determine whether
the target amount can be achieved.

*/

const canMeasureWater = function (x, y, target) {
  // Ensure x is the smaller jug by swapping if necessary
  // By always making x the smaller jug, we create a consistent algorithm structure
  if (x > y) {
    // Swap x and y to ensure x <= y
    [x, y] = [y, x];
  }

  // If the target is greater than the sum of both jars, it's not possible
  if (target > x + y) {
    return false;
  }

  // Use a queue to track states to explore
  // Initialize the queue with an initial state (0, 0) (both jugs empty) and a visited set
  const queue = [[0, 0]];
  // Prevents exploring the same state multiple times
  const visited = new Set();
  visited.add('0-0');

  while (queue.length > 0) {
    // 'a' represents the current amount of water in the x-liter jug
    // 'b' represents the current amount of water in the y-liter jug
    const [a, b] = queue.shift();

    // If the current sum equals z, return true
    if (a + b === target) {
      return true;
    }

    const states = new Set();

    // Generate all possible states
    states.add(`${x}-${b}`); // Fill jar x completely
    states.add(`${a}-${y}`); // Fill jar y completely
    states.add(`0-${b}`); // Empty jar x
    states.add(`${a}-0`); // Empty jar y
    // Math.min(x, b + a) ensures you don't overfill the receiving jug
    // Water to pour from y to x to fill x completely: x - a, y will have remaining: b - (x - a)
    states.add(`${Math.min(x, b + a)}-${b < x - a ? 0 : b - (x - a)}`); // Pour from y-jug to x-jug
    states.add(`${a + b < y ? 0 : a - (y - b)}-${Math.min(b + a, y)}`); // Pour from x-jug to y-jug

    // Same as processing a cell in a grid and then, exploring all its directions
    for (const state of states) {
      const [newA, newB] = state.split('-').map(Number);
      // Same as: const [newA, newB] = state.split('-').map(st => Number(st));
      // Convert state to string for tracking
      const key = `${newA}-${newB}`;

      // Check if state has not been explored before
      if (!visited.has(key)) {
        // Add to queue and visited set
        queue.push([newA, newB]);
        visited.add(key);
      }
    }
  }

  // If no solution found, return false
  return false;
};

/*

Time and Space Complexity:

Time Complexity: O(x * y), as we explore all possible states
Space Complexity: O(x * y) to store visited states

State Space Exploration:

Total possible states = (x + 1) * (y + 1)
Each state represents a unique water configuration
Maximum number of states = (x + 1) * (y + 1)

*/
