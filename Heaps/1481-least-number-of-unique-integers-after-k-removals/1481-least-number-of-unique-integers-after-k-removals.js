/*

Given an array of integers arr and an integer k. Find the least number of unique integers after removing exactly k elements.



Example 1:

Input: arr = [5,5,4], k = 1
Output: 1
Explanation: Remove the single 4, only 5 is left.
Example 2:
Input: arr = [4,3,1,1,3,3,2], k = 3
Output: 2
Explanation: Remove 4, 2 and either one of the two 1s or three 3s. 1 and 3 will be left.


Constraints:

1 <= arr.length <= 10^5
1 <= arr[i] <= 10^9
0 <= k <= arr.length

*/

/**
 * @param {number[]} arr
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

/*

  Intuition:
  The intuition behind this solution is to first count the frequencies of all numbers in the input array using a map. We then add these frequencies to a min-heap, which allows us to efficiently identify and remove the least frequent numbers.

  By removing the least frequent numbers first (using the min-heap), we can minimize the number of unique integers remaining after removing k elements. The final result is the number of unique integers left after this removal process.

  Example: arr = [5,5,4], k = 1
  If we remove 5 => 2 unique numbers left
  But if we remove 4 => 1 unique number left

  */
const findLeastNumOfUniqueInts0 = function (arr, k) {
  const numFrequency = new Map();
  const minHeap = new MinHeap();

  // Count frequencies
  for (let i = 0; i < arr.length; i++) {
    numFrequency.set(arr[i], (numFrequency.get(arr[i]) || 0) + 1);
  }

  // Add each unique number's frequency to minHeap
  for (let freq of numFrequency.values()) {
    minHeap.insert(freq);
  }

  // Initialize the result variable with the number of unique integers
  let result = minHeap.values.length;

  // Remove elements while we can
  while (minHeap.values.length && k > 0) {
    const minFreq = minHeap.extractMin();
    // Can we remove all occurrences of the corresponding number?
    if (k >= minFreq) {
      // Remove it
      k -= minFreq;
      // One unique integer less
      result--;
    } else {
      // If the current k is less than the extracted minimum frequency, we cannot remove all
      // occurrences of the corresponding number => break out of the loop
      // (as we can't remove the next ones either since they'll be greater than curr frequency)

      // But if current k is 2 and curr min freq is 3, should we just remove the 2 out of 3?
      // No point! Because the count of remaining unique integers will remain the same!
      break;
    }
  }
  return result;
};

/*

  Time Complexity:

  Counting frequencies using a map: O(n), where n is the length of the input array arr.
  Building the min-heap: O(n log n), as we need to insert each unique frequency into the heap.
  Removing elements: O(k log n), where k is the number of elements to remove. We need to extract the minimum element k times, which takes O(log n) time per extraction.

  The overall time complexity of this solution is:
  O(n log n + k log n)


  Space Complexity:

  Frequency map: O(n), as we store the frequency of each unique element in the map.
  Min-heap: O(n), as we store all the unique frequencies in the heap.

  */

/*

  The intuition behind this solution is to first group the elements based on their frequencies, as this allows us to efficiently identify and remove the least frequent elements. By removing the least frequent elements first, we can minimize the number of unique integers remaining after removing k elements.

  The use of the buckets array is a clever way to organize the frequency information. It allows us to quickly determine how many elements have a particular frequency, and then remove those elements in order of increasing frequency.

  Always think about counting sort when the range of the num is n, so we get a O(n) sorting!
  (Since the numbers are going to be bounded from 1 to n, so will their frequencies!)

  */

const findLeastNumOfUniqueInts = function (arr, k) {
  const numFrequency = new Map();

  // Count frequencies
  for (let i = 0; i < arr.length; i++) {
    numFrequency.set(arr[i], (numFrequency.get(arr[i]) || 0) + 1);
  }

  // Create an array of buckets
  // In this step, the elements are distributed into buckets based on their
  // frequency. Each bucket contains the count of elements with the same frequency (index).
  // The index of the bucket represents the frequency of the elements it contains.

  // Basically, group the elements based on their frequencies, with the index of the bucket
  // representing the frequency and the value at that index representing the count of
  // elements with that frequency.
  // In other words, we're storing the frequency of frequencies!
  const buckets = new Array(arr.length).fill(0);
  for (const [num, freq] of numFrequency) {
    // Using the frequency as an index
    buckets[freq]++;
  }

  // Initialize the result variable with the number of unique integers
  let result = numFrequency.size;

  // Remove Least Frequent Elements
  // Iterate through the buckets array from the lowest frequency (index 0) to the highest.
  for (let i = 0; i < buckets.length; i++) {
    let uniqueElementsRemoved = buckets[i];
    // Are the remaining k removals greater than or equal to the number of elements that can
    //be removed from this bucket (index (frequency) * count of elements in the bucket)
    if (k >= i * uniqueElementsRemoved) {
      // Remove all elements from this bucket
      k -= i * uniqueElementsRemoved;
      result -= uniqueElementsRemoved;
    } else {
      // If the remaining k is less than the number of elements
      // that can be removed from the current bucket

      // Calculate the number of elements we can remove from this bucket (by dividing k by
      //the current index) and subtract that from result
      uniqueElementsRemoved = Math.floor(k / i);

      result -= uniqueElementsRemoved;

      // Break out of the loop (we've used up the allowed k removals).
      break;
    }
  }
  return result;
};

/*

  Time complexity: O(n), where n is the length of the input array arr. This is because we need to iterate through the array once to count the frequencies, and then iterate through the buckets array at most k times to remove the least frequent elements.

  Space complexity: O(n), as we need to store the frequency information in the numFrequency map, and the buckets array can have at most n elements (one for each unique frequency).

  */
