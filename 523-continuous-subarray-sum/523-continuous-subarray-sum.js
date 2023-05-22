/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */

/*Brute-force: Check every subarray (n subarrays starting from n elements) and check if the sum is a multiple of k => O(n^2)
Optimized: 23 + 2 = 25 % 6 = 1, basically, we need a 5. Even then, we get O(n^2).

a hashmap to store remainder (key) and index of end of subarray (value)
remainder at 0th index and 3rd index = 5 
=> only possible because we added values that are multiple of k
make sure that subarray is of length 2 (difference of indices >= 2)*/

const checkSubarraySum = function (nums, k) {
  //why? nums= [24, 3,...]. 24 % 6 = 0. map: {0:0} => i(0) - rem(-1) = 1 => false since len < 2
  const remainder = { 0: -1 };
  let total = 0;

  for (let i = 0; i < nums.length; i++) {
    total += nums[i];
    const rem = total % k;
    if (!(rem in remainder)) {
      remainder[rem] = i;
    } else if (i - remainder[rem] > 1) {
      //just check if subarray length is atleast 2
      return true;
    }
  }
  return false;
};

//TC: O(n)
//SC: O(n)

// const checkSubarraySum = function(nums, k) {
//     const rems = new Map()
//     rems.set(0, -1)
//     let total = 0;
//     for(let i = 0; i < nums.length; i++) {
//         total += nums[i]
//         const rem = total % k
//         if(!(rems.has(rem))) rems.set(rem, i)
//         else if(i - rems.get(rem) > 1) return true
//     }
//     return false
// };
