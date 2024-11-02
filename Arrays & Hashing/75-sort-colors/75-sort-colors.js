// https://leetcode.com/problems/sort-colors/

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */

/*

You should treat numbers of the array as objects, hence, we can’t count 0s, 1s, and 2s to
recreate the array.

Brute force solution: Heapsort => O(nlogn)

Optimized Approach: O(n)


Sort 0s, 1s, and 2s in-place using three pointers.

Logic:
The idea is to maintain three sections in the array:

[0 to low-1]: all 0s
[low to high]: all 1s
[high+1 to end]: all 2s

*/

const sortColors = function (nums) {
  let low = 0; // tracks position for next 0
  let high = nums.length - 1; // tracks position for next 2
  let i = 0; // current element being examined
  while (i <= high) {
    // If number = 0 => swap with low and low++, i++
    if (nums[i] === 0) {
      [nums[i], nums[low]] = [nums[low], nums[i]];
      // Safe to increment i because nums[low] can only be 0 or 1
      // nums[low]) has 0 now => We need to check next number
      i++;
      // low index (nums[low]) has 0 now, after low++, the 0 will be before low
      // where next 0 should go
      low++;
    } else if (nums[i] === 1) {
      // If number = 1 => Just move forward as 1s should be in the middle
      i++;
    } else {
      // If number = 2 => swap with high and high--
      [nums[i], nums[high]] = [nums[high], nums[i]];
      // high index (nums[high]) has 2 now but nums[i] needs to be processed (can be 0, 1, or 2).
      // We need to place the new nums[i] correctly so we will not increment i here
      // After high--, the 2 will be after high
      // where next 2 should go
      high--;
    }
  }
};

/*

Time Complexity: O(n)

Single pass through array
Each element is looked at most twice

Space Complexity: O(1)

In-place sorting
Only uses three pointers

*/

sortColors([2, 0, 2, 1, 1, 0]); //[0,0,1,1,2,2]
