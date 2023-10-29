/*

Given an integer array nums sorted in non-decreasing order, remove some duplicates in-place such that each unique element appears at most twice. The relative order of the elements should be kept the same.

Since it is impossible to change the length of the array in some languages, you must instead have the result be placed in the first part of the array nums. More formally, if there are k elements after removing the duplicates, then the first k elements of nums should hold the final result. It does not matter what you leave beyond the first k elements.

Return k after placing the final result in the first k slots of nums.

Do not allocate extra space for another array. You must do this by modifying the input array in-place with O(1) extra memory.

Custom Judge:

The judge will test your solution with the following code:

int[] nums = [...]; // Input array
int[] expectedNums = [...]; // The expected answer with correct length

int k = removeDuplicates(nums); // Calls your implementation

assert k == expectedNums.length;
for (int i = 0; i < k; i++) {
    assert nums[i] == expectedNums[i];
}
If all assertions pass, then your solution will be accepted.



Example 1:

Input: nums = [1,1,1,2,2,3]
Output: 5, nums = [1,1,2,2,3,_]
Explanation: Your function should return k = 5, with the first five elements of nums being 1, 1, 2, 2 and 3 respectively.
It does not matter what you leave beyond the returned k (hence they are underscores).
Example 2:

Input: nums = [0,0,1,1,1,1,2,3,3]
Output: 7, nums = [0,0,1,1,2,3,3,_,_]
Explanation: Your function should return k = 7, with the first seven elements of nums being 0, 0, 1, 1, 2, 3 and 3 respectively.
It does not matter what you leave beyond the returned k (hence they are underscores).


Constraints:

1 <= nums.length <= 3 * 10^4
-10^4 <= nums[i] <= 10^4
nums is sorted in non-decreasing order.

*/

// /**
//  * @param {number[]} nums
//  * @return {number}
//  */

const removeDuplicates0 = function (nums) {
  //keep track of the position where the next unique element should be placed in the modified array.
  let nextUnique = 2; // Initialize k to 2 (since 0th and 1st elements are fine)
  for (let i = 2; i < nums.length; i++) {
    // Check if the current element is different from the previous two elements
    //if it's different, place it
    console.log(i, nextUnique, nums[i], nums[nextUnique - 2]);
    if (nums[i] !== nums[nextUnique - 2]) {
      nums[nextUnique] = nums[i]; // Place the current element
      nextUnique++;
    }
  }
  return nextUnique;
};

const removeDuplicates = function (nums) {
  // Check if it is an empty array
  if (nums.length === 0) return 0;

  // Start pointer of the new array
  let nextUnique = 1;

  // Count the time of duplicate numbers occurrence
  let count = 1;

  for (let i = 1; i < nums.length; i++) {
    //if curr and prev elements are same => a duplicate is found.
    if (nums[i] === nums[i - 1]) {
      //if count is less than 2, we can include the current element in the result array
      if (count < 2) {
        //place it!
        nums[nextUnique] = nums[i];
        nextUnique++;
      }
      //increment count for curr ongoing unique element
      count++;
    } else {
      //curr and prev elements are diff => a new unique element found
      //reset count to 1 new unique element
      count = 1;
      //place it
      nums[nextUnique] = nums[i];
      nextUnique++;
    }
  }
  return nextUnique;
};
//TC: O(n)
//SC: O(1)
