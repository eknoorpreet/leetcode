//https://leetcode.com/problems/squares-of-a-sorted-array/

/*Given an integer array nums sorted in non-decreasing order, return an array of the squares of each number sorted in non-decreasing order. */

/**
 * @param {number[]} nums
 * @return {number[]}
 */

// const sortedSquares = function(nums) {
//     return nums.map(el => el * el).sort((a, b) => {
//       if (a < b) {
//         //a < b
//         return -1; //a will come before b
//       } else if (a > b) {
//         //a > b
//         return 1; //a will come after b
//       } else if (a === b) {
//         return 0;
//       }
//     });
// };

//TC: O(n)
//SC: O(1) (excluding output array)
const sortedSquares = function (nums) {
  let n = nums.length;
  const squares = new Array(n).fill(0);
  let newGreatestInd = n - 1; //the index in the new array that should have the greatest element in the window
  let left = 0;
  let right = n - 1;
  while (left <= right) {
    //numbers at both the ends can give us the largest square
    //compare numbers at both ends and assign the larger number to last index
    //why left <= right? Because we also need to take care of the element where left = right
    const newLeftEl = nums[left] * nums[left];
    const newRightEl = nums[right] * nums[right];
    if (newLeftEl > newRightEl) {
      //put the greatest element at the last index
      squares[newGreatestInd] = newLeftEl;
      //the element at left index has been taken care of, move to next
      left++;
    } else {
      //put the greatest element at the last index
      squares[newGreatestInd] = newRightEl;
      //the element at right index has been taken care of, move to previous
      right--;
    }
    //then, move to 2nd last index
    newGreatestInd--;
  }
  return squares;
};

sortedSquares([-4, -1, 0, 3, 9]); //[0, 1, 9, 16, 81]

/*Time complexity: O(n) as we are iterating the input array only once.

Space complexity: O(n) for the output array. */
