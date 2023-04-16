/**
 * @param {number[]} nums
 * @return {number[][]}
 */
// const permute = nums => {
//   const result = []
//   const helper = (processed, unprocessed) => {
//     if(unprocessed.length === 0) {
//       result.push(processed)
//       return result;
//     }

//     //first char of remaining
//     const curr = unprocessed[0];

//     for(let i = 0; i <= processed.length; i++) {
//       const f = processed.slice(0, i)
//       const s = processed.slice(i, processed.length)
//       helper([...f, curr, ...s], unprocessed.slice(1))
//     }
//     return result
//   }
//   return helper([], nums)
// }

// const permute = (nums) => {
//   const result = [];
//   const helper = (processed, j) => {
//     if (j === nums.length) {
//       result.push(processed);
//       return result;
//     }

//     //first char of remaining
//     const curr = nums[j];

//     for (let i = 0; i <= processed.length; i++) {
//       const f = processed.slice(0, i);
//       const s = processed.slice(i, processed.length);
//       helper([...f, curr, ...s], j + 1);
//     }
//     return result;
//   };
//   return helper([], 0);
// };

const permute = (nums) => {
  const result = [];
  const backtrack = (path) => {
    //path formed => add to result
    if (path.length === nums.length) {
      result.push([...path]);
      return;
    }

    //go through all numbers and for each, exhaust all possible paths
    for (let i = 0; i < nums.length; i++) {
      //because if 1 already in path, selection list = [2, 3]
      if (path.includes(nums[i])) continue;
      path.push(nums[i]);
      backtrack(path);

      /*In every recursive call, loop starts from 0 */

      /*When we do dfs([1]), we're fixing the 1st place in the current permutation/path to 1.
      Now, the 2nd place can be 2/3/4. Going in order, we go for 2 (or the 1st place that's not already
      in the current permutation, i.e. 1) */

      /*We found a permutation; add it to our result. dfs([1, 2, 3, 4]) ends here.
      We're coming out of the recursive call, say for path = [1, 2, 3, 4], it means that the path
      had 4 and we already processed it. (Furthermore, I'm coming from dfs([1, 2, 3, 4]) to 
      dfs([1, 2, 3])) So we now remove 4 from path and i = 3 => i++ = 4 
      (no more elements after 4) => loop ends. If there were more elements, we would've gone in 
      that direction: dfs([1, 2, 3, 5, 4] => dfs([1, 2, 3]) ends, we remove 3 (here, i = 2) => i++ => i = 3.*/

      /*=> dfs([1, 2, 3]) ends, we remove 3 (here, i = 2) => i++ => i = 3. dfs([1, 2, 4]) ...then after
      2 loops =>  dfs([1, 2, 4, 3]). We come out of it and remove 3 (here, i = 2)
      */

      /*In all the above calls, the i at the bottom-most fn is still 0. When all calls end, we found our
        permutations starting from/fixing 1. Now, i = 1 and we start from/fix 2 at 1st place. */
      path.pop();
    }
    return result;
  };
  return backtrack([]);
};

/*TC: We know from set theory that there are n! permutations of a list of size n. 
We also know that the permutations are going to be the leaves of the recursion/decision tree, 
which means we will have n! leaves. In order to get to each one of those leaves, we had to go through n calls. For ex: [] -> [1] -> [1, 2] -> [1, 2, 3] -> [1, 2, 3, 4]
That's O(n*n!). Again a little more than the total number of nodes because some nodes are shared among more than one path.

SC: O(n!) because you still need to store the permutations and there are n! of them even if the depth of the stack is maxed out at n + 1 ([] -> [1] -> [1, 2] -> [1, 2, 3] -> [1, 2, 3, 4])
(depth of the recursion space-tree is also n + 1).
*/

const permuteWithoutBacktracking = (nums) => {
  const result = [];
  const dfs = (path) => {
    if (path.length === nums.length) {
      result.push([...path]);
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      if (path.includes(nums[i])) continue;
      dfs([...path, nums[i]]);
    }
  };
  dfs([]);
  return result;
};
