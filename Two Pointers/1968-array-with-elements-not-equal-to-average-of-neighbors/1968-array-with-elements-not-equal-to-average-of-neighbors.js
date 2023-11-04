/**
 * @param {number[]} nums
 * @return {number[]}
 */

/*

Idea: If, for every single number, both its neighbors are larger than the number => criteria met!
But what about the largest number in array 5? Try th eopposite (both its neighbors are smaller than 5)

When iterating over the sorted array, skip an index!

1 _ 2 _ 3

Then, the remaining elements will be larger:

1 4 2 5 3 (criteria met!)

One way you can do this is by filling a smaller number (represented by left pointer), followed by a larger number (represented by right pointer).

*/

const rearrangeArray0 = function (nums) {
  const result = [];
  nums.sort((a, b) => a - b);
  let left = 0;
  let right = nums.length - 1;
  while (left < right) {
    result.push(nums[left]);
    left++;

    result.push(nums[right]);
    right--;
  }

  //if array is odd lengthed, then middle element would have been left (where left = right)
  //push it as well
  if (nums.length % 2) result.push(nums[left]);
  return result;
};

const rearrangeArray = (nums) => {
  let n = nums.length;

  // Move left to right and fix
  for (let i = 1; i < n - 1; i++) {
    if (2 * nums[i] === nums[i - 1] + nums[i + 1]) {
      [nums[i], nums[i + 1]] = [nums[i + 1], nums[i]];
    }
  }

  // If only 1 scan is done, then there is a chance for a pair to become the average
  // of its 2 neighbors which it was not earlier before the 1st scan.
  // So, a reverse scan is done to check and swap such pairs.
  for (let i = n - 2; i > 0; i--) {
    if (2 * nums[i] === nums[i - 1] + nums[i + 1]) {
      [nums[i], nums[i - 1]] = [nums[i - 1], nums[i]];
    }
  }

  return nums;
};

//TC: O(n)
//SC: O(1)
