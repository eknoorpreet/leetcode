/**
 * @param {number[]} arr
 * @return {number[]}
 */

//Brute-force: For each element, look at all the remaining elements to its right
//O(n^2)
// const replaceElements = function(arr) {
//     for(let i = 0; i < arr.length - 1; i++) {
//         let currMax = arr[i + 1]
//         for(let j = i + 1; j < arr.length - 1; j++) {
//             if(arr[j + 1] > currMax) {
//                currMax = arr[j + 1]
//             }
//         }
//         arr[i] = currMax
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
arr[i] = max;
max = Math.max(max, curr);
    
or already compute the new max using the right one's previous value.

const nextMax = Math.max(nextMax, arr[i]); //for the next element
arr[i] = rightMax
rightMax = nextMax
*/

// const replaceElements = function(arr) {
//     let rightMax = -1
//     for(let i = arr.length - 1; i >= 0; i--) {
//         const curr = arr[i];
//         arr[i] = rightMax;
//         rightMax = Math.max(rightMax, curr);
//     }
//     return arr
// };

const replaceElements = function (arr) {
  let rightMax = -1;
  for (let i = arr.length - 1; i >= 0; i--) {
    const curr = arr[i];
    arr[i] = rightMax;
    rightMax = Math.max(rightMax, curr);
  }
  return arr;
};
