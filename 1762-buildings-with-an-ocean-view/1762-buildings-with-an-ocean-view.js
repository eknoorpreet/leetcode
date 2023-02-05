/*There are n buildings in a line. You are given an integer array heights of size n that represents the heights of the buildings in the line.

The ocean is to the right of the buildings. A building has an ocean view if the building can see the ocean without obstructions. Formally, a building has an ocean view if all the buildings to its right have a smaller height.

Return a list of indices (0-indexed) of buildings that have an ocean view, sorted in increasing order. */

const oceanView = (heights) => {
  //same as next greater ("find and remove all buildings that have taller buildings ahead")
  //except that we use "<=" => gets rid of equal height buildings (hence, same as next greater/equal)
  const result = [];
  const stack = [];
  for (let i = 0; i < heights.length; i++) {
    //did we find a greater building?
    while (stack.length && heights[stack.at(-1)] <= heights[i]) {
      //get rid of a building with taller/equal building ahead
      stack.pop();
    }
    stack.push(i);
  }
  //remaining buildings have smaller buildings ahead
  return stack;
};

oceanView([4, 3, 2, 1]);
// [0, 2, 3]

oceanView([1, 3, 2, 4]);
// [3]

//TC: O(n)
//SC: O(n)
