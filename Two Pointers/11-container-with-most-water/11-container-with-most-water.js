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

The area of water is determined by two factors:

Width (distance between lines)
Height (the shorter of the two lines)

Key Insight: Moving Pointers

If we move the pointer at the longer line inwards, we will NOT increase the area
Why? Because the area is always limited by the shorter line
Moving the longer line inward will:
a) Reduce the width
b) NOT potentially increase the height (since the height is already capped by the shorter line)

Moving the Shorter Line's Pointer

Moving the shorter line's pointer is more promising
Even though we're reducing the width, we might find a taller line
A taller line could potentially compensate for the reduced width
This gives us a chance to increase the total area

Therefore, always move the shorter wall's pointer inward

*/

const maxArea = function (height) {
  // Because of 2 pointers at opposite ends, we start with widest possible container
  let left = 0;
  let right = height.length - 1;
  let result = 0;
  while (left < right) {
    const width = right - left;
    const h = Math.min(height[left], height[right]); // shorter line
    const area = width * h;
    result = Math.max(area, result);

    // Let the higher wall remain.
    // Move the pointer of the shorter wall in the hope
    // that we might find a higher wall that increases area (See Note)
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
