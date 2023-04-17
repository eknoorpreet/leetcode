/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */

// const combinationSum2 = function(candidates, target) {
//     const result = []
//     candidates.sort()
//     const helper = (start, combination, target) => {
//         if(target === 0) {
//             result.push(combination)
//         }
//         if(target <= 0) {
//             return
//         }
//         let prev = -1
//         for(let i = start; i < candidates.length; i++) {
//             const curr = candidates[i]
//             if(curr === prev) continue;
//             helper(i + 1, [...combination, curr], target - curr)
//             prev = curr
//         }
//     }
//     helper(0, [], target)
//     return result
// };

const combinationSum2 = function (candidates, target) {
  const result = [];
  candidates.sort();
  const backtrack = (start, combination, target) => {
    if (target === 0) {
      result.push([...combination]);
    }
    if (target < 0) {
      return;
    }
    let prev = -1;
    for (let i = start; i < candidates.length; i++) {
      const curr = candidates[i];
      if (curr === prev) continue; //avoid duplicates
      combination.push(curr);
      backtrack(i + 1, combination, target - curr);
      combination.pop();
      prev = curr;
    }
  };
  backtrack(0, [], target);
  return result;
};

/*TC: As there are n elements and k is the height of the tree, and we also clone the combinations of size k,
Time Complexity is O(k*n^k).
*/
