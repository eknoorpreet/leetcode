/*

Given an integer array nums, return the most frequent even element.

If there is a tie, return the smallest one. If there is no such element, return -1.



Example 1:

Input: nums = [0,1,2,2,4,4,1]
Output: 2
Explanation:
The even elements are 0, 2, and 4. Of these, 2 and 4 appear the most.
We return the smallest one, which is 2.
Example 2:

Input: nums = [4,4,4,9,2,4]
Output: 4
Explanation: 4 is the even element appears the most.
Example 3:

Input: nums = [29,47,21,41,13,37,25,7]
Output: -1
Explanation: There is no even element.


Constraints:

1 <= nums.length <= 2000
0 <= nums[i] <= 10^5

*/

const mostFrequentEven = function (nums) {
  const map = new Map();
  let maxFreq = 0;
  let result = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] % 2 === 0) {
      map.set(nums[i], (map.get(nums[i]) || 0) + 1);
      //if curr el freq > max freq yet OR tehy're equal and curr el < result
      //=> choose curr el
      result =
        map.get(nums[i]) > maxFreq ||
        (map.get(nums[i]) === maxFreq && nums[i] < result)
          ? nums[i]
          : result;
      //update max freq
      maxFreq = Math.max(maxFreq, map.get(nums[i]));
    }
  }
  //max freq remained unchanged => -1
  return maxFreq === 0 ? -1 : result;
};

//TC: O(n)
//SC: O(n)
