// https://leetcode.com/problems/3sum-smaller/

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
//x + A + B < target => A + B < target - x
// const search = (arr, targetSum, first) => {
//   let count = 0;
//   let left = first + 1;
//   let right = arr.length - 1;
//   while (left < right) {
//     if (arr[left] + arr[right] < targetSum) {
//       //since nums[right] >= nums[left] (sorted array), any number in the window will result in sum < target
//       count += right - left;
//       left++;
//     } else {
//       right--;
//     }
//   }
//   return count;
// };
// const threeSumSmaller = function (nums, target) {
//   nums.sort((a, b) => a - b);
//   let count = 0;
//   for (let i = 0; i < nums.length - 2; i++) {
//     count += search(nums, target - nums[i], i);
//   }
//   return count;
// };

const threeSumSmaller = function (nums, target) {
  nums.sort((a, b) => a - b);
  let count = 0;
  for (let i = 0; i < nums.length - 2; i++) {
    let left = i + 1;
    let right = nums.length - 1;
    while (left < right) {
      if (nums[left] + nums[right] + nums[i] < target) {
        //since nums[right] >= nums[left] (sorted array), any number in the window will result in sum < target
        //(we can replace nums[right] by any number in the window) =>
        //nums[left] + nums[right - 2] + nums[i] < target
        //nums[left] + nums[right - 1] + nums[i] < target
        //and so on...
        count += right - left;
        //right - left => we're processing nums[i] + nums[left] + all values in the window left...right
        //=> curr left position done!
        left++;
      } else {
        //if currSum >= target, we need a smaller sum
        right--;
      }
    }
  }
  return count;
};

console.log(threeSumSmaller([-1, 0, 2, 3], 3)); //2
console.log(threeSumSmaller([-1, 4, 2, 1, 3], 5)); //4

/* Time complexity: Sorting: O(n * logn ). The search() will take O(n). So, overall threeSumSmaller() will 
take O(n * logn + n^2) => asymptotically equivalent to O(n^2).

Space complexity: Apart from the space required for the output array, the space complexity will be O(n) which is required for sorting 
if we are not using an in-place sorting algorithm. */
