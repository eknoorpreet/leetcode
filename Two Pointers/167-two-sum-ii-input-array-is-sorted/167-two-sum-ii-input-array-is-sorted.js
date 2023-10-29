/*Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number. Let these two numbers be numbers[index1] and numbers[index2] where 1 <= index1 < index2 <= numbers.length.

Return the indices of the two numbers, index1 and index2, added by one as an integer array [index1, index2] of length 2. */

/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */

//TC: O(n)
//SC: O(n)
const twoSum1 = function (numbers, target) {
  //A + B = target, store A and its index, then find B (target - A)
  const map = new Map();
  for (let i = 0; i < numbers.length; i++) {
    //i = 1, is curr element (nums[i]) B? Check via subtracting B from => does target - B = A?
    if (map.has(target - numbers[i]))
      return [map.get(target - numbers[i]) + 1, i + 1];
    //store A and its index
    else map.set(numbers[i], i);
  }
};

const twoSum = function (numbers, target) {
  let left = 0;
  let right = numbers.length - 1;
  while (left < right) {
    const currSum = numbers[left] + numbers[right];
    if (currSum < target) {
      left++;
    } else if (currSum > target) {
      right--;
    } else return [left + 1, right + 1];
  }
};
//TC: O(n)
//SC: O(1)
