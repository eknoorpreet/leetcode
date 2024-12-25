/*

You have k lists of sorted integers in non-decreasing order. Find the smallest range that includes at least one number from each of the k lists.

We define the range [a, b] is smaller than range [c, d] if b - a < d - c or a < c if b - a == d - c.



Example 1:

Input: nums = [[4,10,15,24,26],[0,9,12,20],[5,18,22,30]]
Output: [20,24]
Explanation:
List 1: [4, 10, 15, 24,26], 24 is in range [20,24].
List 2: [0, 9, 12, 20], 20 is in range [20,24].
List 3: [5, 18, 22, 30], 22 is in range [20,24].
Example 2:

Input: nums = [[1,2,3],[1,2,3],[1,2,3]]
Output: [1,1]


Constraints:

nums.length == k
1 <= k <= 3500
1 <= nums[i].length <= 50
-10^5 <= nums[i][j] <= 10^5
nums[i] is sorted in non-decreasing order.

*/

/**
 * @param {number[][]} nums
 * @return {number[]}
 */

class Node {
  constructor(val, priority) {
    this.val = val;
    this.priority = priority;
  }
}

class MyPriorityQueue {
  constructor() {
    this.values = [];
  }

  enqueue(val, priority) {
    const newNode = new Node(val, priority);
    this.values.push(newNode);
    this.bubbleUp();
  }

  bubbleUp() {
    let idx = this.values.length - 1;
    const element = this.values[idx];

    while (idx > 0) {
      let parentIdx = Math.floor((idx - 1) / 2);
      let parent = this.values[parentIdx];
      // lower priority number = higher priority
      if (
        element.priority < parent.priority ||
        (element.priority === parent.priority && element.val < parent.val)
      ) {
        this.values[parentIdx] = element;
        this.values[idx] = parent;
        idx = parentIdx;
      } else {
        break;
      }
    }
  }

  dequeue() {
    const min = this.values[0];
    const end = this.values.pop();
    if (this.values.length > 0) {
      this.values[0] = end;
      this.sinkDown();
    }
    return min;
  }

  sinkDown() {
    let idx = 0;
    const length = this.values.length;
    const element = this.values[0];

    while (true) {
      let leftChildIdx = 2 * idx + 1;
      let rightChildIdx = 2 * idx + 2;
      let leftChild, rightChild;
      let swap = null;

      if (leftChildIdx < length) {
        leftChild = this.values[leftChildIdx];
        if (
          leftChild.priority < element.priority ||
          (leftChild.priority === element.priority &&
            leftChild.val < element.val)
        ) {
          swap = leftChildIdx;
        }
      }

      if (rightChildIdx < length) {
        rightChild = this.values[rightChildIdx];
        if (
          (swap === null &&
            (rightChild.priority < element.priority ||
              (rightChild.priority === element.priority &&
                rightChild.val < element.val))) ||
          (swap !== null &&
            (rightChild.priority < leftChild.priority ||
              (rightChild.priority === leftChild.priority &&
                rightChild.val < leftChild.val)))
        ) {
          swap = rightChildIdx;
        }
      }

      if (swap === null) break;
      this.values[idx] = this.values[swap];
      this.values[swap] = element;
      idx = swap;
    }
  }

  peek() {
    return this.values[0];
  }
}

/*

At any moment, we need to select one number from each list. So, to find the smallest range,
we need to minimize the difference between the largest and smallest numbers chosen at each step.
The important point here is that, at any time, our range is defined by the smallest number chosen
and the largest number chosen.

So we need to select the smallest number among the current numbers picked from each list and
move forward by choosing the next number from the same list that gave us this smallest number.
This makes sense because moving forward in any other list would only increase the range, which
we want to avoid. We repeat this process of updating the smallest number and checking if the new
range is smaller than our previously found range. If it is, we update the range.

We continue this until we reach the end of one of the lists because, at that point, it’s no
longer possible to select a number from each list.

*/

const smallestRange0 = (nums) => {
  const k = nums.length;
  // Stores the current index of each list
  const indices = Array(k).fill(0);
  // To track the smallest range
  const rangeList = [0, Infinity];

  while (true) {
    let curMin = Infinity;
    let curMax = -Infinity;
    let minListIndex = 0;

    // Find the current minimum and maximum values across the lists
    for (let i = 0; i < k; i++) {
      const currentElement = nums[i][indices[i]];

      // Update the current minimum
      if (currentElement < curMin) {
        curMin = currentElement;
        minListIndex = i;
      }

      // Update the current maximum
      if (currentElement > curMax) {
        curMax = currentElement;
      }
    }

    // Update the range if a smaller one is found
    if (curMax - curMin < rangeList[1] - rangeList[0]) {
      rangeList[0] = curMin;
      rangeList[1] = curMax;
    }

    // Move to the next element in the list that had the minimum value
    indices[minListIndex]++;
    if (indices[minListIndex] === nums[minListIndex].length) {
      break;
    }
  }

  return rangeList;
};

/*

  Approach: Min-Heap with Sliding Window Concept
  Key Intuition:

  Maintain a min-heap to always have the smallest current element
  Keep track of the maximum value seen so far
  Continuously expand and contract the range to find the smallest possible range

  Window Representation:

  The window is the range [minVal, maxVal]
  Instead of physical array indices, we use actual values
  Window always contains at least one element from each list


  Window Movement Strategy:

  Remove the minimum element
  Attempt to replace it with the next element from the same list
  This effectively "slides" the window by moving the smallest boundary


  Window Optimization:

  Goal is to minimize maxVal - minVal
  Continuously update the smallest range found

  */

const smallestRange = function (nums) {
  const pq = new MyPriorityQueue();
  let maxVal = Number.MIN_SAFE_INTEGER;
  let rangeStart = 0;
  let rangeEnd = Number.MAX_SAFE_INTEGER;

  // Insert the first element from each list into the min-heap
  for (let i = 0; i < nums.length; i++) {
    pq.enqueue({ val: nums[i][0], listIndex: i, elementIndex: 0 }, nums[i][0]);
    // Track the maximum value seen
    // (because our range depends on both the smallest and largest values)
    maxVal = Math.max(maxVal, nums[i][0]);
  }

  // At this point, we have one element from each list
  // From these ekements, we can say we have the min (via min-heap) and max (tracked above) elements
  // This gives us our initial range

  // Continue until we can't proceed further
  // We need exactly one element from EACH list in our heap
  // If heap size < nums.length, we're missing a list
  // Why? Because we need at least one number from each list in our range
  while (pq.values.length === nums.length) {
    // Get the minimum element
    const { val: minVal, listIndex, elementIndex } = pq.dequeue().val;
    console.log('minVal: ', minVal);

    // Update smallest range if current range is smaller
    if (maxVal - minVal < rangeEnd - rangeStart) {
      rangeStart = minVal;
      rangeEnd = maxVal;
    }

    // Try to add next element from the same list
    // because moving forward in any other list would only increase the range
    // How? If our recent min extracted from the heap was from list 0,
    // We know that we already have the mins from list 1 and 2 (because, sorted lists)
    // Getting any other element from either of lists 1 and 2 would be more than what we have
    if (elementIndex + 1 < nums[listIndex].length) {
      const nextVal = nums[listIndex][elementIndex + 1];
      pq.enqueue(
        { val: nextVal, listIndex, elementIndex: elementIndex + 1 },
        nextVal
      );
      maxVal = Math.max(maxVal, nextVal);
    } else {
      // If any list is exhausted, we can't continue
      break;
    }
  }
  return [rangeStart, rangeEnd];
};

/*

  Complexity Analysis
  Let n be the total number of elements across all lists and k be the number of lists.

  Time complexity: O(nlogk)

  The initial loop that inserts the first element from each list into the priority queue runs in O(k). The while loop continues until we have exhausted one of the lists in the priority queue. Each iteration of the loop involves:

  Extracting the minimum element from the priority queue, which takes O(logk).
  Inserting a new element from the same list into the priority queue, which also takes O(logk).
  In the worst case, we will process all n elements, leading to a total complexity of O(nlogk).

  Space complexity: O(k)

  The priority queue can hold at most k elements at any time, corresponding to the first elements of each of the k lists. Thus, the space complexity is O(k).

*/
