/*

Given an array of numbers, replace each even number with two of the same.

*/

// A helper function to skip the nulls and reach the last number (from the end of the array)
const findLastNumber = (arr) => {
  let i = arr.length - 1;
  while (i >= 0 && arr[i] === null) {
    i--;
  }
  return i;
};

// Reverse Traversal
const cloneEvenIntegers = (nums) => {
  // Use an 'end' pointer to place the processed numbers (both even and odd) at the end of the array
  let end = nums.length - 1;
  // Use another 'i' pointer to track the current number (to be processed)
  // If it's not a number => skip!
  let i = findLastNumber(nums);
  while (i >= 0) {
    // If it's an even number, place it twice!
    if (nums[i] % 2 === 0) {
      nums[end] = nums[i];
      end--;
      nums[end] = nums[i];
      end--;
    } else {
      nums[end] = nums[i];
      end--;
    }
    i--;
  }
  return nums;
};

console.log(cloneEvenIntegers([2, 4, 1, 0, 3, null, null, null]));

//TC: O(n)
//SC: O(1)
