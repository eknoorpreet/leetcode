/*

You are given an array of integers nums, there is a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position.

Return the max sliding window.



Example 1:

Input: nums = [1,3,-1,-3,5,3,6,7], k = 3
Output: [3,3,5,5,6,7]
Explanation:
Window position                Max
---------------               -----
[1  3  -1] -3  5  3  6  7       3
 1 [3  -1  -3] 5  3  6  7       3
 1  3 [-1  -3  5] 3  6  7       5
 1  3  -1 [-3  5  3] 6  7       5
 1  3  -1  -3 [5  3  6] 7       6
 1  3  -1  -3  5 [3  6  7]      7
Example 2:

Input: nums = [1], k = 1
Output: [1]


Constraints:

1 <= nums.length <= 10^5
-10^4 <= nums[i] <= 10^4
1 <= k <= nums.length

*/

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

class Dequeue {
  constructor() {
    this.first = new Node();
    this.last = null;
    this.length = 0;
  }

  enqueue(val) {
    this.last.next = new Node(value);
    this.last.next.prev = this.last;
    this.last = this.last.next;
    this.length++;
  }

  dequeue() {
    this.first = this.first.next;
    this.first.prev = null;
    this.length--;
  }

  isEmpty() {
    return this.first.next === null;
  }

  first() {
    return this.first.next.value;
  }

  last() {
    return this.last.value;
  }

  toArray() {
    const nodes = [];
    let currentNode = this.first;
    while (currentNode) {
      nodes.push(currentNode);
      currentNode = currentNode.next;
    }
    return nodes;
  }
}

/*

  Brute-force

  */

const maxSlidingWindow0 = function (nums, k) {
  const result = [];
  let maxElement = 0;
  for (let i = 0; i <= nums.length - k; i++) {
    maxElement = nums[i];
    for (let j = i; j < i + k; j++) {
      maxElement = Math.max(maxElement, nums[j]);
    }
    result.push(maxElement);
  }
  return result;
};

/*

  Time Complexity: O(n * k)
  Space Complexity: O(1)

  */

/*

  Core Idea:

  Maintain a (monotonic decreasing) deque (double-ended queue) that stores potentially maximum values
  The numbers in the deque should be in descending order
  The front of the deque will always have the index of the maximum value in current window

  "Monotonic decreasing" => Keep on adding elements to the dequeue as long as the current element is smaller than the previously processed element. If the current element is larger, maximum element found!
  Since we're limiting our dequeue to k-size at all times, this must be the maximum element in the current window!

  */

const maxSlidingWindow = function (nums, k) {
  const result = [];
  let start = 0;
  const deque = [];

  for (let end = 0; end < nums.length; end++) {
    // Remove all numbers smaller than the current number from the top
    // This maintains descending order in the deque
    // If current number is 6 and deque has [7,5,4], it becomes [7]
    while (deque.length && deque[deque.length - 1] < nums[end]) {
      deque.pop();
    }
    // Add the current element to the deque
    // dequeue = [7,6]
    deque.push(nums[end]);

    // Once we have a valid window, process the maximum element
    if (end >= k - 1) {
      // Add the max of the current window to the output
      // Front of deque is always maximum in current window
      result.push(deque[0]);
      // We're sliding the window by 1 position to the right
      // Check if the leftmost element in our deque is now outside our current sliding window,
      // and if so, remove it (outgoing element).
      // Only consider elements in current k-size window
      if (deque[0] === nums[start]) {
        deque.shift();
      }
      // Slide the window to the right
      start++;
    }
  }
  return result;
};

/*

  Time Complexity: O(n)
  Each element is pushed and popped at most once
  Linear scan through the array

  Space Complexity: O(k)
  Deque stores at most k elements (window size)

  */
