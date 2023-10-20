// https://leetcode.com/problems/sort-colors/

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */

//You should treat numbers of the array as objects, hence, we can’t count 0s, 1s, and 2s to recreate the array.

//Brute force solution: Heapsort => O(nlogn)
/*

Optimized Approach: O(n)

Move all 0s before low and all 2s after high (skip 1s) so that in the end, all 1s will be between low and high.

The three pointers (low, i, and high) are used to partition the array into three regions: 0s to the left of low, 2s to the right of high, and 1s in between.

*/

const sortColors = function (nums) {
  let low = 0;
  let high = nums.length - 1;
  let i = 0;
  while (i <= high) {
    //if number = 0 => swap with low and low++, i++
    //This means that 0s are moved to the left, and low is incremented to keep track of the last 0 in the sequence.
    if (nums[i] === 0) {
      [nums[i], nums[low]] = [nums[low], nums[i]];
      i++;
      //low index (nums[low]) has 0 now, after low++, the 0 will be before low
      low++;
    } else if (nums[i] === 2) {
      //if number = 2 => swap with high and high--
      [nums[i], nums[high]] = [nums[high], nums[i]];
      // This means that 2s are moved to the right, and high is decremented to keep track of the
      // last 2 in the sequence.

      // high index (nums[high]) has 2 now but nums[i] can be 0, 1, or 2. We need to place the new
      // nums[i] correctly so we will not increment i here
      // after high--, the 2 will be after high
      high--;
    } else {
      //if number = 1 => skip
      i++;
    }
  }
};

sortColors([2, 0, 2, 1, 1, 0]); //[0,0,1,1,2,2]

/*Time complexity: O(n) as we are iterating the input array only once.

Space complexity: The algorithm runs in constant space O(1). */
