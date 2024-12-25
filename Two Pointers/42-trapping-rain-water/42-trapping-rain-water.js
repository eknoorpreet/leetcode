/*

Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.



Example 1:


Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
Output: 6
Explanation: The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped.
Example 2:

Input: height = [4,2,0,3,2,5]
Output: 9


Constraints:

n == height.length
1 <= n <= 2 * 10^4
0 <= height[i] <= 10^5

*/

/**
 * @param {number[]} height
 * @return {number}
 */

/*

How Water Gets Trapped:

Water gets trapped between higher elevations
Each unit of water needs a higher bar on both left AND right sides to be trapped
The amount of water at any position depends on the minimum of max heights from left and right

We can use a (monotonic decreasing) stack to keep track of the bars that are bounded by longer bars and hence, may store water. Using the stack, we can do the calculations in only one iteration.

We add the index of the bar to the stack if bar is smaller than or equal to the bar at top of stack, which means that the current bar is bounded by the previous bar in the stack. If we found a bar longer than that at the top, we are sure that the bar at the top of the stack is bounded by the current bar and a previous bar in the stack, hence, we can pop it and add resulting trapped water to ans.

*/

const trap0 = function (height) {
  let count = 0;
  let stack = [];
  for (let i = 0; i < height.length; i++) {
    while (stack.length && height[stack.at(-1)] <= height[i]) {
      let stackTop = stack.pop();
      if (stack.length) {
        // height is the minimum of the previous and next greater elements
        // height[stack.at(-1)] (top) <= height[i] => curr height is next greater
        // height[stack.at(-1)] (new top) is prev greater

        // [5, 4, 3], curr = 6
        // pop 3: 3's prev greater = 4, next greater = 6
        let previousGreater = height[stack.at(-1)];
        let nextGreater = height[i];
        // previousGreater and nextGreater represent the boundaries to trap the water
        let h = Math.min(previousGreater, nextGreater) - height[stackTop];
        // width is the space between next greater and previous greater element
        // stack.at(-1) is the index of previousGreater (should not be included)
        // We want the index of the recently popped element => stack.at(-1) + 1
        let w = i - (stack.at(-1) + 1);

        count += h * w;
      }
    }
    stack.push(i);
  }
  return count;
};

// TC: O(n)
// SC: O(n)

/*

Two-pointer technique that calculates water trapped at each position by comparing the current height with the maximum height seen from both left and right sides.

Key Principles:

Water can be trapped between higher walls on both sides
The amount of water at any position depends on the minimum of left and right max heights
Water above a bar = (min(leftMax, rightMax) - current bar height)

Move the pointer with the smaller height

Why Move the Shorter Pointer?

Consider two walls:

On the left: a wall of height 1
On the right: a wall of height 3

We move the pointer of the shorter wall (height 1) because:

The water trapped at any position depends on the smaller of the two wall heights
By moving the shorter pointer, we have a chance of finding a taller wall that could potentially trap more water

*/

const trap = function (height) {
  let left = 0;
  let right = height.length - 1;
  let result = 0;
  let leftMax = 0;
  let rightMax = 0;
  while (left < right) {
    if (height[left] < height[right]) {
      leftMax = Math.max(leftMax, height[left]);
      const trappedWater = leftMax - height[left];
      result += trappedWater;
      left++;
    } else {
      rightMax = Math.max(rightMax, height[right]);
      const trappedWater = rightMax - height[right];
      result += trappedWater;
      right--;
    }
  }
  return result;
};

// TC: O(n)
// SC: O(1)
