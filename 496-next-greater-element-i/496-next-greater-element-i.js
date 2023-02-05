//https://leetcode.com/problems/next-greater-element-i/description/

/*The next greater element of some element x in an array is the first greater element that is to the right of x in the same array.

You are given two distinct 0-indexed integer arrays nums1 and nums2, where nums1 is a subset of nums2.

For each 0 <= i < nums1.length, find the index j such that nums1[i] == nums2[j] and determine the next greater element of nums2[j] in nums2. If there is no next greater element, then the answer for this query is -1.

Return an array ans of length nums1.length such that ans[i] is the next greater element as described above.

 

Example 1:

Input: nums1 = [4,1,2], nums2 = [1,3,4,2]
Output: [-1,3,-1]
Explanation: The next greater element for each value of nums1 is as follows:
- 4 is underlined in nums2 = [1,3,4,2]. There is no next greater element, so the answer is -1.
- 1 is underlined in nums2 = [1,3,4,2]. The next greater element is 3.
- 2 is underlined in nums2 = [1,3,4,2]. There is no next greater element, so the answer is -1. */

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */

// const nextGreaterElement = (nums1, nums2) => {
//     // initialize an empty stack
//     const stack = [];
//     const nextGreater = []
//     const map = new Map()

//     //problem: finding next greater element for those in nums2 which are also in nums1
//     //let's focus on the main problem: if we find next greater element for all in nums2,
//     //we can just use the relevant values

//     // iterate through all the elements in the array
//     for (let i = 0; i < nums2.length; i++) {
//             //make sure stack is non-empty (empty => nothing to compare, push curr to compare next)
//             //is the latest added stack element smaller than current element

//             //we need to pop smaller elements from the stack before pushing a new element,
//             //monotonic decreasing stack
//             while (stack.length && nums2[i] > nums2[stack[stack.length - 1]] ) {
//                 // if the previous condition is satisfied, we pop the top element
//                 let stackTop = stack.pop();

//                 //latest added stack element (stackTop) < current element
//                 //=> stackTop's next greater = nums2[i]
//                 map.set(nums2[stackTop], nums2[i])
//             }

//         //push curr to compare next
//         // stack.push(nums2[i]);
//         stack.push(i);
//     }

//     //those elements left in stack for which we could not find a next greater
//     while (stack.length) {
//         map.set(nums2[stack.pop()], -1)
//     }
//     for (i = 0; i < nums1.length; i++) {
//         //{1 => 3}, {3 => 4}, {2 => -1}, {4 => -1}
//         nextGreater.push(map.get(nums1[i]))
//     }
//     return nextGreater
// }

const nextGreaterElement = (nums1, nums2) => {
  // initialize an empty stack
  const stack = [];
  const nextGreater = [];
  const map = new Map();

  //problem: finding next greater element for those in nums2 which are also in nums1
  //let's focus on the main problem: if we find next greater element for all in nums2,
  //then, we can just use the relevant values

  /*For finding next greater elements (not equal) we use a monotonic decreasing (non increasing) stack
    If the question was to find next greater or equal elements, then we would have used a monotonic strictly    
    decreasing stack. Here, it doesn't matter because all elements are distinct */

  // iterate through all the elements in the array
  for (let i = 0; i < nums2.length; i++) {
    //make sure stack is non-empty (empty => nothing to compare, push curr to compare next)
    //did we find a greater element than the latest added stack element?

    //we need to pop smaller elements from the stack before pushing a new element,
    //(to maintain the monotonic decreasing property)
    while (stack.length && nums2[i] > stack[stack.length - 1]) {
      // if the previous condition is satisfied, we pop the top element
      let stackTop = stack.pop();

      //latest added stack element (stackTop) < current element
      //=> stackTop's next greater = nums2[i]
      map.set(stackTop, nums2[i]);
    }

    //push curr to compare next
    stack.push(nums2[i]);
  }

  //when we found a greater element than stackTop, we popped them off
  //Hence, only those elements are left in stack for which we could not find a next greater
  while (stack.length) {
    const stackTop = stack.pop();
    map.set(stackTop, -1);
  }
  //iterate over first array
  for (i = 0; i < nums1.length; i++) {
    //{1 => 3}, {3 => 4}, {2 => -1}, {4 => -1}
    //whatever element we have, return its next greater
    const nextgreaterElement = map.get(nums1[i]);
    nextGreater.push(nextgreaterElement);
  }
  return nextGreater;
};

//TC: O(n)
//SC: O(n)
