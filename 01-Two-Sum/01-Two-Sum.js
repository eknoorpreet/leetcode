//TC: O(n^2)
//SC: O(1)
// const twoSum = function(nums, target) {
//     for(let i = 0; i < nums.length - 1; i++) {
//         for(let j = i + 1; j < nums.length; j++) {
//             if(nums[i] + nums[j] === target) return [i, j]
//         }
//     }
// };

//TC: O(n)
//SC: O(n)
// const twoSum = function(nums, target) {
//     const map = new Map() //store target - num[i] and i
//     for(let i = 0; i < nums.length; i++) {
//we store {target - a => a's index} in map
//we need to find b such that target - a = b
//we find b => 2indices: [a'index, b's index]

//         //target = 9, nums[i] = 2 => map: {7 => 0}
//         //indicates we need a 7 to meet target
//         //if we found a 7, ans = [2's index, 7's currIndex]
//         if(map.has(nums[i])) return [map.get(nums[i]), i]
//         else map.set(target - nums[i], i)
//     }
// };

//TC: O(n)
//SC: O(n)
const twoSum = function (nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    //we store {2 => 0}. If map has 9 - 2 = 7, return [2's index, curr index]
    if (map.has(target - nums[i])) return [map.get(target - nums[i]), i];
    else map.set(nums[i], i);
  }
};
