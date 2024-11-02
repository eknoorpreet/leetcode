/*Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence.

You must write an algorithm that runs in O(n) time. */

/**
 * @param {number[]} nums
 * @return {number}
 */

const arrayContains = (arr, num) => {
  for (let i = 0; i < arr.length; i++) {
    //O(n)
    if (arr[i] == num) {
      return true;
    }
  }
  return false;
};

const longestConsecutive0 = (nums) => {
  if (nums.length === 0) return 0;
  let maxSeqLength = 0;
  for (const num of nums) {
    //O(n)
    let currentNum = num;
    let currSeqLength = 1;
    while (arrayContains(nums, currentNum + 1)) {
      //O(n)
      currentNum += 1;
      currSeqLength += 1;
    }
    maxSeqLength = Math.max(maxSeqLength, currSeqLength);
  }
  return maxSeqLength;
};

//TC: O(n^3)
//SC: O(1) (only allocates a handful of integers, so it uses constant additional space)

const longestConsecutive1 = function (nums) {
  if (nums.length === 0) return 0;
  let maxSeqLength = 1;
  // Because we need to compare each number to its previous number
  nums.sort((a, b) => a - b);
  let currSeqLength = 1;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i - 1] === nums[i]) continue; // No change in sequence
    // Diff b/w pair = 1 => sequence extended
    if (nums[i] - nums[i - 1] === 1) {
      currSeqLength++;
    }
    // Diff b/w pair more than 1 => sequence broken
    else {
      maxSeqLength = Math.max(maxSeqLength, currSeqLength);
      currSeqLength = 1;
    }
  }
  // Possible that the last element is part of the longest sequence,
  // (which, because it was the last element, was never broken and so we couldn't update maxSeqLength)
  // So we return the maximum of the current sequence and the longest one.
  return Math.max(maxSeqLength, currSeqLength);
};

//TC: O(nlogn)
//SC: O(1)

/*

Instead of sorting (which would be O(n log n)), we use a Set for O(1) lookups
We only start counting sequences from their starting numbers
A number is a sequence start if (number-1) doesn't exist in the set

*/

const longestConsecutive = function (nums) {
  let maxSeqLength = 0;
  const set = new Set(nums);
  for (const num of nums) {
    // If the set does not have a preceding number (start of sequence)
    // If the set has a preceding number, we'll try to find it via iteration
    // (this is how we find start of sequence)
    /*
          Only attempt to build sequences from numbers that are not already part
          of a longer sequence. This is accomplished by first ensuring that the
          number that would immediately precede the current number in a
          sequence is not present, as that number would necessarily be part of
          a longer sequence.*/
    // No left neighbour => start of a sequence!
    // 100 => 99 doesn't exist => start of seq => length = 1
    // 4 => 3 exists => NOT a start of seq
    // 200 => 199 doesn't exist => start of seq => length = 1
    // 1 => 0 doesn't exist => start of seq => length = 4
    // 3 => 2 exists => NOT a start of seq
    // 2 => 1 exists => NOT a start of seq
    if (!set.has(num - 1)) {
      //curr sequence starts from here
      let currLength = 0;
      //build curr sequence
      while (set.has(num + currLength)) {
        currLength++;
      }
      //sequence ended! => calculate its length
      maxSeqLength = Math.max(currLength, maxSeqLength);
    }
  }
  return maxSeqLength;
};

/*

Time Complexity: O(n)

Converting array to Set: O(n)
Main loop: O(n)
While loop: Each number is only visited once across all iterations

Space Complexity: O(n)

*/
