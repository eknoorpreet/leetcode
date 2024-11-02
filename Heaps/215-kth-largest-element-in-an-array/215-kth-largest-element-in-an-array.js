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

/*

To find 2nd largest in [3,2,1,5,6,4]:
Keep a min heap of size 2
[6,5] <- these are the 2 largest numbers
The root (5) is our answer!

Root (5) is kth largest!

We maintain a min heap of size k
For each number:

Add it to heap
If heap size > k, remove smallest

After processing all numbers:

Heap contains k largest numbers
The root (smallest in heap) is kth largest!

nums = [3,2,1,5,6,4], k = 2

Process each number:
3: heap = [3]
2: heap = [2,3]
1: heap = [2,3] (1 is smaller than min, ignore)
5: heap = [3,5] (2 removed)
6: heap = [5,6] (3 removed)
4: heap = [5,6] (4 is smaller than min, ignore)

*/

const findKthLargest = function (nums, k) {
  const minHeap = new MinHeap();
  nums.forEach((num) => {
    minHeap.insert(num);
    if (minHeap.values.length > k) minHeap.extractMin();
  });
  return minHeap.peek();
};

/*

Time Complexity: O(n log k)

Space Complexity:
The MinHeap stores a maximum of 'k' elements at any given time. Therefore, the space complexity of the MinHeap is O(k).

*/
