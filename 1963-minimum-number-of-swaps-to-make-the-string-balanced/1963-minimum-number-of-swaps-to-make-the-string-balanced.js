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
  return Math.floor((swaps + 1) / 2);
};
