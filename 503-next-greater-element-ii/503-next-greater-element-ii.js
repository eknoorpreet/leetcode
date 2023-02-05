//https://leetcode.com/problems/next-greater-element-ii/description/

/*Given a circular integer array nums (i.e., the next element of nums[nums.length - 1] is nums[0]), return the next greater number for every element in nums.

The next greater number of a number x is the first greater number to its traversing-order next in the array, which means you could search circularly to find its next greater number. If it doesn't exist, return -1 for this number.

Example 1:

Input: nums = [1,2,1]
Output: [2,-1,2]
Explanation: The first 1's next greater number is 2; 
The number 2 can't find next greater number. 
The second 1's next greater number needs to search circularly, which is also 2. */

/**
 * @param {number[]} nums
 * @return {number[]}
 */
const nextGreaterElements = function (nums) {
  let stack = [];
  let nextGreater = new Array(nums.length).fill(-1);
  for (let i = 0; i < nums.length; i++) {
    while (stack.length && nums[stack[stack.length - 1]] < nums[i]) {
      let stackTop = stack.pop();
      //stackTop's next greater is nums[i]
      nextGreater[stackTop] = nums[i];
    }
    stack.push(i);
  }
  //at this point, stack now has indices of those
  //elements for which we couldn't find a 'next bigger element'
  //Example: nums = [1,4,2,1,2]. After the first loop, the stack would still
  //hold the indexes 1, 2 and 4 since we couldn't find next elements bigger
  //than nums[1], //nums[2] and nums[4].
  //we could not find next greater for these elements next to each other (linearly),
  //so we try to find its "next" greater before (on the left of) these elements
  //=> starting from 0 again (circularly)
  //since all indices were already pushed to stack, no need to push this time
  for (let i = 0; i < nums.length; i++) {
    while (stack.length && nums[stack[stack.length - 1]] < nums[i]) {
      let stackTop = stack.pop();
      //stackTop's next greater is nums[i]
      nextGreater[stackTop] = nums[i];
    }
  }
  return nextGreater;
};

//TC: O(n)
//SC: O(n)
