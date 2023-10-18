/*

Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.



Example 1:

Input: nums = [1,1,1,2,2,3], k = 2
Output: [1,2]
Example 2:

Input: nums = [1], k = 1
Output: [1]


Constraints:

1 <= nums.length <= 105
-104 <= nums[i] <= 104
k is in the range [1, the number of unique elements in the array].
It is guaranteed that the answer is unique.


Follow up: Your algorithm's time complexity must be better than O(n log n), where n is the array's size.

*/

/**
 * @param {number[]} nums
 * @param {number} k
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
      // as long as the element's priority is lesser than the parent's => keep swapping
      if (element.priority < parent.priority) {
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
        //make sure it's in bounds
        leftChild = this.values[leftChildIdx];
        if (leftChild.priority < element.priority) {
          swap = leftChildIdx;
        }
      }

      if (rightChildIdx < length) {
        //make sure it's in bounds
        rightChild = this.values[rightChildIdx];
        if (
          (swap === null && rightChild.priority < element.priority) ||
          (swap !== null && rightChild.priority < leftChild.priority)
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
}

const topKFrequent0 = function (nums, k) {
  const map = new Map();
  const pq = new MyPriorityQueue();
  for (let i = 0; i < nums.length; i++) {
    map.set(nums[i], (map.get(nums[i]) || 0) + 1);
  }
  map.forEach((freq, num) => {
    pq.enqueue(num, freq);
    if (pq.values.length > k) pq.dequeue();
  });

  const result = pq.values.map((el) => el.val);
  return result;
};

//bucket sort

const topKFrequent = function (nums, k) {
  // Step 1: Create a frequency map
  // to count the occurrences of each element in the array
  const frequencyMap = new Map();
  for (const num of nums) {
    frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
  }

  // Step 2: Create an array of buckets
  // In this step, the elements are distributed into buckets based on their
  // frequency. Each bucket contains elements with the same frequency. The index
  // of the bucket represents the frequency of the elements it contains.
  // [ <1 empty item>, [ 3 ], [ 2 ], [ 1 ], <3 empty items> ]
  const buckets = new Array(nums.length);
  for (const [num, freq] of frequencyMap) {
    if (!buckets[freq]) {
      buckets[freq] = [];
    }
    buckets[freq].push(num);
  }

  // Step 3: Build the result array
  // iterate through the buckets in reverse order (from higher frequencies to
  // lower frequencies)
  // bucket length is limited to n => O(n)
  const result = [];
  for (let i = buckets.length - 1; i >= 0 && k > 0; i--) {
    // if a bucket exists
    if (buckets[i]) {
      // add its elements to the result array until k elements are collected.
      result.push(...buckets[i]);
      k -= buckets[i].length;
    }
  }

  return result;
};
