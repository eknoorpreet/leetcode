/*

Given an array arr, replace every element in that array with the greatest element among the elements to its right, and replace the last element with -1.

After doing so, return the array.


Example 1:

Input: arr = [17,18,5,4,6,1]
Output: [18,6,6,6,1,-1]
Explanation:
- index 0 --> the greatest element to the right of index 0 is index 1 (18).
- index 1 --> the greatest element to the right of index 1 is index 4 (6).
- index 2 --> the greatest element to the right of index 2 is index 4 (6).
- index 3 --> the greatest element to the right of index 3 is index 4 (6).
- index 4 --> the greatest element to the right of index 4 is index 5 (1).
- index 5 --> there are no elements to the right of index 5, so we put -1.
Example 2:

Input: arr = [400]
Output: [-1]
Explanation: There are no elements to the right of index 0.


Constraints:

1 <= arr.length <= 104
1 <= arr[i] <= 105

*/

/**
 * @param {number[]} arr
 * @return {number[]}
 */

//Brute-force: For each element, look at all the remaining elements to its right
//TC: O(n^2)
//SC: O(1)
// const replaceElements = function(arr) {
//     for(let i = 0; i < arr.length - 1; i++) {
//         let rightMax = arr[i + 1]
//           //for each arr[i], find its greatest in its right
//         for(let j = i + 1; j < arr.length - 1; j++) {
//             rightMax = Math.max(rightMax, arr[j + 1])
//         }
//         arr[i] = rightMax
//     }
//     arr[arr.length - 1] = -1
//     return arr
// };

//So much repeated work: how?
//new[0] = max(arr[1:5]) (max from position 1 to 5)
//new[1] = max(arr[2:5]) (max from position 2 to 5)
//positions 2 to 5 are being processed again. If they were looked first and remembered, we can just refer to them for future references.

//new[1] = max(arr[2:5]) (max from position 2 to 5) (for this, get value of position 2 first, i.e. reverse)
//new[0] = max(arr[1], new[1])
/*Since we're going in reverse, the right's max would have already been computed. So, we either need to remember the right one's previous value

const curr = arr[i];
arr[i] = rightMax;
max = Math.max(rightMax, curr);

or already compute the new max using the right one's previous value.

const nextMax = Math.max(rightMax, arr[i]); //for the next element
arr[i] = rightMax
rightMax = nextMax

Basically, if we do a reverse traversal, we can calculate the greatest to the right of each element prior to reaching it! How? Well, we already know the answer to the last element = -1. This is the current rightMax. At this point, we can compare the rightMax and arr[i] and get the answer to arr[arr.length - 2] before getting to it!
*/

//TC: O(n)
//SC: O(1)
const replaceElements = function (arr) {
  let rightMax = -1;
  for (let i = arr.length - 1; i >= 0; i--) {
    //preserve the value of curr element before assigning it to its right
    //otherwise, we'll just use -1 everywhere!
    const curr = arr[i];
    arr[i] = rightMax;
    rightMax = Math.max(rightMax, curr);
  }
  return arr;
};
