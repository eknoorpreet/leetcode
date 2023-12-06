/*

Given string num representing a non-negative integer num, and an integer k, return the smallest possible integer after removing k digits from num.



Example 1:

Input: num = "1432219", k = 3
Output: "1219"
Explanation: Remove the three digits 4, 3, and 2 to form the new number 1219 which is the smallest.
Example 2:

Input: num = "10200", k = 1
Output: "200"
Explanation: Remove the leading 1 and the number is 200. Note that the output must not contain leading zeroes.
Example 3:

Input: num = "10", k = 2
Output: "0"
Explanation: Remove all the digits from the number and it is left with nothing which is 0.


Constraints:

1 <= k <= num.length <= 10^5
num consists of only digits.
num does not have any leading zeros except for the zero itself.

*/

/**
 * @param {string} num
 * @param {number} k
 * @return {string}
 */

/*

54321, k = 1: We want to remove the largest digit at the most significant place (5) => 4321
We want the values to be in monotonic increasing order. Keep going as long as the numbers are in increasing order and once we've gone through all digits, we start removing digits from right.

 */

const removeKdigits = (num, k) => {
  //We want the stack to be in monotonic order
  let stack = [];

  for (const n of num) {
    // While the stack is not empty and there are still removals to be made (k)
    // and the last element in the stack is greater than the current digit
    while (stack.length && k && stack.at(-1) > n) {
      // pop element from the stack
      // and decrement k (1 removal made)
      stack.pop();
      k--;
    }

    //As long as the values are in increasing order, add them to the stack
    if (stack.length || n !== '0') {
      // Prevent leading zeros
      stack.push(n);
    }
  }

  // Ours was a monotonic increasing stack. If we can still afford some removals,
  // remvoe from the right (since largest values at the right as it's monotonic increasing stack)
  if (k) {
    stack.splice(-k);
  }

  return stack.join('') || '0';
};

//TC: O(n)
//SC: O(n)
