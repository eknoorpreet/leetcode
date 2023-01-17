// https://leetcode.com/problems/remove-duplicates-from-sorted-array/

/*Given an integer array nums sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once. The relative order of the elements should be kept the same.

Since it is impossible to change the length of the array in some languages, you must instead have the result be placed in the first part of the array nums. More formally, if there are k elements after removing the duplicates, then the first k elements of nums should hold the final result. It does not matter what you leave beyond the first k elements.

Return k after placing the final result in the first k slots of nums.

Do not allocate extra space for another array. You must do this by modifying the input array in-place with O(1) extra memory. */

//TC: O(n)
//SC: O(1)
const removeDuplicates = (nums) => {
  //1 pointer for placing the unique number
  //sorted [] => all duplicate values will be one after the other.
  //sorted [] => worst-case => all are duplicates [2, 2, 2, 2]
  //=> result = atleast 1 unique element (2) => 1 => we start with 1
  let nextUniqueIdx = 1; //count of unique elements in our input array
  //modify nums in-place into an array with only unique elements
  //i.e. only insert if curr element is unique;
  //update the first nextUniqueIdx elements in an array with unique values and return the value of nextUniqueIdx.
  //nextUniqueIdx: length of the modified array till unique elements (before duplicates start)
  //1 pointer for iterating the array
  for (let i = 1; i < nums.length; i++) {
    //check if the previous element is different from the current element => unique number spotted
    if (nums[i - 1] !== nums[i]) {
      //move it to the current nextUniqueIdx
      nums[nextUniqueIdx] = nums[i];
      nextUniqueIdx++;
    }
  }
  return nextUniqueIdx;
};

removeDuplicates([0, 0, 1, 1, 1, 2, 2, 3, 3, 4]);

/*TC: O(2n) (both pointers iterating the array once) => O(n), where n is the total number of elements in the given array.

SC: Constant space O(1). */
