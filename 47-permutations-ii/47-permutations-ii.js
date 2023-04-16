/**
 * @param {number[]} nums
 * @return {number[][]}
 */

//  const permuteUnique = function(nums) {
//   const result = []
//   const perm = []
//   const map = new Map()
//   for(let i = 0; i < nums.length; i++) {
//       map.set(nums[i], (map.get(nums[i]) || 0) + 1)
//   }
//   const helper = () => {
//     if(perm.length === nums.length) {
//       result.push([...perm])
//       return;
//     }

//     for(let [num, frequency] of map.entries()) {
//         if(frequency > 0) {
//             perm.push(num)
//             map.set(num, map.get(num) - 1)
//             helper()
//             map.set(num, map.get(num) + 1)
//             perm.pop()
//         }
//     }

//     return result
//   }
//   return helper()
// };

//if we start with the same number at the same position => same/duplicate permutation
//Using a hashmap, we can rely on the keys to be unique
const permuteUnique = (nums) => {
  const res = [];
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    map.set(nums[i], (map.get(nums[i]) || 0) + 1);
  }
  const backtrack = (path) => {
    if (path.length === nums.length) {
      res.push([...path]);
      return;
    }
    for (let [num, freq] of map.entries()) {
      //every ley will be unique, unlike the loop
      if (freq > 0) {
        path.push(num); //taking current element
        map.set(num, map.get(num) - 1); //accounting for its frequency in hashmap
        backtrack(path);
        path.pop();
        map.set(num, map.get(num) + 1);
      }
    }
  };
  backtrack([]);
  return res;
};

/*TC: We know from set theory that there are n! permutations of a list of size n. 
We also know that the permutations are going to be the leaves of the recursion/decision tree, 
which means we will have n! leaves. In order to get to each one of those leaves, we had to go through n calls. For ex: [] -> [1] -> [1, 2] -> [1, 2, 3] -> [1, 2, 3, 4]
That's O(n*n!). Again a little more than the total number of nodes because some nodes are shared among more than one path.

SC: O(n!) because you still need to store the permutations and there are n! of them even if the depth of the stack is maxed out at n + 1 ([] -> [1] -> [1, 2] -> [1, 2, 3] -> [1, 2, 3, 4])
(depth of the recursion space-tree is also n + 1).
*/
