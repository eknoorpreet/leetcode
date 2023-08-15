/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
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

// const findKthLargest = function (nums, k) {
//   const minHeap = new MinHeap();
//   for (let i = 0; i < k; i++) {
//     minHeap.insert(nums[i]);
//   }
//   for (let i = k; i < nums.length; i++) {
//     //if we find a larger number than the smallest in heap, remove it and add the larger number
//     if (nums[i] > minHeap.peek()) {
//       minHeap.extractMin();
//       minHeap.insert(nums[i]);
//     }
//   }
//   return minHeap.peek();
// };

const findKthLargest = function (nums, k) {
  const minHeap = new MinHeap();
  nums.forEach((num) => {
    minHeap.insert(num);
    if (minHeap.values.length > k) minHeap.extractMin();
  });
  return minHeap.peek();
};

/*
Time Complexity:

Constructing the MinHeap: The forEach loop iterates through each element in the nums array and performs insertion and extraction operations on the MinHeap. Insertion and extraction in a binary heap take O(log N) time, where N is the number of elements in the heap.
The loop iterates through all elements in the nums array, so the overall time complexity of constructing the MinHeap is O(N log N).

Space Complexity:

The MinHeap: The MinHeap stores a maximum of 'k' elements at any given time. Therefore, the space complexity of the MinHeap is O(k).

*/
