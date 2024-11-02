/**
 * @param {number[]} stones
 * @return {number}
 */

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

/*

1. Push stones to a max heap.
2. As long as the heap has more than 1 element, extract the largest and second largest stones. If second <= largest , insert the difference.
3. When the loop ends, there’s only 1 stone left. Return that.

*/

const lastStoneWeight = function (stones) {
  const maxHeap = new MaxHeap();
  stones.forEach((stone) => maxHeap.insert(stone));
  //maxHeap.values.length > 1 => because we need the last remaining stone weight
  while (maxHeap.values.length > 1) {
    let largest = maxHeap.extractMax(); //weight of y
    let secondLargest = maxHeap.extractMax(); //weight of x
    //if the 2 stones have equal weight, still add 0 to maxHeap
    //for the answer, else we can add it as a condition at the end
    // if(secondLargest < largest) maxHeap.insert(largest - secondLargest);
    if (secondLargest <= largest) maxHeap.insert(largest - secondLargest);
  }
  // return maxHeap.peek() ?? 0
  return maxHeap.peek();
};

/*

Explanation:

Why second <= largest and not second != largest ? In the second method, if we have [2, 2],
we smash them and now the max heap is empty but we need to return 2.
Then, we need to do maxHeap.peek() ?? 0 .
To avoid that, we can use the first method and add 0s to the heap as well.

*/

/*
  Time Complexity:
  The insertion into the min heap takes O(log n) time for each element, and since there are n elements in the nums array, the time complexity is O(n * log n).

  The extractMax also takes takes O(log n) for each element and and since there are n elements in the nums array, the time complexity is O(n * log n).

  Space Complexity:
  The space used by the min heap is proportional to the number of elements inserted from stones nums array. In the worst case, when all elements from the stones array are inserted, the space complexity for the min heap is O(n).
  */
