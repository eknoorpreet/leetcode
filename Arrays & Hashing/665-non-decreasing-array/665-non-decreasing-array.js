/**
 * @param {number[]} nums
 * @return {boolean}
 */

const checkPossibility = function (nums) {
  let changed = false;
  for (let i = 0; i < nums.length - 1; i++) {
    //if it's ascending
    if (nums[i] <= nums[i + 1]) {
      //do nothing
      continue;
    }
    //array is unsorted but we already used our chance
    if (changed) {
      return false;
    } else {
      //[3, 4, 2]
      //we want to prioritize changing 4 to 2. Why? Because that's how we increase our chances of getting a non-decreasing array. If we change 2 to 4, we don't know what lies ahead; we made an element greater but future elements could be smaller => decreasing our chances. Therefore, we try to decrease the left element and increase the right one only if the former strategy doesn't work

      //condition: nums[i+1] >= nums[i-1]
      //since arr is [3, 4, 2], changing 4 to 2 will make [2, 2] non-decreasing but not [3, 2, 2].
      //The problem? 3 > 2. Therefore, do this only if nums[i+1] >= nums[i-1]
      if (i === 0 || nums[i + 1] >= nums[i - 1]) {
        nums[i] = nums[i + 1];
      } else {
        nums[i + 1] = nums[i];
      }
      changed = true;
    }
  }
  return true;
};
