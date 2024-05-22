/**
 * @param {character[]} tasks
 * @param {number} n
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

Keep track of the frequency of characters (tasks)

Do the most frequent tasks first (use a max heap to determine that: O(log n),
actually, O(log(26) since we can have atmost 26 different characters)

Why? because when you do those first, you get more intervals in between, in which you can process the other ones.
Processing the most frequent tasks first gives you more time to not be idle!

AAABBCC, n = 1

If we process the less frequent characters first:

CBCBA_A_A

(After processing all C's and B's, we're only left with all A's, the most frequent character.
Processing all A's would need the most time in between
but no other character left to fill the interval => max idle time => max total time)

How about the opposite?

ABCABCA => Correct!


*/

const leastInterval = function (tasks, n) {
  // To figure out the most frequent task now in O(log 26) -> O(1)
  const maxHeap = new MaxHeap();
  // Stores [numOftasksLeft, idleTime]
  // At what time, we can add the task back to the max heap (so we can process it again)
  // For ex: if we process 'A' of frequency 3 and time = 0,
  // its new frequency = 2 and now time = 1
  // Hence, queue will have [2, 2 (1 + 1)]
  // At time = 2, this task will be available for us to be added again to the max heap
  // Once the task frequency becomes 0 (all occurrences processed),
  // we won't need to add it to the max heap (so no need to add to the queue either)
  const queue = [];
  const taskFrequency = new Map();
  let time = 0;
  tasks.forEach((task) =>
    taskFrequency.set(task, (taskFrequency.get(task) || 0) + 1)
  );
  for (let count of taskFrequency.values()) {
    maxHeap.insert(count);
  }
  //AAABBCC, n = 1
  while (maxHeap.values.length || queue.length) {
    time++;
    if (maxHeap.values.length) {
      // Processed character ('A') => decrement the count (= 2)
      let newFrequency = maxHeap.extractMax() - 1;
      if (newFrequency !== 0) {
        // Queue will have [2, 1 + 1] => 'A' has 2 counts to be processed after 2 units of time. Basically, at what time is the current task going to be available to us again (can be added back to max heap)
        queue.push([newFrequency, time + n]);
      }
    }
    // Max heap empty => if there's still tasks to be processed, check if the first task on the queue has its turn (check its time)
    // If yes, add it back to the max heap (add the remaining count)
    if (queue.length && queue[0][1] === time) {
      maxHeap.insert(queue.shift()[0]);
    }
  }
  return time;
};

//TC: O(n x m): Count the occurrence of each character, where m is the idle time
//SC: O(n)
