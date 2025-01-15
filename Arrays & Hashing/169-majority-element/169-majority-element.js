/*

Given an array nums of size n, return the majority element.

The majority element is the element that appears more than ⌊n / 2⌋ times. You may assume that the majority element always exists in the array.


Example 1:

Input: nums = [3,2,3]
Output: 3
Example 2:

Input: nums = [2,2,1,1,1,2,2]
Output: 2


Constraints:

n == nums.length
1 <= n <= 5 * 104
-109 <= nums[i] <= 109


Follow-up: Could you solve the problem in linear time and in O(1) space?

*/

//Approach 1: sort the array, get the central element
//TC: O(n * log(n)) due to the sorting algorithm used.
//SC: O(1)
const majorityElement0 = (nums) => {
  nums.sort((a, b) => a - b);
  //the majority element (which appears more than ⌊n / 2⌋ times)
  //will be at the middle index of the sorted array.
  return nums[Math.floor(nums.length / 2)];
};

//TC: O(n)
//SC: O(n)
const majorityElement1 = function (nums) {
  const map = new Map();
  let result = 0;
  let maxFreq = 0; //track the max freq till now
  for (let i = 0; i < nums.length; i++) {
    //update freq of curr element
    map.set(nums[i], (map.get(nums[i]) || 0) + 1);
    //if curr el freq is greater than maxFreq: update result
    //update maxFreq
    result = map.get(nums[i]) > maxFreq ? nums[i] : result;
    maxFreq = Math.max(maxFreq, map.get(nums[i]));
  }
  return result;
};

const majorityElement = function (nums) {
  let candidate = nums[0];
  let count = 0;

  // Phase 1: Find a candidate for the majority element
  // The idea here is to track a "potential" majority element that can dominate the rest of the elements.
  for (let i = 0; i < nums.length; i++) {
    // If count becomes 0, the curr candidate is not the result since another one (curr element)
    // has the same frequency as the curr candidate
    // Update the candidate to the current element and reset count to 1.
    // Reset count (for curr element) to 1
    if (count === 0) {
      candidate = nums[i];
      count = 1;
    }
    // If the current element is the same as the candidate, increment count.
    else if (candidate === nums[i]) {
      count++;
    }
    // If the current element is different from the candidate, decrement count.
    else {
      count--;
    }
  }

  // Phase 2: Verify if the candidate is the majority element
  count = 0;
  for (let i = 0; i < nums.length; i++) {
    //Count how many times the candidate appears in the sequence.
    if (nums[i] === candidate) {
      count++;
    }
  }

  // Verify if the candidate found in Phase 1 is indeed the majority element. If it is, it will satisfy the majority condition (appearing more than ⌊n / 2⌋ times).
  if (count > Math.floor(nums.length / 2)) {
    return candidate;
  }
};

/*

The Boyer-Moore Voting Algorithm is a clever and efficient algorithm for finding the majority element in a sequence of elements. The majority element is defined as an element that appears more than ⌊n / 2⌋ times, where 'n' is the length of the sequence. The algorithm is designed to find this element in linear time, O(n), and with constant space, O(1).

Here's how the Boyer-Moore Voting Algorithm works and why it helps solve the majority element problem:

Key Insights:

The majority element will always "dominate" the other elements in the sequence. In other words, if we count the majority element as +1 and the other elements as -1, the cumulative count will be positive in the end.

The algorithm leverages this insight to find the majority element while minimizing memory usage and avoiding sorting.

Why the Algorithm Works:

The algorithm's key insight ensures that the majority element will always be the final candidate after both phases.
In Phase 1, the candidate is chosen so that it can potentially dominate the rest of the elements. If there is a majority element, it will eventually become the candidate.
In Phase 2, the algorithm verifies if the candidate is indeed the majority element by counting its occurrences. If the majority element exists, it will pass this verification step.

*/

//TC: O(n)
//SC: O(1)
