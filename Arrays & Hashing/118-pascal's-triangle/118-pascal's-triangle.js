/*

Given an integer numRows, return the first numRows of Pascal's triangle.

In Pascal's triangle, each number is the sum of the two numbers directly above it as shown:


Example 1:

Input: numRows = 5
Output: [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]
Example 2:

Input: numRows = 1
Output: [[1]]


Constraints:

1 <= numRows <= 30

*/

/**
 * @param {number} numRows
 * @return {number[][]}
 */

const generate = function (numRows) {
  const result = [[1]]; //default value for first row = [1]
  //1st row = 1 element, 2nd row = 2 elements and so on...
  //each number = sum of 2 numbers above it
  //how to go from [1, 2, 1] to [1, 3, 3, 1]. In the latter, above 1, there's 1 in right but nothing in left. We can do something like: [0, 1, 2, 1, 0].
  //Sum of 2 pointers = 0 + 1 = 1.
  //Sum of next 2 pointers = 1 + 2 = 3.
  //Sum of next 2 pointers = 2 + 1 = 3.
  //Sum of next 2 pointers = 1 + 0 = 1.

  //row index starts from 1 since we already made 0th row above
  for (let i = 1; i < numRows; i++) {
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
  return result;
};

//TC: O(n^2): n is the number of rows, each row can have up to n elements
//SC: O(n^2)
