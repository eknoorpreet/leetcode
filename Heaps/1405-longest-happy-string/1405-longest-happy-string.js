/*

A string s is called happy if it satisfies the following conditions:

s only contains the letters 'a', 'b', and 'c'.
s does not contain any of "aaa", "bbb", or "ccc" as a substring.
s contains at most a occurrences of the letter 'a'.
s contains at most b occurrences of the letter 'b'.
s contains at most c occurrences of the letter 'c'.
Given three integers a, b, and c, return the longest possible happy string. If there are multiple longest happy strings, return any of them. If there is no such string, return the empty string "".

A substring is a contiguous sequence of characters within a string.



Example 1:

Input: a = 1, b = 1, c = 7
Output: "ccaccbcc"
Explanation: "ccbccacc" would also be a correct answer.
Example 2:

Input: a = 7, b = 1, c = 0
Output: "aabaa"
Explanation: It is the only correct answer in this case.


Constraints:

0 <= a, b, c <= 100
a + b + c > 0

*/

/**
 * @param {number[][]} points
 * @param {number} k
 * @return {number[][]}
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

/*

  a = 1, b = 1, c = 7

  Be greedy here and do the higher count character ('c') first. We can use the lower count
  characters ('a', 'b') as "in-between"'s to not let 'c' reach 'ccc'

  "ccaccbcc"

  How to find the minimum character from the 3 characters each time?

  We can use a heap

  */

const longestDiverseString0 = function (a, b, c) {
  let result = '';
  const pq = new MyPriorityQueue();
  // Directly store the letter and frequencies
  if (a !== 0) pq.enqueue('a', -a);
  if (b !== 0) pq.enqueue('b', -b);
  if (c !== 0) pq.enqueue('c', -c);

  while (pq.values.length) {
    let { val: char, priority: freq } = pq.dequeue();
    // Are we headed towards a 3-count ("ccc")
    // If that is the case, just move on to the second most frequent character
    if (
      result.length > 1 &&
      char == result.at(-1) &&
      result.at(-1) === result.at(-2)
    ) {
      // First, check if the queue is empty => break
      if (!pq.values.length) break;
      // Else, get the second most frequent character
      let { val: char2, priority: freq2 } = pq.dequeue();
      // Build the string with the second most frequent character
      result += char2;
      // Decrement the frequency but since it's stored as a negative, increment it!
      freq2++;
      if (freq2 !== 0) pq.enqueue(char2, freq2);
    } else {
      // Else, we're not headed towards a 3-count ("ccc")
      // Build the string with the original / first most frequent character
      result += char;
      // Decrement the frequency but since it's stored as a negative, increment it!
      freq++;
    }
    // If the frequency of the character is not 0 after being used,
    // Add it back to the queue with the updated frequency
    // Do it here, not in the above 'else'. Why? Because, even if
    // 'char' was not used in the 'result' this time, it might be used again later.
    // So, we need to add it back to the queue!
    if (freq !== 0) pq.enqueue(char, freq);
  }
  return result;
};

/*

Time complexity:

The main loop runs as long as the heap is not empty. In the worst case, the loop runs for
a+b+c iterations (the total number of characters).

Each iteration involves:
Extracting the max element (heap dequeue): O(logn).
Potentially inserting elements back into the heap (heap enqueue): O(logn).
Given that the heap can have at most 3 elements at any time, the heap operations are effectively constant time,
O(log3)=O(1).

Thus, the time complexity of constructing the result string is O(a+b+c).

Space Complexity:

Heap Storage:

The heap stores at most 3 elements at any given time. Hence, the space required for the heap is
O(1).

Frequency Map:

The frequency map stores the frequencies of 'a', 'b', and 'c', which takes  O(1) space.
Result String:

The result string can grow to a length of at most a+b+c.

Therefore, the total space complexity is dominated by the result string, which is O(a+b+c).

*/
