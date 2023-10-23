/*

You are given a 0-indexed string s of even length n. The string consists of exactly n / 2 opening brackets '[' and n / 2 closing brackets ']'.

A string is called balanced if and only if:

It is the empty string, or
It can be written as AB, where both A and B are balanced strings, or
It can be written as [C], where C is a balanced string.
You may swap the brackets at any two indices any number of times.

Return the minimum number of swaps to make s balanced.



Example 1:

Input: s = "][]["
Output: 1
Explanation: You can make the string balanced by swapping index 0 with index 3.
The resulting string is "[[]]".
Example 2:

Input: s = "]]][[["
Output: 2
Explanation: You can do the following to make the string balanced:
- Swap index 0 with index 4. s = "[]][][".
- Swap index 1 with index 5. s = "[[][]]".
The resulting string is "[[][]]".
Example 3:

Input: s = "[]"
Output: 0
Explanation: The string is already balanced.


Constraints:

n == s.length
2 <= n <= 10^6
n is even.
s[i] is either '[' or ']'.
The number of opening brackets '[' equals n / 2, and the number of closing brackets ']' equals n / 2.

*/

/**
 * @param {string} s
 * @return {number}
 */

// const minSwaps = function(s) {
//     //even total string length (half '[' and half ']')
//     //observation: In "] [ ] [", first character = ']' (']' before '[) => unbalanced.
//     //At any point where ']' brackets > '[' => unbalanced => need to swap
//     //So in "] [ ]", 1 extra closing bracket => 1 swap. How to determine extra closing brackets?
//     //Initially 0, is decreased when we encounter '['. closing (2) - opening (1) = 1
//     //At any point, the max of extra closing should be the answer.
//     //But look here: "] ] ] [ [ [ [ ]", max = 3. When we swap, 2 swaps would balance it!
//     //How, ']' gone => extra closing--. '[' appeared => extra closing--. Each swap => 2 extra ']'
//     /*For 3 mismatches you would have:

//         ] ] ] [ [ [

//         Swap 1: ] [ ] [ ] [
//         Swap 2: [ [ ] [ ] ]

//         For 4 mismatches, you would have:

//         ] ] ] ] [ [ [ [

//         Swap 1: ] ] [ ] [ ] [ [
//         Swap 2: [ ] [ ] [ ] [ ]

//         if mismatches is even --> return mismatches / 2
//         else return (mismatches + 1) / 2
//     */
//     //Answer: 3 -> 1. 1 -> 0
//     let extraClose = 0;
//     let max = 0;
//     for(let c of s) {
//         if(c === "[") {
//             extraClose--
//         } else {
//             extraClose++
//         }
//         max = Math.max(max, extraClose)
//     }
//     return Math.floor((max + 1) / 2);
// };

//TC: O(n)
//SC: O(1)

/*

The intuition behind this approach is to count the extra opening brackets in the string,
which represent the brackets that need corresponding closing brackets to make the string balanced.
The number of swaps required is half the count of these unbalanced pairs, and the algorithm
takes into account cases where an extra swap is needed.

*/
const minSwaps = function (s) {
  //First cancel out all the valid pairs, then you will be left with something like ]]][[[, and the answer will be (m + 1/2). Where m is the number of pairs left.
  let extraOpen = 0;
  let swaps = 0;
  //track '['.
  //if it's 0 => balanced.
  for (let c of s) {
    if (c === '[') {
      extraOpen++;
    } else if (c === ']' && extraOpen == 0) {
      //if it's 0 and curr bracket is ']' => unbalanced => swaps++
      swaps++;
    } else {
      //if it's > 0 (there are (open) brackets that need to be closed) and curr bracket is ///']' => open--
      extraOpen--;
    }
  }
  //This calculation ensures that if there is an odd number of swaps needed, you increment it by
  //1 and then divide by 2. This covers the case where two swaps are required to balance
  //adjacent brackets, and one swap operation is not possible.
  return Math.floor((swaps + 1) / 2);
};

/*

The time complexity of this solution is O(n), where n is the length of the input string s,
as it iterates through the string once.

The space complexity is O(1).

*/
