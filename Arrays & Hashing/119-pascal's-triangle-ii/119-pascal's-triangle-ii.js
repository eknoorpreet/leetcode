/*

Given an integer rowIndex, return the rowIndexth (0-indexed) row of the Pascal's triangle.

In Pascal's triangle, each number is the sum of the two numbers directly above it as shown:


Example 1:

Input: rowIndex = 3
Output: [1,3,3,1]
Example 2:

Input: rowIndex = 0
Output: [1]
Example 3:

Input: rowIndex = 1
Output: [1,1]


Constraints:

0 <= rowIndex <= 33

*/

/**
 * @param {number} rowIndex
 * @return {number[]}
 */

/**
 * @param {number} numRows
 * @return {number[][]}
 */

const getRow = function (rowIndex) {
  const result = [[1]]; //default value for first row = [1]
  //1st row = 1 element, 2nd row = 2 elements and so on...
  //each number = sum of 2 numbers above it
  //how to go from [1, 2, 1] to [1, 3, 3, 1]. In the latter, above 1, there's 1 in right but nothing in left. We can do something like: [0, 1, 2, 1, 0].
  //Sum of 2 pointers = 0 + 1 = 1.
  //Sum of next 2 pointers = 1 + 2 = 3.
  //Sum of next 2 pointers = 2 + 1 = 3.
  //Sum of next 2 pointers = 1 + 0 = 1.

  for (let i = 0; i < rowIndex; i++) {
    //initiate curr row
    const row = [];
    //Use the last row to generate the curr row
    const temp = [0, ...result.at(-1), 0];
    //loop for 1 more than the length of prev row
    //(cuz row length increases by 1)
    for (let j = 0; j < result.at(-1).length + 1; j++) {
      //build curr row
      row.push(temp[j] + temp[j + 1]);
    }
    //curr row built => push to result
    result.push(row);
  }
  return result[rowIndex];
};

//TC: O(n^2): n is the index, each row can have up to n elements
//SC: O(n^2)
