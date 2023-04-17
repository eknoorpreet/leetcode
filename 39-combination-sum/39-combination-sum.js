/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */

//no duplicates => we want combinations, not permutations that sum up to target
const combinationSum0 = function (candidates, target) {
  const result = [];
  const helper = (i, combination, total) => {
    if (total === target) {
      result.push(combination);
      return;
    }
    const curr = candidates[i];
    if (i >= candidates.length || total > target) return;
    helper(i, [...combination, curr], total + curr);
    helper(i + 1, combination, total);
  };
  helper(0, [], 0);
  return result;
};

const combinationSum = function (candidates, target) {
  const result = [];
  const backtrack = (start, combination, total) => {
    if (total > target) return;
    if (total === target) {
      result.push([...combination]);
      return;
    }
    for (let i = start; i < candidates.length; i++) {
      const curr = candidates[i];
      combination.push(curr);
      backtrack(i, combination, total + curr);
      combination.pop();
    }
  };
  backtrack(0, [], 0);
  return result;
};

/*TC: As there are n elements and k is the height of the tree, and we also clone the combinations of size k,
Time Complexity is O(k*n^k).
*/
