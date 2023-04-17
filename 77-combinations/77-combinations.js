/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
const combine = function (n, k) {
  const result = [];
  const backtrack = (start, combination) => {
    if (combination.length === k) {
      result.push([...combination]);
      return;
    }

    for (let i = start; i <= n; i++) {
      combination.push(i);
      backtrack(i + 1, combination); //i + 1 => only go right (combination, not permutation)
      combination.pop();
    }
  };
  backtrack(1, []);
  return result;
};

/*TC: As there are n elements and k is the height of the tree, and we also clone the combinations of size k,
Time Complexity is O(k*n^k).
*/
