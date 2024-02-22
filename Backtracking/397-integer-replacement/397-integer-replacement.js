/*

Given a positive integer n, you can apply one of the following operations:

If n is even, replace n with n / 2.
If n is odd, replace n with either n + 1 or n - 1.
Return the minimum number of operations needed for n to become 1.



Example 1:

Input: n = 8
Output: 3
Explanation: 8 -> 4 -> 2 -> 1
Example 2:

Input: n = 7
Output: 4
Explanation: 7 -> 8 -> 4 -> 2 -> 1
or 7 -> 6 -> 3 -> 2 -> 1
Example 3:

Input: n = 4
Output: 2


Constraints:

1 <= n <= 2^31 - 1

*/

/**
 * @param {number} n
 * @return {number}
 */

const integerReplacement0 = function (n) {
  const helper = (n) => {
    let result = 0;
    if (n <= 1) return result;
    if (n % 2 === 0) {
      result = 1 + helper(n / 2);
    } else {
      result = 1 + Math.min(helper(n + 1), helper(n - 1));
    }
    return result;
  };
  return helper(n);
};

/*

In the worst case, when n is odd, the algorithm makes two recursive calls: one with n+1 and the other with
n−1. Each recursive call reduces n by at least 1, and since n is always reduced, the number of recursive calls
made will be proportional to n. Therefore, the time complexity is O(n).

The space complexity is determined by the maximum depth of the recursion, which is bounded by
the value of n. Therefore, the space complexity is also O(n).

*/

const integerReplacement = function (n) {
  const memo = new Map();

  const helper = (n) => {
    if (memo.has(n)) {
      return memo.get(n);
    }
    let result = 0;
    if (n <= 1) {
      return result;
    }
    if (n % 2 === 0) {
      result = 1 + helper(n / 2);
    } else {
      result = 1 + Math.min(helper(n + 1), helper(n - 1));
    }
    memo.set(n, result);
    return result;
  };

  return helper(n);
};

/*

Time Complexity:

The time complexity of the memoized solution is O(n).
Although there are O(n) possible values for n, each value is computed only once and stored in the memo. Subsequent calls with the same value of
n retrieve the result from the memo in O(1) time. Hence, the overall time complexity is O(n).

Space Complexity:

The space complexity of the memoized solution is also O(n).
This is because the memoization table (implemented as a Map in JavaScript) stores at most n
entries, one for each distinct input value of n. Therefore, the overall space complexity is O(n).

*/
