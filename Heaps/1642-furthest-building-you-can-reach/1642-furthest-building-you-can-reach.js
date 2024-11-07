/*

You are given an integer array heights representing the heights of buildings, some bricks, and some ladders.

You start your journey from building 0 and move to the next building by possibly using bricks or ladders.

While moving from building i to building i+1 (0-indexed),

If the current building's height is greater than or equal to the next building's height, you do not need a ladder or bricks.
If the current building's height is less than the next building's height, you can either use one ladder or (h[i+1] - h[i]) bricks.
Return the furthest building index (0-indexed) you can reach if you use the given ladders and bricks optimally.



Example 1:


Input: heights = [4,2,7,6,9,14,12], bricks = 5, ladders = 1
Output: 4
Explanation: Starting at building 0, you can follow these steps:
- Go to building 1 without using ladders nor bricks since 4 >= 2.
- Go to building 2 using 5 bricks. You must use either bricks or ladders because 2 < 7.
- Go to building 3 without using ladders nor bricks since 7 >= 6.
- Go to building 4 using your only ladder. You must use either bricks or ladders because 6 < 9.
It is impossible to go beyond building 4 because you do not have any more bricks or ladders.
Example 2:

Input: heights = [4,12,2,7,3,18,20,3,19], bricks = 10, ladders = 2
Output: 7
Example 3:

Input: heights = [14,3,19,3], bricks = 17, ladders = 0
Output: 3


Constraints:

1 <= heights.length <= 10^5
1 <= heights[i] <= 10^6
0 <= bricks <= 10^9
0 <= ladders <= heights.length

*/

/**
 * @param {number[]} heights
 * @param {number} bricks
 * @param {number} ladders
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

/*

  For smallest height differences, use bricks. Keap track of smallest height differences using min heap.

  The optimal strategy is to use the ladders for the largest height differences, even if you still have bricks left. This is because using a ladder for a smaller height difference would be a waste, when you could have used bricks instead and saved the ladder for a larger climb.

  Move along the buildings sequentially, one climb at a time. At all times, we should ensure ladders have been allocated to the longest climbs seen so far and bricks to the shortest. This might sometimes involve going back and changing an earlier allocation.

  */

const furthestBuilding = function (heights, bricks, ladders) {
  // A collection of all climbs (that require a brick or ladder)
  // Gives us the smallest climb
  const minHeap = new MinHeap();
  for (let i = 0; i < heights.length - 1; i++) {
    const heightDiff = heights[i + 1] - heights[i];
    // Are we going down? => Continue on to the next building
    if (heightDiff <= 0) continue;
    if (bricks === 0 && ladders === 0) return i;
    // Else, it's a climb (we'll add all climbs to the heap)
    minHeap.insert(heightDiff);
    ladders--;

    // If we haven't used all ladders yet, continue on to the next building
    if (ladders >= 0) {
      continue;
    }
    // Else, all ladders used => we need to remove the smallest climb from
    // the heap and replace it with bricks
    const smallestLadderAllocation = minHeap.extractMin();
    // Use bricks for the climb made using a ladder earlier
    bricks -= smallestLadderAllocation;
    if (bricks < 0) {
      return i;
    }
  }
  // If we got to here, this means we had enough materials to cover every climb.
  return heights.length - 1;
};

/*

  Time complexity : O(nlogn) or O(nlogk).

  Inserting or removing an item from a heap incurs a cost of O(logx), where x is the number of items currently in the heap. In the worst case, we know that there will be N−1 climbs in the heap, thus giving a time complexity of O(logN) for each insertion and removal, and we're doing up to N of each of these two operations. This gives a total time complexity of O(nlogn).

  In practice, though, the heap will never contain more than k+1 climbs at a time—when it gets to this size, we immediately remove a climb from it. So, the heap operations are actually O(logk). We are still performing up to N of each of them, though, so this gives a total time complexity of O(nlogk).

  Space complexity : O(n) or O(k).

  As we determined above, the heap can contain up to O(k) numbers at a time. In the worst case, k = n, so we get O(n).

  */
