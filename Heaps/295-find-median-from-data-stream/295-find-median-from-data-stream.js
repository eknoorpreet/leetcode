/*

The median is the middle value in an ordered integer list. If the size of the list is even, there is no middle value, and the median is the mean of the two middle values.

For example, for arr = [2,3,4], the median is 3.
For example, for arr = [2,3], the median is (2 + 3) / 2 = 2.5.
Implement the MedianFinder class:

MedianFinder() initializes the MedianFinder object.
void addNum(int num) adds the integer num from the data stream to the data structure.
double findMedian() returns the median of all elements so far. Answers within 10-5 of the actual answer will be accepted.


Example 1:

Input
["MedianFinder", "addNum", "addNum", "findMedian", "addNum", "findMedian"]
[[], [1], [2], [], [3], []]
Output
[null, null, null, 1.5, null, 2.0]

Explanation
MedianFinder medianFinder = new MedianFinder();
medianFinder.addNum(1);    // arr = [1]
medianFinder.addNum(2);    // arr = [1, 2]
medianFinder.findMedian(); // return 1.5 (i.e., (1 + 2) / 2)
medianFinder.addNum(3);    // arr[1, 2, 3]
medianFinder.findMedian(); // return 2.0


Constraints:

-10^5 <= num <= 10^5
There will be at least one element in the data structure before calling findMedian.
At most 5 * 10^4 calls will be made to addNum and findMedian.


Follow up:

If all integer numbers from the stream are in the range [0, 100], how would you optimize your solution?
If 99% of all integer numbers from the stream are in the range [0, 100], how would you optimize your solution?

*/

class Node {
  constructor(val, priority) {
    this.val = val;
    this.priority = priority;
  }
}

class MinHeap {
  constructor() {
    this.values = []; //an array that will hold heap data
  }

  insert(element) {
    this.values.push(element);
    this.bubbleUp();
    return this;
  }

  bubbleUp() {
    let currentIdx = this.values.length - 1;
    const element = this.values[currentIdx];

    while (currentIdx > 0) {
      let parentIdx = Math.floor((currentIdx - 1) / 2);
      let parent = this.values[parentIdx];
      //in min heap, parent should be lesser than element
      //as long as the opposite is the case => keep swapping
      if (element < parent) {
        this.values[parentIdx] = element;
        this.values[currentIdx] = parent;
        // [this.values[parentIdx], this.values[currentIdx]] = [element, parent]
        currentIdx = parentIdx;
      } else {
        break;
      }
    }
    return this;
  }

  extractMin() {
    const max = this.values[0];
    const end = this.values.pop();
    if (this.values.length > 0) {
      this.values[0] = end;
      this.sinkDown();
    }
    return max;
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
        if (leftChild < element) {
          swap = leftChildIdx;
        }
      }

      if (rightChildIdx < length) {
        //make sure it's in bounds
        rightChild = this.values[rightChildIdx];
        if (
          (swap === null && rightChild < element) ||
          (swap !== null && rightChild < leftChild)
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

class MaxHeap {
  constructor() {
    this.values = [];
  }

  insert(element) {
    this.values.push(element);
    this.bubbleUp();
  }

  bubbleUp() {
    let idx = this.values.length - 1;
    const element = this.values[idx];

    while (idx > 0) {
      let parentIdx = Math.floor((idx - 1) / 2);
      let parent = this.values[parentIdx];
      //in max heap, parent should be greater than element
      //as long as the opposite is the case => keep swapping
      if (element > parent) {
        this.values[parentIdx] = element;
        this.values[idx] = parent;
        idx = parentIdx;
      } else {
        break;
      }
    }
  }

  extractMax() {
    const max = this.values[0];
    const end = this.values.pop();
    //if only 1 element left, we're just popping the last element and saving it to front (re-inserting)
    //therefore, we should only do it if length > 0
    if (this.values.length > 0) {
      //swap the first value with last (shape property met!)
      this.values[0] = end;
      //heap property no longer satisfies
      //sink down the element to its correct spot
      this.sinkDown();
    }
    return max;
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

      //swap the parent with the larger child (make sure it's in bounds)
      if (leftChildIdx < length) {
        leftChild = this.values[leftChildIdx];
        if (leftChild > element) {
          swap = leftChildIdx; //the index we're going to swap with
        }
      }

      if (rightChildIdx < length) {
        //make sure it's in bounds
        rightChild = this.values[rightChildIdx];
        if (
          (swap === null && rightChild > element) ||
          (swap !== null && rightChild > leftChild)
        ) {
          swap = rightChildIdx;
        }
      }

      if (swap === null) break;
      //here, you actually swap (with left or right child)
      this.values[idx] = this.values[swap];
      this.values[swap] = element;
      idx = swap;
    }
  }

  peek() {
    return this.values[0];
  }
}

const MedianFinder0 = function () {
  this.nums = [];
};

/**
 * @param {number} num
 * @return {void}
 */
MedianFinder0.prototype.addNum = function (num) {
  let left = 0;
  let right = this.nums.length;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (this.nums[mid] < num) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  // left is the index where we want to insert (found using binary search)
  // 0 means we're not deleting any elements
  // num is the value we want to insert
  this.nums.splice(left, 0, num);
};

/**
 * @return {number}
 */
MedianFinder0.prototype.findMedian = function () {
  const n = this.nums.length;
  if (n % 2 === 1) {
    const middleIndex = Math.floor(n / 2);
    return this.nums[middleIndex];
  } else {
    const rightIndex = Math.floor(n / 2);
    const leftIndex = rightIndex - 1;
    return (this.nums[leftIndex] + this.nums[rightIndex]) / 2;
  }
};

/*

  array.splice(start, deleteCount, item1, item2, ...) is an array method in JavaScript that modifies an array by:

  Starting at index start
  Removing deleteCount elements
  Inserting new elements (item1, item2, etc.) at that position

  Time Complexity:

  addNum: O(n)
  Binary search to find insertion position: O(log n)
  splice operation to insert: O(n) because it needs to shift all elements after insertion point
  Overall bound by splice operation: O(n)

  findMedian: O(1)

  Space Complexity: O(n)

  We store all numbers in the array

  */

/*

  We only need a consistent way to access the median elements. Keeping the entire input sorted is not a requirement.

  Heaps are a natural ingredient for this dish! Adding elements to them take logarithmic order of time. They also give direct access to the maximal/minimal elements in a group.

  If we could maintain two heaps in the following way:

  A max-heap to store the smaller half of the input numbers
  A min-heap to store the larger half of the input numbers
  This gives access to median values in the input: they comprise the top of the heaps!

  The max-heap smallHeap is allowed to store, at worst, one more element more than the min-heap hi. Hence if we have processed k elements:

  If k = 2n + 1, then smallHeap is allowed to hold n + 1 elements, while largeHeap can hold n elements.
  If k = 2n, then both heaps are balanced and hold n elements each.

  */

const MedianFinder = function () {
  // contains all the smaller half of the numbers
  this.smallHeap = new MaxHeap();

  // contains all the larger half of the numbers
  this.largeHeap = new MinHeap();
};

/**
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function (num) {
  // First, add to small heap
  this.smallHeap.insert(num);
  // Since smallHeap received a new element, we must do a balancing step for largeHeap.
  // So remove the largest element from lo and offer it to hi.
  this.largeHeap.insert(this.smallHeap.extractMax());
  // largeHeap might end holding more elements than the max-heap smallHeap, after the previous
  // operation. We fix that by removing the smallest element from largeHeap
  // and offering it to smallHeap
  if (this.smallHeap.values.length < this.largeHeap.values.length) {
    this.smallHeap.insert(this.largeHeap.extractMin());
  }
};

/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function () {
  // Odd count: return middle number
  if (this.smallHeap.values.length > this.largeHeap.values.length) {
    return this.smallHeap.peek();
  } else {
    // Even count: average of middles
    return (this.smallHeap.peek() + this.largeHeap.peek()) / 2;
  }
};

/*

  Time Complexity:

  addNum: O(log n) - due to heap operations
  findMedian: O(1) - just peeking at heap tops

  Space Complexity: O(n) to store n numbers across both heaps

  */

/**
 * Your MedianFinder object will be instantiated and called as such:
 * var obj = new MedianFinder()
 * obj.addNum(num)
 * var param_2 = obj.findMedian()
 */
