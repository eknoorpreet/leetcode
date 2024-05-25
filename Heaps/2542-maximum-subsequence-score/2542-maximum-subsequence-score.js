/*

You are given two 0-indexed integer arrays nums1 and nums2 of equal length n and a positive integer k. You must choose a subsequence of indices from nums1 of length k.

For chosen indices i0, i1, ..., ik - 1, your score is defined as:

The sum of the selected elements from nums1 multiplied with the minimum of the selected elements from nums2.
It can defined simply as: (nums1[i0] + nums1[i1] +...+ nums1[ik - 1]) * min(nums2[i0] , nums2[i1], ... ,nums2[ik - 1]).
Return the maximum possible score.

A subsequence of indices of an array is a set that can be derived from the set {0, 1, ..., n-1} by deleting some or no elements.



Example 1:

Input: nums1 = [1,3,3,2], nums2 = [2,1,3,4], k = 3
Output: 12
Explanation:
The four possible subsequence scores are:
- We choose the indices 0, 1, and 2 with score = (1+3+3) * min(2,1,3) = 7.
- We choose the indices 0, 1, and 3 with score = (1+3+2) * min(2,1,4) = 6.
- We choose the indices 0, 2, and 3 with score = (1+3+2) * min(2,3,4) = 12.
- We choose the indices 1, 2, and 3 with score = (3+3+2) * min(1,3,4) = 8.
Therefore, we return the max score, which is 12.
Example 2:

Input: nums1 = [4,2,3,1,1], nums2 = [7,5,10,9,6], k = 1
Output: 30
Explanation:
Choosing index 2 is optimal: nums1[2] * nums2[2] = 3 * 10 = 30 is the maximum possible score.


Constraints:

n == nums1.length == nums2.length
1 <= n <= 10^5
0 <= nums1[i], nums2[j] <= 10^5
1 <= k <= n

*/

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
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

  We don't really care about the subsequence; we just have to focus on the output

  How to maximize the output?
  1. Maximize the sum
  1. Maximize the product (maximinze the individuals / minimums)

  If we want the set of values to be of size k and always want the smallest to be of

  */

const maxScore0 = function (nums1, nums2, k) {
  let sum = 0; // store the sum of the selected elements from nums1.
  let maximumScore = 0; // result

  // Min-heap to keep track of the k largest elements in the current window.
  const minHeap = new MinHeap();

  // Creates an array of pairs, where each pair consists of elements from nums1 and nums2 at the same index.
  // Sorts these pairs in descending order based on the second element of each pair.
  // This is done to prioritize the elements with larger values in nums2 first,
  // as we want the minimum value from nums2 to be as large as possible for the highest multiplication result.
  // (Sorting by the first element would prioritize high values in nums1,
  // but it does not help in ensuring that the minimum of the selected nums2 values is maximized.)
  const sortedPairs = Array(nums1.length)
    .fill(0)
    .map((_, i) => [nums1[i], nums2[i]])
    .sort((a, b) => b[1] - a[1]); // O(nlogn)
  console.log(sortedPairs); // [ [ 2, 4 ], [ 3, 3 ], [ 1, 2 ], [ 3, 1 ] ]

  // By iterating over the sorted pairs and using a min-heap to maintain the top k
  // elements from nums1, we ensure that we are always considering the largest possible sum for nums1 elements while keeping the minimum value of the corresponding nums2 elements high.

  for (let [a, b] of sortedPairs) {
    // O(nlogk) (O(logk) for all n)
    minHeap.insert(a); // Add the current element from nums1 to the heap.
    sum += a; // Add the current element to the total sum.

    // If the heap size exceeds k, remove the smallest element.
    if (minHeap.values.length > k) {
      // Remove the smallest element from the total sum.
      sum -= minHeap.extractMin();
    }

    // If the heap size is exactly k, calculate the possible score.
    if (minHeap.values.length === k) {
      // Update the result with the maximum score.
      // At any point, the curr b (in nums2) will be the minimum in nums2
      res = Math.max(maximumScore, sum * b);
    }
  }
  return maximumScore;
};

/*

Time complexity is: O(nlogn+nlogk)
Since logn is generally larger than
logk when n ≥ k, the dominant term is O(nlogn). Thus, the time complexity simplifies to: O(nlogn)


Space complexity is:

Storage for Pairs: Creating an array of pairs takes O(n) space.
Min-Heap: The min-heap can store up to O(k) space.
Therefore, the overall space complexity is: O(n+k)

*/
