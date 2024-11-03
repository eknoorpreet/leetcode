/*

Given a string s, rearrange the characters of s so that any two adjacent characters are not the same.

Return any possible rearrangement of s or return "" if not possible.



Example 1:

Input: s = "aab"
Output: "aba"
Example 2:

Input: s = "aaab"
Output: ""


Constraints:

1 <= s.length <= 500
s consists of lowercase English letters.

*/

/**
 * @param {string} s
 * @return {string}
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

  peek() {
    return this.values[0];
  }
}
/*

  Start with the most frequenct character first! (Same as https://leetcode.com/problems/longest-happy-string/)

  */

const reorganizeString = function (s) {
  const pq = new MyPriorityQueue();
  const charFrequency = new Map();
  let result = '';
  const sArray = s.split('');
  sArray.forEach((char) =>
    charFrequency.set(char, (charFrequency.get(char) || 0) + 1)
  );
  for (let [char, freq] of charFrequency) {
    if (freq !== 0) pq.enqueue(char, -freq);
  }
  while (pq.values.length) {
    // if s === "aaab" and our current result = "aba"
    // And we still have just an "a" => arrangement not possible! => ""
    if (pq.values.length === 1 && pq.peek().val === result.at(-1)) return '';
    let { val: char, priority: freq } = pq.dequeue();
    // Are we headed towards a 2-count ("cc")
    // If that is the case, just move on to the second most frequent character
    if (result.length > 0 && char == result.at(-1)) {
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
      // Else, we're not headed towards a 2-count ("cc")
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

Time Complexity

Frequency Calculation:

We iterate over the string s once to calculate the frequency of each character.
This takes O(n) time, where n is the length of the string.

Heap Operations:

Heap Construction: Inserting each character with its frequency into the heap takes
O(logk) time per insertion, where k is the number of unique characters.
Since we can have at most 26 unique characters (all lowercase English letters), this takes
O(klogk) time, which simplifies to O(1) because k ≤ 26.

Building the Result String:

The main loop runs as long as the heap is not empty, which can be up to n iterations in the worst case.
Each iteration involves:
Extracting the max element (heap dequeue): O(logk).
Potentially inserting elements back into the heap (heap enqueue): O(logk).
Since the number of unique characters k is at most 26, each heap operation is O(1).
Therefore, the time complexity of building the result string is O(n).

Summarizing the time complexity:

Frequency calculation: O(n)
Heap construction: O(1)
Building the result string: O(n)
Overall, the time complexity is O(n).

Space Complexity

Frequency Map:

The frequency map stores the frequency of each unique character, which requires O(k) space.
Since k ≤ 26, this space requirement is O(1).

Heap Storage: The heap stores up to k elements at any given time, requiring O(k) space.
Given k ≤ 26, this also simplifies to O(1).

Result String: The result string can grow to a length of at most n.
Therefore, the total space complexity is dominated by the result string, which is O(n).

Conclusion
Time Complexity: O(n)
Space Complexity: O(n)

*/
