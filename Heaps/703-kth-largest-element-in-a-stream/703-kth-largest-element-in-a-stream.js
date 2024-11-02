/**
 * @param {number} k
 * @param {number[]} nums
 */

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

/*
  A min heap of size k.

  Add/pop elements in O(log n) time
  Get min elements in min heap in O(1) time

  Why size k?
  Because we'll only be adding elements to the stream, not removing it
  [4, 5, 8, 2]. We just a heap of size k (here, 3) so we can have the 3 largest numbers and just return the minimum / 3rd largest (4). We will never 2. Since we'll never be removing (fromt the stream), 2's turn will never come!
  */

const KthLargest = function (k, nums) {
  // if(nums.length < k) return -1
  this.minHeap = new MinHeap();
  this.k = k;
  nums.forEach((num) => {
    this.add(num);
  });
};

/**
 * @param {number} val
 * @return {number}
 */
KthLargest.prototype.add = function (val) {
  //insert the value into the min heap
  this.minHeap.insert(val);
  //if heap size > k, pop! (we added one more than k)
  if (this.minHeap.values.length > this.k) this.minHeap.extractMin();
  return this.minHeap.peek();
};

/*
  Time Complexity:
  The insertion into the min heap takes O(log k) time for each element, and since there are n elements in the nums array, the total time complexity for the constructor is O(n * log k).

  The add method inserts the new value into the min heap (which takes O(log k) time) and then checks if the heap size has exceeded k. If so, it removes the smallest element from the heap, which also takes O(log k) time. Therefore, the time complexity of the add method is O(log k). Asuming this function gets called m times, the time complexity is O(m * log k)

  Space Complexity:
  KthLargest Constructor: The space used by the min heap in the constructor is proportional to the number of elements inserted from the nums array. In the worst case, when all elements from the nums array are inserted, the space complexity for the min heap is O(n).

  add Method: The space complexity of the add method is primarily determined by the space used by the min heap. Since the heap stores at most k elements, the space complexity is O(k).
  */

/**
 * Your KthLargest object will be instantiated and called as such:
 * var obj = new KthLargest(k, nums)
 * var param_1 = obj.add(val)
 */
