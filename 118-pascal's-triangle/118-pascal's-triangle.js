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

  //numRows - 1 since we already made 1st row above
  for (let i = 0; i < numRows - 1; i++) {
    const temp = [0, ...result.at(-1), 0];
    const row = [];
    //build the next row (length of last formed row + 1)
    for (let j = 0; j < result.at(-1).length + 1; j++) {
      row.push(temp[j] + temp[j + 1]);
    }
    result.push(row);
  }
  return result;
};

//TC: O(n^2): n is the number of rows, each row can have up to n elements
//SC: O(n^2)
