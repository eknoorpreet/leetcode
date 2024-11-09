/*


You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).

Find two lines that together with the x-axis form a container, such that the container contains the most water.

Return the maximum amount of water a container can store.

Notice that you may not slant the container.



Example 1:


Input: height = [1,8,6,2,5,4,8,3,7]
Output: 49
Explanation: The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49.
Example 2:

Input: height = [1,1]
Output: 1


Constraints:

n == height.length
2 <= n <= 10^5
0 <= height[i] <= 10^4

*/

/**
 * @param {number[]} height
 * @return {number}
 */

/*

Key Concepts:

Area of water is determined by:

Width = distance between chosen walls (right index - left index)
Height = height of shorter wall (min of two wall heights)
Area = width * height

Can't slant water (must be horizontal)
Need to find two walls that create maximum area

*/

const maxArea0 = function (height) {
  let result = 0;
  for (let left = 0; left < height.length; left++) {
    for (let right = left + 1; right < height.length; right++) {
      const width = right - left;
      const h = Math.min(height[left], height[right]);
      const area = width * h;
      result = Math.max(area, result);
    }
  }
  return result;
};

// TC: O(n^2)
// SC: O(1)

/*
Why Two Pointers Work:

Start with widest possible container
When moving pointers:

If we move the higher wall inward, width decreases and height can't increase
If we move the lower wall inward, we might find a higher wall that increases area

Therefore, always move the shorter wall's pointer inward

*/

const maxArea = function (height) {
  // Because of 2 pointers at opposite ends, we start with widest possible container
  let left = 0;
  let right = height.length - 1;
  let result = 0;
  while (left < right) {
    const width = right - left;
    const h = Math.min(height[left], height[right]);
    const area = width * h;
    result = Math.max(area, result);

    // Let the higher wall remain.
    // Move the pointer of the shorter wall in the hope
    // that we might find a higher wall that increases area
    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }
  return result;
};

/*

Time and Space Complexity:

Time: O(n) - single pass through array
Space: O(1) - only using two pointers

*/
